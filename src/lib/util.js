import { clone, setWith, curry } from 'lodash/fp';
import ValidateLib from './validate';

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
  setIn,
  getAnimatedId,
  getAnimateInputRangeFromLength,
  formatMacAddress,
};
