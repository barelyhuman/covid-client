import React, { useEffect, useState } from 'react';

import API from '../services/api.js';

const OverallData = (props) => {
  const [data, setData] = useState({});

  const fetchData = () => {
    API.fetchAll().then((data) => {
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
    <div className="flex justify-space-between text-center">
      <div className="">
        <div className="">
          <h3 className="">Total Cases</h3>
          <p>{data.cases}</p>
        </div>
      </div>
      <div className="">
        <div className="">
          <h3 className="">Total Deaths</h3>
          <p>{data.deaths}</p>
        </div>
      </div>

      <div className="">
        <div className="">
          <h3 className="">Total Recovered</h3>
          <p>{data.recovered}</p>
        </div>
      </div>
    </div>
  );
};

export default OverallData;
