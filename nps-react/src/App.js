import React, { useState, useEffect } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham-dark.css';

import './App.css';

import nationalParks from './parks.json';

function App() {
  // States
  const [parks, setParks] = useState(nationalParks);
  const [campgroundData, setCampgroundData] = useState([]);
  const [disableSelect, setDisableSelect] = useState(false);
  const [gridApi, setGridApi] = useState({});

  const listOfParks = parks.map(parkObj => (
    <option key={parkObj.parkCode} value={parkObj.parkCode}>{parkObj.name}</option>
  ));

  const columnDefs = [
    { headerName: 'Campground', field: 'name', resizable: true, sortable: true, filter: true, width: 200 },
    { headerName: 'Description', field: 'description', resizable: true, autoHeight: true, cellStyle: { 'white-space': 'normal'} },
    { headerName: 'Hours', field: 'hours', resizable: true, autoHeight: true, cellStyle: { 'white-space': 'normal'} },
    { headerName: '# of sites', field: 'sites', resizable: true, filter: true, width: 100 },
    { headerName: '# of showers', field: 'showers', resizable: true, filter: true, width: 120 },
    { headerName: 'Laundry', field: 'laundry', resizable: true, filter: true, width: 110 },
    { headerName: 'RV(s) Allowed', field: 'rv', resizable: true, filter: true, width: 125 },
    { headerName: 'Dump Station', field: 'dumpStation', resizable: true, filter: true, width: 120 },
    { headerName: 'Reservation URL', field: 'reservation', resizable: true, width: 150 }
  ];

  function getParkCampgroundInfo(event) {
    const url = 'https://api.nps.gov/api/v1/campgrounds?api_key=SI2Gfleu6ulfSaZ9zgacK4IFgZLfd0ZYz7OguQIM&parkCode=' + event.target.value;

    setDisableSelect(true);
    gridApi.showLoadingOverlay();

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

          let hours = '';
          if (response.data[i].operatingHours) {
            for (let j=0; j < response.data[i].operatingHours.length; j++) {
              hours += response.data[i].operatingHours[j].description + ' ';
            }
          } else {
            hours = 'No open hours provided.';
          }
          
          tmpRowData.push({
            "name": response.data[i].name,
            "description": response.data[i].description,
            "hours": hours,
            "sites": response.data[i].campsites.totalsites,
            "showers": numOfShowers,
            "laundry": response.data[i].amenities.laundry === '' ? 'No': response.data[i].amenities.laundry,
            "rv": response.data[i].accessibility.rvallowed,
            "dumpStation": response.data[i].amenities.dumpstation === '' ? 'None': response.data[i].amenities.dumpstation,
            "reservation": response.data[i].reservationsurl === '' ? 'No URL Provided.': response.data[i].reservationsurl
          });
        }
        setCampgroundData(tmpRowData);
        gridApi.hideOverlay();
        setDisableSelect(false);
      })
      .catch(error => console.error(error));
  }

  // function getRowHeight(params) {
  //   return 28 * (Math.floor(params.data.description.length / 40) + 1);
  // }

  function onGridReady(params) {
    setGridApi(params.api);
    params.api.sizeColumnsToFit();
  }

  return (
    <div className="App">
      <p>Select a park to view it's campgrounds.</p>
      <div className="parkSelect">
        <label htmlFor="listOfParks">National Parks: </label>
        <select id="listOfParks" onChange={getParkCampgroundInfo} disabled={disableSelect}>
          {listOfParks}
        </select>
      </div>
      <div className="ag-theme-balham-dark" style={{height: '400px', width: '90%'}}>
        <AgGridReact
          columnDefs={columnDefs}
          rowData={campgroundData}
          onGridReady={onGridReady}
        >
        </AgGridReact>
      </div>
    </div>
  );
}

export default App;
