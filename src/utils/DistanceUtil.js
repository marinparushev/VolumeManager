import { Alert } from 'react-native';

import { AsyncStorageUtil } from './AsyncStorageUtil';

import { CONSTS } from '../constants';

export class DistanceUtil {
  static canAddProfile(profile) {
    const savedProfiles = AsyncStorageUtil.getCachedProfiles(),
          conflictingProfiles = [];

    let result = true; // by default profile can be added

    if (profile.name === CONSTS.default && savedProfiles.length > 0) {
      Alert.alert('Error! Cannot create another \'Default\' profile!');
    }

    for( let i = 0; i < savedProfiles.length; i++) {
      if (savedProfiles.name === CONSTS.default) {
        continue; // skip Default profile cause it doesn't conflict with any other profile
      }

      if (profile.name === savedProfiles[i].name) {
        Alert.alert('Error!', `Profile ${profile.name} already exists!`);
        return false;
      }

      const bOverlap = DistanceUtil._doProfileAreasOverlap(profile, savedProfiles[i]);

      // if profiles overlap
      if (bOverlap) {
        result = false; // profile cannot be added
        conflictingProfiles.push(savedProfiles[i].name);
      }
    }

    if (!result) {
      Alert.alert('Error!', `The profile you are trying to submit conflicts with profiles: ${conflictingProfiles.join(', ')}!`);
    }

    return result;
  }

  static canEditProfile(profile) {
    const savedProfiles = AsyncStorageUtil.getCachedProfiles(),
          conflictingProfiles = [];
    
    let result = true; // by default profile can be edited

    if (profile.name === CONSTS.default) {
      return true;
    }

    for( let i = 0; i < savedProfiles.length; i++) {
      if (profile.id === savedProfiles[i].id || savedProfiles[i].name === CONSTS.default) {
        continue;
      }

      if (profile.name === savedProfiles[i].name) {
        Alert.alert('Error!', `Profile ${profile.name} already exists!`);
        return false;
      }

      const bOverlap = DistanceUtil._doProfileAreasOverlap(profile, savedProfiles[i]);

      // if profiles overlap
      if (bOverlap) {
        result = false; // profile cannot be edited
        conflictingProfiles.push(savedProfiles[i].name);
      }
    }

    if (!result) {
      Alert.alert('Error!', `The profile you are trying to submit conflicts with profile(s): ${conflictingProfiles.join(', ')}!`);
    }

    return result;
  }

  static _doProfileAreasOverlap(profile1, profile2) {
    const dist = DistanceUtil.getDistanceInMetresBetweenEarthCoordinates(
                  profile1.latitude,
                  profile1.longitude,
                  profile2.latitude,
                  profile2.longitude), // distance between profile centers
          sumOfRadii = parseFloat(profile1.radius) + parseFloat(profile2.radius); // sum of profile radii

    if (dist <= sumOfRadii) {
      return true;
    } else {
      return false;
    }
  }

  static _degreesToRadians(degrees) {
    return degrees * Math.PI / 180;
  }

  static getDistanceInMetresBetweenEarthCoordinates(lat1d, lon1d, lat2d, lon2d) {
    const earthRadiusKm = 6371.0,
          sin = Math.sin,
          cos = Math.cos,
          asin = Math.asin,
          sqrt = Math.sqrt,
          lat1r = DistanceUtil._degreesToRadians(parseFloat(lat1d)),
          lon1r = DistanceUtil._degreesToRadians(parseFloat(lon1d)),
          lat2r = DistanceUtil._degreesToRadians(parseFloat(lat2d)),
          lon2r = DistanceUtil._degreesToRadians(parseFloat(lon2d)),
          u = sin((lat2r - lat1r)/2),
          v = sin((lon2r - lon1r)/2);
        
  return 2.0 * 1000 * earthRadiusKm * asin(sqrt(u * u + cos(lat1r) * cos(lat2r) * v * v));
  }
}
