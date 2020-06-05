import _ from 'lodash';
import Validator from 'validator';

const isValidEmail = email => {
  const regularExpression = /^.+@.+\..+$/i;
  return regularExpression.test(email);
};

const isValidPassword = password => {
  if (password.length < 8) {
    return false;
  }
  if (/^\d+$/.test(password)) {
    return false;
  }

  return true;
};

const isValidConfirmPassword = (password, confirmPassword) => {
  if (password === '' || confirmPassword === '') {
    return false;
  }

  return password === confirmPassword;
};

const isValidatePhone = phone => {
  if (phone === '') {
    return true;
  }
  const regularExpression = /^\d+$/i;
  return regularExpression.test(phone);
};

const isValidMacAddress = macAddress => {
  if (macAddress === '') {
    return false;
  }

  return Validator.isMACAddress(macAddress);
};

const isValidUrl = url => {
  const protocolRegex = /^((http|https):\/\/)/;
  if (typeof url !== 'string') {
    return false;
  }
  if (Validator.isURL(url) && protocolRegex.test(url)) {
    return true;
  }
  return false;
};

const isUTCDateString = string => {
  if (typeof string !== 'string') {
    return false;
  }
  if (Validator.isISO8601(string)) {
    return true;
  }
  return false;
};

const isValidCoordinate = coord => {
  if (typeof coord !== 'object') {
    return false;
  }
  if (coord === null) {
    return false;
  }
  if (
    typeof coord.latitude !== 'number' ||
    typeof coord.longitude !== 'number'
  ) {
    return false;
  }
  return true;
};

const isValidUsername = username => {
  if (typeof username !== 'string' || username.trim() === '') {
    return false;
  }
  const regularExpression = /^[A-Za-z0-9_@.+-]{2,150}$/;
  return regularExpression.test(username);
};

const isValidToken = token => {
  return token && typeof token === 'string' && Validator.isJWT(token);
};

export default {
  isValidEmail,
  isValidPassword,
  isValidConfirmPassword,
  isValidatePhone,
  isValidMacAddress,
  isValidUrl,
  isUTCDateString,
  isValidCoordinate,
  isValidUsername,
  isValidToken,
};
