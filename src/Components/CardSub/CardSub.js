import React from "react";
import { motion } from "framer-motion";
import { useRef } from "react";
import Icon from "@mdi/react";
import useDraggableScroll from 'use-draggable-scroll';
import { mdiWeatherCloudyAlert, mdiWeatherLightning ,mdiWeatherCloudy ,mdiWeatherSnowy ,mdiWeatherPouring ,mdiWeatherRainy  ,mdiWeatherSunny} from '@mdi/js';

const CardSub = ({hourlyWeather, timezone}) => {

    const ref = useRef(null);

    const { onMouseDown } = useDraggableScroll(ref);

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
/* .slice(1, 6) */
    return(
       <motion.div
        initial={{x:300, opacity: 0}}
        animate={{x:0, opacity: 1}}
        transition={{ duration: 1,delay:1, ease:'easeInOut', type:'spring'}}                                       
        className="flex justify-center flex-nowrap overflow-hidden overflow-x-auto overflow-y-hidden hide-scroll py-2"
        ref={ref} onMouseDown={onMouseDown}
       >
            {
                hourlyWeather.map((item, index) => (
                    <div className="  rounded-lg shadow-lg bg-white max-w-sm min-w-max h-28 w-24 mb-4 mx-6 px-4  text-black transition ease-in-out  hover:-translate-y-1 hover:scale-110" key={index}>
                        <div className=" grid grid-rows-3 ">
                            <div className="content-start grid place-content-center text-xl font-semibold mb-2">
                                {utcToLocalTime(item.dt)}
                            </div>
                            <div className="grid items-center place-content-center text-xl">
                            <Icon path={getIcon(item)} size='2rem'/> 
                            </div>
                            <div className="grid place-content-center text-xl font-semibold">
                                {item.feels_like.toFixed(0)}??C
                            </div>
                        </div>
                    </div>
                ))
            }   
        </motion.div>
    );
}

export default CardSub;