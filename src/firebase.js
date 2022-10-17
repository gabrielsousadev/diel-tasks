import firebase from 'firebase/compat/app';
import 'firebase/compat/database';

const firebaseConfig = {

    apiKey: "AIzaSyBY4ugi1P-6raVIXBkSOMNZgR9uXc-wEIs",
  
    authDomain: "desafio-diel-tasks.firebaseapp.com",
  
    databaseURL: "https://desafio-diel-tasks-default-rtdb.firebaseio.com",
  
    projectId: "desafio-diel-tasks",
  
    storageBucket: "desafio-diel-tasks.appspot.com",
  
    messagingSenderId: "640403504568",
  
    appId: "1:640403504568:web:5d88d56f08a7e057e8234d"
  
  };
   

  const fireDb = firebase.initializeApp(firebaseConfig);

  export default fireDb.database().ref();
  