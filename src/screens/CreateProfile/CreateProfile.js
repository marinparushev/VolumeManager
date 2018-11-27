import React, { Component } from 'react';

import PropTypes from 'prop-types';

import ProfileForm from '../../components/ProfileForm';

import { DistanceUtil } from '../../utils/DistanceUtil';

export default class CreateProfile extends Component {
  static propTypes = {
    navigation: PropTypes.object,
  };

  constructor(props) {
    super(props);

    this.onSaveProfile = this.onSaveProfile.bind(this);
  }

  async onSaveProfile() {
    const { latitude, longitude, radius, ringVolume, mediaVolume, notificationVolume, name } = this.props,
          timeStamp = new Date().getTime(),
          profile = { id: timeStamp, name, latitude, longitude, radius, ringVolume, mediaVolume, notificationVolume };

    // if name is empty or name is not empty but not 'Default' and there is an empty field
    if (this.props.isFormEmpty(name, latitude, longitude, radius)) {
      return;
    }

    // if profile name is not 'Default' - check if other fields contain valid values
    if (!this.props.isFormDataValid(name, latitude, longitude, radius)) {
      return;
    }

    const canAdd = DistanceUtil.canAddProfile(profile);

    if ( !canAdd ) {
      return;
    }

    // add new volume profile
    await this.props.screenProps.addProfile(profile);

    // go back to main
    this.props.navigation.navigate('Main');
  }

  render() {
    return (
      <ProfileForm
        {...this.props}
        name={ this.props.name }
        latitude={ this.props.latitude }
        longitude={ this.props.longitude }
        radius={ this.props.radius }
        ringVolume={ this.props.ringVolume }
        mediaVolume={ this.props.mediaVolume }
        notificationVolume={ this.props.notificationVolume }
        locationEnabled={ this.props.locationEnabled }
        onNameChange={ this.props.onNameChange }
        onLatChange={ this.props.onLatChange }
        onLonChange={ this.props.onLonChange}
        onRadiusChange={ this.props.onRadiusChange }
        onRingVolumeChange={ this.props.onRingVolumeChange }
        onMediaVolumeChange={ this.props.onMediaVolumeChange }
        onNotificationVolumeChange={ this.props.onNotificationVolumeChange }
        onUseLocation={ this.props.onUseLocation }
        onPressSave={ this.onSaveProfile }
      />
    );
  }
}