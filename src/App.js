import { useState } from 'react'


function App() {

  const [city, setCity] = useState('')
  const [details, setDetails] = useState({})
  const [loading, setLoading] = useState(false)

  const fetchWeather = async (e) => {
    e.preventDefault()

    setLoading(true)

    try {
      const res = await fetch(` https://api.weatherapi.com/v1/current.json?key=${process.env.REACT_APP_API_KEY}&q=${city}`)
      const data = await res.json()

      if (data.error) {
        setLoading(false)
        throw new Error("Failed to fetch weather data")
      }
     
      setDetails(data)
      setLoading(false)
    }
    catch (err) {
      setLoading(false)
      console.log(err)
      setDetails({})
      window.alert("Failed to fetch weather data")
    }


  }

  return (
    <div className='weather-app-wrapper'>

      <form onSubmit={fetchWeather}>
        <input type="text" value={city} onChange={(e) => setCity(e.target.value)} placeholder='Enter city name' required />
        <button>Search</button>
      </form>

      {loading && <p>Loading data...</p>}

      {Object.keys(details).length > 0 && !loading && (
        <div className='weather-cards'>

          <div className='weather-card'>
            <h4>Temperature</h4>
            <p>{details.current.temp_c}°C</p>
          </div>

          <div className='weather-card'>
            <h4>Humidity</h4>
            <p>{details.current.humidity}%</p>
          </div>

          <div className='weather-card'>
            <h4>Condition</h4>
            <p>{details.current.condition.text}</p>
          </div>

          <div className='weather-card'>
            <h4>Wind Speed</h4>
            <p>{details.current.wind_kph} kph</p>
          </div>

        </div>
      )}

    </div>
  );
}

export default App;
