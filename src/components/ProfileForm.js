import React, { Component } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import PropTypes from 'prop-types';

import FormInputField from './TextInput';

import FormSlider from './Slider';

import styles from '../styles';

import { STYLES, CONSTS } from '../constants';

export default class ProfileForm extends Component {
  static propTypes = {
    name: PropTypes.string,
    latitude: PropTypes.string,
    longitude: PropTypes.string,
    radius: PropTypes.string,
    ringVolume: PropTypes.number,
    mediaVolume: PropTypes.number,
    notificationVolume: PropTypes.number,
    locationEnabled: PropTypes.bool,
    onNameChange: PropTypes.func,
    onLatChange: PropTypes.func,
    onLonChange: PropTypes.func,
    onRadiusChange: PropTypes.func,
    onRingVolumeChange: PropTypes.func,
    onMediaVolumeChange: PropTypes.func,
    onNotificationVolumeChange: PropTypes.func,
    onUseLocation: PropTypes.func,
    onPressSave: PropTypes.func,
  };

  static defaultProps = {
    name: '',
    latitude: '',
    longitude: '',
    radius: '',
    ringVolume: 0,
    mediaVolume: 0,
    notificationVolume: 0,
    locationEnabled: false,
    onNameChange: () => {},
    onLatChange: () => {},
    onLonChange: () => {},
    onRadiusChange: () => {},
    onRingVolumeChange: () => {},
    onMediaVolumeChange: () => {},
    onNotificationVolumeChange: () => {},
    onUseLocation: () => {},
    onPressSave: () => {},
  }

  render() {
    const isDefault = this.props.name === CONSTS.default;

    return (
      <View style={ styles.parentView }>
        <ScrollView style={ styles.screenContainer }>
          <FormInputField
            editable={ !isDefault }
            label={ 'Name' }
            onChangeText={ this.props.onNameChange }
            ref={ comp => this.name = comp }
            value={ this.props.name }
          />
          { !isDefault &&
            <View style={ styles.locationContainer }>
              <View style={ this.props.locationEnabled ? {width: 150} : {width: '100%'} }>
                <FormInputField
                  keyboardType={ 'numeric' }
                  label={ 'Latitude' }
                  onChangeText={ this.props.onLatChange }
                  ref={ comp => this.lat = comp }
                  value={ this.props.latitude }
                />
                <FormInputField
                  keyboardType={ 'numeric' }
                  label={ 'Longitute' }
                  onChangeText={ this.props.onLonChange }
                  ref={ comp => this.lon = comp }
                  value={ this.props.longitude }
                />
              </View>
              { this.props.locationEnabled && 
                <View style={ styles.locationRightContainer }>
                  <Text style={ styles.orText }>Or</Text>
                  <TouchableOpacity 
                    activeOpacity={ 0.6 }
                    onPress={ this.props.onUseLocation }
                    style={ styles.useLocationButton }
                  >
                    <Text style={ styles.useLocationButtonLabel }>Use current position</Text>
                  </TouchableOpacity>
                </View>
              }
            </View>
          }
          { !isDefault &&
            <FormInputField
              keyboardType={ 'numeric' }
              label={ 'Radius (metres)' }
              onChangeText={ this.props.onRadiusChange }
              ref={ comp => this.radius = comp }
              value={ this.props.radius }
            />
          }
          <FormSlider label={ 'Ring Volume' } onSlidingComplete={ this.props.onRingVolumeChange } value={ this.props.ringVolume }/>
          <FormSlider label={ 'Media Volume' } onSlidingComplete={ this.props.onMediaVolumeChange } value={ this.props.mediaVolume }/>
          <FormSlider label={ 'Notifications Volume' } onSlidingComplete={ this.props.onNotificationVolumeChange } 
            value={ this.props.notificationVolume }
            style={ {marginBottom: 16 } }/>
        </ScrollView>
        <View style={ styles.actionsContainer }>
          <TouchableOpacity
            activeOpacity={ 0.6 }
            onPress={ this.props.onPressSave }
            style={ styles.actionButton }
          >
            <Text style={ styles.actionButtonLabel }>Save</Text>
          </TouchableOpacity>
          { this.props.screenProps.profiles.length > 0 &&
            <TouchableOpacity
              activeOpacity={ 0.6 }
              onPress={ this.props.onCancel }
              style={ [styles.actionButton, styles.rightActionButton ] }
            >
              <Text style={ styles.actionButtonLabel }>Cancel</Text>
            </TouchableOpacity>
          }
        </View>
      </View>
    );
  }
}