import {Climate} from './data/climate.js';
async function getData(cityName){
    let internetOn = true;
    try{
        const APIkey = '2e2981eb1f717465bc03166123dbc471';
        let data = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${APIkey}`).catch((res)=>{internetOn = false;erorMsgHtml('Please Turn On The Internet')})
        let jsonData = await data.json();
        const c1 = new Climate(jsonData);
        return c1;
    }
    catch(e){
        if(internetOn){
            erorMsgHtml('Please enter the city name correctly');
        }
        console.clear();   
    }
}


function renderWeather(){
    
    document.querySelector('.search-button')
        .addEventListener('click',()=>{
            loadCimateHtml();
    })
    document.querySelector('.search-bar')
        .addEventListener('keydown',(event)=>{
            if(event.key == 'Enter'){
                loadCimateHtml();
            }
    });
}
renderWeather();


function getCityNameHtml(){
    const cityName = document.querySelector('.search-bar').value;
    return cityName;
}

function loadCimateHtml(){
    let weatherHtml = '';
    const city = getCityNameHtml();
    if(city){
        const data = getData(city);
        data.then((res)=>{
            weatherHtml +=`
            <header>
                <input type="text" class="search-bar" placeholder = 'Enter the city'>
                <button class="search-button">
                    <img src="images/search.png" alt="">
                </button>
            </header>
            <div class="error-msg"></div>
            <section class="middle-section">
                <div class="weather-image">
                    <img src="images/${res.mainImg}.png" alt="">
                </div>
                <div class="weather-temp">
                    ${res.temp}&deg;c
                </div>
                <div class="weather-location">
                    ${res.cityName}
                </div>
            </section>
            <section class="footer">
                <div class="humidity">
                    <div class="humidity-img">
                        <img src="images/humidity.png" alt="">
                    </div>
                    <div class="humidity-percent">
                        ${res.humidity}&percnt;
                    </div>
                    <div>Humidity</div>
                </div>
                <div class="wind">
                    <div class="wind-img">
                        <img src="images/wind.png" alt="">
                    </div>
                    <div class="wind-speed">
                        ${res.windSpeed} km/h
                    </div>
                    <div>Wind Speed</div>
                </div>
            </section>
            `;
            document.querySelector('.weather-card').innerHTML = weatherHtml;
            toastMaker(res);
            renderWeather();
        })
        .catch(()=>{})
    }
    else{
        
        erorMsgHtml('Please enter the city name')
    }
        
}


function toastMaker(res){
    let toast = document.querySelector('.toast');
    if(res.temp >= 35){
        
        
        toast.innerHTML = `<div class='toaster'>Please Drink Plenty of Water</div>`;
        
    }
    if(res.mainImg == 'rain'){
        toast.innerHTML = `<div class='toaster'>Please Carry an Umbrella</div>`
    }
    if(res.mainImg == 'snow' || res.temp < -10){
        toast.innerHTML = `<div class='toaster'>Please Wear a coat</div>`
    }
    setTimeout(()=>{
        document.querySelector('.toast').remove();
    },6000);
}   

function erorMsgHtml(msg){
    const shakeAnimationSearch = document.querySelector('.search-bar');
    shakeAnimationSearch.classList.add('error');
    setInterval(()=>{
        shakeAnimationSearch.classList.remove('error');
    },1000);
    document.querySelector('.error-msg')
        .innerHTML = msg;
    
}