import React from 'react';
// resources
import user from './user.png';

// 함수형 컴포넌트
const RequireSignin = props => (
    <div className={ props.isMe ? "me" : "other" }>
        { props.isPopupStyle ? ("#") : (<img src={user} alt="user"/>) }
        &nbsp; {props.name}
    </div>
)
export default RequireSignin;