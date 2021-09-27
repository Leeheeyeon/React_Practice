import './List.css';
import { dbService } from 'fbase';
import { Component } from 'react';


class List extends Component{
    render(){
        let saramlist = []
        dbService.collection("saram").get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                saramlist.push({
                    NUM : doc.id, 
                    NAME : doc.data().name, 
                    EMAIL : doc.data().email, 
                    AGE : doc.data().age, 
                    ID : doc.data().id
                });
            });
        });
        
        const sarammap = saramlist.map((saram, index) => (<li key={index}>{saram}</li>));
        console.log(saramlist(1))
        return (
            <>  
            <table>
                <tr>
                    <th>번호</th>
                    <th>이름</th>
                    <th>이메일</th>
                    <th>나이</th>
                    <th>id</th>
                </tr>
                <div id="app">
                    {saramlist}
                </div>
            </table>
            </>
        );
    };
}

export default List;
