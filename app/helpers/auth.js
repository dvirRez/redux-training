/**
 * Created by Dvir on 1/15/2018.
 */
import { ref, firebaseAuth } from 'config/constants';
import firebase from 'firebase';

// export function auth() {
//     return new Promise((resolve, reject) => {
//         setTimeout(() => resolve({
//             name: 'Dag McGinnis',
//             avatar: 'https://pbs.twimg.com/profile_images/378800000605536525/891a881bde93a1fc3e289528fb859b96_400x400.jpeg',
//             uid: 'the-uid',
//         }), 2000);
//     });
// }

export function auth() {
    return firebaseAuth().signInWithPopup(new firebase.auth.FacebookAuthProvider());
}

export function checkIfAuthed(store) {
    return store.getState().users.isAuthed;
}

export function logout() {
    return firebaseAuth().signOut();
}

export function saveUser(user) {

    return ref.child(`users/${user.uid}`)
        .set(user)
        .then(() => {

            return user;
        });
}

