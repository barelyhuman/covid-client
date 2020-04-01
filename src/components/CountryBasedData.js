import React, { useEffect, useState, useCallback } from 'react';
import API from '../services/api';

const CountryBasedData = (props) => {
  const [allData, setAllData] = useState([]);
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const limit = 12;
  const [searchTerm, setSearchTerm] = useState('');

  const fetchData = useCallback(() => {
    return API.fetchByCountry().then(data => {
      if (!data) {
        data = [];
      }
      setTotalPages(Math.round(data.length / limit));
      setAllData(data);
      setData(data);
    });
  }, [])

  useEffect(() => {
    setInterval(() => fetchData(), 61000);
    fetchData();
  }, [fetchData]);

  useEffect(() => {
    if (searchTerm) {
      const filteredData = allData.filter(item => {
        return item.country.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1
      });
      setData(filteredData)
      setPage(1);
      setTotalPages(Math.round(filteredData.length/limit))
    } else {
      setData(allData);
      setTotalPages(Math.round(allData.length/limit));
    }
  }, [allData, searchTerm]);

  const window = () => {
    const min = (page - 1) * limit;
    return data.slice(min, min + limit);
  };


  const handlePageChange = (direction) => {
    if (page + direction > totalPages || page + direction <= 0) {
      return false;
    } else {
      setPage(page + direction);
    }
  }



  return (
    <div className="uk-container">
      <div>
        <form className="uk-search uk-search-default uk-width-1-1 uk-margin">
          <span data-uk-search-icon></span>
          <input className="uk-search-input" type="search" onKeyUp={(e) => setSearchTerm(e.target.value)} placeholder="Search..." />
        </form>
      </div>
      <div className="uk-grid-medium" data-uk-grid>
        {window().map(dataItem => (
          <div key={dataItem.country} className="uk-width-1-3@m uk-width-1-1@s">
            <div className="uk-card uk-card-default uk-margin uk-card-body">
              <h3 className="uk-card-title">
                {dataItem.country}
              </h3>
              <div className="uk-grid-medium" data-uk-grid>
                <div className="uk-width-1-2@m uk-width-1-1@s">
                  <p>
                    <strong>Cases </strong>
                    <br />{dataItem.cases}
                  </p>
                </div>
                <div className="uk-width-1-2@m uk-width-1-1@s">
                  <p>
                    <strong>Cases Today </strong>
                    <br />{dataItem.todayCases}
                  </p>
                </div>
                <div className="uk-width-1-2@m uk-width-1-1@s">
                  <p>
                    <strong>Deaths </strong>
                    <br />{dataItem.deaths}
                  </p>
                </div>
                <div className="uk-width-1-2@m uk-width-1-1@s">
                  <p>
                    <strong>Deaths Today </strong>
                    <br />{dataItem.todayDeaths}
                  </p>
                </div>
                <div className="uk-width-1-2@m uk-width-1-1@s">
                  <p>
                    <strong>Recovered </strong>
                    <br />{dataItem.recovered}
                  </p>
                </div>
                <div className="uk-width-1-2@m uk-width-1-1@s">
                  <p>
                    <strong>Critical </strong>
                    <br />{dataItem.critical}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))
        }
      </div>
      <div>
        <ul className="uk-pagination uk-flex-center uk-margin-medium-top">
          <li><div className="uk-link" onClick={() => handlePageChange(-1)}><span data-uk-pagination-previous></span></div></li>
          <li><div className="uk-link uk-active" onClick={() => setPage(page)}>{page}/{totalPages}</div></li>
          <li><div className="uk-link" onClick={() => handlePageChange(1)}><span data-uk-pagination-next></span></div></li>
        </ul>
      </div>
    </div>
  );


};

export default CountryBasedData;
