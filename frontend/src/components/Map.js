import React from 'react';
import { useState } from 'react';
import {APIProvider, Map, AdvancedMarker, Pin, InfoWindow} from '@vis.gl/react-google-maps';


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
	positions.push({id: 0, mapp:{lat:37.33666725233741, lng:-121.88151529690411}, club:"ENG Club Event", text:"ENG 123 - Event Information here"});
    positions.push({id: 1, mapp:{lat:37.33467965635882, lng:-121.88421359914061}, club:"Science Club Event", text:"SCI 345 - Event Information Here"});
	
	
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
				<APIProvider apiKey={'AIzaSyCXDDgQByGZl-vAMCxAmlLhyeXzcTKaL2E'}>
					<Map zoom={17} 
					center={mCenter} 
					mapId={'de8660dc41ef3e4f'}
					heading={329.3}
					restriction={SjsuBounds}
					>
						{posList}
					</Map>
				</APIProvider>
			</div>
		</section>
	);
}

export default SpartanMap;
