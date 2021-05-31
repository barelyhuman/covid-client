import React, { useEffect, useState, useCallback } from 'react';
import { formatNumber } from '../lib/format-number';
import API from '../services/api';

const CountryBasedData = (props) => {
  const [allData, setAllData] = useState([]);
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const limit = 12;
  const [searchTerm, setSearchTerm] = useState('');

  const fetchData = useCallback(() => {
    return API.fetchByCountry().then((data) => {
      if (!data) {
        data = [];
      }
      setTotalPages(Math.round(data.length / limit));
      setAllData(data);
      setData(data);
    });
  }, []);

  useEffect(() => {
    setInterval(() => fetchData(), 61000);
    fetchData();
  }, [fetchData]);

  useEffect(() => {
    if (searchTerm) {
      const filteredData = allData.filter((item) => {
        return (
          item.country.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1
        );
      });
      setData(filteredData);
      setPage(1);
      setTotalPages(Math.round(filteredData.length / limit));
    } else {
      setData(allData);
      setTotalPages(Math.round(allData.length / limit));
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
  };

  return (
    <div className="">
      <div>
        <form className="">
          <input
            className="w-100"
            type="text"
            onKeyUp={(e) => setSearchTerm(e.target.value)}
            placeholder="Search..."
          />
        </form>
      </div>
      <div className="">
        {window().map((dataItem) => (
          <div key={dataItem.country}>
            <div className="flex flex-col">
              <h3 className="">{dataItem.country}</h3>
              <div className="flex flex-wrap justify-space-between align-center">
                <div className="m-sm">
                  <p>
                    <strong className="text-secondary">Cases </strong>
                    <br />
                    {formatNumber(dataItem.cases)}
                  </p>
                </div>
                <div className="m-sm">
                  <p>
                    <strong className="text-secondary">Cases Today </strong>
                    <br />
                    {formatNumber(dataItem.todayCases)}
                  </p>
                </div>
                <div className="m-sm">
                  <p>
                    <strong className="text-secondary">Deaths </strong>
                    <br />
                    {formatNumber(dataItem.deaths)}
                  </p>
                </div>
                <div className="m-sm">
                  <p>
                    <strong className="text-secondary">Deaths Today </strong>
                    <br />
                    {formatNumber(dataItem.todayDeaths)}
                  </p>
                </div>
                <div className="m-sm">
                  <p>
                    <strong className="text-secondary">Recovered </strong>
                    <br />
                    {formatNumber(dataItem.recovered)}
                  </p>
                </div>
                <div className="m-sm">
                  <p>
                    <strong className="text-secondary">Critical </strong>
                    <br />
                    {formatNumber(dataItem.critical)}
                  </p>
                </div>
              </div>
            </div>
            <hr />
          </div>
        ))}
      </div>
      <div className="mt-2">
        <div className="flex align-center justify-center">
          <div
            className="m-sm cursor-pointer"
            onClick={() => handlePageChange(-1)}
          >
            <i className="gg-chevron-left"></i>
          </div>
          <div className="m-sm " onClick={() => setPage(page)}>
            {page}/{totalPages}
          </div>
          <div
            className="m-sm cursor-pointer"
            onClick={() => handlePageChange(1)}
          >
            <i className="gg-chevron-right"></i>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CountryBasedData;
