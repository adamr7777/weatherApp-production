
import {getTime, getLatlong, getWeatherData, renderTodayWeather, updateInfo, checkDay, getRenderImg, refreshWeatherHandle} from './utils.js';



// bring back the main 3 functions from utils.js 







// console.log(checkDay());


(function mainLoop() {
    const btnToday = document.getElementById('btn-today');
    btnToday.disabled = true;
    // let isWeekActive = false;

 
    
    document.addEventListener('click', (event)=> {
        if (event.target.id === 'btn-today') {
            document.getElementById('btn-today').disabled = true;
            document.getElementById('btn-week').disabled = false;
            renderTodayWeather();
            getRenderImg();
            
            //original place for updateInfo()
        }

        if (event.target.id === 'btn-week') {
            
            // document.getElementById('main-cont').innerHTML = `<h1>Coming soon!</h1>`
            document.getElementById('btn-today').disabled = false;
            document.getElementById('btn-week').disabled = true;
            // isWeekActive = true;
            // console.log(isWeekActive);
            document.getElementById('big-div').innerHTML = `
            `;
        }

      

        if (event.target.id === 'refresh-btn') getRenderImg();
        
        
        if(event.target.id === 'weather-refresh') refreshWeatherHandle();
        
    });

    
        updateInfo(); /*move to the event listener */
        renderTodayWeather();           /*for convenience, later delete*/
        getRenderImg();
    

})();




(function animateCircle(){
    let mouseOver = false;

    document.addEventListener('mouseover', (event)=> {
        if(event.target.id === 'weather-refresh') {
            mouseOver = true;

            const refreshWeatherBtn = document.getElementById('weather-refresh');
            
            refreshWeatherBtn.textContent = '↻';
            
            const refreshAnimation1 = setTimeout(()=> {            /*for pc setInterval()*/
                if (mouseOver === false) clearInterval(refreshAnimation1)
                refreshWeatherBtn.textContent = '⟳';
            }, 500)
        
            const refreshAnimation2 = setTimeout(()=> {            /*for pc setInterval()*/
                if (mouseOver === false) clearInterval(refreshAnimation2)
                refreshWeatherBtn.textContent = '↻';
            }, 1000)
        }

        

    });

    document.addEventListener('mouseout', (event)=> {
        if(event.target.id === 'weather-refresh') mouseOver = false
    })
})()





async function getWeatherForecast() {
    const location = getLatlong();   /*add await */
    const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${location[0]}&lon=${location[1]}&appid=df933d2878900bdaa697768d49d7372e&units=metric`)
    const data = await response.json();
    console.log(data.list[3].dt_txt);
}



getWeatherForecast();
