import { Link } from "react-router-dom";


const Navigation = () => {
    return (
        <nav>
            <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/profile">Profile</Link></li>
                <li><Link to="/list">List</Link></li>
            </ul>
        </nav>
    )
}
export default Navigation;
// defaulf는 export를 1개만 할 수 이뜸