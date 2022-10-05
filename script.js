var timeEl = document.getElementById('time');
var dateEl = document.getElementById('date');
var currentWeatherItemsEl = document.getElementById('current-weather-items');
var timezone = document.getElementById('time-zone');
var countryEl = document.getElementById('country');
var weatherForecastEl = document.getElementById('weather-forecast');
var currentTempEl = document.getElementById('current-temp');


const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

const API_KEY = '073bbc27e735a8958d7630483943b6af';
setInterval(() => {
    const time = new Date();
    const month = time.getMonth();
    const date = time.getDate();
    const day = time.getDay();
    const hour = time.getHours();
    const hoursIn12HrFormat = hour >= 13 ? hour %12 : hour
    const minutes = time.getMinutes();
    const ampm = hour >= 12 ? 'PM' : 'AM'

    timeEl.innerHTML = (hoursIn12HrFormat < 10? '0' + hoursIn12HrFormat : hoursIn12HrFormat) + ':' + (minutes < 10? '0' + minutes : minutes) + ' ' + `<span id="am-pm">${ampm}</span>`

    dateEl.innerHTML = days[day] + ', ' + date + ' ' + months[month]

}, 1000);


getWeatherData()
function getWeatherData(){
    navigator.geolocation.getCurrentPosition((success) => {
            let {latitude, longitude} = success.coords;
                fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&exclude=hourly,minutely&units=metric&appid=${API_KEY}`).then(res => res.json()).then(data => {
                console.log(data);
                showWeatherData(data);
            })
        
    })
}
function showWeatherData(data){
    let {humidity, pressure}=data.list[0].main;
    let {sunrise, sunset}=data.city;

    timezone.innerHTML = data.city.name;
    countryEl.innerHTML = data.city.coord.lat + 'N ' + data.city.coord.lon + 'E'


    currentWeatherItemsEl.innerHTML = 
    `<div class="weather-item">
        <div>Humidity</div>
        <div>${humidity}%</div>
    </div>
    <div class="weather-item">
        <div>Pressure</div>
        <div>${pressure}</div>
    </div>

    <div class="weather-item">
        <div>Sunrise</div>
        <div>${window.moment(sunrise*1000).format('HH:mm a')}</div>
    </div>
    <div class="weather-item">
        <div>Sunset</div>
        <div>${window.moment(sunset*1000).format('HH:mm a')}</div>
    </div>`;

    let otherDayForcast = ''
    data.list.forEach((data, idx) => {
        if(idx == 0){
            currentTempEl.innerHTML = `
            <img src="http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" alt="weather-icon" class="w-icon">
            <div class="other">
                <div class="day">${window.moment(data.dt*1000).format('ddd')}</div>
                <div class="temp">Day - ${data.main.temp_max}&#176; c</div>
                <div class="temp">Night - ${data.main.temp_min}&#176; c</div>
            </div>
            `
        }
        if(idx == 1){
            currentTempEl.innerHTML = `
            <img src="http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" alt="weather-icon" class="w-icon">
            <div class="other">
                <div class="day">${window.moment(data.dt*1000).format('ddd')}</div>
                <div class="temp">Day - ${data.main.temp_max}&#176; c</div>
                <div class="temp">Night - ${data.main.temp_min}&#176; c</div>
            </div>
            `
        }
        if(idx==2){
            otherDayForcast += `
            <div class="weather-forecast-item">
                <div class="day">${window.moment(data.dt*1000).format('ddd')}</div>
                <img src="http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" alt="weather-icon" class="w-icon">
                <div class="temp">Day - ${data.main.temp_max}&#176; c</div>
                <div class="temp">Night - ${data.main.temp_min}&#176; c</div>
            </div>
            `
        }if(idx==10){
            otherDayForcast += `
            <div class="weather-forecast-item">
                <div class="day">${window.moment(data.dt*1000).format('ddd')}</div>
                <img src="http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" alt="weather-icon" class="w-icon">
                <div class="temp">Day - ${data.main.temp_max}&#176; c</div>
                <div class="temp">Night - ${data.main.temp_min}&#176; c</div>
            </div>
            `
        }if(idx==18){
            otherDayForcast += `
            <div class="weather-forecast-item">
                <div class="day">${window.moment(data.dt*1000).format('ddd')}</div>
                <img src="http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" alt="weather-icon" class="w-icon">
                <div class="temp">Day - ${data.main.temp_max}&#176; c</div>
                <div class="temp">Night - ${data.main.temp_min}&#176; c</div>
            </div>
            `
        }if(idx==26){
            otherDayForcast += `
            <div class="weather-forecast-item">
                <div class="day">${window.moment(data.dt*1000).format('ddd')}</div>
                <img src="http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" alt="weather-icon" class="w-icon">
                <div class="temp">Day - ${data.main.temp_max}&#176; c</div>
                <div class="temp">Night - ${data.main.temp_min}&#176; c</div>
            </div>
            `
        }if(idx==34){
            otherDayForcast += `
            <div class="weather-forecast-item">
                <div class="day">${window.moment(data.dt*1000).format('ddd')}</div>
                <img src="http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" alt="weather-icon" class="w-icon">
                <div class="temp">Day - ${data.main.temp_max}&#176; c</div>
                <div class="temp">Night - ${data.main.temp_min}&#176; c</div>
            </div>
            `
        }

    })

    weatherForecastEl.innerHTML = otherDayForcast;

}
