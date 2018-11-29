import React from 'react';
import { createAppContainer } from 'react-navigation';

import { AsyncStorageUtil } from './src/utils/AsyncStorageUtil';
import { BackgroundJobUtil } from './src/utils/BackgroundJob';

import AppNavigator from './AppNavigator';
import { CONSTS } from './src/constants';

BackgroundJobUtil.run();

const AppContainer = createAppContainer(AppNavigator);

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      profiles: [],
      activeProfileId: 0,
    }

    this.addProfile = this.addProfile.bind(this);
    this.deleteProfile = this.deleteProfile.bind(this);
    this.updateProfile = this.updateProfile.bind(this);
    this.onActiveProfileChange = this.onActiveProfileChange.bind(this);
  }

  async componentDidMount() {
    const profiles = await AsyncStorageUtil.getProfiles();

    this.setState({ profiles });

    addEventListener(CONSTS.activeProfile, this.onActiveProfileChange);
  }

  componentWillUnmount() {
    removeEventListener(CONSTS.activeProfile, this.onActiveProfileChange);
  }

  onActiveProfileChange(e) {
    this.setState( { activeProfileId: e.detail });
  }

  async addProfile(profile) {
    const { profiles } = this.state;

    profiles.push(profile);

    await AsyncStorageUtil.setProfiles(profiles);

    this.setState({ profiles });
  }

  async deleteProfile(profileId) {
    const profiles = [...this.state.profiles],
          index = profiles.findIndex( (profile) => {
            return profile.id === profileId;
          });

    if (index < 0) {
      return;
    }

    profiles.splice(index, 1);

    await AsyncStorageUtil.setProfiles(profiles);

    this.setState({ profiles });
  }

  async updateProfile(volumeProfile) {
    const profiles = [...this.state.profiles],
          index = profiles.findIndex( (profile) => {
            return profile.id === volumeProfile.id;
          });

    if (index < 0) {
      alert("Stana problem, profila go nema!");
      return;
    }

    profiles.splice(index, 1, volumeProfile);

    await AsyncStorageUtil.setProfiles(profiles);

    this.setState({ profiles });
  }

  render() {
    return (
      <AppContainer 
        screenProps={
          {
            activeProfileId: this.state.activeProfileId,
            addProfile: this.addProfile,
            deleteProfile: this.deleteProfile,
            profiles: this.state.profiles,
            updateProfile: this.updateProfile,
          }
        }
      />
    );
  }
}