import React from 'react';
import {APIProvider, Map, AdvancedMarker, Pin, InfoWindow} from '@vis.gl/react-google-maps';

function SpartanMap() {
	const position = { lat:37.33526 , lng:-121.88149 };
	
	const SjsuBounds = {
	north: 37.34010,
	south: 37.33082,
	east: -121.87521,
	west: -121.88781,
	};
	
	//Map Bounds not working
	
	return(
		<section>
			<div style = {{height: "93vh"}}>
				<APIProvider apiKey={'INSERT API KEY HERE'}>
					<Map zoom={17} 
					center={position} 
					mapId={'de8660dc41ef3e4f'}
					heading={329.3}
					restriction={SjsuBounds}
					>
						<AdvancedMarker position={position}>
							<Pin
							background={"blue"}
							borderColor={"black"}
							glyphColor={"yellow"}>
							</Pin>
						</AdvancedMarker>
					</Map>
				</APIProvider>
			</div>
		</section>
	);
}

export default SpartanMap;
