import React from 'react';
import '../style/Weather.css'

export default function WeatherInfo(props) {
    const{temp,humidity,city,desc}=props.data;
    return (
       <React.Fragment>
           <div className="weather-description">
            <div className="py-5">
                <i className="wi wi-day-sunny display-1"></i>
            </div>   
            <div><h2>{city}</h2></div>
            <div><h2>{desc}</h2></div>
            <div>Tempreature : {temp}&deg;C</div> 
            <div>Hemadity : {humidity}%</div>         

           </div>
         
       </React.Fragment>
    )
}
