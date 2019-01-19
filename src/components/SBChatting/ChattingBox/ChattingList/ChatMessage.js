import React from 'react';

const myMessageStyle = {
    color: "blue"
}    
// 함수형 컴포넌트
const ChatMessage = props => (
    <div style={ props.isMe ? myMessageStyle : {} }>
        [<strong>{props.messageInfo.name}</strong>] { props.messageInfo.message }
    </div>
)
ChatMessage.defaultProps = {
    messageInfo: {
        uid: '0x2202', 
        name: 'unknown',
        message: 'message'
    },
    isMe: false
}
export default ChatMessage;