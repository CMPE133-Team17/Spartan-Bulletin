import React from 'react'

export default function Modal2(props) {


  return (
    <div>
        <div className='main-container'>
             <div className='modal-container'>
                <form className='prompt' onSubmit={(e) => {
                    e.preventDefault();
                    props.setSelectedUser(null);
                    props.setOpenModal2(false);
                    }}
                    style={{
                        width:'100%',
                        alignItems:'center',
                        display:'flex',
                        flexDirection: 'column'
                    }}>

                    <img className='friend' 
                        src={require("../conversation_photo.png")} 
                        alt='spartan'
                        style={{
                            borderRadius:'50%',
                            width:'100px',
                            height: '100px',
                            marginTop: '20px'
                        }}/>
                    
                    <div style={{display:'flex', alignContent:'center', justifyContent:'space-evenly', marginTop:'20px'}}>
                        <h3>Username: </h3>
                        <h3>{props.selectedUser}</h3>
                    </div>

                    {props.friendStatus === true ? (
                        <div style={{width:'100%', marginTop:'20px', position:'absolute', bottom: '0', marginBottom:'30px'}}>
                            <button 
                                onClick={() => {props.removeFriend(props.selectedUser)}}
                                style={{
                                    width: '30%',
                                    height:'40px',
                                    borderRadius:'20px',
                                    borderColor: 'black',
                                    backgroundColor:'white',
                                    marginRight: '10px'
                                    }}><b>Unfollow</b>
                            </button>
                            <button 
                                onClick={() => {props.setOpenModal2(false); props.setSelectedUser(null); props.setFriendStatus(null)}}
                                style={{
                                    width: '30%',
                                    height:'40px',
                                    borderRadius:'20px'
                                }}><b>Close</b></button>  
                        </div>
                                
                        ):(

                        <div style={{width:'100%', marginTop:'20px', position:'absolute', bottom: '0', marginBottom:'30px'}}>
                            <button 
                            onClick={() => {props.addFriend(props.selectedUser)}}
                            style={{
                                width: '30%',
                                height:'40px',
                                borderRadius:'20px',
                                borderColor: 'white',
                                backgroundColor:'#3498db',
                                color:'white',
                                marginRight: '10px'
                            }}><b>Follow</b></button>
                            <button 
                            onClick={() => {props.setOpenModal2(false); props.setSelectedUser(null); props.setFriendStatus(null)}}
                            style={{
                                width: '30%',
                                height:'40px',
                                borderRadius:'20px'
                            }}><b>Close</b></button>
                        </div>
                    )}
                </form>
            </div>
        </div>
    </div>
  )
}

// {props.interests > 0 ? (props.interests.map((i) => (
//     <div style={{borderRadius: '20px', borderColor:'#f4f56e', backgroundColor:'white'}}>
//         <p>{i.clubname}</p>
//     </div>
// ))):
//     <p>This user has no interests set yet.</p>
// }