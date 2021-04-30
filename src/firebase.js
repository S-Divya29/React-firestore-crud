import firebase from 'firebase';

  // Initialize Firebase
  
  var firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyBoi-r0LJ7qBIDRAlmCUDfbGoGGQCElY2E",
    authDomain: "react-contact-form-92178.firebaseapp.com",
    projectId: "react-contact-form-92178",
    storageBucket: "react-contact-form-92178.appspot.com",
    messagingSenderId: "886762439986",
    appId: "1:886762439986:web:5465d9eb8ce66e4d52832b"


  })
  
  var db = firebaseApp.firestore();
  export {db};