import AsyncStorage from '@react-native-community/async-storage';

const setItem = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, value);
  } catch (e) {
    console.log(e.stack);
  }
};

const getItem = async key => {
  let value = '';
  try {
    value = await AsyncStorage.getItem(key);
  } catch (e) {
    console.log(e.stack);
  }
  return value;
};

export { setItem, getItem };
