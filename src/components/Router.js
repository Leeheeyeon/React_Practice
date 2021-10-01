
import { HashRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import Auth from "routes/Auth";
import Home from "routes/Home";
import Profile from "routes/Profile"
import List from "routes/List.js"
import Navigation from "./Navigation.js"

// ()안에 isLoggedIn를 써서 구조분해가 바로 일어나도록 한 것, 
// {}를 쓰면 자바스크립트언어로 바로 사용가능하다.
const AppRouter = ({ isLoggedIn, userObj }) => {
    // 함수의 내부 - 연산, 호출 ...
    return (
        <Router>
            {isLoggedIn && <Navigation />}
            {/* && : 삼항연산자의 다른 형태. isLoggedIn이 true가 되면 보여라! 라는 뜻 */}
            <Switch>
                {isLoggedIn ? (
                    <>
                    <Route exact path="/">
                        <Home userObj={userObj} />
                    </Route>
                    <Route exact path="/profile">
                        <Profile />
                    </Route>
                    <Route exact path="/list">
                        {/* 여기서 path는 spring에서 request mapping과 같은 역할을 함. 
                        (url경로에 어떤 문자열이 들어오냐에 따라서 보여지는 컴포넌트가 상이함) */}
                        <List />
                    </Route>
                </>
                ) : (
                    <Route exact path="/">
                        <Auth />
                    </Route>
                )}
                {/*<Redirect from="*" to="/" />  모든 처리에 있어서 여기로 가라~ (프로필에서 로그아웃하면 home으로 돌아갈 수 있게 해줌 
                    -> redirect를 이용한 페이지 전환임 -> 주석처리 한 이유는 Profile.js에서 histort를 이용한 페이지 전환을 하도록 만들었기 때문~~~*/}
            </Switch>
        </Router>
    );
};

export default AppRouter;