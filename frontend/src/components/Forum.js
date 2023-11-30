import React, {useEffect, useState} from 'react';

function Forum() {
	useEffect( ()=> {
		fetchItems();
	},[]);
	
	const [items, setItems] = useState([]);
	
	const fetchItems = async() => {
		const data = await fetch('/forum');
		const items = await data.json();
		setItems(items);
	};

	return(
		<>
			<div className='forum'>
				<div className='interests'>

				</div>
				<div className='posts'>
					{items.map(item => (
					<div>
						<p>{item.name}</p>
						<p>{item.msg}</p>
						<p>{item.username}</p>
					</div>
					))}
				</div>
			</div>
			
		</>
	);
}

export default Forum;