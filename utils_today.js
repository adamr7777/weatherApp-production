
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



async function getWeatherData() {   //API///////////////////////////////////
    try {
        const location = await getLatlong();  
        const devUrl = 'http://localhost:5000/api/weather-today'; //url for dev
        const backendApiWeatherToday = 'https://weatherapp-backend-cdsz.onrender.com/api/weather-today'; 
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({lat: location[0], lon: location[1]})
        };

        const res = await fetch(backendApiWeatherToday, options); 
        const data = await res.json();      
        const iconString = `http://openweathermap.org/img/wn/${data.data.weather[0].icon}@2x.png`
        return [Math.round(data.data.main.temp), iconString, data.data.name, data.data.weather[0].description];
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


async function getRenderImg() {     //API///////////////////////////////////
    try {
        const weatherData = await getWeatherData();
        const timeOfDay = checkDay();
        const devUrl = 'https:/localhost:5000/api/random-image'; //url for dev
        const backendApiImgUrl = 'https:/weatherapp-backend-cdsz.onrender.com/api/random-image'; 
        const weather = weatherData[3];
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({timeOfDay, weather})
        };

        const res = await fetch(backendApiImgUrl, options);
        const data = await res.json();
        
        document.getElementById('img-cont').innerHTML = `<img class='img' src='${data.data.urls.regular}'/>`;
        document.getElementById('author-pic').textContent = `by ${data.data.user.first_name} ${data.data.user.last_name}`;
    } 

    catch(error) {
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



