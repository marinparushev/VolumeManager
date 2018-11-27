import React, { Component } from 'react';

import PropTypes from 'prop-types';

import ProfileForm from '../../components/ProfileForm';

import { DistanceUtil } from '../../utils/DistanceUtil';

export default class EditProfile extends Component {
  static propTypes = {
    navigation: PropTypes.object,
  };

  constructor(props) {
    super(props);

    this.onEditProfile = this.onEditProfile.bind(this);
  }

  async onEditProfile() {
    const { id, name, latitude, longitude, radius, ringVolume, mediaVolume, notificationVolume } = this.props,
          profile = { id, name, latitude, longitude, radius, ringVolume, mediaVolume, notificationVolume };

    // if name is empty or name is not empty but not 'Default' and there is an empty field
    if (this.props.isFormEmpty(name, latitude, longitude, radius)) {
      return;
    }

    // if profile name is not 'Default' - check if other fields contain valid values
    if (!this.props.isFormDataValid(name, latitude, longitude, radius)) {
      return;
    }

    const canEdit = DistanceUtil.canEditProfile(profile);

    if ( !canEdit ) {
      return;
    }

    // add new volume profile
    await this.props.screenProps.updateProfile(profile);

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
        onPressSave={ this.onEditProfile }
      />
    );
  }
}