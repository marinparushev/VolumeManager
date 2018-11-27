import React, { Component } from 'react';
import { Alert, PermissionsAndroid } from 'react-native';

import PropTypes from 'prop-types';

import SystemSetting from 'react-native-system-setting';

import { CONSTS } from '../constants';

export const ManageProfileHOC = (WrappedComponent) => {
  return class HOC extends Component {
    static propTypes = {
      navigation: PropTypes.object,
    };

    constructor(props) {
      super(props);

      this.state = {
        id: 0,
        latitude: '',
        longitude: '',
        loadingCoordinates: false,
        locationEnabled: false,    
        mediaVolume: 0,
        name: '',
        notificationVolume: 0,
        radius: '100',
        ringVolume: 0,
      }

      this.bindHandlers();
    }

    bindHandlers() {
      this.onCancel = this.onCancel.bind(this);
      this.onLatChange = this.onLatChange.bind(this);
      this.onLonChange = this.onLonChange.bind(this);
      this.onLocationPermissionChange = this.onLocationPermissionChange.bind(this);
      this.onMediaVolumeChange = this.onMediaVolumeChange.bind(this);
      this.onNameChange = this.onNameChange.bind(this);
      this.onNotificationVolumeChange = this.onNotificationVolumeChange.bind(this);
      this.onRadiusChange = this.onRadiusChange.bind(this);
      this.onRingVolumeChange = this.onRingVolumeChange.bind(this);
      this.onUseLocation = this.onUseLocation.bind(this);
      this.isFormEmpty = this.isFormEmpty.bind(this);
      this.isFormDataValid = this.isFormDataValid.bind(this);
    }

    async componentDidMount() {
      const { profile } = this.props.navigation.state.params,
            locationEnabledPromise = SystemSetting.isLocationEnabled();

      if (profile) {
        const {id, name, latitude, longitude, radius, ringVolume, mediaVolume, notificationVolume } = profile
        this.setState({ 
          id, name, latitude, longitude, radius, ringVolume, mediaVolume, notificationVolume,
        });
  
        await locationEnabledPromise.then( (locationEnabled) => {
          this.setState({ locationEnabled });
        });
      } else {
        const name = this.props.navigation.state.params.name || '',
              ringVolumePromise = SystemSetting.getVolume('ring'),
              mediaVolumePromise = SystemSetting.getVolume('music'),
              notificationVolumePromise = SystemSetting.getVolume('notification');
  
        this.setState({ name });
  
        await Promise.all([ringVolumePromise, mediaVolumePromise, notificationVolumePromise, locationEnabledPromise])
          .then( (values) => {
            this.setState({
              ringVolume: values[0],
              mediaVolume: values[1],
              notificationVolume: values[2],
              locationEnabled: values[3],
            });
          });
      }
  
      SystemSetting.addLocationListener(this.onLocationPermissionChange);
    }
  
    componentWillUnmount() {
      SystemSetting.removeLocationListener(this.onLocationPermissionChange);
    }

    isLatitudeValid(latitude) {
      latitude = parseFloat(latitude);

      if (latitude >= -90 && latitude <= 90) {
        return true;
      }

      return false;
    }

    isLongitudeValid(longitude) {
      longitude = parseFloat(longitude)

      if (longitude >= -180 && longitude <= 180) {
        return true;
      }

      return false
    }

    isRadiusValid(radius) {
      radius = parseFloat(radius);

      if(isNaN(radius)) {
        return false;
      }

      return true;
    }

    isFormEmpty(name, latitude, longitude, radius) {
      if (name === '' ||
          ( name !== '' && name !== CONSTS.default && (latitude === '' || longitude === '' || radius === ''))) {
        Alert.alert('Error!', 'Fill in the form to proceed!');
        return true;
      }

      return false;
    }

    isFormDataValid(name, latitude, longitude, radius) {
      if (name !== CONSTS.default) {
        if (!isLatitudeValid(latitude)) {
          Alert.alert('Error', `Latitude '${latitude}' is not a valid value!`);
          return false;
        }
  
        if (!this.props.isLongitudeValid(longitude)) {
          Alert.alert('Error', `Longitude '${longitude}' is not a valid value!`);
          return false;
        }
  
        if (!this.props.isRadiusValid(radius)) {
          Alert.alert('Error', `Radius '${radius}' is not a valid value!`);
          return false;
        }
      }

      return true;
    }

    onCancel() {
      this.props.navigation.goBack();
    }

    onLocationPermissionChange(locationEnabled) {
      this.setState({ locationEnabled });
    }

    onLatChange(latitude) {
      this.setState({ latitude });
    }
  
    onLonChange(longitude) {
      this.setState({ longitude });
    }
  
    onMediaVolumeChange(mediaVolume) {
      this.setState({ mediaVolume });
    }
  
    onNameChange(name) {
      if (name === CONSTS.default) {
        return;
      }

      this.setState({ name });
    }
  
    onNotificationVolumeChange(notificationVolume) {
      this.setState({ notificationVolume });
    }
  
    onRingVolumeChange(ringVolume) {
      this.setState({ ringVolume });
    }
  
    onRadiusChange(radius) {
      this.setState({ radius });
    }

    async onUseLocation() {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            'title': 'App requires geolocation permission',
            'message': 'App needs access to your location ' +
                       'so that it can control the volume of your phone.'
          }
        );
  
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          this.setState({
            loadingCoordinates: true,
          });
  
          navigator.geolocation.getCurrentPosition( (e) => {
            const { latitude, longitude } = e.coords,
                  precision = 6;
  
              this.setState({
                latitude: latitude.toFixed(precision).toString(),
                longitude: longitude.toFixed(precision).toString(),
                loadingCoordinates: false,
              });
          }, error => console.log(error),
          {
            maximumAge: 30000,
          });
        }
      } catch (err) {
        Alert.alert(err);
      }
    }
  
    render() {
      return (
        <WrappedComponent
          {...this.props}
          id={ this.state.id }
          name={ this.state.name }
          latitude={ this.state.latitude }
          longitude={ this.state.longitude }
          radius={ this.state.radius }
          ringVolume={ this.state.ringVolume }
          mediaVolume={ this.state.mediaVolume }
          notificationVolume={ this.state.notificationVolume }
          locationEnabled={ this.state.locationEnabled }
          onCancel={ this.onCancel }
          onLatChange={ this.onLatChange }
          onLonChange={ this.onLonChange }
          onLocationPermissionChange={ this.onLocationPermissionChange }
          onMediaVolumeChange={ this.onMediaVolumeChange }
          onNameChange={ this.onNameChange }
          onNotificationVolumeChange={ this.onNotificationVolumeChange }
          onRadiusChange={ this.onRadiusChange }
          onRingVolumeChange={ this.onRingVolumeChange }
          onUseLocation={ this.onUseLocation }
          isFormDataValid={ this.isFormDataValid }
          isFormEmpty={ this.isFormEmpty }
        />
      );
    }
  }
}

export default ManageProfileHOC;