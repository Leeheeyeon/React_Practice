import { dbService } from "fbase";
import { useState } from "react";



const Nweet = ({ nweetObj, userObj }) => {
  //useState() 함수로 만든 객체를 구조분해한다.
  const [isEdit, setIsEdit] = useState(false);
  const [newText, setNewText] = useState(nweetObj.text);

    const textStyle = {
        color: 'orange',
        fontSize: '16pt',
        display: 'inlineB-lock',
        backgroundColor:'lightyellow',
        fontWeight:'600',
      };

    const onDeleteClick = async (event) => {
        // 삭제되도록하는 함수
        let ok = window.confirm("나 사라져?T,T");
        if(ok){
            //console.log(nweetObj.docId)
            let data =  dbService.collection('nweets').doc(nweetObj.docId).delete();
            console.log(data);
        }
    };



    return (
      <div style={textStyle}>
        {isEdit ? (
           <span>
             <input type="text" value={newText} onChange={(event) => {
               setNewText(event.target.value);
             }}/>
             {/*value값에 {newTextf를 넣어주는 이유는 state값이 변경되지 않기때문에
             상단에서 const로 useState로 선언해주고 그 변수를 넣어주는 것임!!*/}
             <input type="button" value="오케바리" onClick={async (event) => {
               await dbService.collection('nweets').doc(nweetObj.docId).update({
                text:newText,
              });
              setIsEdit(false);
             }} />
           </span>
        ) : (
          <span>{nweetObj.text} ({nweetObj.email}) </span>
        )}
       
        {userObj.uid === nweetObj.createId ? 
            (<div>
                <button onClick={onDeleteClick}>사라져</button> 
                <button onClick={(event)=>{//익명함수
                  //alert(nweetObj.text);
                  // let newText = window.prompt('이름을 입력하삼', '희연쓰');
                  // dbService.collection('nweets').doc(nweetObj.docId).update({
                  //   text:newText,
                  // });

                  // 수정버튼을 누르면 ...text가 input창으로 변경
                  setIsEdit(!isEdit); //isEdit의 값을 NOT으로 변경해줌
                }}>
                  {isEdit ? '취소하께~' :'바꿀래'} </button> <br />                
            </div>):(<div></div>)   // 참이면 : 이전내용을 보여주고, 거짓이면 : 이하내용을 보여준당
        }
      </div>
    );
  };
  
  export default Nweet;