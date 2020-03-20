import React from 'react';
import OverallData from './components/OverallData';
import CountryBasedData from './components/CountryBasedData';

import 'uikit/dist/css/uikit.min.css';
import 'uikit/dist/js/uikit.min.js';
import 'uikit/dist/js/uikit-icons.min.js';


export default function Hello() {
  return (
    <div className="uk-base uk-background-default">
        <h1 className="uk-heading-small uk-text-center">
          Covid-19 Tracker
        </h1>
        <hr className="uk-divider-icon"/>
        <OverallData />
        <hr className="uk-divider-icon"/>
        <CountryBasedData />
    </div>
  );
}
