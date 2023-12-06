import React, {useState} from 'react';


const Modal = (props) => {

    const [content, setContent] = useState(null); 
    const [img, setImg] = useState(null);
    const [mode, setMode] = useState('post')
    const [title, setTitle] = useState(null);
    const [club, setClub] = useState(null);

    const handleModeChange = (event) => {
        setMode(event.target.value);
    };

    return (
        <>
            <div className='main-container'>
                <div className='modal-container'>
                    {!props.selectedUser ? (
                        <div className='add'>

                    
                        <select name="modeSelection" id="mode" onChange={handleModeChange} value={mode}>
                            <option value="post">Create New Post</option>
                            <option value="forum">Create New Forum</option>
                        </select>
                        {mode === 'post' ? (
                            <form className='new-post' onSubmit={(e) => {
                                e.preventDefault();
                                console.log('hello from modal');
                                console.log(props.username, content);
                                props.addForumPost(props.username, content, img);
                                props.setOpenModal(false);
                            }} >
                                <h2 className='title'>Create a new post!</h2>
                                <div className='input-post'>
                                    <textarea className='description' placeholder='Write your post....' onChange={(event) => setContent(event.target.value)} required></textarea>
                                    <input type='file' className='img'onChange={(event) => setImg(event.target.value)}/>
                                    <button className='submit' >Submit</button>
                                    <button className='cancel' onClick={() => {
                                        props.setOpenModal(false);
                                    }} >Cancel</button>
                                </div>
                            </form>
                        ):(
                            <form className='new-forum' onSubmit={(e) => {
                                e.preventDefault();
                                props.addNewForum(club, title);
                                props.setOpenModal(false);
                            }} >
                                <h2 className='title'>Create a new forum!</h2>
                                <p>Check before, are you an authorized user?</p>
                                <div className='input-forum'>
                                    <select onChange={(event) => setClub(event.target.value)}>
                                        {props.clubs.map((c) => (
                                      
                                        <option value={c.name}>{c.name}</option>
                                    )
                                    )}
                                    </select>
                                    <input className='title'placeholder='Title of this forum....' onChange={(event) => setTitle(event.target.value)} required/>
                                    <input type ="date"></input>
                                    <button className='submit' >Submit</button>
                                    <button className='cancel' onClick={() => {
                                        props.setOpenModal(false);
                                    }} >Cancel</button>
                                </div>
                            </form>
                        )}
                        </div>
                    ): (
                        <form className='prompt' onSubmit={(e) => {
                            e.preventDefault();
                            props.setSelectedUser(null);
                            props.setOpenModal(false);
                        }}>
                            <img className='post-image' src={require("../conversation_photo.png")} alt='spartan'/>
                            <h3>{props.selectedUser}</h3>
                            {props.friendStatus && props.friendStatus === true ? (
                                <div>
                                    <button onClick={() => {props.removeFriend(props.selectedUser)}}>Unfollow</button>
                                    <button onClick={() => {props.setOpenModal(false); props.setSelectedUser(null);props.setFriendStatus(null)}}>Close</button>  
                                </div>
                                
                            ):(
                                <div>
                                    <button onClick={() => {props.addFriend(props.selectedUser)}}>Follow</button>
                                    <button onClick={() => {props.setOpenModal(false); props.setSelectedUser(null); props.setFriendStatus(null)}}>Close</button>
                                </div>
                            )}
                        </form>
                    )}
                    
                    
                </div>     
            </div>
        </>
    );
};

export default Modal;

// {props.clubs.map((c) => (
//     <select name="modeSelection" id="mode" onChange={(event) => setClub(event.target.value)} value={c.name}>
//         <option value="post">{c.name}</option>
//     </select>
// ))}