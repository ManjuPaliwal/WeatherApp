
const input = document.getElementById('input');
const active = document.querySelector('.active');
const locationBtn = document.querySelector('#btn');

let api
const apiKey = 'Your-Api-Key';
//Above enter your own api key;
// you can api key by sigup in openWeathermap api website it after signUpit will activate in 2 hrs..
input.addEventListener('keyup',function(e){
    if(e.key ==='Enter'&&input.value!=''){
        requestApi(input.value);
active.classList.add('pending');
    }
})

locationBtn.addEventListener('click',()=>{
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(success,error);
    }
})

function success(position){
    const {latitude,longitude}=position.coords;
    api=`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&log=${longitude}&units=metric&appid=${apiKey}`;
    fetchData();
}
function error(error){
    active.innerText=error.message;
    active.classList.replace('pending','error');
}
function requestApi(city){
    api = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
fetchData();

}

function fetchData(){
    fetch(api).then(response=>response.json()).then(result=>weatherDetails(result));
}


function weatherDetails(result){

if(result.cod=='404'||result.cod=='400'){
    active.classList.add('error');
    active.innerText=result.message;
    console.log('error');

}else{
    const searchDiv = document.querySelector('.searchDiv');
    searchDiv.style.display='none';
    console.log(result);
    const city = result.name;
    const country = result.sys.country;
    const {description}= result.weather[0];
    const{feels_like,temp,humidity}=result.main;
        const weatherDiv = document.querySelector('.weatherDiv');
        weatherDiv.style.display='flex';
        weatherDiv.querySelector('.temp .num').innerHTML=Math.floor(temp);
        weatherDiv.querySelector('.place span').innerHTML=`${city}, ${country}`;
        weatherDiv.querySelector('.temp .num-2').innerHTML=Math.floor(feels_like);
        weatherDiv.querySelector('.weatherType span').innerHTML=description;
        weatherDiv.querySelector('.humidity span').innerHTML=humidity;

    const arrow = document.querySelector('.fa-arrow-left');
    arrow.style.visibility="visible";

    arrow.addEventListener('click',function(){
    searchDiv.style.display='flex';
    weatherDiv.style.display='none';
    arrow.style.visibility="hidden";
active.classList.remove('pending','error');
       
    })
}
    
}

