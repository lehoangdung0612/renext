import { clone, setWith, curry } from 'lodash/fp';
import ValidateLib from './validate';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import Toast from 'react-native-root-toast';

let toastCount = 0;

const defaultToastOption = {
  duration: Toast.durations.LONG,
  position: getStatusBarHeight(true),
  opacity: 0.9,
  onHide: () => {
    toastCount = Math.max(0, toastCount - 1);
  },
};

// TODO: refactor multi message
const getToastPosition = () =>
  defaultToastOption.position + Math.max(0, toastCount - 1) * 70;

const toastInfo = message => {
  // toastCount++;
  Toast.show(message, {
    ...defaultToastOption,
    position: getToastPosition(),
    backgroundColor: '#28C2FF',
  });
};

const toastSuccess = message => {
  // toastCount++;
  Toast.show(message, {
    ...defaultToastOption,
    position: getToastPosition(),
    backgroundColor: '#49D49D',
    // backgroundColor: '#6CC551',
  });
};

const toastWarning = message => {
  // toastCount++;
  Toast.show(message, {
    ...defaultToastOption,
    position: getToastPosition(),
    backgroundColor: '#EDB230',
  });
};

const toastError = message => {
  // toastCount++;
  Toast.show(message, {
    ...defaultToastOption,
    position: getToastPosition(),
    backgroundColor: '#8C1C13',
  });
};

const setIn = curry((obj, path, value) =>
  setWith(clone(obj), path, value, clone(obj)),
);

const getAnimatedId = (prefix, id) => `${prefix}-${id}`;

const getAnimateInputRangeFromLength = length => {
  if (length < 2) {
    return new Error('Length must be greater than 1');
  }
  const range = 1 / (length - 1);
  const result = [];
  let milestone = 0;
  for (let index = 0; index < length; index++) {
    result.push(milestone);
    milestone += range;
  }
  result[length - 1] = 1;
  return result;
};

const formatMacAddress = mac => {
  try {
    const macString = mac.toUpperCase();
    if (ValidateLib.isValidMacAddress(macString)) {
      return macString;
    }

    const convertMac = [];
    for (let i = 0; i < macString.length; i = i + 2) {
      convertMac.push(macString.substr(i, 2));
    }
    const macAddress = convertMac.join(':');
    return ValidateLib.isValidMacAddress(macAddress) ? macAddress : null;
  } catch (error) {
    return null;
  }
};

export default {
  toastInfo,
  toastSuccess,
  toastWarning,
  toastError,
  setIn,
  getAnimatedId,
  getAnimateInputRangeFromLength,
  formatMacAddress,
};
