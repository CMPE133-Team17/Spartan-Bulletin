import React, {useEffect, useState} from 'react';
import { BsFillPlusCircleFill } from "react-icons/bs";
import '../Forum.css';
import { FaHeart } from "react-icons/fa";
import Cookies from 'js-cookie';
import axios from 'axios';
import Modal from './Modal.js';
import { AiFillCaretRight } from "react-icons/ai";
import {format} from 'timeago.js';
import Modal2 from './Modal2.js'



function Forum ({user}){

	const [forums, setForums] = useState([]);
	const [userData, setUserData] = useState('');
	const [openModal, setOpenModal] = useState(false);
	const [forumPosts, setForumPosts] = useState([]);
	const [clubs, setClubs] = useState([]);
	const [interests, setInterests] = useState([]);
	const [friendStatus, setFriendStatus] = useState(null);
	const [selectedUser, setSelectedUser] = useState(null);
	const [openModal2, setOpenModal2] = useState(false);
	const [currentForum, setCurrentForum] = useState('General');


	const fetchForumPosts = async() => {
		try {
			const response = await axios.get('/api/getForumPosts', {params: {forum: currentForum}});
			setForumPosts(response.data);
		} catch (err) {
			console.error('Error fetching data: ', err);
		}
	};

	const fetchForums = async() => {
		try {
			const response = await axios.get('/api/getForums');
			setForums(response.data);
		} catch (err) {
			console.error('Error fetching data: ', err);
		}
	};

	useEffect( ()=> {
		const authCookie = Cookies.get('auth');
    	if (authCookie) {
      		const userData = JSON.parse(authCookie);
      		setUserData(userData);
      		console.log('User data from cookie: ', userData);

			const fetchClubs = async() => {
				const clubResponse = await axios.get('/api/getClubs');
				setClubs(clubResponse.data);
			}
			
			fetchForumPosts();
			fetchForums();
			fetchClubs();
     	};
	},[user]);

	const addForumPost = async (username, content, imgURL) => {
		await axios.post("/api/addForumPost", {user : username, text: content, img: imgURL, forum:currentForum});
		await fetchForumPosts();

	}

	const addNewForum = async (club, title, date) => {
		await axios.post('/api/addNewForum', {user: userData.name, club: club, title:title, date:date});
		await fetchForums();
	}

	const handleClick = async (username) => {
		setSelectedUser(username);
	
		if (userData.name !== username) {
			try {
				const status = await axios.get('/api/checkFriendList', { params: { user: userData.name, fren: username } });
				const res = await axios.get('/api/getFriendInterests', { params: { fren: username } });

				setInterests(res.data);
				setFriendStatus(status.data);
	
	
				if (friendStatus !== null && selectedUser !== null) {
					setOpenModal2(true);
				}
			} catch (error) {
				console.error('Error occurred:', error);
			}
		}
	};
	
	

	const removeFriend = async (friend) => {
		await axios.post('/api/removeFriend', {user: userData.name, fren: friend}, (err, result) => {
			if (err) {
				console.log(err);
			}
		})
	}

	const addFriend = async (friend) => {
		await axios.post('/api/addFriend', {user: userData.name, fren: friend}, (err, result) => {
			if (err) {
				console.log(err);
			}
		})
	}

	const handleChange = async(val) => {
		setCurrentForum(val);
		console.log(currentForum);
		await fetchForumPosts();
	}

	return(
		<>

			<div className='forum'>
				<div className='forums'>
					<div className='left-side' style={{maxWidth: '100%'}}>
						<h3 style={{color : 'white'}}>Upcoming events: </h3>
						{forums && forums.length > 0 ? (
							forums.map((i) => (
								<div className='list' style={{width: '100%', color: 'white', borderRadius: '20px'}} key={i.title}>
									<div className='title' style={{display:'flex'}}>
										<AiFillCaretRight />
										<p>{i.clubname}: {i.title}</p>
									</div>
									<p>{i.date}</p>
								</div>
							))
						): <p style={{color : 'white'}} >There's no upcoming event soon!</p>
						}
					</div>
						
				</div>
				
				<div className='posts-container'>
					<div className='posts'>
						<div className='page-title'>
							<h3>{userData.name}'s Forum Page!</h3>
						</div>
						<select onChange={(event) => {setCurrentForum(event.target.value); console.log(currentForum)}}>
							<option value='General'>General</option>
							{forums.map((curr) => (
								<option value={curr.title}>{curr.clubname}: {curr.title}</option>
							))}
						</select>
						{forumPosts && forumPosts.length > 0 ?(
							forumPosts.map(i => (
							<div className='post'>
							<div className='main' key={i.username}>
								<div className='prof' onClick={() => {handleClick(i.username)}}>
									<img className='post-image' src={require("../conversation_photo.png")} alt='spartan'/>
									<h5 className='username' >{i.username}</h5>
								</div>
								<div className='content'>
									<p className='content' style={{fontSize:18}}>{i.content}</p>
								</div>
								<div className='likes' style={{display: 'flex', justifyContent: 'flex-start', verticalAlign:'center'}}>
									<FaHeart className='heart' style={{marginLeft: '20px'}}/>
									<p style={{margin: '0 10px'}}>{i.likes} Likes</p>
									<p className='date' style={{fontSize:12, marginLeft: '60%'}}>{format(i.timestamp)}</p>
								</div>
							</div>
						</div>
						))):
						<p>There is currently no posts to show!</p>
						} 
					</div>
					
				</div>
				<div className='addPost'>
					<BsFillPlusCircleFill size={50} style={{color: 'yellow'}} onClick={() => {
						setOpenModal(true);
					}}/>
				</div>
			</div>

			{openModal && (
        		<div className="overlay" onClick={() => setOpenModal(false)}></div>
      		)}

			{openModal && 
			<Modal 
				openModal={openModal} 
				setOpenModal={setOpenModal} 
				username={userData.name} 
				addForumPost={addForumPost} 
				addNewForum={addNewForum} 
				clubs={clubs} 
			/>}

			{openModal2 && 
			<Modal2 
				openModal2={openModal2} 
				setOpenModal2={setOpenModal2} 
				selectedUser={selectedUser}
				setSelectedUser={setSelectedUser}
				friendStatus={friendStatus}
				setFriendStatus={setFriendStatus}
				interests={interests}
				addFriend={addFriend}
				removeFriend={removeFriend}
			/>}
			
			{openModal2 && (
        		<div className="overlay" onClick={() => setOpenModal2(false)}></div>
      		)}
		</>
	);
}

export default Forum;



