import { initializeApp} from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyAACIffkXD1xJ_Yqor6V_f0KuoMtIumffQ",
    authDomain: "todo-list-f2cd1.firebaseapp.com",
    projectId: "todo-list-f2cd1",
    storageBucket: "todo-list-f2cd1.appspot.com",
    messagingSenderId: "769497093206",
    appId: "1:769497093206:web:3c3fb6346d26971bc8d7f7"
};
 
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);
  
export {db, storage};