import { NativeModules, NativeEventEmitter } from 'react-native';

const Volume = NativeModules.Volume;
const Location = NativeModules.Location;

//const eventEmitter = new NativeEventEmitter(Volume);
const locationEventEmitter = new NativeEventEmitter(Location);

export class SystemSettingsUtil {
  /**
   * Retrieves device system volume. Returned value is float between 0 and 1. 0 is mute, 1 is max volume
   * @param {String} type The type of volume to retrieve. Possible values are 'music', 'call', 'system', 'ring',
   * 'alarm', 'notification', default is 'music'.
   */
  static async getVolume(type = 'music') {
    return await Volume.getVolume(type);
  }

  /**
   * Set the system volume by specified value, from 0 to 1. 0 is mute, and 1 is max volume.
   * @param {Number} val A number between 0 and 1 representing how loud the volume should be.
   * @param {Object} config Object with optional properties:
   *   - playSound - whether to play a sound when changing the volume, default is false
   *   - type - the type of volume to set. must be one of 'music', 'call', 'system', 'ring', 'alarm', 'notification', default is 'music'
   *   - showUI - Show a toast containing the current volume, default is false
   */
  static setVolume(val, config = {}) {
    config = Object.assign({
        playSound: false,
        type: 'music',
        showUI: false
    }, config);
    Volume.setVolume(val, config);
  }

  /**
   * Returns if device's system location setting is enabled.
   */
  static async isLocationEnabled() {
    return await Location.isLocationEnabled();
  }

  static async addLocationListener(callback) {
    return await SystemSettingsUtil._addListener('location', 'EventLocationChange', callback);
  }

  static removeLocationListener(listener) {
    listener && locationEventEmitter.removeListener('EventLocationChange', listener);
  }

  static async _addListener(type, eventName, callback) {
    const result = await SystemSettingsUtil._activeListener(type);
    if (result) {
        return locationEventEmitter.addListener(eventName, callback)
    }

    return null;
  }

  static async _activeListener(name) {
    try {
      await Location.activeLocationListener()
    } catch (e) {
      console.warn(e.message)
      return false;
    }
    
    return true;
  }
}
