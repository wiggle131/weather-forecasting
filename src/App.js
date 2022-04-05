import { useEffect, useState } from 'react';
import './App.css';
import Card from './Components/Card/Card';
import Search from './Components/Search/Search';


function App() {
  const [location,setLocation] = useState({lat: 10,lng: 10, locationName:"Africa"});
  const [weatherObj,setWeatherObj] = useState(null);
  const key = 'f46b2dea6c0bb0041fc6d8feeb5c21aa';
  
  
  const changeLoc = (queryLoc) => {
      locationToCoord(queryLoc)
        .then(res => setLocation({
            ...location,
            lat: res.data[1].latitude,
            lng: res.data[1].longitude,
            locationName: res.data[1].label
          })
        .catch(err => console.log(err))
      );
    console.log(location);
  }
  
  async function fetchWeather() {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${location.lat}&lon=${location.lng}&exclude=daily,minutely&appid=${key}&units=metric`)
              .then(response =>response.json())
              .catch(er => console.error(er));
    return response.cod != 400 ? response : "Error";
  }

   async function locationToCoord(reqLocation) {
    const accesskey = "cb92efa0d31b38646eb5a6e5b8878e28";
    const response = await fetch(`http://api.positionstack.com/v1/forward?access_key=${accesskey}&query=${reqLocation}`)
        .then(response => response.json())
        .catch(er => console.error(er));
    return response;
  }
 
  function getGradient(weather) {
    var gradient ='';
    switch(weather){
      case 'Clear'          : gradient = 'bg-gradient-to-br from-clear-1 via-clear-2 to-clear-3';       break;
      case 'Thunderstorm'   : gradient = 'bg-gradient-to-br from-thunder-1 via-thunder-2 to-thunder-3';  break;
      default: 'temp';
      //case ''
    }
  }

  useEffect(() => {
    fetchWeather().then(response => setWeatherObj(response));
    console.log(weatherObj)
  },[location.lat,location.lng]);
  
  console.log(weatherObj)

  return (
    <div className='flex flex-col justify-center h-screen bg-gradient-to-br from-clear-1 via-clear-2 to-clear-3'>
      <Search changeLoc={changeLoc}/>
      {(weatherObj != "Error" && weatherObj != null) ? (
        <Card weatherObj={weatherObj} locationName = {location.locationName}/>
      ) : (<p>Error...</p>)}
    </div>
  );
}

export default App;
