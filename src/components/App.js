import {useEffect, useState} from "react";
import AppRouter from "components/Router";
import {authService} from "fbase";

function App() {
  // 현재 접속자 확인
  console.log(authService.currentUser)
  // 상수 선언, ES6문번의 구조 분해 할당
  const [init, setInit] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  // null이면 Auth로 가고, null이 아니면 main으로 이동
  const [userObj, setUserObj] = useState(null);
  // 요거는 하위 컴포넌트인 AppRouter에서 userObj 사용함다~
  const textStyle2 = {
    color: 'lightgreen',
    fontSize: '25pt',
    display: 'inlineB-lock',
    width:'500px',
    fontWeight:'900',
  };

  useEffect(()=>{ // 어떤 이벤트가 발생하기 전까지 기다려주는 메서드 setTimeOut과 비슷한 메서드인데 데이터가 바뀌면 알아서 실행되는 메서드임
    // console.log(authService.currentUser);
    // setIsLoggedIn(authService.currentUser);
    authService.onAuthStateChanged((user)=>{
      if(user){ //인자값이 user
        // user가 있으면 로그인
        setIsLoggedIn(user);
        setUserObj(user);
      }else{
        setIsLoggedIn(false);
      }
      setInit(true); // 로그인이 되던 안되던 true를 반환
    }); //이벤트핸들러 - 인증정보가 변경되면 처리되는 메서드. ()안에 콜백함수가 들어가야함.
  },[]);
 
  // 현재 접속자 확인
  return (
    <>
    
      {init ? <AppRouter isLoggedIn={isLoggedIn} userObj={userObj} /> : "initializing ..."}
      <footer style={textStyle2}> <br/>&copy; {new Date().getFullYear()} 🌻rosie네 임당🌻</footer>
    </>
  );
}

export default App;
