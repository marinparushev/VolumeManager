import { AsyncStorageUtil } from './AsyncStorageUtil';
import BackgroundJob from 'react-native-background-job';
import { DistanceUtil } from './DistanceUtil';

import SystemSetting from 'react-native-system-setting';

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

          await SystemSetting.setVolume(matchingProfile.ringVolume, { type: 'ring' });
          await SystemSetting.setVolume(matchingProfile.mediaVolume, { type: 'music' });
          await SystemSetting.setVolume(matchingProfile.notificationVolume, { type: 'notification' });
        }, error => console.log(error)
        );
      },
    };

    const backgroundSchedule = {
      jobKey: CHANGE_VOLUME_JOB,
      allowWhileIdle: true,
      allowExecutionInForeground: true,
      /* TESTING ONLY */
      // exact: true,
      // period: 30000,
      /* TESTING ONLY */
      period: 900000,
    };

    BackgroundJob.register(backgroundJob);
    
    BackgroundJob.schedule(backgroundSchedule);
  }
}