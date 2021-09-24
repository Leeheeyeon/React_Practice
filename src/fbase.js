import firebase from "firebase/app";
import "firebase/auth";
import "firebase/storage";
import "firebase/firestore"
// 개별 export해서 사용하려면 각각의 기능들을 import해줘야 한다.

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID
};

// export default firebase.initializeApp(firebaseConfig);
// default 면 전체를 다 반환함

firebase.initializeApp(firebaseConfig);
//export const firebase;
export const authService = firebase.auth();
export const dbService = firebase.firestore();
export const storageService = firebase.storage();
export const firebaseInstance = firebase;
// 여러개의 컴포넌트를 반환하기 위해 각각 따로 코드 작성하는 것!
// ()를 붙인 것은 메소드이고, ()를 안붙인 firebase는 객체임다