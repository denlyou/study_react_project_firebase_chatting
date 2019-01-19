import React from 'react';
import './index.css';
import './popup.css';
// Compos
import RequireSignin from './RequireSignin'; // 로그인 요청 화면
import UserList from './UserList'; // 실시간 접속자 화면
import ChattingList from './ChattingList'; // 채팅 목록 및 입력 화면

const defaultProps = {
    isOpen: false, // 채팅창 오픈 여부
    isFirebaseInit: false, // firebase 초기화 여부
    isLogin: false, // 로그인 상태 여부
    onSignout: ()=>{ console.log('로그아웃 메소드'); }
};

/* 채팅 박스 */
class ChattingBox extends React.Component {
    render(){
        let contents = ""; // 그릴 화면 
        if ( this.props.isFirebaseInit ) { // Firebase 초기화 성공하고
            if ( this.props.isLogin ) { // 로그인 되었을 경우
                contents = (
                    <>
                        <UserList
                            isPopupStyle={ this.props.isPopupStyle /* 팝업 스타일 설정 여부 */ } 
                            myInfo={ this.props.myInfo /* 내 정보 */ }
                            fireDB={ this.props.fireDB /* Firebase RealtimeDB 전달 */}
                            onSignout={this.props.onSignout}
                        />
                        <ChattingList
                            isPopupStyle={ this.props.isPopupStyle /* 팝업 스타일 설정 여부 */ } 
                            myInfo={ this.props.myInfo /* 내 정보 */ }
                            fireDB={ this.props.fireDB /* Firebase RealtimeDB 전달 */}
                        />
                    </>
                );
            } else { // 로그인 되지 않은 경우
                contents = (
                    <RequireSignin
                        onGoogleSignin={this.props.onGoogleSignin}
                    />
                );
            }
        }else{ // Firebase 초기화에 실패 했을 경우
            contents = (
                <p>경고! Firebase 초기화에 실패하였습니다! 초기화 설정 파일을 확인하세요.</p>
            );            
        }
        
        return (
            <div
                id="ChattingBox"
                className={ (this.props.isPopupStyle ? "popup":"default")
                    +" "+(this.props.isOpen ? "" : "hide")}
            >
                { contents }
                <div
                    className="close"
                    onClick={ this.props.onToggleChattingBox /* 채팅방 보이기 여부 */ }
                >
                    닫기
                </div>
            </div> 
        );
    } // END render();
}
ChattingBox.defaultProps = defaultProps;
export default ChattingBox;