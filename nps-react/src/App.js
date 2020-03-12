import React, { useState } from 'react';

import CampGroundDetails from './components/CampGroundDetails/CampGroundDetails.js';

// AG Grid
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham-dark.css';

import './App.css';

import nationalParks from './parks.json';

function App() {
  // States
  const [parks] = useState(nationalParks); // Lists of park names and codes
  const [disableSelect, setDisableSelect] = useState(false); // boolean to disable park select
  const [campGroundData, setCampGroundData] = useState([]) // Array of campground objects from the NPS API
  const [selectedCampground, setSelectedCampground] = useState() // Object containing selected campground information
  const [gridData, setGridData] = useState([]); // Array holding AG Grid data
  const [gridApi, setGridApi] = useState({}); // AG Grid API object

  const listOfParks = parks.map(parkObj => (
    <option key={parkObj.parkCode} value={parkObj.parkCode}>{parkObj.name}</option>
  ));

  const columnDefs = [
    { field:'id', hide: true },
    { headerName: 'Campground', field: 'name', resizable: true, sortable: true, filter: true, width: 200 },
    { headerName: '# of All Sites', field: 'sites', resizable: true, filter: true, width: 100 },
    { headerName: '# of Showers', field: 'showers', resizable: true, filter: true, width: 120 },
    { headerName: 'Laundry', field: 'laundry', resizable: true, filter: true, width: 110 },
    { headerName: 'RV(s) Allowed', field: 'rv', resizable: true, filter: true, width: 125 },
    { headerName: 'Dump Station', field: 'dumpStation', resizable: true, filter: true, width: 120 },
  ];

  function getParkCampgroundInfo(event) {
    const url = 'https://api.nps.gov/api/v1/campgrounds?api_key=SI2Gfleu6ulfSaZ9zgacK4IFgZLfd0ZYz7OguQIM&parkCode=' + event.target.value;

    setDisableSelect(true);
    gridApi.showLoadingOverlay();

    fetch(url)
      .then(res => res.json())
      .then(({ data: campgrounds }) => {
        const tmpRowData = [];
        setCampGroundData(campgrounds);

        campgrounds.forEach((campground) => {
          tmpRowData.push({
            "id": campground.id,
            "name": campground.name,
            "sites": campground.campsites.totalsites,
            "showers": campground.amenities.showers[0] !== 'None' ? campground.amenities.showers.length : 0,
            "laundry": campground.amenities.laundry === '' ? 'No': campground.amenities.laundry,
            "rv": campground.accessibility.rvallowed ? 'Yes' : 'No',
            "dumpStation": campground.amenities.dumpstation === '' ? 'None': campground.amenities.dumpstation
          });
        });

        setGridData(tmpRowData);
        gridApi.hideOverlay();
        if (campgrounds.length === 0) {
          gridApi.showNoRowsOverlay();
        }
        setSelectedCampground();
        setDisableSelect(false);
      })
      .catch(error => console.error(error));
  }

  function onGridReady(params) {
    setGridApi(params.api);
    params.api.sizeColumnsToFit();
  }

  function updateDetails() {
    const selectedRows = gridApi.getSelectedRows();

    setSelectedCampground();

    if (selectedRows.length === 1) {
      for (let i = 0; i < campGroundData.length; i ++) {
        if (campGroundData[i].id === selectedRows[0].id) {
          const tmpCGData = campGroundData[i];
          
          // Build contact string
          if (tmpCGData.contacts && tmpCGData.contacts.emailAddress && tmpCGData.contacts.emailAddresses.length > 0) {
            tmpCGData.contacts = `Email: ${tmpCGData.contacts.emailAddresses[0].emailAddress}`;
          } else {
            tmpCGData.contacts = 'No contact information provided.';
          }

          // Build hours string
          if (tmpCGData.operatingHours) {
            let hourString = '';
            for (let j = 0; j < tmpCGData.operatingHours.length; j++) {
              hourString += tmpCGData.operatingHours[j].description + ' ';
            }
            tmpCGData.operatingHours = hourString;
          }

          // Build fees string
          if (tmpCGData.fees && tmpCGData.fees.length > 0) {
            let feeString = '';
            for (let j = 0; j < tmpCGData.fees.length; j++) {
              if (tmpCGData.fees[j].title) {
                feeString += tmpCGData.fees[j].title
              }
              if (tmpCGData.fees[j].cost) {
                feeString += ': $' +tmpCGData.fees[j].cost.slice(0, -2) + '. ';
              }
            }
            tmpCGData.fees = feeString;
          } else {
            tmpCGData.fees = 'No fee data provided.';
          }

          setSelectedCampground(tmpCGData);
          i = campGroundData.length; // Selected campground found, stop looping
        }
      }
    }
  }

  return (
    <div className="App" role="main">
      <h1>Select a park to view it's campgrounds.</h1>
      <div className="parkSelect">
        <label htmlFor="listOfParks">National Parks: </label>
        <select id="listOfParks" onChange={getParkCampgroundInfo} disabled={disableSelect}>
          {listOfParks}
        </select>
      </div>
      <h2>Select a campground to view details.</h2>
      <div className="ag-theme-balham-dark gridContainer">
        <AgGridReact
          ensureDomOrder={true}
          suppressColumnVirtualisation={true}
          columnDefs={columnDefs}
          rowData={gridData}
          rowSelection="single"
          onGridReady={onGridReady}
          onSelectionChanged={updateDetails}
        >
        </AgGridReact>
      </div>
      <h2>Campground Details</h2>
      <CampGroundDetails campground={selectedCampground} />
      <button id="bookButton">
        <a href={selectedCampground ? selectedCampground.reservationsurl: ''}>Book A Site</a>
      </button>
    </div>
  );
}

export default App;
