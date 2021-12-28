import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";

// api
import portmanteauAPI from "../api/portmanteauAPI"


// components
import CapsuleDetails from "../components/CapsuleDetails";

const CapsuleDetailPage = (props) => {
  // api key MOVE THIS LATER!!!
  const weatherApi = {
  key: "7ba948d2ea39b8159d47dc168b664752",
  base: "https://api.openweathermap.org/data/2.5/"
  }

  // states
  const [capsuleDetails, setCapsuleDetails] = useState(null);
  const [city, setCity] = useState(null);
  const [weatherInfo, setWeatherInfo] = useState({});

  // router props
  const params = useParams()

  // effects

   const getWeather = async () => {
      await fetch(`${weatherApi.base}weather?q=${city}&units=imperial&APPID=${weatherApi.key}`)
            .then(response => response.json())
            .then(result => {
               setWeatherInfo(result);
            });
      document.getElementById("city-info").value = null
   }


  // capsule details
  useEffect(()=> {
    const getCapsuleDetails = async () => {
      const data = await portmanteauAPI.fetchCapsuleDetails(params.capsuleID)
      if (data) {
        setCapsuleDetails(data)
      }
    }
    getCapsuleDetails();
  }, [])


  // renders
  return (
    <div>
      
      
      
      <div className="header-buttons">
        {capsuleDetails && <Link to={`/capsule-list/${params.capsuleID}/update`}><button >Update Capsule Info</button></Link>}
        {capsuleDetails && <Link to={`/capsule-list/${params.capsuleID}/item-detail/create`}><button >Add an Item</button></Link>}
        {capsuleDetails && <Link to={`/capsule-list/${params.capsuleID}/delete`}><button >Delete this Capsule</button></Link>}
      </div>

      <h2>Capsule Details</h2>

      <div id="weather-info">
        <hr/>
        <p>Get weather info:</p>
        <input id="city-info" type="text" placeholder="type city here" onChange={(evt) => setCity(evt.target.value)} />
        <button type="submit" onClick={getWeather}>Submit</button>
        {(typeof weatherInfo.main != "undefined") ? (
        <div>
          <div className="location">{weatherInfo && weatherInfo.name}</div>
          <div className="weather-info"></div>
          <div className="temp">{weatherInfo && Math.round(weatherInfo.main.temp)}°F</div>
          <div className="weather">{weatherInfo && weatherInfo.weather[0].main}</div>
        </div>  
        ) : ("")}
        <hr />
      </div>
      
      { capsuleDetails && <CapsuleDetails capsuleDetails={capsuleDetails}/> }


    </div>
  )
}

export default CapsuleDetailPage;