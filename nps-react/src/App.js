import React, { useState, useEffect } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';

import './App.css';

import nationalParks from './parks.json';

function App() {
  // States
  const [parks, setParks] = useState(nationalParks);
  const [campgroundData, setCampgroundData] = useState([]);  

  const listOfParks = parks.map(parkObj => (
    <option key={parkObj.parkCode} value={parkObj.parkCode}>{parkObj.name}</option>
  ));

  const columnDefs = [
    { headerName: 'Campground', field: 'name' },
    { headerName: '# of showers', field: 'showers' },
    { headerName: 'Laundry', field: 'laundry' },
    { headerName: 'RV(s) Allowed', field: 'rv' },
    { headerName: 'Dump Station', field: 'dumpStation'},
    { headerName: 'Reservation URL', field: 'reservation'}
  ];

  function getParkCampgroundInfo(event) {
    const url = 'https://api.nps.gov/api/v1/campgrounds?api_key=SI2Gfleu6ulfSaZ9zgacK4IFgZLfd0ZYz7OguQIM&parkCode=' + event.target.value;

    fetch(url)
      .then(res => res.json())
      .then(response => {
        console.log(response);
        const tmpRowData = [];
        for (let i=0; i < response.data.length; i++) {
          let numOfShowers = 0;
          if (response.data[i].amenities.showers[0] !== 'None') {
            numOfShowers = response.data[i].amenities.showers.length;
          }
          tmpRowData.push({
            "name": response.data[i].name,
            "showers": numOfShowers,
            "laundry": response.data[i].amenities.laundry,
            "rv": response.data[i].accessibility.rvallowed,
            "dumpStation": response.data[i].amenities.dumpstation,
            "reservation": response.data[i].reservationsurl
          });
        }
        setCampgroundData(tmpRowData);
      })
      .catch(error => console.error(error));
  }

  return (
    <div className="App">
      <p>Let's access the National Park Service API!</p>
      <label htmlFor="listOfParks">National Parks</label>
      <select id="listOfParks" onChange={getParkCampgroundInfo}>
        {listOfParks}
      </select>
      <div className="ag-theme-balham" style={{height: '400px', width: '90%'}}>
        <AgGridReact
          columnDefs={columnDefs}
          rowData={campgroundData}
        >
        </AgGridReact>
      </div>
    </div>
  );
}

export default App;
