import React from 'react';
import OverallData from './components/OverallData';
import CountryBasedData from './components/CountryBasedData';

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
