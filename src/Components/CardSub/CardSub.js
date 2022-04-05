import React from "react";
import Icon from "@mdi/react";
import { mdiWeatherCloudyAlert, mdiWeatherLightning ,mdiWeatherCloudy ,mdiWeatherSnowy ,mdiWeatherPouring ,mdiWeatherRainy  ,mdiWeatherSunny} from '@mdi/js';

const CardSub = ({hourlyWeather, timezone}) => {

    function utcToLocalTime(utcTime) {
        var time = new Date(utcTime * 1000)
        return time.toLocaleString('en-US', {hour: 'numeric', hour12: true, timeZone: timezone})
    }

    function getIcon(item) {
        var icon = '';
        switch(item.weather[0].main) {
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
       <div class="flex justify-center ">
        {
            hourlyWeather.slice(1, 6).map((item) => (
                <div class="rounded-lg shadow-lg bg-white max-w-sm h-28 w-24 mb-4 mx-6">
                    <div class=" grid grid-rows-3 ">
                        <div class="content-start grid place-content-center text-xl font-semibold mb-2">
                            {utcToLocalTime(item.dt)}
                        </div>
                        <div class="grid items-center place-content-center text-xl">
                        <Icon path={getIcon(item)} size='2rem'/> 
                        </div>
                        <div class="grid place-content-center text-xl font-semibold">
                            {item.feels_like.toFixed(0)}°C
                        </div>
                    </div>
                </div>
            ))
        }    
        </div>
    );
}

export default CardSub;