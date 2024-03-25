import AsyncStorage from '@react-native-async-storage/async-storage';

export const storeData = async (key, value) => {
    try {
        await AsyncStorage.setItem(key, value);
    } catch (e) {
        // saving error
        console.log('e error while setting data', e)
    }
};

export const getData = async (key) => {
    try {
        const value = await AsyncStorage.getItem(key);
        return value; // Return the value if it exists
    } catch (e) {
        console.error('Error while fetching data:', e);
        return null; // Return null in case of an error
    }
};
// export default { storeData, getData }