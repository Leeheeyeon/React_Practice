import { authService } from "fbase";
import { useHistory } from "react-router";

const Profile = () => {
    const history = useHistory();
    const onLogOutClick = () => {
        authService.signOut();
        history.push("/"); // JS에서 location.href와 같은 역할~
    } 

    return (
        <>
            <button onClick={onLogOutClick}>🚫로그아웃🚫</button>
            {/*로그아웃하면 home으로 다시 페이지 갱신되어야하는데 갱신이 안됨*/}

        </>
    )
}

export default Profile;