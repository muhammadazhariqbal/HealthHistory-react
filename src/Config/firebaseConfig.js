import firebase from '../../node_modules/firebase'
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/firebase-auth'

var firebaseConfig = {
  apiKey: "AIzaSyCYwwMnqCNBMiMOgfBaT1Zz1vsoGc_9x-s",
  authDomain: "healthhistory-webapp.firebaseapp.com",
  projectId: "healthhistory-webapp",
  storageBucket: "healthhistory-webapp.appspot.com",
  messagingSenderId: "1076867942612",
  appId: "1:1076867942612:web:9513daf59a59698bc6d341"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth()
const db = firebase.firestore()
const register = (email,password) =>{
 
return auth.createUserWithEmailAndPassword(email,password)
}
const signIn = (email,password) =>{
  return auth.signInWithEmailAndPassword(email,password)
}
const saveData = (fullName,healthStatus,diseaseName) =>{
   if(diseaseName){
     var userData={
      fullName,
      healthStatus,
      diseaseName
   
      
     }
   } else {
  var userData={
      fullName,
      healthStatus,
      diseaseName:"--"
     
      
     }
   }
  return db.collection("Data").add(userData)

}
const onAuthStateCheck = (user) =>{
  auth.onAuthStateChanged(user)
}
const signOutUser = () =>{
  return auth.signOut()
}
const gettingUserData = () =>{
  return new Promise ((resolve, reject)=>{
    db.collection('Data').get()
    .then((snapshot)=>{
      const users = [];
      snapshot.forEach((doc) => {
        
        users.push({ ...doc.data()});
      });
      resolve(users);
    })
  })
}
export {register,signIn,saveData,onAuthStateCheck,signOutUser,gettingUserData}