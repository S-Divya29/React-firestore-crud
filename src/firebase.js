import firebase from 'firebase';

  // Initialize Firebase
  
  var firebaseApp = firebase.initializeApp({
    //config

  })
  
  var db = firebaseApp.firestore();
  export {db};