import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

const config = {
  apiKey: "AIzaSyByxHXKCTiLV_-JF_GzVdutzf3T-vLAvdU",
  authDomain: "landlord-app-483a9.firebaseapp.com",
  databaseURL: "https://landlord-app-483a9.firebaseio.com",
  projectId: "landlord-app-483a9",
  storageBucket: "landlord-app-483a9.appspot.com",
  messagingSenderId: "715826259596",
  appId: "1:715826259596:web:7bdcec56458d87513bfda9",
  measurementId: "G-2CHH3MYVKB"
};

class Firebase {
  constructor() {
    app.initializeApp(config);

    this.auth = app.auth();
    this.db = app.database();
  }

  // *** Auth API ***

  doCreateUserWithEmailAndPassword = (email, password) =>
    this.auth.createUserWithEmailAndPassword(email, password);

  doSignInWithEmailAndPassword = (email, password) =>
    this.auth.signInWithEmailAndPassword(email, password);

  doSignOut = () => this.auth.signOut();

  doPasswordReset = email => this.auth.sendPasswordResetEmail(email);

  doPasswordUpdate = password =>
    this.auth.currentUser.updatePassword(password);

  // *** User API ***

  user = uid => this.db.ref(`users/${uid}`);

  users = () => this.db.ref('users');
}

export default Firebase;
