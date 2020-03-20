import React, { useEffect, useState } from 'react';
import Centered from './Centered';
import API from '../services/api';
import { Pagination } from 'baseui/pagination';
import { Input } from "baseui/input";




import { Table } from "baseui/table";

const CountryBasedData = (props) => {
  const [allData, setAllData] = useState([]);
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const limit = 10;
  const [tableLoading, setTableLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const fetchData = () => {
    setTableLoading(true);
    API.fetchByCountry().then(data => {
      if (!data) {
        data = [];
      }
      const formattedData = data.map(item => {
        return [
          item.country,
          item.cases,
          item.todayCases,
          item.deaths,
          item.todayDeaths,
          item.critical,
          item.recovered
        ];
      });

      setAllData(formattedData);
      setData(formattedData);
      setTimeout(()=>setTableLoading(false),1000);
    });
  }

  useEffect(() => {
    setInterval(() => fetchData(), 61000);
    fetchData();
  }, []);

  useEffect(() => {
    setTableLoading(true);
    if (searchTerm) {
      const filteredData = allData.filter(item => {
        return item[0].toLowerCase().indexOf(searchTerm.toLowerCase()) > -1
      });
      setData(filteredData)
      setPage(1);
    } else {
      setData(allData);
    }
    setTimeout(()=>setTableLoading(false),1000);
  }, [allData, searchTerm]);

  const handlePageChange = (nextPage) => {
    if (nextPage < 1) {
      return;
    }
    if (nextPage > Math.ceil(data.length / limit)) {
      return;
    }
    setPage(nextPage);
  };

  const window = () => {
    const min = (page - 1) * limit;
    return data.slice(min, min + limit);
  };


  const columns = ['Country',
    'Cases',
    'Cases Today',
    'Deaths',
    'Deaths Today',
    'Critical',
    'Recovered',];

  return <Centered>
    <div>
      <Input
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
        placeholder="Search Country"
      ></Input>
      <Table
        columns={columns}
        data={window()}
        isLoading={tableLoading}
      />
      <Pagination
        currentPage={page}
        numPages={Math.ceil(data.length / limit)}
        onPageChange={({ nextPage }) => handlePageChange(nextPage)}
      />
    </div>
  </Centered>

};

export default CountryBasedData;
