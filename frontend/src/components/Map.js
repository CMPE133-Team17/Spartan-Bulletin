import React from 'react';
import { useState } from 'react';
import {APIProvider, Map, AdvancedMarker, Pin, InfoWindow} from '@vis.gl/react-google-maps';

//TODO:
// - Allow click to get lat/long
// - Connect Database to Map Pointers



function SpartanMap() {
	// MAP BOUNDS AND CENTER
	const mCenter = {lat:37.33526 , lng:-121.88149};
	const SjsuBounds = {
	latLngBounds: {north: 37.35827484264925,
	south: 37.30679211245778,
	east: -121.84188065174233,
	west: -121.93344724310798,},
	
	strictBounds: false
	};
	
	
	//Test positions
	var positions = [];
	positions.push({id: 0, mapp:{lat:37.33526 , lng:-121.88189}, club:"John Club", text:"HandDoorHandHookCarDoor"});
	positions.push({id: 1, mapp:{lat:37.33528 , lng:-121.88148}, club:"Non-John Club", text:"Poems"});
	
	
	//SET STATE
	const [open,setOpen] = useState(false);
	
	//Individual Marker HTML
	const posList = positions.map((p) =>
		<div>
        	<AdvancedMarker position={p.mapp} onClick={()=>setOpen(true)}>
				<Pin
				background={"blue"}
				borderColor={"black"}
				glyphColor={"yellow"}>
				</Pin>
			</AdvancedMarker>
			
			{open && <InfoWindow position={p.mapp} onCloseClick={()=>setOpen(false)}>
			<p><b>{p.club}</b></p>
			<p>{p.text}</p>
			</InfoWindow>}
			
		</div>
    );
	
	//RETURN HTML
	return(
		<section>
			<div style = {{height: "93vh"}}>
				<APIProvider apiKey={'API KEY HERE'}>
					<Map zoom={17} 
					center={mCenter} 
					mapId={'de8660dc41ef3e4f'}
					heading={329.3}
					restriction={SjsuBounds}
					onClick={ev => {
      				console.log("latitide = ", ev.latLng());
      				console.log("longitude = ", ev.latLng());
    				}}
					>
						{posList}
					</Map>
				</APIProvider>
			</div>
		</section>
	);
}

export default SpartanMap;
