import uuid from 'react-native-uuid';


export const generateRandomUuid = () => {
    return uuid.v4();
}