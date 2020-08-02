import intlHelper from './intlHelper';
import validationMessages from '../validationMessages';
// import notifyMessages from "../notifyMessages";

export function validateMessage(code) {
  try {
    const obj = JSON.parse(code);
    return validationMessages.hasOwnProperty(obj.code)
      ? intlHelper(validationMessages[obj.code], { ...obj })
      : intlHelper(validationMessages.error);
  } catch (e) {
    return validationMessages.hasOwnProperty(code)
      ? intlHelper(validationMessages[code])
      : intlHelper(validationMessages.error);
  }
}

// export function getNotifyMessages(code, values) {
//   return notifyMessages.hasOwnProperty(`notify${code}`) ? intlHelper(notifyMessages[`notify${code}`], values) : intlHelper(notifyMessages.notify3);
// }
