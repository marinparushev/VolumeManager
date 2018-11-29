import { AsyncStorage } from 'react-native';

const PROFILES_KEY = '@VolumeManager:profiles';
const ACTIVE_PROFILE_KEY = '@VolumeManager:activeProfileId'

export class AsyncStorageUtil {
  constructor() {
    this.profiles = [];
  }

  static getCachedProfiles() {
    return this.profiles;
  }

  static async getProfiles() {
    const profilesData = await AsyncStorage.getItem(PROFILES_KEY);

    this.profiles = JSON.parse(profilesData) || [];

    return this.profiles;
  }

  static async setProfiles(profilesArr) {
    await AsyncStorage.setItem(PROFILES_KEY, JSON.stringify(profilesArr));

    this.profiles = profilesArr;
  }

  static async getActiveProfileId() {
    const id = await AsyncStorage.getItem(ACTIVE_PROFILE_KEY);

    return id;
  }

  static async setActiveProfileId(id) {
    await AsyncStorage.setItem(ACTIVE_PROFILE_KEY, id.toString());
  }
}
