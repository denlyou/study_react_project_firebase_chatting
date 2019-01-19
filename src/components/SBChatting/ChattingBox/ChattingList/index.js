import React from 'react';
import './index.css';
import './popup.css';
// Compos
import ChatMessage from './ChatMessage'; // 채팅 메세지

const defaultProps = {
    isPopupStyle: false,
    fireDB: null,
    myInfo: null
};

/* 실시간 로그인 유저 */
class ChattingList extends React.Component {
    constructor(props){
        super(props);
        // 상태 설정
        this.state = {
            chatData: [], // 채팅 목록
            inputMessage: '' // 채팅 메세지 입력창
        }
        // 이벤트 this 바인딩
        this.handleChange = this.handleChange.bind(this); // 메세지 인풋 입력 바인딩
        this.handleKeyDown = this.handleKeyDown.bind(this); // 메세지 인풋 엔터키 바인딩
        this.handleSendMessage = this.handleSendMessage.bind(this); // 메세지 전송

        // DOM Ref 바인딩
        this.ref2inputMessage = React.createRef();
        this.ref2btnSend = React.createRef();
        // https://reactjs.org/docs/refs-and-the-dom.html

    }

    // @Lifecycle
    componentDidMount() {
        //채팅 메세지 감지
        this.props.fireDB.ref('FireChat/messages').on('value', async ds => { // console.log(ds.val());
            // 데이터 수정 (key값 병합)
            const newData = []; let obj = null;
            await ds.forEach( cds => {
                obj = { key: cds.key, ...cds.val() };
                newData.push( obj );
            });
            obj = null;
            this.setState({ chatData: newData });
        });
        // 메세지 창에 키보드 포커스
        this.ref2inputMessage.current.focus();
    }
    /* 이벤트 바인딩 */
    handleChange(e){        
        this.setState({ inputMessage: e.target.value });
        this.ref2btnSend.current.disabled = e.target.value.length < 1 ;
    }
    /* 엔터 감지 */
    handleKeyDown(e){        
        if (e.keyCode === 13) this.handleSendMessage();
    }
    /* 메세지 전송을 클릭 했을 경우*/
    handleSendMessage(){
        if( this.state.inputMessage < 1 ) {
            alert("메세지를 입력하세요!");
            return;
        }
        // firebase db에 메세지 추가
        const msgObj = {
            uid: this.props.myInfo.uid,
            name: this.props.myInfo.displayName,
            message: this.state.inputMessage
        }
        this.ref2btnSend.current.disabled = true;
        this.props.fireDB.ref('FireChat/messages').push(msgObj).then(()=>{
            this.ref2btnSend.current.disabled = false;
            this.setState({inputMessage: '' });
            this.ref2inputMessage.current.focus();
        });
    }

    // 렌더링
    render(){
        const listRender2ChatMessage = (data) => { // console.log(data);
            return data.map((messageInfo, i) => {
                return (
                    <ChatMessage
                        key={ messageInfo.key }
                        messageInfo={ messageInfo }
                        isMe={ messageInfo.uid===this.props.myInfo.uid }
                    />
                );
            });
        }; // END listRender2ChatMessage();

        return (
            <div
                id="ChatList"
                className={ this.props.isPopupStyle ? "popup":"default" }
            >
                <div className="title">
                    대화 목록
                </div>
                <div className="message">
                    { listRender2ChatMessage(this.state.chatData) /* 채팅 목록 랜더링 */ }
                </div>
                <div className="form">
                    <input type="text" placeholder="(메세지 입력)"
                        ref={ this.ref2inputMessage }
                        onChange={this.handleChange}
                        onKeyDown={this.handleKeyDown}
                        value={this.state.inputMessage}
                    />
                    <button
                        ref={ this.ref2btnSend }
                        onClick={this.handleSendMessage}
                        disabled
                    >
                        전송
                    </button>
                </div>
            </div> 
        );
    } // END render();
}
ChattingList.defaultProps = defaultProps;
export default ChattingList;
