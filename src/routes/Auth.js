import { useState } from "react";
import { authService, firebaseInstance } from "fbase";

const Auth = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [newAccount, setNewAccount] = useState(true);
    const [error, setError] = useState("");

    


    const onChange = (event) => {
    //사용자가 입력할 때마다 (밸류값이 바뀔때마다) 호출
        //console.log(event.target.name);
        // console.log(event.target.value);
        // setEmail(event.target.value);

        //위의 코드들을 구조분해하기~!
        const {
            target : {name, value}
        } = event;
        if(name === "email"){
            setEmail(value);
        }else if(name === "password"){
            setPassword(value);
        }
    };
    // async를 이용하면 비동기 처리가 가능함
    const onSubmit = async (event) => {
    //전송버튼을 누르면 실행되는 코드
        event.preventDefault(); //submit의 기본 기능을 일시 중지 시켜주는 함수

        try{
            let data;
            if(newAccount){ // newAccount이면, 회원가입 (create newAccount)
                data = await authService.createUserWithEmailAndPassword(email, password);
                // 가입시키는 기능을 만들어주는 api
            }else {// 아니면 로그인(login)
                data = await authService.signInWithEmailAndPassword(email, password);
                // 로그인시키는 기능을 만들어주는 api
            }
            // => 정리하면, 새로운 계정이면 회원가입을 시켜주고 이미 존재하는 계정이면 로그인을 시켜준다.
            console.log(error)
        } catch(error){
            console.log(error);
            setError(error.message);
        }
    };
    const toggleAccount = (event) => {
    // 로그인 기능인지, 회원가입 기능인지 토글 형태로 쓰기위해 추가한 코드
        console.log("toggleAccount >>", newAccount);
        // 1. setNewAccount(newAccount ? false : true); 이렇게 삼항연산자를 이용해서 버튼 변경시키기
        // 2. setNewAccount(function(prev){ // 함수를 이용해서 버튼 변경시키기
        //     return !prev;
        // })
        setNewAccount((prev)=>!prev);
    };





    const onSocialClick = async (event) => {
    // firebase OAuth 사용하기 위한 코드 (sns계정을 이용한 로그인~)
        //console.log(event.target.name);

        //구조분할 시작
        const{
            target : {name},
        } = event;

            let provider;
            if(name === "google"){
                provider = new firebaseInstance.auth.GoogleAuthProvider();
            }else if(name === "github"){
                provider = new firebaseInstance.auth.GithubAuthProvider();
            }

            const data = await authService.signInWithPopup(provider);
            console.log(data);

    };


    
    return (
        <div>
          <form onSubmit={onSubmit}> 
          
            <input
              name="email"
              type="email"
              placeholder="Email"
              required
              value={email}
              onChange={onChange}
            />
            <input
              name="password"
              type="password"
              placeholder="Password"
              required
              value={password}
              onChange={onChange}
            />
            <input type="submit" value={newAccount ? "Create Account" : "Log In"} />
            {error}
          </form>
          <span onClick={toggleAccount}>
            {newAccount ? "[Sign In]" : "[Create Account]"}
          </span>
          <div>
            <button onClick={onSocialClick} name="google">
              Continue with Google
            </button>
            <button onClick={onSocialClick} name="github">
              Continue with Github
            </button>
          </div>
        </div>
      );
}

export default Auth;