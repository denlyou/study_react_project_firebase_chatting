import React, { Component } from 'react';
import './App.css';
// compos
import SBChatting from './components/SBChatting'; // 채팅 컴포넌트

class App extends Component {
  constructor(props){
    super(props);

    this.state = {
      isPopupStyle: false // 팝업 스타일 여부
    }
    // 이벤트 바인딩
    this.handleChange = this.handleChange.bind(this);
  }
  /* 옵션 체크 이벤트 바인딩 */
  handleChange(e){
    console.log(e.target.checked);
    this.setState({ isPopupStyle: e.target.checked });
  }
  render() {
    return (
      <div className="App">
        {/* 채팅 컴포넌트 호출 */}
        <SBChatting isPopupStyle={this.state.isPopupStyle}/>

        <h1>React.js - Firebase Chatting Component Project</h1>
        <p>
          옵션 : 
          <input type="checkbox" id="isPopupStyle" onChange={this.handleChange}/>
          <label htmlFor="isPopupStyle"> 팝업 스타일 (isPopupStyle) </label>
        </p>
        <p>
          React.js와 Firebase를 사용한 채팅 컴포넌트 프로젝트입니다.
          공부용 소스로 깃허브에 공개되어있습니다.
        </p>
        <h2>요구사항</h2>
        <ul>
          <li>React.js and ReactDOM</li>
          <li>Google Firebase 계정과 프로젝트</li>
        </ul>
        <h2>사용방법</h2>
        <ul>
          <li>
            Firebase Web 초기화설정
            (src/components/SBChatting/firebaseConfig.js.sample 설정후 firebaseConfig.js 이름 변경)
          </li>
          <li>Firebase Auth의 Google 로그인 활성화</li>
          <li>Firebase Realtime Database의 보안 규칙 설정</li>
        </ul>
<pre id="FRDB_RULE">{
`{
  "rules": {
    ".read": false,
    ".write": false
    // 채팅용으로 아래 추가
    , "FireChat": {
      ".read": true,
      ".write": "auth != null"
    }
  }
}`
}</pre>
        <h2>링크</h2>
        <ul className="Links">
          <li><a href="https://github.com/denlyou/study_react_project_firebase_chatting" target="_blank" rel="noopener noreferrer">소스 다운로드</a></li>
          <li><a href="https://reactjs.org/docs/getting-started.html" target="_blank" rel="noopener noreferrer">React.js</a></li>
          <li><a href="https://firebase.google.com/docs/guides/" target="_blank" rel="noopener noreferrer">Firebase</a></li>
          <li><a href="https://uigradients.com/#Mantle" target="_blank" rel="noopener noreferrer">Background Color</a></li>
        </ul>
      </div>
    );
  }
}

export default App;
