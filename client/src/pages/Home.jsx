import React, { useState, useEffect } from 'react';
import axios from 'axios';

import '../App.css';

function Home() {
  const [nasaData, setNasaData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load the API key from the environment variable
    const apiKey = process.env.REACT_APP_NASA_API_KEY;
    // const apiKey='CrQKvpxf05j5a88nWIREbIy1BTrS13Nb7acTNej6'
    console.log(apiKey)
    // NASA API endpoint
    const apiUrl = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}`;
    

    // Fetch NASA's Astronomy Picture of the Day
    axios
      .get(apiUrl)
      .then((response) => {
        // Set the NASA data in the state
        setNasaData(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching data from NASA API: ', error);
        setLoading(false);
      });
  }, []);

  return (
    <div className="home">
      <header className="home-header">
        <h2>NASA Image of the Day</h2>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <div className="nasa-container">
            <div className="nasa-data">
              <h2 className="nasa-title">{nasaData.title}</h2>
              <p className="nasa-date">Date: {nasaData.date}</p>
              
              <p className="nasa-explanation">{nasaData.explanation}</p>
              <p className="nasa-copyright">Copyright: {nasaData.copyright}</p>
            </div>
            <div className="nasa-image-container">
              <img src={nasaData.hdurl} alt="NASA APOD" className="nasa-image" />
            </div>
          </div>
        )}
      </header>
    </div>
  );
}

export default Home;
