import firebase from "firebase/app";
import "firebase/storage";

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyA91dXvW_z-Q8gnE2bU93Hpj8Swjggx1hQ",
  authDomain: "elsabor-e6312.firebaseapp.com",
  databaseURL: "https://elsabor-e6312.firebaseio.com",
  projectId: "elsabor-e6312",
  storageBucket: "elsabor-e6312.appspot.com",
  messagingSenderId: "319493544435",
  appId: "1:319493544435:web:ac6e1875fb92d55d791a86",
  measurementId: "G-M7BGCL8CXF",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
//firebase.analytics();
const storage = firebase.storage();

export { storage, firebase as default };
