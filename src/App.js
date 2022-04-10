import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import './App.css';
import Card from './Components/Card/Card';
import Search from './Components/Search/Search';


function App() {
  const [location,setLocation] = useState({lat: 10,lng: 10, locationName:"Africa"});
  const [weatherObj,setWeatherObj] = useState(null);
  const [count, setCount] = useState(0);
  const key = 'f46b2dea6c0bb0041fc6d8feeb5c21aa';

  const changeLoc = (queryLoc) => {
      locationToCoord(queryLoc)
        .then(res =>
           setLocation({
            ...location,
            lat: res[0].lat,
            lng: res[0].lon,
            locationName: res[0].namedetails.name
          })
        .catch(err => console.log(err))
      );
    console.log(location);
    setCount(count + 1);
  }
  
  async function fetchWeather() {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${location.lat}&lon=${location.lng}&exclude=daily,minutely&appid=${key}&units=metric`)
              .then(response =>response.json())
              .catch(er => console.error(er));
    return response.cod !== 400 ? response : "Error";
  }

   async function locationToCoord(reqLocation) {
    const accesskey = "pk.457edd6be3adbe9be73a702e0767513f";
    const response = await fetch(`https://us1.locationiq.com/v1/search.php?key=${accesskey}&q=${reqLocation}&namedetails=1&format=json`)
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
  },[location.lat,location.lng]);

  return (
    <div className='flex flex-col justify-center h-screen  hide-scroll'>
      <AnimatePresence >
       <motion.div
                  className={" background-animate max-w-screen-full " + getGradient((weatherObj != null) ? weatherObj.current.weather[0].main : 'Clouds') }   
                  initial={{x:'calc(100vh - 50%)', y:'50%', height:'calc(100vh - 50%)', width:0, scale:-10, opacity: 1}}
                  animate={{x:'calc(100vh - 50%)', y:'50%', height:'100vh', width:'100%',  opacity: 1}}  
                  exit={{opacity: 0.2}} 
                  transition={{ duration: 2,delay: 1, ease:'easeInOut'}} 
                  key={count} 
                  />
      </AnimatePresence>
      <Search className='z-50' changeLoc={changeLoc}/>
      {(weatherObj !== "Error" && weatherObj !== null) ? (
        <AnimatePresence>
          <motion.div 
            initial={{y: 0, opacity:0}}
            animate={{y: 12,opacity:1}}
            exit={{y: 0,opacity:1}}
            transition={{ duration: 1,delay:.7,type:'spring', ease:'easeInOut'}} 
            key={key} 
            className='z-50 absolute flex justify-center w-screen'
          >
            <Card weatherObj={weatherObj} locationName = {location.locationName} count={count}/>
          </motion.div>
        </AnimatePresence>
      ) : (
            <div className='flex h-screen w-screen absolute hide-scroll justify-center opacity-100 z-50 '>
              <div className='flex  flex-row my-4'>                        
                  <svg role="status" className=" justify-center mr-2 w-24 lg:w-72 h-auto text-gray-200 animate-spin dark:text-white fill-[#3fc0de]" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"></path>
                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"></path>
                  </svg>
              </div>
            </div>        
        )}
    </div>
  );
}

export default App;
