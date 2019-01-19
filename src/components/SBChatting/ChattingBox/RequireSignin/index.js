import React from 'react';

// 함수형 컴포넌트
const RequireSignin = props => (
  <div>
    <div>로그인이 필요합니다!</div>
    <p>
      <button onClick={props.onGoogleSignin}>
        구글 로그인
      </button>
    </p>
  </div>
)
export default RequireSignin;