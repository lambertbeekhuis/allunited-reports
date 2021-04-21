import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'

// below from https://savvyapps.com/blog/definitive-guide-building-web-app-vuejs-firebase does not work
// looked into https://www.npmjs.com/package/firebase, found the above single line that loads all

// firebase init - add your own config here
const firebaseConfig = {
    apiKey: "AIzaSyBt1Ii5_Pp6PHeIpwrJVMb8rKdfLntLlHA",
    authDomain: "allunited-reporting.firebaseapp.com",
    databaseURL: '',
    projectId: "allunited-reporting",
    storageBucket: "allunited-reporting.appspot.com",
    messagingSenderId: "1012007979214",
    appId: "1:1012007979214:web:b6cb0c0cae535fda51689f",
    measurementId: "G-GZ2YF0Z5MD"
}
firebase.initializeApp(firebaseConfig)

// utils
// const db = firebase.firestore()
const auth = firebase.auth()

// collection references
//const usersCollection = db.collection('users')
//const postsCollection = db.collection('posts')
//const commentsCollection = db.collection('comments')
//const likesCollection = db.collection('likes')

// export utils/refs
export {
//    db,
    auth,
//    usersCollection,
//    postsCollection,
//    commentsCollection,
//    likesCollection
}