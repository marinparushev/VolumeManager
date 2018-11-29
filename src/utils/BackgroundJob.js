import { AsyncStorageUtil } from './AsyncStorageUtil';
import BackgroundJob from 'react-native-background-job';
import { DistanceUtil } from './DistanceUtil';

import { SystemSettingsUtil } from '../utils/SystemSettingsUtil';

import CONSTS from '../constants';

const CHANGE_VOLUME_JOB = 'changeVolumeJob';

export class BackgroundJobUtil {
  static run() {
    const backgroundJob = {
      jobKey: CHANGE_VOLUME_JOB,
      job: async () => {
        const profiles = await AsyncStorageUtil.getProfiles();

        if (!profiles.length) {
          return
        }

        navigator.geolocation.getCurrentPosition( async (e) => {
          const { latitude, longitude } = e.coords;
          let matchingProfile = profiles[0];
          
          for( let i = 1; i < profiles.length; i++) {
            const distance = DistanceUtil.getDistanceInMetresBetweenEarthCoordinates(latitude, longitude, profiles[i].latitude, profiles[i].longitude);
            
            if (distance <= profiles[i].radius) {
              matchingProfile = profiles[i];
              break;
            }
          }

          const { id } = matchingProfile;
          AsyncStorageUtil.setActiveProfileId(id);
          dispatchEvent( new CustomEvent(CONSTS.activeProfile, { detail: id }));

          await SystemSettingsUtil.setVolume(matchingProfile.ringVolume, { type: 'ring' });
          await SystemSettingsUtil.setVolume(matchingProfile.mediaVolume, { type: 'music' });
          await SystemSettingsUtil.setVolume(matchingProfile.notificationVolume, { type: 'notification' });
        }, error => console.log(error)
        );
      },
    };

    const backgroundSchedule = {
      jobKey: CHANGE_VOLUME_JOB,
      allowWhileIdle: true,
      allowExecutionInForeground: true,
      /* TESTING ONLY */
      exact: true,
      period: 30000,
      /* TESTING ONLY */
      // period: 900000,
    };

    BackgroundJob.register(backgroundJob);
    
    BackgroundJob.schedule(backgroundSchedule);
  }
}