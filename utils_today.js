
export {getTime, getLatlong, getWeatherData, renderTodayWeather, updateInfo, checkDay, getRenderImg, 
    refreshWeatherHandle, todayHandle};


function getTime() {
    const date = new Date;
    const hours = date.getHours() < 10? `0${date.getHours()}`: date.getHours();
    const minutes = date.getMinutes() < 10? `0${date.getMinutes()}`: date.getMinutes();
    const seconds = date.getSeconds() < 10? `0${date.getSeconds()}`: date.getSeconds();
    return {
        time: `${hours}:${minutes}:${seconds}`,
        hours: hours
    }
        
}

function checkDay() {
    const hours = getTime().hours;
    return hours >= 6 && hours < 12? 'morning': hours >= 12 && hours < 18? 'day': hours >= 18 && hours < 23? 'evening': 'night';
}



async function getLatlong() {   
    try {
        const position = await new Promise((resolve, reject)=> {        
            navigator.geolocation.getCurrentPosition(resolve,reject)
        });
        return [position.coords.latitude, position.coords.longitude];       
    }  

    catch(error) {
        alert(`An error occured: ${error}`);
    }
}



async function getWeatherData() {
    try {
        const WEATHER_API_URL = 'https://api.openweathermap.org/data/2.5/';
        const location = await getLatlong();  
        const response = await fetch(`${WEATHER_API_URL}weather?lat=${location[0]}&lon=${location[1]}&appid=df933d2878900bdaa697768d49d7372e&units=metric`);
        const data = await response.json();         
        const iconString = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`
        return [Math.round(data.main.temp), iconString, data.name, data.weather[0].description];
    }

    catch(error) {
        alert(`An error occured: ${error}`);
    }
};


async function renderTodayWeather() {
    const timeData = getTime();
    const weatherData = await getWeatherData();
    
    const mainHtml = new Array(2).fill('0')     
        .map((item, index)=> index === 0? 
        `<h1 id='time' class='time'>${timeData.time}</h1>`:
        `<div class='loc-weather' id='loc-weather'>
            <h2 class='loc-text'>${weatherData[2]}</h2>
            <div class='weather-cont'>
            <img id='weather-img' class='weather-img' src='${weatherData[1]}'/>
            <h2 id='weather-text'>${weatherData[0]}°</h2>
            <button class='weather-refresh' id='weather-refresh'>⟳</button>
        </div>
        </div>`).join('');

        document.getElementById('main-cont').innerHTML = mainHtml;
}


async function getRenderImg() {
    try {
        const UNSPLASH_API_KEY = import.meta.env.UNSPLASH_API_KEY;      /*check this */
        const weatherData = await getWeatherData();
        const timeOfDay = checkDay();
        const randomImg = `https://api.unsplash.com/photos/random/`        
        const key = '&client_id=XYMe11wvf2H6WeG3VzMj5QFbkZlplD0WCK2BCYPGIfI'
        const topic = `?query=${weatherData[3]},${timeOfDay},nature&orientation=portrait`
        const response = await fetch(randomImg + topic + key);
        const data = await response.json();
        
        document.getElementById('img-cont').innerHTML = `<img class='img' src='${data.urls.regular}'/>`
        document.getElementById('author-pic').textContent = `by ${data.user.first_name} ${data.user.last_name}`
    } 

    catch {
        alert(`An error occured: ${error}`);
    }
};


async function refreshWeatherHandle() {
    const weatherData = await getWeatherData(); 
    document.getElementById('loc-weather')
        .classList.add('blink');
    const removeBlink = setTimeout(()=> {
        document.getElementById('loc-weather')
            .classList.remove('blink');
    }, 500)
    document.getElementById('weather-text')
        .textContent = weatherData[0]; 
    document.getElementById('weather-img')
        .src = weatherData[1];
};


function todayHandle() {
    document.getElementById('btn-today').disabled = true;
    document.getElementById('btn-week').disabled = false;
    document.getElementById('big-div').innerHTML = `
        <div class='main-cont' id='main-cont'></div>
        <div class='img-cont' id='img-cont'></div>
        <button class='refresh-btn' id='refresh-btn' >Refresh</button>
        <p class='author-pic' id='author-pic'></p>
    `;
};



async function updateInfo() {
    const weatherData = await getWeatherData(); 

    const updateTime = setInterval(()=> {
        if(document.getElementById('time')) {
            document.getElementById('time')
                .textContent = getTime().time;
        }
    }, 1000);  

    const updateWeather = setInterval(()=> {
        document.getElementById('weather-text')
            .textContent = weatherData[0];  
       
        document.getElementById('weather-img')
            .src = weatherData[1];
        
            
    }, 900000) /*15min 90000 */

    const updateImg = setInterval(()=>{
        getRenderImg();
    }, 900000) /*15min 900000 */

    const updateForecast = setInterval(()=>{
        renderWeek();
    },3600000)      /*1h 3600000*/      
}; 



