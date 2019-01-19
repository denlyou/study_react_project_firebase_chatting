import React from 'react';
import './index.css';

/* 떠있는 버튼 */
class FloatingButton extends React.Component {
    // 렌더링
    render(){
        return (
            <div
                id="FloatingButton"
                onClick={ this.props.onToggleChattingBox /* ChattingCompo의 메소드 호출 */}
            >
                <span role="img" aria-label="Chat" >💬</span>
            </div> 
        );
    } // END render();
}

FloatingButton.defaultProps = {
    onToggleChattingBox: () => {
        console.log('onToggleChattingBox 함수가 정의되지 않음');
    }
}

export default FloatingButton;