/**
 * Created by Dvir on 1/16/2018.
 */
import { ref } from 'config/constants';

function saveToDucks(duck) {
 const duckId = ref.child('ducks').push().key;
 const duckPromise = ref.child(`ducks/${duckId}`).set({...duck, duckId});

 return {
     duckId,
     duckPromise,
 };
}

function saveToUserDucks(duck, duckId) {
    return ref.child(`usersDucks/${duck.uid}/${duckId}`)
        .set({...duck, duckId});
}

function saveLikeCount(duck, duckId) {
    return ref.child(`likeCount/${duckId}`)
        .set({...duck, duckId});
}

export function saveDuck(duck) {
    const { duckId, duckPromise } = saveToDucks(duck);

    return Promise.all([
        duckPromise,
        saveToUserDucks(duck, duckId),
        saveLikeCount(duck, duckId),
    ]).then(() => ({...duck, duckId}));
}

export function fetchUserLikes(uid) {
    return ref.child(`userLikes/${uid}`).once('value')
        .then((snapshot) => snapshot.val() || {});
}

export function saveToUsersLikes (uid, duckId) {
    return ref.child(`userLikes/${uid}/${duckId}`).set(true);
}

export function deleteFromUsersLikes (uid, duckId) {
    return ref.child(`userLikes/${uid}/${duckId}`).set(null);
}

export function incrementNumberOfLikes (duckId) {
    return ref.child(`likeCount/${duckId}`)
        .transaction((currentValue) => currentValue + 1);
}

export function decrementNumberOfLikes  (duckId) {
    return ref.child(`likeCount/${duckId}`)
        .transaction((currentValue) => currentValue - 1);
}

export function listenToFeed(successCB, errorCB) {
    ref.child('ducks').on('value', (snapshot) => {
        const feed = snapshot.val() || {};
        const sortedIds = Object.keys(feed).sort((a, b) => {
            return feed[b].timestamp - feed[a].timestamp;
        });
        successCB({feed, sortedIds});
    },errorCB);
}

export function fetchUser(uid) {
    return ref.child(`users/${uid}`).once('value')
        .then( (snapshot) => snapshot.val() || {});
}

export function fetchUsersDucks(uid) {
    return ref.child(`usersDucks/${uid}`).once('value')
        .then((snapshot) => snapshot.val() || {})
}