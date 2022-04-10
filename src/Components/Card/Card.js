import React from "react";
import { mdiWaterPercent,mdiMapMarker,mdiCalendarMonth,mdiWeatherWindy,mdiWeatherSunny, mdiWeatherCloudyAlert, mdiWeatherLightning ,mdiWeatherCloudy ,mdiWeatherSnowy ,mdiWeatherPouring ,mdiWeatherRainy} from '@mdi/js'; 
import Icon from '@mdi/react'
import { motion } from "framer-motion";
import CardSub from "../CardSub/CardSub";

const Card = ({weatherObj, locationName, count}) => {

    var date = new Date((weatherObj.current.dt) * 1000);
    var timezone = weatherObj.timezone;
    var time = date.toLocaleString('en-US', {weekday:'short', month:'short', day:'2-digit', timeZone: timezone});

    function getStyle(weather) {
        var style ='';
        switch(weather){
        case 'Clear'          : style = 'bg-[#FFBA08] text-black';   break;
        case 'Thunderstorm'   : style = 'bg-[#240046] text-white';   break;
        case 'Clouds'         : style = 'bg-[#0096C7] text-white';   break;
        case 'Snow'           : style = 'bg-[#0096C7] text-white';   break;
        case 'Rain'           : style = 'bg-[#03045E] text-white';   break;
        case 'Drizzle'        : style = 'bg-[#005F73] text-white';   break;
        default               : style = 'bg-[#0096C7] text-black'; 
        }
        return style;
  }

    function getIcon(item) {
        var icon = '';
        switch(item) {
            case 'Thunderstorm' : icon = mdiWeatherLightning; break;
            case 'Drizzle'      : icon = mdiWeatherRainy;     break;
            case 'Rain'         : icon = mdiWeatherPouring;   break;
            case 'Snow'         : icon = mdiWeatherSnowy;     break;
            case 'Clear'        : icon = mdiWeatherSunny;     break;
            case 'Clouds'       : icon = mdiWeatherCloudy;    break;
            default             : icon = mdiWeatherCloudyAlert;  
        }
        return icon;
    }

    return(
        <div className='flex relative  md:static justify-center opacity-100  z-50'>
            <div className='my-4'>
                <motion.div
                     initial={{y: 0, opacity:0}}
                     animate={{y: 12,opacity:1}}
                     exit={{y: 12,opacity:1}}
                     transition={{ duration: 1,type:'spring', ease:'easeInOut'}} 
                     key={count} 
                    className={"flex justify-center shadow-lg  rounded-3xl "+ getStyle(weatherObj.current.weather[0].main)}>
                    <motion.div
                     initial={{y:0,opacity:0}}
                     animate={{y:12, opacity:1}}
                     exit={{y: 0, opacity:1}}
                     transition={{ duration: 1, ease:'easeInOut'}} 
                     key={count}
                     className=' w-[20rem] md:w-[40rem] lg:w-[50rem] p-2   '>
                            <div className='grid grid-cols-3 grid-rows-3 lg:grid-rows-2 m-6'>
                                    <div className='grid col-span-3 lg:col-span-1 justify-items-center lg:justify-items-start font-Ubuntu text-8xl font-bold'>
                                        {weatherObj.current.feels_like.toFixed(0)}°C
                                    </div>
                                <div className='grid grid-flow-col lg:grid-flow-row col-span-3 lg:col-start-2 lg:col-span-2 lg:justify-end content-center overflow-hidden text-xl  font-regular font-Open_Sans '>
                                    <motion.div
                                            initial={{x:100}}
                                            animate={{x:0}}
                                            exit={{x:100}}
                                            transition={{ duration: .5,delay:.5, ease:'easeInOut'}}
                                            className='flex flex-col justify-end lg:mr-3 py-1'
                                        >
                                        <div className='flex flex-row '>
                                            <Icon path={mdiCalendarMonth} className='w-7 h-auto'/>
                                            {time}
                                        </div>
                                        </motion.div>
                                    <motion.div
                                            initial={{x:100}}
                                            animate={{x:0}}
                                            exit={{x:100}}
                                            transition={{ duration: .5,delay:.5, ease:'easeInOut'}}
                                            className='flex flex-row justify-end  py-1'
                                        >
                                        <div className='flex flex-row   items-center'>
                                            <Icon path={mdiMapMarker} className='w-7 h-auto'/>
                                            <p className='flex-nowrap'>{locationName}</p>
                                        </div>
                                    </motion.div>
                                    

                                </div>
                                {/* Thunderstorm 3xl */}
                                <div className= {'font-Ubuntu grid grid-flow-col  justify-start content-center items-center ' 
                                                + (weatherObj.current.weather[0].main === "thunderstorm" ? "text-sm md:text-base lg:text-3xl": "text-xl lg:text-5xl")
                                            }> 
                                    <Icon path={getIcon(weatherObj.current.weather[0].main)} className='w-4 md:w-12 h-auto'/> 
                                    <p className='md:ml-2'>{weatherObj.current.weather[0].main}</p>
                               </div>
                                <div className='py-1 font-Ubuntu text-xl md:text-5xl grid grid-flow-col justify-center items-center place-content-center'>
                                    <Icon path={mdiWaterPercent} className='w-4 md:w-12 h-auto'/> 
                                    <p className='md:ml-2'>{weatherObj.current.humidity}%</p>
                                </div>
                                <div className='font-Ubuntu text-xl md:text-5xl grid grid-flow-col justify-end items-center content-center'>
                                    <Icon path={mdiWeatherWindy}  className='w-4 md:w-8 lg:w-12 h-auto flex '/> 
                                    <p className='md:ml-2'>{weatherObj.current.wind_speed}<span className='text-sm lg:text-3xl'>km/h</span></p>
                                </div> 
                            </div> 
                            <div className='flex flex-row justify-around'>
                                    <CardSub hourlyWeather={weatherObj.hourly} timezone={timezone}/>
                            </div>
                    </motion.div>
                </motion.div>
            </div>
        </div>
    );
}

export default Card;