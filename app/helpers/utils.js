/**
 * Created by Dvir on 1/16/2018.
 */
export function formatUserInfo({uid, photoURL, displayName}) {
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