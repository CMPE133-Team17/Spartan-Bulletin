import React, {useEffect, useState} from 'react';
import { BsFillPlusCircleFill } from "react-icons/bs";
import '../Forum.css';
// import {Link} from 'react-router-dom';
import { FaHeart } from "react-icons/fa";
import { FaRegComment } from "react-icons/fa6";
import Cookies from 'js-cookie';
import axios from 'axios';
import Modal from './Modal.js';
import { AiFillCaretRight } from "react-icons/ai";
import 'reactjs-popup/dist/index.css';



function Forum ({user}){

	const [forums, setForums] = useState([]);
	const [userData, setUserData] = useState('');
	const [openModal, setOpenModal] = useState(false);
	const [forumPosts, setForumPosts] = useState([]);
	const [clubs, setClubs] = useState([]);
	const [selectedUser, setSelectedUser] = useState(null);
	const [friendStatus, setFriendStatus] = useState(null);
	


	const fetchForumPosts = async() => {
		try {
			const response = await axios.get('/api/getForumPosts');
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
	},[]);

	const addForumPost = async (username, content, imgURL) => {
		axios.post("/api/addForumPost", {user : username, text: content, img: imgURL});
		await fetchForumPosts();

	}

	const addNewForum = async (club, title) => {
		axios.post('/api/addNewForum', {user: userData.name, club: club, title:title});
		await fetchForums();
	}

	const handleClick = async (username) => {
		setSelectedUser(username);

		if (userData.name !== username) {
			const res = await axios.put('/api/checkFriendList', {user: userData.name, fren: username});
			setFriendStatus(res.data);
			console.log(friendStatus);
			if (friendStatus !== null) {
				setOpenModal(true);
			}
		}
	}

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

	return(
		<>

			<div className='forum'>
				<div className='interests'>
					<div className='left-side'>
						<h3 style={{color : 'white'}}>Upcoming events: </h3>
						{forums && forums.length > 0 ? (
							forums.map((i) => (
								<div className='list' style={{width: '100%', color: 'white'}} key={i.title}>
									<div className='title'>
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
						{forumPosts && forumPosts.length > 0 ?(
							forumPosts.map(i => (
							<div className='post'>
							<div className='main' key={i.username} onClick={() => {handleClick(i.username)}}>
								<div className='prof'>
									<img className='post-image' src={require("../conversation_photo.png")} alt='spartan'/>
									<h5 className='username' >{i.username}</h5>
								</div>
								<div className='content'>
									<p className='content' style={{fontSize:18}}>{i.content}</p>
									<p className='date' style={{fontSize:12}}>{i.timestamp}</p>
								</div>
							</div>
							<div className='likes'>
								<FaHeart className='heart' />
								<p>Likes</p>
								<FaRegComment flip="horizontal" />
								<p>Comments</p>
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
			{openModal && <Modal openModal={openModal} setOpenModal={setOpenModal} username={userData.name} addForumPost={addForumPost} addNewForum={addNewForum} clubs={clubs} selectedUser={selectedUser} setSelectedUser={setSelectedUser} friendStatus={friendStatus} setFriendStatus={setFriendStatus} addFriend={addFriend} removeFriend={removeFriend}/>}
			
		</>
	);
}

export default Forum;

// {openModal2 && <Modal2 openModal2={openModal2} setOpenModal2={setOpenModal2} curr={selectedUser} interests={interests}/>}

