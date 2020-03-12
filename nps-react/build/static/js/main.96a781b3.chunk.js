(this["webpackJsonpnps-react"]=this["webpackJsonpnps-react"]||[]).push([[0],{14:function(e,a,n){},15:function(e,a,n){},16:function(e,a,n){},28:function(e,a,n){},29:function(e,a,n){"use strict";n.r(a);var t=n(0),o=n.n(t),r=n(3),i=n.n(r),l=(n(14),n(1));n(15);var s=function(e){var a=Object(t.useState)(e.icon),n=Object(l.a)(a,1)[0],r=Object(t.useState)(e.field),i=Object(l.a)(r,1)[0],s=Object(t.useState)(e.fieldValue),d=Object(l.a)(s,1)[0];return o.a.createElement("div",{className:"detailItem"},o.a.createElement("span",{className:"detailItemField"},o.a.createElement("i",{className:"material-icons"},n),i,": "),o.a.createElement("span",{className:"detailItemValue"},d))};n(16);var d=function(e){var a=e.campground;return o.a.createElement("div",{className:"detailContainer"},a?[o.a.createElement(s,{key:"0",icon:"notes",field:"Description",fieldValue:a.description}),o.a.createElement(s,{key:"1",icon:"cloud",field:"Weather",fieldValue:a.weatheroverview}),o.a.createElement(s,{key:"2",icon:"schedule",field:"Hours",fieldValue:a.operatingHours}),o.a.createElement(s,{key:"3",icon:"attach_money",field:"Fees",fieldValue:a.fees}),o.a.createElement(s,{key:"4",icon:"change_history",field:"# of Tent Sites",fieldValue:a.campsites.tentonly}),o.a.createElement(s,{key:"5",icon:"group",field:"# of Group Sites",fieldValue:a.campsites.group}),o.a.createElement(s,{key:"6",icon:"airport_shuttle",field:"# of RV Sites",fieldValue:a.campsites.rvonly}),o.a.createElement(s,{key:"7",icon:"directions_car",field:"Directions",fieldValue:a.directionsoverview}),o.a.createElement(s,{key:"8",icon:"security",field:"Regulations",fieldValue:a.regulationsoverview}),o.a.createElement(s,{key:"9",icon:"email",field:"Contacts",fieldValue:a.contacts})]:o.a.createElement("p",null,"No Campground Selected"))},c=n(7),m=(n(26),n(27),n(28),n(8));var p=function(){var e=Object(t.useState)(m),a=Object(l.a)(e,1)[0],n=Object(t.useState)(!1),r=Object(l.a)(n,2),i=r[0],s=r[1],p=Object(t.useState)([]),u=Object(l.a)(p,2),k=u[0],f=u[1],C=Object(t.useState)(),h=Object(l.a)(C,2),g=h[0],v=h[1],y=Object(t.useState)([]),b=Object(l.a)(y,2),w=b[0],S=b[1],E=Object(t.useState)({}),O=Object(l.a)(E,2),N=O[0],V=O[1],j=a.map((function(e){return o.a.createElement("option",{key:e.parkCode,value:e.parkCode},e.name)}));return o.a.createElement("div",{className:"App",role:"main"},o.a.createElement("h1",null,"Select a park to view it's campgrounds."),o.a.createElement("div",{className:"parkSelect"},o.a.createElement("label",{htmlFor:"listOfParks"},"National Parks: "),o.a.createElement("select",{id:"listOfParks",onChange:function(e){var a="https://api.nps.gov/api/v1/campgrounds?api_key=SI2Gfleu6ulfSaZ9zgacK4IFgZLfd0ZYz7OguQIM&parkCode="+e.target.value;s(!0),N.showLoadingOverlay(),fetch(a).then((function(e){return e.json()})).then((function(e){var a=e.data,n=[];f(a),a.forEach((function(e){n.push({id:e.id,name:e.name,sites:e.campsites.totalsites,showers:"None"!==e.amenities.showers[0]?e.amenities.showers.length:0,laundry:""===e.amenities.laundry?"No":e.amenities.laundry,rv:e.accessibility.rvallowed?"Yes":"No",dumpStation:""===e.amenities.dumpstation?"None":e.amenities.dumpstation})})),S(n),N.hideOverlay(),0===a.length&&N.showNoRowsOverlay(),v(),s(!1)})).catch((function(e){return console.error(e)}))},disabled:i},j)),o.a.createElement("h2",null,"Select a campground to view details."),o.a.createElement("div",{className:"ag-theme-balham-dark gridContainer"},o.a.createElement(c.AgGridReact,{ensureDomOrder:!0,suppressColumnVirtualisation:!0,columnDefs:[{field:"id",hide:!0},{headerName:"Campground",field:"name",resizable:!0,sortable:!0,filter:!0,width:200},{headerName:"# of All Sites",field:"sites",resizable:!0,filter:!0,width:100},{headerName:"# of Showers",field:"showers",resizable:!0,filter:!0,width:120},{headerName:"Laundry",field:"laundry",resizable:!0,filter:!0,width:110},{headerName:"RV(s) Allowed",field:"rv",resizable:!0,filter:!0,width:125},{headerName:"Dump Station",field:"dumpStation",resizable:!0,filter:!0,width:120}],rowData:w,rowSelection:"single",onGridReady:function(e){V(e.api),e.api.sizeColumnsToFit()},onSelectionChanged:function(){var e=N.getSelectedRows();if(v(),1===e.length)for(var a=0;a<k.length;a++)if(k[a].id===e[0].id){var n=k[a];if(n.contacts&&n.contacts.emailAddress&&n.contacts.emailAddresses.length>0?n.contacts="Email: ".concat(n.contacts.emailAddresses[0].emailAddress):n.contacts="No contact information provided.",n.operatingHours){for(var t="",o=0;o<n.operatingHours.length;o++)t+=n.operatingHours[o].description+" ";n.operatingHours=t}if(n.fees&&n.fees.length>0){for(var r="",i=0;i<n.fees.length;i++)n.fees[i].title&&(r+=n.fees[i].title),n.fees[i].cost&&(r+=": $"+n.fees[i].cost.slice(0,-2)+". ");n.fees=r}else n.fees="No fee data provided.";v(n),a=k.length}}})),o.a.createElement("h2",null,"Campground Details"),o.a.createElement(d,{campground:g}),o.a.createElement("button",{id:"bookButton"},o.a.createElement("a",{href:g?g.reservationsurl:""},"Book A Site")))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));i.a.render(o.a.createElement(p,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))},8:function(e){e.exports=JSON.parse('[{"parkCode":"acad","name":"Acadia"},{"parkCode":"npsa","name":"American Samoa"},{"parkCode":"arch","name":"Arches"},{"parkCode":"badl","name":"Badlands"},{"parkCode":"bibe","name":"Big Bend"},{"parkCode":"bisc","name":"Biscayne"},{"parkCode":"blca","name":"Black Canyon"},{"parkCode":"brca","name":"Bryce Canyon"},{"parkCode":"cany","name":"Canyonlands"},{"parkCode":"care","name":"Capital Reef"},{"parkCode":"cave","name":"Carlsbad Cavern"},{"parkCode":"chis","name":"Channel Islands"},{"parkCode":"cong","name":"Congaree"},{"parkCode":"crla","name":"Crater Lake"},{"parkCode":"cuva","name":"Cuyahoga Valley"},{"parkCode":"deva","name":"Death Valley"},{"parkCode":"dena","name":"Denali"},{"parkCode":"drto","name":"Dry Tortugas"},{"parkCode":"ever","name":"Everglades"},{"parkCode":"gate","name":"Gateway Arch"},{"parkCode":"glac","name":"Glacier"},{"parkCode":"glba","name":"Glacier Bay"},{"parkCode":"grca","name":"Grand Canyon"},{"parkCode":"grte","name":"Grand Teton"},{"parkCode":"grba","name":"Great Basin"},{"parkCode":"grsa","name":"Great Sand Dunes"},{"parkCode":"grsm","name":"Great Smoky Mountains"},{"parkCode":"gumo","name":"Guadalupe Mountains"},{"parkCode":"hale","name":"Haleakala"},{"parkCode":"havo","name":"Hawai\'i Volcanoes"},{"parkCode":"hosp","name":"Hot Springs"},{"parkCode":"indu","name":"Indiana Dunes"},{"parkCode":"isro","name":"Isle Royale"},{"parkCode":"jotr","name":"Joshua Tree"},{"parkCode":"kefj","name":"Kenai Fjords"},{"parkCode":"kica","name":"Kings Canyon"},{"parkCode":"kova","name":"Kobuk Valley"},{"parkCode":"lacl","name":"Lake Clark"},{"parkCode":"lavo","name":"Lassen Volcanic"},{"parkCode":"maca","name":"Mammoth Cave"},{"parkCode":"meve","name":"Mesa Verde"},{"parkCode":"mora","name":"Mount Rainier"},{"parkCode":"noca","name":"North Cascades"},{"parkCode":"olym","name":"Olympic"},{"parkCode":"pefo","name":"Petrified Forest"},{"parkCode":"pinn","name":"Pinnacles"},{"parkCode":"redw","name":"Redwood"},{"parkCode":"romo","name":"Rocky Mountain"},{"parkCode":"sagu","name":"Saguaro"},{"parkCode":"sequ","name":"Sequoia"},{"parkCode":"shen","name":"Shenandoah"},{"parkCode":"thrb","name":"Theodore Roosevelt"},{"parkCode":"viis","name":"Virgin Islands"},{"parkCode":"voya","name":"Voyageurs"},{"parkCode":"whsa","name":"White Sands"},{"parkCode":"wica","name":"Wind Cave"},{"parkCode":"wrst","name":"Wrangell-Sait Elias"},{"parkCode":"yell","name":"Yellowstone"},{"parkCode":"yose","name":"Yosemite"},{"parkCode":"zion","name":"Zion"}]')},9:function(e,a,n){e.exports=n(29)}},[[9,1,2]]]);
//# sourceMappingURL=main.96a781b3.chunk.js.map