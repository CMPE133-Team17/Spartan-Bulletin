import React, {useState} from 'react';


const Modal = (props) => {

    const [content, setContent] = useState(null); 
    const [mode, setMode] = useState('post')
    const [title, setTitle] = useState(null);
    const [club, setClub] = useState(props.clubs[0].name);
    const [date, setDate] = useState(null);

    const handleModeChange = (event) => {
        setMode(event.target.value);
        console.log(mode);
    };

    return (
        <>
            <div className='main-container'>
                <div className='modal-container'>
                        <div className='add'>

                    
                        <select name="modeSelection" id="mode" onChange={handleModeChange} value={mode}>
                            <option value="post">Create New Post</option>
                            <option value="forum">Create New Forum</option>
                        </select>
                        {mode === 'post' ? (
                            <form className='new-post' onSubmit={(e) => {
                                e.preventDefault();
                                props.addForumPost(props.username, content);
                                props.setOpenModal(false);
                            }} >

                                <h2 className='title' style={{textAlign: 'center', marginTop: '10px'}}>Create a new post!</h2>

                                <div className='input-post' style={{
                                    display: 'flex', 
                                    flexDirection: 'column', 
                                    alignItems:'center'}}>
                                    

                                    <textarea
                                        type='text'
                                        className='description' 
                                        style={{width: '100%', height: '70px', border: '1px solid lightgrey', borderRadius: '5px', marginTop: '10px'}}
                                        onChange={(event) => setContent(event.target.value)} required>
                                    </textarea>
                                    
                                    <label style={{alignItems:'flex-start', marginTop:'25px'}}>Optional:</label>
                                    
                                    <input 
                                        type='file' 
                                        className='img'
                                        onChange={(event) => props.setFile(event.target.files[0])}>
                                    </input>
                                   
                                    <div style={{position:'absolute', bottom:'0', marginBottom:'15px', width:'300px'}}>
                                    <button className='submit' 
                                    style={{
                                        marginTop:'10px', 
                                        width: '100%', 
                                        height:'40px', 
                                        borderRadius:'200px', 
                                        backgroundColor: '#3498db', 
                                        borderColor:'#3498db', 
                                        color:'white'}}><b>Submit</b></button>

                                    <button className='cancel' onClick={() => {
                                        props.setOpenModal(false);
                                    }} 
                                    style={{
                                        marginTop:'10px', 
                                        width: '100%', 
                                        height:'40px', 
                                        borderRadius:'200px', 
                                        backgroundColor: '#3498db', 
                                        borderColor:'#3498db', 
                                        color:'white'}}><b>Cancel</b>
                                    </button>
                                    </div>
                                        
                                </div>
                            </form>
                        ):(
                            <form className='new-forum' onSubmit={(e) => {
                                e.preventDefault();
                                props.addNewForum(club, title, date);
                                props.setOpenModal(false);
                            }} >

                                <h2 className='title'>Create a new forum!</h2>

                                <div className='input-forum'style={{display:'flex', flexDirection:'column', alignItems:'center'}}>
                                    <select onChange={(event) => setClub(event.target.value)}>
                                        {props.clubs.map((c) => (
                                      
                                        <option value={c.name}>{c.name}</option>
                                    )
                                    )}
                                    </select>

                                    <div style={{marginTop:'10px'}}>
                                        <label>Title:</label>
                                        <input className='title' style={{width:'100%'}} onChange={(event) => setTitle(event.target.value)} placeholder='Title' required/>
                                    </div>
                                    
                                    <div style={{marginTop:'10px', display:'flex'}}>
                                        <label>Date:</label>
                                        <input type ="date" style={{width:'100%', marginLeft:'5px'}} onChange={(event) => setDate(event.target.value)}></input>
                                    </div>

                                    <div style={{position:'absolute', bottom:'0', marginBottom:'15px', width:'300px'}}>
                                    <button className='submit' 
                                    style={{
                                        marginTop:'10px', 
                                        width: '100%', 
                                        height:'40px', 
                                        borderRadius:'200px', 
                                        backgroundColor: '#3498db', 
                                        borderColor:'#3498db', 
                                        color:'white'}}><b>Submit</b></button>

                                    <button className='cancel' onClick={() => {
                                        props.setOpenModal(false);
                                    }} 
                                    style={{
                                        marginTop:'10px', 
                                        width: '100%', 
                                        height:'40px', 
                                        borderRadius:'200px', 
                                        backgroundColor: '#3498db', 
                                        borderColor:'#3498db', 
                                        color:'white'}}><b>Cancel</b>
                                    </button>
                                    </div>
                                    

                                </div>
                            </form>
                        )}
                        </div>
                    
                    
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

