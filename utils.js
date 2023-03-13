
export {getTime, getLatlong, getWeatherData, renderTodayWeather, updateInfo, checkDay, getRenderImg, refreshWeatherHandle, getQuote, renderWeek};


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
    // console.log(hours);
    return hours >= 6 && hours < 12? 'morning': hours >= 12 && hours < 18? 'day': hours >= 18 && hours < 23? 'evening': 'night';
}



/*async*/ function getLatlong() {     
    // const position = await new Promise((resolve, reject)=> {                /*comment all out, remove async  */
    //     navigator.geolocation.getCurrentPosition(resolve,reject)
    // });
    // return [position.coords.latitude, position.coords.longitude];       
    return [51.50722, -0.1275]                   /*for the safe version */
}



async function getWeatherData() {
    const location = /*await*/ getLatlong();  /*fro the safe version remove await */
   
    const response = await fetch(`https://apis.scrimba.com/openweathermap/data/2.5/weather?lat=${location[0]}&lon=${location[1]}&units=metric`);
    const data = await response.json();         /*catch error */
    // console.log(data)
    // console.log(data.weather[0].description);
    const iconString = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`
    // console.log(data);
    return [Math.round(data.main.temp), iconString, data.name, data.weather[0].description];
}


async function renderTodayWeather() {
    const timeData = getTime();
    const weatherData = await getWeatherData();
    
    const mainHtml = new Array(2).fill('0')     /*----why all this trouble though */
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
    const api = 'https://api.unsplash.com/'  /*photos/?client_id=YOUR_ACCESS_KEY */ /*/photos/random */
    const weatherData = await getWeatherData();
    const timeOfDay = checkDay();
    const randomImg = `https://api.unsplash.com/photos/random/`         //until confirmed your acc, use scrimba api
    const key = '&client_id=XYMe11wvf2H6WeG3VzMj5QFbkZlplD0WCK2BCYPGIfI'
    const topic = `?query=${weatherData[3]},${timeOfDay},nature&orientation=portrait`
    // const response = await fetch(randomImg + topic + key);
    // const data = await response.json();
    
    // document.getElementById('img-cont').innerHTML = `<img class='img' src='${data.urls.regular}'/>`
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
}




async function updateInfo() {
    const weatherData = await getWeatherData(); 

    const updateTime = setInterval(()=> {
        if(document.getElementById('time')) {
            document.getElementById('time')
                .textContent = getTime().time;
        }
    }, 1000)  

    const updateWeather = setInterval(()=> {
        document.getElementById('weather-text')
            .textContent = weatherData[0];  
       
        document.getElementById('weather-img')
            .src = weatherData[1];
        // console.log('working');
            
    }, 900000) /*15min 90000 */

    const updateImg = setInterval(()=>{
        getRenderImg();
    }, 900000) /*15min 900000 */

    const updateForecast = setInterval(()=>{
        renderWeek();
    },3600000)      /*1h 3600000*/      /*perhaps set it to 0.5hs*/

} 


async function getQuote() {
    // const now = new Date();
    // const nowDate = parseInt(`this is date:${now.getMonth()}${now.getDate()}`)
    // let array = [];
    // const response = await fetch(`http://quotes.rest/qod.json?category=inspire&maxlength=25`); 
    // const data = await response.json();
    // // console.log(data.contents.quotes[0].quote);
    // // array.push({quote: data[0].quote, date: nowDate})
    // data[0].quote;
    // console.log(array);
    
    return 'something meaningful';
}



async function getWeatherForecastData() {
    const location = await getLatlong();   /*for the safe version remove await */
    const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${location[0]}&lon=${location[1]}&appid=df933d2878900bdaa697768d49d7372e&units=metric`)
    const data = await response.json();
    // const nightForecast = data.list.filter((item)=> {
    //     const time = item.dt_txt.slice(-8);
    //     switch(time) {
    //         case '00:00:00':
    //             return
    //     }
          
    // })
    const nightForecast = data.list.filter((item)=> {
        const time = item.dt_txt.slice(-8);
        return time === '21:00:00';
         
          
    })

    const dayForecast = data.list.filter((item)=> {
        const time = item.dt_txt.slice(-8);
        return time === '12:00:00';
    })

    // const x = array.filter((num)=> {
    //     if (num === 5) 
    // })
    
    // const o = data.list.map((item)=> {
    //     return item.dt_txt;
    // })
    
    // console.log(o);
    // console.log(`night forecast:`);
    // console.log(nightForecast);
    // console.log(`day forecast:`);
    // console.log(dayForecast);
    // console.log(data.list[0]);

    let fiveDaysForecastArray = [];
    for(let night of nightForecast) {
        for(let day of dayForecast) {
            if (night.dt_txt.slice(0, 10) === day.dt_txt.slice(0, 10)) {
                const dayIcon = `http://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`;
                const nightIcon = `http://openweathermap.org/img/wn/${night.weather[0].icon}@2x.png`
                fiveDaysForecastArray.push({
                    dayTemp: day.main.temp, 
                    nightTemp: night.main.temp, 
                    dayIcon: dayIcon, 
                    nightIcon: nightIcon, 
                    dayDate: day.dt_txt, 
                    nightDate: night.dt_txt
                });
            }
        }
    }
    
    // console.log(fiveDaysForecastArray);
    return {every3Hour: data.list.slice(0,3), fiveDays: fiveDaysForecastArray};
}



async function getWeatherForecastHtml() {
    const weatherForecastObject = await getWeatherForecastData();
    // console.log(weatherForecastObject);
    return weatherForecastObject.every3Hour.map((item)=> {
        return `
            <div class='hourly-forecast-div'>
                <h4>${item.dt_txt.slice(10, -3)}</h4>
                <img src='http://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png'/>
                <h4>${Math.round(item.main.temp)}°</h4>
                <h4>💧${item.main.humidity}%</h4>
            </div>`
    }).join('');
}



async function renderWeek() {
    const quoteText = await getQuote();
    // console.log(quoteText);
    const weatherForecastHtml = await getWeatherForecastHtml();
    document.getElementById('big-div')
        .innerHTML = `
        <div class='week-main-div' id='week-main-div'>
            <div class='quote-div' id='quote-div'>
                <p class='discription'>Here's a fortune cookie for today:</p>
                <h4 class='quote'>${quoteText}</h4>
            </div>
            <div class='forecast-h-div' id='forecast-h-div'>
                ${weatherForecastHtml}
            </div>
        </div>`
}

