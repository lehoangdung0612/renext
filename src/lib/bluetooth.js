import _ from 'lodash';
import { MTBeaconPlusManager, State } from 'react-native-mtbeacon-plus';

const bluetoothState = {
  isActiveScan: false,
  isScanning: false,
  devices: [],
  scanHandler: null,
};

const getDeviceInfo = device => ({
  id: device.id,
  mac: formatMacAddress(device.mac),
  name: device.name,
  rssi: device.rssi,
  battery_health: device.battery,
  connectable: device.connectable,
  iBeacon: device.iBeacon,
  accSensor: device.accSensor,
});

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

class BluetoothModule {
  constructor() {
    this.beaconPlusManager = new MTBeaconPlusManager();
    this.State = State;
  }

  activeScan = (handler, configs) => {
    this.startScan(handler, 'active', configs);
  };

  passiveScan = (handler, configs) => {
    this.startScan(handler, 'passive', configs);
  };

  startScan = (handler, scanType, configs = {}) => {
    try {
      if (this.isScanning()) {
        this.abortScan();
      }

      this.beaconPlusManager.startScan(devices => {
        bluetoothState.devices = devices.map(device => getDeviceInfo(device));
        if (typeof handler === 'function') {
          const listDevices = this.listDevices();
          handler(listDevices);
        }
      });

      bluetoothState.devices.splice(0, bluetoothState.devices.length);
      bluetoothState.isScanning = true;
      bluetoothState.scanHandler = handler;
      switch (scanType) {
        case 'passive':
          bluetoothState.isActiveScan = false;
          break;
        default:
          bluetoothState.isActiveScan = true;
          break;
      }
    } catch (error) {
      if (__DEV__) {
        console.log(error);
      }
      this.abortScan();
    }
  };

  abortScan = () => {
    try {
      bluetoothState.isScanning = false;
      bluetoothState.isActiveScan = false;
      bluetoothState.scanHandler = null;
      this.beaconPlusManager.stopScan();
    } catch (error) {
      if (__DEV__) {
        console.log(error);
      }
    }
  };

  isActiveScan = () => bluetoothState.isActiveScan;

  isScanning = () => bluetoothState.isScanning;

  listDevices = () => {
    return _.cloneDeep(bluetoothState.devices);
  };

  setOnStateChange = func => {
    if (typeof func === 'function') {
      this.beaconPlusManager.onStateChange(state => {
        func(state);
      }, false);
    }
  };

  removeOnStateChange = () => {
    this.beaconPlusManager.offStateChange();
  };

  getState = () =>
    new Promise(async (resolve, reject) => {
      try {
        const state = await this.beaconPlusManager.state();
        resolve(state);
      } catch (error) {
        if (__DEV__) {
          console.log(error);
        }
        reject();
      }
    });
}

const bluetoothModule = new BluetoothModule();
export default bluetoothModule;