import React, { useState } from "react";

const Search = ({changeLoc}) => {
    const [newLocation, setNewLocation] = useState("...")


    function handleKeyPress(event) {
        
        if(event.key === 'Enter' || event.type === 'click'){
            changeLoc(newLocation);
        }
    }

    return(
       <div class="flex justify-center">
        <div class="mb-3 xl:w-[54rem]">
            <div class="input-group relative flex flex-wrap xl:flex-nowrap xl:flex-row items-stretch w-full mb-4">
                <input  type="search" class="form-control relative flex-auto min-w-0 block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded-l-3xl transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" 
                        placeholder="Search" aria-label="Search" aria-describedby="button-addon3"
                        onChange={e => setNewLocation(e.target.value)}
                        onKeyPress={handleKeyPress}     
                />
                <button class="btn inline-block px-6 py-2 bg-white font-medium text-xs leading-tight uppercase rounded-r-3xl hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0 transition duration-150 ease-in-out" 
                        type="button" id="button-addon3"
                        onClick={handleKeyPress}
                >
                    Search
                </button>
            </div>
        </div>
    </div>
    );
}

export default Search;