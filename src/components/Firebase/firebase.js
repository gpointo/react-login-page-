import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

const config = {
    apiKey: process.env.REACT_APP_API_KEY, 
    authDomain: "the-landlord-app-2b08e.firebaseapp.com",
    databaseURL: "https://the-landlord-app-2b08e.firebaseio.com",
    projectId: "the-landlord-app-2b08e",
    storageBucket: "the-landlord-app-2b08e.appspot.com",
    messagingSenderId: "976421319620",
    appId: "1:976421319620:web:47110dfd3ed7f7a3bbea91",
    measurementId: "G-6W2XJ2MHHR"
};

class Firebase {
  constructor() {
    app.initializeApp(config);

    /* Helper */

    this.serverValue = app.database.ServerValue;
    this.emailAuthProvider = app.auth.EmailAuthProvider;

    /* Firebase APIs */

    this.authy = app.auth();
    this.db = app.database();

    /* Social Sign In Method Provider */

    this.googleProvider = new app.auth.GoogleAuthProvider();
    this.facebookProvider = new app.auth.FacebookAuthProvider();
    this.twitterProvider = new app.auth.TwitterAuthProvider();
  }

  // *** Auth API ***

  doCreateUserWithEmailAndPassword = (email, password) =>
    this.authy.createUserWithEmailAndPassword(email, password);

  doSignInWithEmailAndPassword = (email, password) =>
    this.authy.signInWithEmailAndPassword(email, password);

  doSignInWithGoogle = () =>
    this.authy.signInWithPopup(this.googleProvider);

  doSignInWithFacebook = () =>
    this.authy.signInWithPopup(this.facebookProvider);

  doSignInWithTwitter = () =>
    this.authy.signInWithPopup(this.twitterProvider);

  doSignOut = () => this.authy.signOut().then( 
    localStorage.removeItem('authUser'),
 );

  doPasswordReset = email => this.authy.sendPasswordResetEmail(email);

  doSendEmailVerification = () =>
  this.authy.onAuthStateChanged(function(user) {
    user.sendEmailVerification({
      url: process.env.REACT_APP_CONFIRMATION_EMAIL_REDIRECT,
    });
  });


  doPasswordUpdate = password =>
    this.authy.currentUser.updatePassword(password);

  // *** Merge Auth and DB User API *** //

  onAuthUserListener = (next, fallback) =>
    this.authy.onAuthStateChanged(authUser => {
      if (authUser) {
        this.user(authUser.uid)
          .once('value')
          .then(snapshot => {
            const dbUser = snapshot.val();

            // default empty roles
            if (!dbUser.userType) {
              dbUser.userType = {};
            }

            // merge auth and db user
            authUser = {
              uid: authUser.uid,
              email: authUser.email,
              emailVerified: authUser.emailVerified,
              providerData: authUser.providerData,
              ...dbUser,
            };

            next(authUser);
          });
      } else {
        fallback();
      }
    });

  // *** User API ***

  user = uid => this.db.ref(`Users/${uid}`);

  users = () => this.db.ref('Users');

  // *** Message API ***

  message = uid => this.db.ref(`messages/${uid}`);

  messages = () => this.db.ref('messages');
}

export default Firebase;
