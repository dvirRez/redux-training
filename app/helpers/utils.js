/**
 * Created by Dvir on 1/16/2018.
 */
import { usersDucksExpirationLength, userExpirationLength } from 'config/constants';

export function formatUserInfo(uid, photoURL, displayName) {
    return {
        name: displayName,
        avatar: photoURL,
        uid,
    };
}
export function formatDuck(text, {name, avatar, uid}) {
    return {
        text,
        name,
        avatar,
        uid,
        timestamp: Date.now(),
    };
}

export function formatTimestamp(timestamp) {
    const currentDate = new Date(timestamp);

    return `${currentDate.getDate()}/${currentDate.getMonth() + 1}/${currentDate.getFullYear()}`;
}

function getMiliSeconds(timestamp) {
    return new Date().getTime() - new Date(timestamp).getTime();
}
export function staleUser(timestamp) {
 return getMiliSeconds(timestamp) > userExpirationLength;
}

export function staleDucks(timestamp) {
    return getMiliSeconds(timestamp) > usersDucksExpirationLength;
}

export function formatReply ({name, uid, avatar}, reply) {
    return {
        name,
        reply,
        uid,
        timestamp: Date.now(),
        avatar,
    }
}