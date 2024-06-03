export const generateUid = (str) =>{
    const parts = str.split('/')
    const uidStr = parts[6] + parts[7];
    const uid = uidStr.split('.gif')[0];

    return uid;
}