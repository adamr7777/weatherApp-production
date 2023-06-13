
import {renderTodayWeather, updateInfo, getRenderImg, refreshWeatherHandle, todayHandle} from './utils_today.js';
import {refreshForecastHourlyHandle, refreshForecastWeeklyHandle, renderWeek} from './utils_week.js';




(function mainLoop() {
    const btnToday = document.getElementById('btn-today');
    btnToday.disabled = true;
    
    document.addEventListener('click', (event)=> {
        if (event.target.id === 'btn-today') {
            todayHandle();
            renderTodayWeather();
            getRenderImg();
            
        };

        if (event.target.id === 'btn-week') {
            document.getElementById('btn-today').disabled = false;
            document.getElementById('btn-week').disabled = true;
            document.getElementById('big-div').innerHTML = ``;                                                          
            renderWeek();
        };

      

        if (event.target.id === 'refresh-btn') getRenderImg();
        
        
        if(event.target.id === 'weather-refresh') refreshWeatherHandle();

        if (event.target.id === 'forecast-h-refresh') refreshForecastHourlyHandle();

        if (event.target.id === 'forecast-d-refresh') refreshForecastWeeklyHandle();
        
    });

    
        updateInfo(); 
        renderTodayWeather();        
        getRenderImg();
})();




(function animateCircle(){
    let mouseOver = false;

    document.addEventListener('mouseover', (event)=> {
        if(event.target.id === 'weather-refresh') {
            mouseOver = true;

            const refreshWeatherBtn = document.getElementById('weather-refresh');
            
            refreshWeatherBtn.textContent = '↻';
            
            const refreshAnimation1 = setTimeout(()=> {            
                if (mouseOver === false) clearInterval(refreshAnimation1)
                refreshWeatherBtn.textContent = '⟳';
            }, 500)
        
            const refreshAnimation2 = setTimeout(()=> {            
                if (mouseOver === false) clearInterval(refreshAnimation2)
                refreshWeatherBtn.textContent = '↻';
            }, 1000);
        };

        if(event.target.id === 'forecast-h-refresh') {
            mouseOver = true;

            const refreshWeatherBtn = document.getElementById('forecast-h-refresh');
            
            refreshWeatherBtn.textContent = '↻';
            
            const refreshAnimation1 = setTimeout(()=> {            
                if (mouseOver === false) clearInterval(refreshAnimation1)
                refreshWeatherBtn.textContent = '⟳';
            }, 500);
        
            const refreshAnimation2 = setTimeout(()=> {        
                if (mouseOver === false) clearInterval(refreshAnimation2)
                refreshWeatherBtn.textContent = '↻';
            }, 1000);
        };

        if(event.target.id === 'forecast-d-refresh') {
            mouseOver = true;

            const refreshWeatherBtn = document.getElementById('forecast-d-refresh');
            
            refreshWeatherBtn.textContent = '↻';
            
            const refreshAnimation1 = setTimeout(()=> {            
                if (mouseOver === false) clearInterval(refreshAnimation1)
                refreshWeatherBtn.textContent = '⟳';
            }, 500)
        
            const refreshAnimation2 = setTimeout(()=> {       
                if (mouseOver === false) clearInterval(refreshAnimation2)
                refreshWeatherBtn.textContent = '↻';
            }, 1000);
        };

        

    });

    document.addEventListener('mouseout', (event)=> {
        if(event.target.id === 'weather-refresh') mouseOver = false;

        if(event.target.id === 'forecast-h-refresh') mouseOver = false;

        if(event.target.id === 'forecast-d-refresh') mouseOver = false;

        
    });
})();
















