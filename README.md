:octocat: [study_react_project_firebase_chatting](https://github.com/denlyou/study_react_project_firebase_chatting)

## React.js + Firebase DB+GoogleAuth Chatting Component Project Example 

리엑트 스터디를 진행하며 만든 연습용 웹앱입니다. 공부용으로 소스 내부에 주석이 달려있으니 참고하여 분석하세요~!

데모 확인 => https://sb-chatting.firebaseapp.com/ 

### 필요 사항
- node.js and NPM, yarn 권장 (Project 설정: create-react-app)
- Google Firebase 계정과 프로젝트
- React.js에 대한 이해와 관심

### 필요 설정
- Firebase Web 초기화설정 (src/components/SBChatting/firebaseConfig.js.sample 설정후 firebaseConfig.js 이름 변경)
- Firebase Auth의 Google 로그인 활성화
- Firebase Realtime Database의 보안 규칙 설정
```
{
  "rules": {
    ".read": false,
    ".write": false
    // 채팅용으로 아래 추가
    , "FireChat": {
      ".read": true,
      ".write": "auth != null"
    }
  }
}
```

데모 확인 => https://sb-chatting.firebaseapp.com/ 

## Learn More

[<img src="https://scontent-icn1-1.xx.fbcdn.net/v/t1.0-9/49323159_2352181958337405_6344594984653553664_n.png?_nc_cat=100&_nc_ht=scontent-icn1-1.xx&oh=1d40f5b5a133236c983f9d402d9a2387&oe=5CC5D7F7" height="64">](http://sbsoft.kr)