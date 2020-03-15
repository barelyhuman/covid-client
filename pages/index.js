import { useEffect, useState } from "react"
import API from '../services/API';
import DynamicTable from '@atlaskit/dynamic-table';
import Button, { ButtonGroup } from '@atlaskit/button';
import Head from 'next/head';

const allOverHeadData = {
  cells: [
    {
      key: 'country',
      isSortable:true,
      content: 'Country'
    },
    {
      key: 'cases',
      isSortable:true,
      content: 'Cases'
    },
    {
      key: 'deaths',
      isSortable:true,
      content: 'Deaths'
    },
    {
      key: 'recovered',
      isSortable:true,
      content: 'Recovered'
    }
  ]
}

const countryWiseHeadData = {
  cells: [{
    key: 'country',
    isSortable:true,
    content: 'Country'
  },
  {
    key: 'cases',
    isSortable:true,
    content: 'Cases'
  },
  {
    key: 'today-cases',
    isSortable:true,
    content: 'Cases Today'
  },
  {
    key: 'deaths',
    isSortable:true,
    content: 'Deaths'
  },
  {
    key: 'today-deaths',
    isSortable:true,
    content: 'Deaths Today'
  },
  {
    key: 'critical',
    isSortable:true,
    content: 'Critical'
  },
  {
    key: 'recovered',
    isSortable:true,
    content: 'Recovered'
  }]
};

const formatRowData = (data) => {
  return data.map(item => ({
    cells: [
      {
        key: 'all',
        content: 'All'
      },
      {
        key: item.cases,
        content: item.cases
      },
      {
        key: item.deaths,
        content: item.deaths
      },
      {
        key:item.recovered,
        content: item.recovered
      }
    ]
  }));
}


const formatRowDataForCountry = (data) => {
  return data.map(item => ({
    cells: [
      {
        key: item.country.toLowerCase(),
        content: item.country
      },
      {
        key: item.cases,
        content: item.cases
      },
      {
        key: item.todayCases,
        content: item.todayCases
      },
      {
        key: item.deaths,
        content: item.deaths
      },
      {
        key: item.todayDeaths,
        content: item.todayDeaths
      },
      {
        key: item.critical,
        content: item.critical
      },
      {
        key: item.recovered,
        content: item.recovered
      }
    ]
  }));
}

const totalOverAllText = 'Covid 19 | Total Overall';
const countryBasedText = 'Covid 19 | By Countries';

const Home = () => {
  const [overAllData, setOverAllData] = useState({});
  const [loading, setLoading] = useState(false);
  const [tabState, setTabState] = useState('all');
  const [captionText, setCaptionText] = useState(totalOverAllText)
  const [headData, setHeadData] = useState(allOverHeadData);
  useEffect(
    () => {
      setLoading(() => true);
      if (tabState === 'all') {
        API.fetchAll()
          .then(data => {
            const toFormat = data?[data]:[];
            const formattedData = formatRowData(toFormat);
            setOverAllData(() => formattedData);
            setHeadData(() => allOverHeadData);
            setCaptionText(() => totalOverAllText);
            setLoading(() => false);
          });
      } else if (tabState === 'country') {
        API.fetchByCountry()
          .then(data => {
            const formattedData = formatRowDataForCountry(data||[]);
            setOverAllData(() => formattedData);
            setHeadData(() => countryWiseHeadData);
            setCaptionText(() => countryBasedText);
            setLoading(() => false);
          });
      }
    }, [tabState])

  return <React.Fragment>
    <main>
      <Head>
        <link href="https://fonts.googleapis.com/css2?family=Amatic+SC&family=Andika&display=swap" rel="stylesheet" />
      </Head>
      <nav className="flex just-center align-center">
        <ButtonGroup appearance="subtle">
          <Button onClick={() => setTabState('all')}> All Data</Button>
          <Button onClick={() => setTabState('country')}>Country Wise Data</Button>
        </ButtonGroup>
      </nav>
      <div className="table-wrapper">
        <div className="max-table-width">
          <DynamicTable
            caption={captionText}
            head={headData}
            rows={overAllData}
            rowsPerPage={15}
            defaultPage={1}
            loadingSpinnerSize="large"
            isLoading={loading}
            defaultSortOrder='ASC'
            defaultSortKey='country'
            isFixedSize
          />
        </div>
      </div>
      <style jsx>
        {
          `
        main{
          min-height:100vh;
        }


        .max-table-width{
          max-width:800px;
        }

        .table-wrapper{
            min-height:100vh;
            padding-bottom:2.5em;
            display:flex;
            justify-content:center;
            align-items:center;
          }


      `
        }
      </style>
      <style jsx global>
        {`

          body{
            font-family: 'Andika', sans-serif;
          }

          h1,h2,h3,h4,h5,h6{
            font-family: 'Amatic SC', cursive;
          }

          .flex{
            display:flex;
          }

          .just-center{
            justify-content:center;
          }


          .align-center{
            align-items:center;
          }

        `}
      </style>
    </main>
  </React.Fragment>
}

export default Home;
