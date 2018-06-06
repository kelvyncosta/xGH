import * as firebase from 'firebase';

const config = {
  apiKey: "AIzaSyCXDiqq1CviZiIjJxn6u-6oOGsN_sfw_vQ",
  authDomain: "xgh-devteam.firebaseapp.com",
  databaseURL: "https://xgh-devteam.firebaseio.com",
  projectId: "xgh-devteam",
  storageBucket: "xgh-devteam.appspot.com",
  messagingSenderId: "178107275627"
};

if (!firebase.apps.length)
  firebase.initializeApp(config);

const database = firebase.database();

export { database };

// export const getUsers = () => {
//   let ref = database.ref("/users");

//   ref.on("value", (snapshot) => {
//     console.log(JSON.stringify(snapshot.val()));
//   },
//   (error) => {
//     console.log("Error: " + error.code);
//   })
// }