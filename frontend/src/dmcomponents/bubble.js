import './bubble.css';

export default function Bubble({own, message, time}) {
    return (
        <div className={own ? 'bubble own' : 'bubble'}>
            <div className='bubbles'>
                <img className='profilePic' src={require("../conversation_photo.png")} alt=''/>
                <p className='messageText' >{message}</p>
            </div>
            <div className='timestamp'>
                {time}
            </div>
        </div>
    )
}