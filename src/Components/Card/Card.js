import React from "react";
import { mdiWaterPercent,mdiMapMarker,mdiCalendarMonth,mdiWeatherWindy,mdiWeatherSunny, mdiWeatherCloudyAlert, mdiWeatherLightning ,mdiWeatherCloudy ,mdiWeatherSnowy ,mdiWeatherPouring ,mdiWeatherRainy} from '@mdi/js'; 
import Icon from '@mdi/react'
import CardSub from "../CardSub/CardSub";

const Card = ({weatherObj, locationName}) => {

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
        <div className='flex  justify-center opacity-100'>
            <div className='my-4'>
                <div className="flex justify-center">
                    <div className={'rounded-3xl bg-white shadow-lg xl:w-[50rem] p-2 ' + getStyle(weatherObj.current.weather[0].main)}>
                        <div className=''>
                            <div className='grid grid-cols-3 grid-rows-2  m-6'>
                                <p className='font-Ubuntu text-8xl font-bold'>
                                     {weatherObj.current.feels_like.toFixed(0)}°C
                                </p>
                                <div className='grid col-start-2 col-span-2 justify-end content-center'>
                                    <div className='text-xl font-regular font-Open_Sans'>
                                        <div className='flex flex-row items-center'>
                                            <Icon path={mdiCalendarMonth} size='1.25rem'/>
                                            {time}
                                        </div>
                                        <div className='flex flex-row items-center'>
                                            <Icon path={mdiMapMarker} size='1.25rem'/>
                                            {locationName}
                                        </div>
                                    </div>

                                </div>
                                {/* Thunderstorm 3xl */}
                                <div className= {'font-Ubuntu grid grid-flow-col  justify-start content-center ' + (weatherObj.current.weather[0].main === "thunderstorm" ? "text-3xl": "text-5xl")}> 
                                    <Icon path={getIcon(weatherObj.current.weather[0].main)} size='3rem'/> 
                                    {weatherObj.current.weather[0].main}
                                </div>
                                <div className='font-Ubuntu text-5xl grid grid-flow-col place-content-center'>
                                    <Icon path={mdiWaterPercent} size='3rem'/> 
                                   {weatherObj.current.humidity}%
                                </div>
                                <div className='font-Ubuntu text-5xl grid grid-flow-col justify-end content-center'>
                                    <Icon path={mdiWeatherWindy} size='3rem'/> 
                                    {weatherObj.current.wind_speed}km/h
                                </div>
                            </div> 
                            <div className='flex flex-row justify-around'>
                                <CardSub hourlyWeather={weatherObj.hourly} timezone={timezone}/>
                            </div> 
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Card;