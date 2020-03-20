import React, { useEffect, useState } from 'react';

import API from '../services/api.js';


const OverallData = (props) => {
  const [data, setData] = useState({});

  const fetchData = () => {
    API.fetchAll().then(data => {
      if (!data) {
        data = {};
      }
      setData(data);
    });
  };

  useEffect(() => {
    setInterval(() => fetchData(), 61000);
    fetchData();
  }, []);

  return (
    <div className="uk-container">
      <div className="uk-margin" data-uk-grid>
      <div className="uk-width-1-3@m uk-width-1-1@s">
        <div className="uk-card uk-card-body">
          <h3 className="uk-card-title">
            Total Cases
      </h3>
          <p>
            {data.cases}
          </p>
        </div>
      </div>
      <div className="uk-width-1-3@m uk-width-1-1@s">
        <div className="uk-card uk-card-body">
          <h3 className="uk-card-title">
            Total Deaths
      </h3>
          <p>
            {data.deaths}
          </p>
        </div>
      </div>

      <div className="uk-width-1-3@m uk-width-1-1@s">
        <div className="uk-card uk-card-body">
          <h3 className="uk-card-title">
            Total Recovered
      </h3>
          <p>
            {data.recovered}
          </p>
        </div>
      </div>
    </div>
    </div>
  )
};

export default OverallData;
