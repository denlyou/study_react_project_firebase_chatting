// import Firebase
import firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/auth';
// react
import React from 'react';
import './index.css';
// compos
import FloatingButton from './FloatingButton'; // 떠있는 버튼
import ChattingBox from './ChattingBox'; // 채팅 메세지 박스

const defaultProps = {
    isPopupStyle: false
}

/* Container Component (높이 0인 빈박스)*/
class ChattingCompo extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            isFirebaseInit: false, fireDB: null, fireAuth: null, fireAuthProviders: null, // 파이어베이스꺼
            isOpenChattingBox: false, // 채팅 박스가 열려있는가?
            isLogin: false, // 로그인 여부
            myInfo: {} // 내 firebase 로그인 정보
        }
        // 메소드 this 바인딩s
        this.toggleChattingBox = this.toggleChattingBox.bind(this); // 채팅창 오픈 여부
        this.openGoogleSignin = this.openGoogleSignin.bind(this); // 구글 로그인
        this.onSignout = this.onSignout.bind(this); // 로그아웃
    }

    // @Lifecycle
    async componentDidMount() { // this.setState() 때문에...
        try { // Firebase setting 
            firebase.initializeApp( require("./firebaseConfig.js").default );
            await this.setState({ // 이게 비동기라..
                isFirebaseInit: true, // 초기화 성공 업데이트
                fireDB: firebase.database() , // DB 객체
                fireAuth: firebase.auth() , // 인증 객체
                fireAuthProviders: {
                    google: new firebase.auth.GoogleAuthProvider()
                }
            });
            // firebase DB 미리 접속 (커넥션 딜레이)
            firebase.database().ref('FireChat/version').once('value', function(ds) {
                // console.log('ChattingVersion:', ds.val() );
            });
            // 인증 상태 감지 (Listening)
            if( this.state.isFirebaseInit ) {
                this.state.fireAuth.onAuthStateChanged( user => { // console.log(user);
                    if (user) { // 로그인 되었을 경우
                        // 상태 업데이트
                        this.setState({ isLogin: true, myInfo: {
                            uid: user.uid,
                            displayName: user.displayName
                        } });
                        this.successSignin(user);
                    } else { // 로그아웃, 비로그인 접속
                        // 상태 업데이트
                        this.setState({ isLogin: false, myInfo: null });
                    }
                });
            }
        } catch (e) {
            console.log(e);
        }
    }
    /* 로그인에 성공 했을 경우 */
    successSignin(user){
        // DB에 접속 상태 등록  & DB에 접속 끊었을 때 삭제
        this.state.fireDB.ref('FireChat/users/'+ user.uid).onDisconnect().set(null);
        this.state.fireDB.ref('FireChat/users/'+ user.uid).set({name: user.displayName, email: user.email});
    }

    /* 채팅 박스 보이기 여부 토글 메소드 */
    toggleChattingBox(){ // console.log("click", this.isOpenChattingBox);
        this.setState({ isOpenChattingBox: !this.state.isOpenChattingBox });
    }
    /* 구글 로그인 열기 */
    openGoogleSignin(){
        const provider = this.state.fireAuthProviders.google;
        // provider.addScope('https://www.googleapis.com/auth/contacts.readonly'); // email 가져오려면 필요
        this.state.fireAuth.signInWithPopup(provider).catch( error => {
            alert(error.message);
            console.log(error);
        });
    }
    /* 로그아웃 하기 */
    onSignout(){
        this.state.fireAuth.signOut().catch( error => {
            alert(error.message);
            console.log(error);
        });
    }

    // 드디어 렌더링
    render(){
        return (
            <div id="SBChat">
                <FloatingButton
                    onToggleChattingBox={ this.toggleChattingBox /* 채팅방 보이기 여부 토글 이벤트 */ }
                />
                <ChattingBox
                    isPopupStyle={ this.props.isPopupStyle /* 팝업 스타일 설정 여부? */ } 
                    isOpen={ this.state.isOpenChattingBox /* 열림 상태 */ } 
                    isFirebaseInit={ this.state.isFirebaseInit /* Firebase의 초기화 상태 */ }
                    isLogin={ this.state.isLogin /* 로그인 상태 */ }
                    myInfo={ this.state.myInfo /* 내 정보 */ }
                    fireDB={ this.state.fireDB /* Firebase RealtimeDB 전달 */ }
                    /* event binding */
                    onToggleChattingBox={ this.toggleChattingBox /* 채팅방 보이기 여부 토글 이벤트 */ }
                    onGoogleSignin={this.openGoogleSignin /* 구글 로그인 이벤트 */ }
                    onSignout={this.onSignout /* 로그아웃 이벤트 */ }
                />
            </div> 
        );
    } // END render();
}
ChattingCompo.defaultProps = defaultProps;
export default ChattingCompo;