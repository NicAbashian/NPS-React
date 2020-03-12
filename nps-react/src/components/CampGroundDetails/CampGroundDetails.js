import React from 'react';
import Detail from '../Detail/Detail.js';
import './CampGroundDetails.css'

function CampGroundDetails(props) {
  // States
  const campground = props.campground;

  return (
    <div className="detailContainer">
    {
      campground ? [
          <Detail key="0" icon={'notes'} field={'Description'} fieldValue={campground.description} />,
          <Detail key="1" icon={'cloud'} field={'Weather'} fieldValue={campground.weatheroverview} />,
          <Detail key="2" icon={'schedule'} field={'Hours'} fieldValue={campground.operatingHours} />,
          <Detail key="3" icon={'attach_money'} field={'Fees'} fieldValue={campground.fees} />,
          <Detail key="4" icon={'change_history'} field={'# of Tent Sites'} fieldValue={campground.campsites.tentonly} />,
          <Detail key="5" icon={'group'} field={'# of Group Sites'} fieldValue={campground.campsites.group} />,
          <Detail key="6" icon={'airport_shuttle'} field={'# of RV Sites'} fieldValue={campground.campsites.rvonly} />,
          <Detail key="7" icon={'directions_car'} field={'Directions'} fieldValue={campground.directionsoverview} />,
          <Detail key="8" icon={'security'} field={'Regulations'} fieldValue={campground.regulationsoverview} />,
          <Detail key="9" icon={'email'} field={'Contacts'} fieldValue={campground.contacts} />
      ]
      : <p>No Campground Selected</p>
    }
    </div>
  )
}

export default CampGroundDetails;