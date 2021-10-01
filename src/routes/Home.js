import { useState, useEffect } from "react";
// useEffect : 서버에서 이벤트가 다 왔을 때 하는 effect처리
import { dbService, storageService } from 'fbase';
import Nweet from "./Nweet";
import { v4 as uuidv4 } from 'uuid';



// App.js의 AppRouter에서 넘겨준 userObj를 Router.js에서 받고 거기서 다시 <Home />에서 
// 넘겨준 userObj를 요기서 받는당~
const Home = ( {userObj} ) => {
    //console.log("userObj!!!!!!", userObj); 테스트 다해쮸~

    // useState를 구조분해 한당
    const [nweet, setNweet] = useState('');
    
    // 메세지를 저장하는 배열이 된당 밑에 doc.data()에 한개씩 넣어줄거야~~
    const [nweets, setNweets] = useState([]);
    const [attachment, setAttachment] = useState('');
    
    console.dir(userObj.email);
    

    const getNweets = async() => {
        // firebase DB에서 데이터를 가져와서 출력한당~
        const dbNweets = await dbService.collection("nweets").get();
        // console.log(dbNweets); 테스트했응께 주석~
        // 다불러질때까지 기다렸다가 마지막에 콘솔로 dbNweets를 출력해준다!
        // => 동기 처리해준다는 말~~
        // 다 가져오면 출력된다 -> 다 가져와야 밑으로 쭉쭉 내려가즁? 내려가서 forEach문 돌려돌려~
        
        let newList = [];
        dbNweets.forEach((doc)=>{
            //console.log(doc.id, doc.data()); 테스트했응께 주석~
            let data = doc.data();
            data.docId = doc.id;
            //console.log(data); 테스트했응께 주석~
            //출력해보면 {text: '안녕하슈~', createAt: 1632967557485, docId: 'z1EcUZbSSqtv0vu0atVN'} 이런식으로 출력댐!
            //이걸 추가시킬거야~
            newList.push(data);
        });
        // forEach가 끝났으니까 nweets 출력해보장
        //console.log(newList);
        setNweets(newList);

        // setTimeout(() => {
        //     //console.log(nweets);
        // }, 2000);

    }; // getNweets 끝


    // 요기부터는 입력한 내용이 실시간으로 촥촥촥 보이게 해주는 함수이다~~~
    useEffect(()=>{
       // getNweets(); 주석처리한 이유 : 데이터 변경이 일어났을 때 자동으로 촥촥촥 보이게하려고 
       // firestore를 이용하려고 주석처리해쮸~
       // onSnapshot: 이벤트핸들러 함수인디 파이어베이스에 있는 데이터를 자동으로 가꼬와줌~
       dbService.collection('nweets').onSnapshot((snapshot)=>{
           const newArray = snapshot.docs.map((doc)=>{
               return {docId:doc.id, ...doc.data()} 
               // ...연산자를 이용해서 추가시킴. 참인 애들만 배열에 넣어주죵~
           });
           setNweets(newArray);
       });
    }, []);



    //자바스크립트는 함수 안에 함수를 선언할 수 있음 
    const onSubmit = async (event) => {
        event.preventDefault();
        // 1. 파일을 storage에 upload하고
        // 2. 그 URL을 firestore에 저장한다.
        // 3. storage에 저장할 때는 UID가 자동 생성되지않게 설계되었다.
        // 먼저, uuid 모듈설치(uid 자동생성기)(npm install uuid)
        //console.log(uuidv4());
        // 만들어질 디렉토리와 파일명을 미리 준비해야된당~
       

        let downloadUrl = '';
        if (attachment) {
            const attachmentRef = storageService.ref().child(`${userObj.uid}/${uuidv4()}`); // 경로를 만들어주는것~~
            //                                                  폴더이름     이미지이름
            //uuidv4를 이용해서 같은 이름이 만들어지지 않게 해줌. 같은 이름이 생기면 거기에 덮어씌워지기 때문임!
            const resp = attachmentRef.putString(attachment, 'data_url');
            downloadUrl = await resp.ref.getDownloadURL();
        }


        // firestore는 MongoDB 구조와 같다.
        // firebase와 같은 nosql계통의  collection은 RDB의 table이다.
        // RDB에서 row === firebase의 Document (JS 객체)
        await dbService.collection('nweets').add({
            // 요기에 사용할 속성? 들을 하나하나 추가해야 쓸수이따~
            text : nweet,
            createAt: Date.now(),
            createId: userObj.uid,
            email: userObj.email,
            attachmentUrl: downloadUrl,
        });
        // DB 저장 후 input 창 초기화
        setNweet('');
        setAttachment('');
    };

    const onChange = (event) =>{
        event.preventDefault();
      

        // setNweet(event.target.value); 이렇게 해도되고 아래처럼
        // event 객체를 구조분해 해도된당
        // event.targe.value를 그냥 value만 써도 사용할 수 있게 됨!!!
        // 조금 복잡하지만 value값이 여러 번 필요할 때 쓰면 구뜨~
        const {
            target : {value},
        } = event;
        setNweet(value);
    };

    const textStyle = {
        color: "green", fontSize:'16pt',
    } 
    const hometitle = {
        fontWeight:"bold",
        fontSize:'35pt'
    }

    const onFileChange = (event) => {
        //console.dir(event.target.files[0]); 얘를 구조분해하기!! 아래에서 ㅎㅎ
        const {
            target: {files},
        } = event;
        console.log(files[0]);
        const reader = new FileReader();
        // 모두 읽어들이면 후속 처리하기(이벤트 핸들러로)
        reader.onloadend=(progressEvent) => {
            //console.dir(progressEvent.currentTarget.result)
            const {
                currentTarget : {result}
            } = progressEvent;
            setAttachment(result);
        };
        // 로컬의 파일을 읽어올 때도, Ajax 사용처럼 비동기 처리 된다.
        reader.readAsDataURL(files[0]);
    };

    return(
        <div>
            <span style={hometitle}>🏡 ◖⚆ᴥ⚆◗ 🏡</span><br />
            {console.log(nweets)}
            <span>{nweet}</span><br />
            <form onSubmit={onSubmit}> 
            {/* 여기서 this.onSubmit이라고 안쓰는이유 : class가 아니기때문!
            class내에서 자기 자신!이라는 의미로 썼던 건데 
            여기서는 도큐먼트안에 존재하고 있기때문에 this가 필요없음 */}

                <input type="text" id="textinput" value={nweet} onChange={onChange} />
                <input type="submit" value="Nweet" />
                {attachment && (
                <>
                <img src={attachment} height="150px"/>
                <input type="button" value="삭제유" onClick={(event) => {
                    setAttachment('');
                }}
                />
                </>
                )}                   
                <input type="file" accept="image/*" onChange={onFileChange} />
            </form>
            <div>
                {/* {
                    // 만들어진 nweets를 활용해서 목록을 만드시오~
                    nweets.map((nweet)=>{
                        return(
                            <div key={nweet.docId} style={textStyle}>
                                {nweet.text}                               
                            </div>
                        );
                    })
                }*/ }
                {
                    // 위 코드를 요로케 다시 분리~~ Nweet.js에 분리시켜서 import해서 사용하는 방법!
                    nweets.map((nweet)=>{
                        return <Nweet key={nweet.docId} nweetObj={nweet} userObj={userObj} />
                    })
                }
            </div>
        </div>
    );
};
export default Home;



/*
1. firebase에 수정 명령어 찾기
2. 바뀔 데이터 입력 받는 방법 찾기
    2-1. 방법1: JS의 팝업창으로 입력받기
    2-2. 방법2: input 엘리먼트로 입력 받는 방법
    2-3. 방법3: 입력 창 활용하기
3. 화면에 적용해보기
    3-1. 수정버튼 이벤트 구현
    3-2. input 엘리먼트 보이고 감추기
    3-3. 입력받은 데이터 firebase에 적용하기
*/