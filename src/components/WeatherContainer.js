import React, { useState } from 'react';
import '../style/Weather.css';
import WeatherInfo from '../components/WeatherInfo';


export default function WeatherContainer() {
    const API_KEY ='1d20f2b43484ca794e19ce6a100cfafd';
    const[searchQuary,setsearchQuary]=useState();
    const[weatherData,setweatherData]=useState({
        temp :null,
        humidity :null,
        desc : null,
        city :undefined,
    });
    const[isvalidZipCode,setvalidZipCode]=useState(true);

  
    function updateSearchQuary(event){
        let zipCode =event.target.value;
        let isvalid = validateZipCode(zipCode);
        setsearchQuary(zipCode);

        if(isvalid ||zipCode==="" || isvalid.legth ===5){
            setsearchQuary(zipCode);
            setvalidZipCode(true);
        }else{
            setvalidZipCode(false);
        }

        
    }

    function validateZipCode(zipCode){
        let regex =/[0-9]{5}/;
        return regex.test(zipCode);
    }

    function getWeatherData(){
        if(!isvalidZipCode || searchQuary === ''){
            setvalidZipCode(false);
            return;
        }

            fetch(`https://api.openweathermap.org/data/2.5/weather?zip=${searchQuary},LK&appid=${API_KEY}`)
            .then(Response=>Response.json())
            .then(data => setweatherData({
                temp:convertTempreature(data.main.temp),
                humidity:data.main.humidity,
                desc:data.weather[0].description,
                city:data.name
            }));
    }
    function convertTempreature(temp){
        return(temp-273.15).toFixed(0) ;
    }

    return (
        <section className="weather-container">
            <header className="weather-head">
                <h3>WEATHER REPORT</h3>
                <div>
                    <input className="search-input" placeholder="Zip Code" onChange={updateSearchQuary} maxLength="5"/>
                    <button className="material-icons" onClick={getWeatherData}>search</button>
                </div>
            </header>
            <p className="error">{isvalidZipCode ? '' : 'Invalid Zip Code'}</p>
            <section className="weather-info">
                    {weatherData.temp=== null ?(
                        <p>No Weather to Display<i className="material-icons">wb_sunny </i></p>
                    ):
                    <WeatherInfo data={weatherData}/>
                    
                }
            </section>
        </section>
    )
}

