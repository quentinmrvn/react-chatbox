import Rebase from "re-base";
import firebase from "firebase/app";
import "firebase/database";

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyB0EBBVjOpxwnIb3DZ4eEhGHC4h7oj5hwY",
    authDomain: "react-chatbox-cb05a.firebaseapp.com",
    databaseURL: "https://react-chatbox-cb05a.firebaseio.com",
})

const base = Rebase.createClass(firebase.database())

export {firebaseApp}
export default base