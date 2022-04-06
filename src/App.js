import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import './App.css';
import Card from './Components/Card/Card';
import Search from './Components/Search/Search';


function App() {
  const [location,setLocation] = useState({lat: 10,lng: 10, locationName:"Africa"});
  const [weatherObj,setWeatherObj] = useState(null);
  const key = 'f46b2dea6c0bb0041fc6d8feeb5c21aa';
  
  const variants = {
    Clouds : {backgroundImage: [ 'linear-gradient(red,yellow)'], opacity:[.65, 1]},
    Clear :  {backgroundImage: [ 'linear-gradient(blue,green)'], opacity:[.65, 1]},
    Rain :   {backgroundColor: [ 'hsl(239, 94, 19)', 'hsl(201, 100, 36)'] },
  }
  
  const changeLoc = (queryLoc) => {
      locationToCoord(queryLoc)
        .then(res => setLocation({
            ...location,
            lat: res.data[0].latitude,
            lng: res.data[0].longitude,
            locationName: res.data[0].label
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

      case 'Clear'          : gradient = 'bg-gradient-to-br from-clear-1 via-clear-2 to-clear-3';         break;
      case 'Thunderstorm'   : gradient = 'bg-gradient-to-br from-thunder-1 via-thunder-2 to-thunder-3';   break;
      case 'Clouds'         : gradient = 'bg-gradient-to-br from-cloud-1 via-cloud-2 to-cloud-3';         break;
      case 'Snow'           : gradient = 'bg-gradient-to-br from-snow-1 via-snow-2 to-snow-3';            break;
      case 'Rain'           : gradient = 'bg-gradient-to-br from-rain-1 via-rain-2 to-rain-3';            break;
      case 'Drizzle'        : gradient = 'bg-gradient-to-br from-drizzle-1 via-drizzle-2 to-drizzle-3';   break;
      default               : gradient = 'bg-gradient-to-br from-cloud-1 via-cloud-2 to-cloud-3'; //case ''
    }
    return gradient;
  }

  useEffect(() => {
    fetchWeather().then(response => setWeatherObj(response));
    console.log(weatherObj)
  },[location.lat,location.lng]);
  const temp = true;
  console.log(weatherObj)
//  + getGradient((weatherObj != null) ? weatherObj.current.weather[0].main : 'Clouds')
  return (
    <motion.div
      animate={(weatherObj != null) ? weatherObj.current.weather[0].main : 'Clouds'}
      variants = {variants}
      transition={{ease: "circIn", duration: .5}}
      exit={{opacity: .65}}
      className={'flex flex-col justify-center h-screen'}>
      <Search className='' changeLoc={changeLoc}/>
      {(weatherObj != "Error" && weatherObj != null) ? (
        <Card className='opacity-100' weatherObj={weatherObj} locationName = {location.locationName}/>
      ) : (<p className='opacity-100'>Error...</p>)}
    </motion.div>
  );
}

export default App;
