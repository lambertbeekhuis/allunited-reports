import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'

// below from https://savvyapps.com/blog/definitive-guide-building-web-app-vuejs-firebase does not work
// looked into https://www.npmjs.com/package/firebase, found the above single line that loads all


// firebase init - add your own config here
const firebaseConfig = {
    apiKey: process.env.VUE_APP_FIREBASE_API_KEY,
    authDomain:    process.env.VUE_APP_FIREBASE_PROJECT_ID + ".firebaseapp.com",
    databaseURL:   process.env.VUE_APP_FIREBASE_PROJECT_ID + ".firebaseio.com",
    projectId:     process.env.VUE_APP_FIREBASE_PROJECT_ID,
    storageBucket: process.env.VUE_APP_FIREBASE_PROJECT_ID + "appspot.com",
    messagingSenderId: process.env.VUE_APP_FIREBASE_MESSAGING_SENDER_ID,
    appId:         process.env.VUE_APP_FIREBASE_APP_ID,
    measurementId: process.env.VUE_APP_FIREBASE_MEASUREMENT_ID
}
firebase.initializeApp(firebaseConfig)

// utils
const db = firebase.firestore()
const auth = firebase.auth()

// collection references
const usersCollection = db.collection('users')
//const postsCollection = db.collection('posts')
//const commentsCollection = db.collection('comments')
//const likesCollection = db.collection('likes')

// export utils/refs
export {
    db,
    auth,
    usersCollection,
//    postsCollection,
//    commentsCollection,
//    likesCollection
}