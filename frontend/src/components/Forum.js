import React, {useEffect, useState} from 'react';
import { BsFillPlusCircleFill } from "react-icons/bs";
import '../Forum.css';
import { FaHeart } from "react-icons/fa";
import Cookies from 'js-cookie';
import axios from 'axios';
import Modal from './Modal.js';
import { AiFillCaretRight } from "react-icons/ai";
import {format} from 'timeago.js';
import Modal2 from './Modal2.js';
import Modal3 from './Modal3.js';
import {useNavigate} from 'react-router-dom';


function Forum ({user}){

	const [forums, setForums] = useState([]);
	const [userData, setUserData] = useState('');
	const [openModal, setOpenModal] = useState(false);
	const [forumPosts, setForumPosts] = useState([]);
	const [events, setEvents] = useState([]);
	const [interests, setInterests] = useState([]);
	const [selectedUser, setSelectedUser] = useState(null);
	const [openModal2, setOpenModal2] = useState(false);
	const [currentForum, setCurrentForum] = useState('General');
	const [file, setFile] = useState(null);
	const [openModal3, setOpenModal3] = useState(false);
	const navigate = useNavigate();

	//gets all posts from the database 
	const fetchForumPosts = async() => {
		try {
			const response = await axios.get('/api/getForumPosts');
			setForumPosts(response.data);
		} catch (err) {
			console.error('Error fetching data: ', err);
		}
	};

	//gets all exisiting forums 
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

			const fetchPosts = async() => {
				const clubResponse = await axios.get('/bulletin/posts');
				console.log(clubResponse.data);
				setEvents(clubResponse.data);
			}
			
			fetchForumPosts();
			fetchForums();
			fetchPosts();
     	} else {
			navigate('/login');
		}
	},[user]);

	//adds new post to the database and refreshes the feed
	const addForumPost = async (username, content) => {
		try {
      		const url = await upload();
      		const postData = {
        	user: username,
        	text: content,
        	img: url || null, 
       	 	forum: currentForum,
      		};
      		await axios.post("/api/addForumPost", postData);
    	} catch (error) {
      		console.error('Error adding forum post:', error);
    	}

		await fetchForumPosts();

	}

	//adds new forum to the database and display it on the left side 
	const addNewForum = async (content, clubname, date) => {
		await axios.post('/api/addNewForum', {content: content, clubname: clubname, date: date});
		await fetchForums();
	}

	//triggered when clicking on the other user's profile pic, the user have the ability to add friends
	const handleClick = async (username) => {
		setSelectedUser(username);
	
		if (userData.name !== username) {
			try {
				const status = await axios.get('/api/checkFriendList', { params: { user: userData.name, fren: username } });
				
				const res = await axios.get('/api/getFriendInterests', { params: { fren: username } });

				setInterests(res.data);

				console.log(interests);
				if (status.data.friendship) {
					setOpenModal2(true);
				} else {
					setOpenModal3(true);
				}
			} catch (error) {
				console.error('Error occurred:', error);
			}
		}
	};

	//remove selected user from friend list
	const removeFriend = async (friend) => {
		await axios.post('/api/removeFriend', {user: userData.name, fren: friend}, (err, result) => {
			if (err) {
				console.log(err);
			}
		})
	}

	//adds selected user into friend list
	const addFriend = async (friend) => {
		await axios.post('/api/addFriend', {user: userData.name, fren: friend}, (err, result) => {
			if (err) {
				console.log(err);
			}
		})
	}

	//gives a unique name to the file upload
	const upload = async () => {
		try {
			if (file) {
			  const formData = new FormData();
			  formData.append('file', file);
			  const res = await axios.post('/api/upload', formData);
			  return res.data;
			}
			return null; 
		} catch (err) {
			console.log('Error uploading file:', err);
			return null;
		}
	}

	const handleFileUpload = (event) => {
		const uploadedFile = event.target.files[0];
		setFile(uploadedFile);
	};

	//removes post from the database and re render the page afterwards
	const deletePost = async (id) => {
		try {
		  await axios.post('/api/deletePost', { postId: id });
			await fetchForumPosts();
		} catch (error) {
		  console.error('Error deleting post:', error);
		}
	  };
	  

	return(
		<>

			<div className='forum'>
				<div className='forums'>
					<div className='left-side' style={{maxWidth: '100%', paddingLeft:'10px'}}>
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
						<select onChange={(event) => {setCurrentForum(event.target.value)}}>
							<option value='General'>General</option>
							{forums.map((curr) => (
								<option value={curr.title}>{curr.clubname}: {curr.title}</option>
							))}
						</select>
						{forumPosts && forumPosts.length > 0 ?(
							forumPosts.map(i => (
								i.forum === currentForum && (
									<div className='post'>
										<div className='main' key={i.username}>
											<div className='prof' style={{ position: 'relative', display: 'flex', padding: '10px', verticalAlign: 'middle', justifyContent:'space-between'}} onClick={() => { handleClick(i.username) }}>
												<div style={{display:'flex'}}>
													<img className='post-image' src={require("../conversation_photo.png")} alt='spartan' />
  													<h5 className='username'>{i.username}</h5>
												</div>
												{i.username === userData.name && (
													<div style={{justifyContent:'flex-end'}}>
												  		<button style={{borderRadius:'10px', borderColor:'black', borderWidth:'2px'}} onClick={() => {deletePost(i.id)}}>Delete post</button>
											  		</div>
												)}
  												
											</div>

											<div className='content'>
												<p className='content' style={{fontSize:18}}>{i.content}</p>
											</div>
											{i.image && (
    											<div>
        											<img src={require(`../uploads/${i.image}`)} alt='' style={{height:'300px', marginBottom:'10px'}}/>
    											</div>
											)}

											
											<div className='likes' style={{display: 'flex', justifyContent: 'flex-start', verticalAlign:'center'}}>
												<FaHeart className='heart' style={{marginLeft: '20px'}}/>
												<p style={{margin: '0 10px'}}>{i.likes} Likes</p>
												<p className='date' style={{fontSize:12, marginLeft: '60%'}}>{format(i.timestamp)}</p>
											</div>
										</div>
									</div>
								)
							
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

			{/*pop up window for making new posts/forums */}
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
				events={events} 
				handleFileUpload={handleFileUpload}
			/>}

			{/* pop up window for adding/removing friends*/}
			{openModal2 && 
			<Modal2 
				openModal2={openModal2} 
				setOpenModal2={setOpenModal2} 
				selectedUser={selectedUser}
				setSelectedUser={setSelectedUser}
				interests={interests}
				removeFriend={removeFriend}
				user={userData.name}
			/>}
			
			{openModal2 && (
        		<div className="overlay" onClick={() => setOpenModal2(false)}></div>
      		)}

			{openModal3 && 
			<Modal3 
				openModal3={openModal3} 
				setOpenModal3={setOpenModal3} 
				selectedUser={selectedUser}
				setSelectedUser={setSelectedUser}
				interests={interests}
				addFriend={addFriend}
				user={userData.name}
			/>}
			{openModal3 && (
        		<div className="overlay" onClick={() => setOpenModal3(false)}></div>
      		)}
		</>
	);
}

export default Forum;



