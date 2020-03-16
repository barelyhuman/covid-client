import React, { useEffect, useState } from 'react';
import Centered from './Centered';
import {
  Card,
  StyledBody,
} from "baseui/card";

import API from '../services/api.js';


const OverallData = (props) => {
  const [data, setData] = useState({});

  const fetchData = () => {
    API.fetchAll().then(data => {
      setData(data);
    });
  };

  useEffect(() => {
    setInterval(()=>fetchData(),61000);
    fetchData();
  }, []);

  return (
    <Centered>
      <div>
        <Card>
          <StyledBody>
            <h3>Cases
              <small><br/>{data.cases}</small>
            </h3>
          </StyledBody>
        </Card>
      </div>
      <div>
        <Card>
          <StyledBody>
            <h3>Deaths
              <small><br/>{data.deaths}</small>
            </h3>
          </StyledBody>
        </Card>
      </div>
      <div>
        <Card>
          <StyledBody>
            <h3>Recovered
              <small><br/>{data.recovered}</small>
            </h3>
          </StyledBody>
        </Card>
      </div>
    </Centered>
  )
};

export default OverallData;
