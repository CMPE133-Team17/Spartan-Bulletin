import './chatHistory.css';

export default function ChatHistory() {
    return (
        <div className='chatHistory'>
            <img className='convoImg' src={require("../conversation_photo.png")} alt='spartan'/>
            <span className='names'> User 1</span>
        </div>
    )
}