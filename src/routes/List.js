
function User({user}){
    return (
        <>  
            <p>회원ID : {user.id}</p> 
            <p>회원명 : {user.username}</p> 
            <span>이메일 : ({user.email})</span>
            <hr />
        </>
    );
}


const List = () => {
    const userlist = [
        {
            id: 1,
            username: '이희연',
            email:'heeyeon@naver.com'
        },
        {
            id: 2,
            username: '황의조',
            email:'uijo@naver.com'
        },
        {
            id: 3,
            username: '음바페',
            email:'mbappe@naver.com'
        }
    ];


    return (
        <>
            {userlist.map(user => (
                <User user={user} />
            ))}
        </>
    );
}

export default List;