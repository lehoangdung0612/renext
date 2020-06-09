import { Alert, Platform } from 'react-native';
import RNAndroidLocationEnabler from 'react-native-android-location-enabler';
import BluetoothStateManager from 'react-native-bluetooth-state-manager';
import {
  check,
  openSettings,
  PERMISSIONS,
  request,
  RESULTS,
} from 'react-native-permissions';
import I18nLib from './i18n';
import util from './util';

const permissionType = {
  BLUETOOTH: 'bluetooth',
  LOCATION: 'location',
  STORAGE: 'storage',
  CAMERA: 'camera',
  LOCATION_SERVICE_IOS: 'location_service',
};

const isGranted = state => state === RESULTS.GRANTED;

const isDenied = state => state === RESULTS.DENIED;

const isBlocked = state => state === RESULTS.BLOCKED;

const isUnavailable = state => state === RESULTS.UNAVAILABLE;

const checkPermission = permission =>
  new Promise(async (resolve, reject) => {
    try {
      const permissionStatus = await check(permission);
      switch (permissionStatus) {
        case RESULTS.DENIED:
        case RESULTS.GRANTED:
          return resolve(permissionStatus);
        case RESULTS.BLOCKED:
        case RESULTS.UNAVAILABLE:
          return reject(permissionStatus);

        default:
          return reject(permissionStatus);
      }
    } catch (error) {
      return reject();
    }
  });

const requestLocationPermissionIOS = (showMessage = false, force = false) =>
  new Promise(async (resolve, reject) => {
    try {
      await checkPermission(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);
      const result = await request(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);
      switch (result) {
        case RESULTS.BLOCKED:
        case RESULTS.DENIED:
          showMessage &&
            util.toastWarning(I18nLib.t('global.locationPermissionBlock'));
          break;
        case RESULTS.GRANTED:
        default:
          break;
      }
      return resolve(result);
    } catch (err) {
      try {
        await checkPermission(PERMISSIONS.IOS.LOCATION_ALWAYS);
        const result = await request(PERMISSIONS.IOS.LOCATION_ALWAYS);
        switch (result) {
          case RESULTS.BLOCKED:
          case RESULTS.DENIED:
            showMessage &&
              util.toastWarning(I18nLib.t('global.locationPermissionBlock'));
            break;
          case RESULTS.GRANTED:
          default:
            break;
        }
        return resolve(result);
      } catch (error2) {
        if (force && (isBlocked(error2) || isUnavailable(error2))) {
          return alertLocationPermission(error2)
            .then(() => resolve(error2))
            .catch(() => reject());
        }
        if (isBlocked(error2) || isUnavailable(error2)) {
          return resolve(error2);
        }
        showMessage &&
          util.toastWarning(I18nLib.t('global.locationPermissionUnavailable'));
        return reject();
      }
    }
  });

const requestLocationPermissionAndroid = (showMessage = false, force = false) =>
  new Promise(async (resolve, reject) => {
    try {
      await checkPermission(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
      const result = await request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
      if (result === RESULTS.BLOCKED || result === RESULTS.DENIED) {
        showMessage &&
          util.toastWarning(I18nLib.t('global.locationPermissionBlock'));
      }
      return resolve(result);
    } catch (error) {
      if (force && (isBlocked(error) || isUnavailable(error))) {
        return alertLocationPermission(error)
          .then(() => resolve(error))
          .catch(() => reject());
      }
      if (isBlocked(error) || isUnavailable(error)) {
        return resolve(error);
      }
      showMessage &&
        util.toastWarning(I18nLib.t('global.locationPermissionUnavailable'));
      return reject();
    }
  });

const requestPhotoPermissionIOS = (showMessage = false, force = false) =>
  new Promise(async (resolve, reject) => {
    try {
      await checkPermission(PERMISSIONS.IOS.PHOTO_LIBRARY);
      const result = await request(PERMISSIONS.IOS.PHOTO_LIBRARY);
      switch (result) {
        case RESULTS.BLOCKED:
        case RESULTS.DENIED:
          showMessage &&
            util.toastWarning(I18nLib.t('global.photoPermissionBlock'));
          break;

        case RESULTS.GRANTED:
        default:
          break;
      }
      return resolve(result);
    } catch (error) {
      if (force && (isBlocked(error) || isUnavailable(error))) {
        return alertStoragePermission(error)
          .then(() => resolve(error))
          .catch(() => reject());
      }
      if (isBlocked(error) || isUnavailable(error)) {
        return resolve(error);
      }
      showMessage &&
        util.toastWarning(I18nLib.t('global.photoPermissionUnavailable'));
      return reject();
    }
  });

const requestStoragePermissionAndroid = (showMessage = false, force = false) =>
  new Promise(async (resolve, reject) => {
    try {
      await checkPermission(PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE);
      const result = await request(PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE);
      switch (result) {
        case RESULTS.BLOCKED:
        case RESULTS.DENIED:
          showMessage &&
            util.toastWarning(I18nLib.t('global.storagePermissionBlock'));
          break;

        case RESULTS.GRANTED:
        default:
          break;
      }
      return resolve(result);
    } catch (error) {
      if (force && (isBlocked(error) || isUnavailable(error))) {
        return alertStoragePermission()
          .then(() => resolve(error))
          .catch(() => reject());
      }
      if (isBlocked(error) || isUnavailable(error)) {
        return resolve(error);
      }
      showMessage &&
        util.toastWarning(I18nLib.t('global.storagePermissionUnavailable'));
      return reject();
    }
  });

const requestCameraPermissionIOS = (showMessage = false, force = false) =>
  new Promise(async (resolve, reject) => {
    try {
      await checkPermission(PERMISSIONS.IOS.CAMERA);
      const result = await request(PERMISSIONS.IOS.CAMERA);
      switch (result) {
        case RESULTS.BLOCKED:
        case RESULTS.DENIED:
          showMessage &&
            util.toastWarning(I18nLib.t('global.cameraPermissionBlock'));
          break;

        case RESULTS.GRANTED:
        default:
          break;
      }
      return resolve(result);
    } catch (error) {
      if (force && (isBlocked(error) || isUnavailable(error))) {
        return alertCameraPermission(error)
          .then(() => resolve(error))
          .catch(() => reject());
      }
      if (isBlocked(error) || isUnavailable(error)) {
        return resolve(error);
      }
      showMessage &&
        util.toastWarning(I18nLib.t('global.cameraPermissionUnavailable'));
      return reject();
    }
  });

const requestCameraPermissionAndroid = (showMessage = false, force = false) =>
  new Promise(async (resolve, reject) => {
    try {
      await checkPermission(PERMISSIONS.ANDROID.CAMERA);
      const result = await request(PERMISSIONS.ANDROID.CAMERA);
      switch (result) {
        case RESULTS.BLOCKED:
        case RESULTS.DENIED:
          showMessage &&
            util.toastWarning(I18nLib.t('global.cameraPermissionBlock'));
          break;

        case RESULTS.GRANTED:
        default:
          break;
      }
      return resolve(result);
    } catch (error) {
      if (force && (isBlocked(error) || isUnavailable(error))) {
        return alertCameraPermission(error)
          .then(() => resolve(error))
          .catch(() => reject());
      }
      if (isBlocked(error) || isUnavailable(error)) {
        return resolve(error);
      }
      showMessage &&
        util.toastWarning(I18nLib.t('global.cameraPermissionUnavailable'));
      return reject();
    }
  });

const alertBluetoothSetting = () =>
  new Promise(async (resolve, reject) => {
    try {
      return Alert.alert(
        '',
        I18nLib.t('global.alertBluetoothTurnOn'),
        [
          {
            text: 'Deny',
            onPress: () => {
              return reject();
            },
          },
          {
            text: 'Allow',
            onPress: () => {
              BluetoothStateManager.enable();
              util.toastSuccess(I18nLib.t('global.bluetoothIsOn'));
              return resolve();
            },
          },
        ],
        {
          cancelable: false,
        },
      );
    } catch (error) {
      return reject();
    }
  });

const alertAppPermission = permission =>
  new Promise(async (resolve, reject) => {
    try {
      let description;
      switch (permission) {
        case permissionType.BLUETOOTH:
          description = I18nLib.t('global.alertBluetoothPermission');
          break;
        case permissionType.LOCATION:
          description = I18nLib.t('global.alertLocationPermission');
          break;
        case permissionType.LOCATION_SERVICE_IOS:
          description = I18nLib.t('global.alertLocationServiceIOS');
          break;
        case permissionType.STORAGE:
          description = I18nLib.t('global.alertStoragePermission');
          break;
        case permissionType.CAMERA:
          description = I18nLib.t('global.alertCameraPermission');
          break;
        default:
          return reject();
      }
      Alert.alert(
        '',
        description,
        [
          {
            text: 'Deny',
            onPress: () => {
              return reject();
            },
          },
          {
            text: 'Allow',
            onPress: async () => {
              await openSettings();
              return resolve();
            },
          },
        ],
        {
          cancelable: false,
        },
      );
    } catch (error) {
      return reject();
    }
  });

const requestBluetoothPermission = () =>
  new Promise(async (resolve, reject) => {
    try {
      const bluetoothState = await BluetoothStateManager.getState();
      switch (bluetoothState) {
        case 'PoweredOn':
          return resolve();
        case 'PoweredOff':
          if (Platform.OS === 'ios') {
            util.toastError(I18nLib.t('global.bluetoothIsPoweredOff'));
            return reject();
          } else {
            await alertBluetoothSetting();
            return resolve();
          }
        case 'Unauthorized':
          await alertAppPermission(permissionType.BLUETOOTH);
          return resolve();
        default:
          util.toastError(I18nLib.t('global.bluetoothPermissionBlock'));
          return reject();
      }
    } catch (error) {
      util.toastError(I18nLib.t('global.bluetoothPermissionBlock'));
      return reject();
    }
  });

const requestLocationPermissionAlways = () =>
  new Promise(async resolve => {
    try {
      let result;
      if (Platform.OS === 'android') {
        result = await requestLocationPermissionAndroid(true, true);
      } else {
        result = await requestLocationPermissionIOS(true, true);
      }
      return resolve(result);
    } catch (error) {
      if (isUnavailable(error)) {
        return resolve(RESULTS.UNAVAILABLE);
      }
      return resolve(RESULTS.BLOCKED);
    }
  });

const requestStoragePermissionAlways = () =>
  new Promise(async resolve => {
    try {
      let result;
      if (Platform.OS === 'android') {
        result = await requestStoragePermissionAndroid(true, true);
      } else {
        result = await requestPhotoPermissionIOS(true, true);
      }
      return resolve(result);
    } catch (error) {
      if (isUnavailable(error)) {
        return resolve(RESULTS.UNAVAILABLE);
      }
      return resolve(RESULTS.BLOCKED);
    }
  });

const requestCameraPermissionAlways = () =>
  new Promise(async resolve => {
    try {
      let result;
      if (Platform.OS === 'android') {
        result = await requestCameraPermissionAndroid(true, true);
      } else {
        result = await requestCameraPermissionIOS(true, true);
      }
      return resolve(result);
    } catch (error) {
      if (isUnavailable(error)) {
        return resolve(RESULTS.UNAVAILABLE);
      }
      return resolve(RESULTS.BLOCKED);
    }
  });

const alertLocationPermission = state =>
  new Promise(async (resolve, reject) => {
    try {
      await alertAppPermission(
        isUnavailable(state) && Platform.OS === 'ios'
          ? permissionType.LOCATION_SERVICE_IOS
          : permissionType.LOCATION,
      );
      return resolve();
    } catch (error) {
      util.toastInfo(I18nLib.t('global.shouldAllowLocationPermission'));
      return reject(error);
    }
  });

const alertStoragePermission = () =>
  new Promise(async (resolve, reject) => {
    try {
      await alertAppPermission(permissionType.STORAGE);
      return resolve();
    } catch (error) {
      if (Platform.OS === 'android') {
        util.toastError(I18nLib.t('global.storagePermissionBlock'));
      } else {
        util.toastError(I18nLib.t('global.photoPermissionBlock'));
      }
      return reject(error);
    }
  });

const alertCameraPermission = () =>
  new Promise(async (resolve, reject) => {
    try {
      await alertAppPermission(permissionType.CAMERA);
      return resolve();
    } catch (error) {
      util.toastError(I18nLib.t('global.cameraPermissionBlock'));
      return reject(error);
    }
  });

const alertEnableLocationAndroid = (showInfoMsg = false) =>
  new Promise(async (resolve, reject) => {
    if (Platform.OS === 'ios') {
      return resolve();
    }
    try {
      const data = await RNAndroidLocationEnabler.promptForEnableLocationIfNeeded(
        {
          interval: 10000,
          fastInterval: 5000,
        },
      );
      //  - "enabled" if user has clicked on OK button in the popup
      if (data === 'enabled') {
        util.toastSuccess(I18nLib.t('global.locationIsOn'));
      }
      return resolve(data);
    } catch (error) {
      if (showInfoMsg) {
        util.toastInfo(I18nLib.t('global.youTurnOffLocation'));
      } else {
        util.toastError(I18nLib.t('global.locationIsOff'));
      }
      return reject(error);
    }
  });

export default {
  requestLocationPermissionIOS,
  requestLocationPermissionAndroid,
  requestPhotoPermissionIOS,
  requestStoragePermissionAndroid,
  requestBluetoothPermission,
  requestLocationPermissionAlways,
  requestStoragePermissionAlways,
  requestCameraPermissionAlways,
  alertEnableLocationAndroid,
  isGranted,
  isDenied,
  isBlocked,
  isUnavailable,
};
