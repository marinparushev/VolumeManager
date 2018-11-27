import React, { Component } from 'react';
import { Slider, Text, View } from 'react-native';

import PropTypes from 'prop-types';

import styles from '../styles/';

import { STYLES } from '../constants';

export default class CustomSlider extends Component {
  static propTypes = {
    label: PropTypes.string,
    onSlidingComplete: PropTypes.func,
    value: PropTypes.number,
  };

  static defaultProps = {
    label: '',
    onSlidingComplete: () => {},
    value: 0,
  };

  render() {
    return (
      <View style={ styles.formField }>
        { this.props.label !== '' && <Text  style={ styles.label }>{ this.props.label }</Text>}
        <Slider
          minimumTrackTintColor={ STYLES.mainColor }
          minimumValue={ 0 }
          maximumValue={ 1 }
          onSlidingComplete={ this.props.onSlidingComplete }
          step={ 0.01 }
          style={ styles.slider }
          thumbTintColor={ STYLES.mainColor }
          value={ this.props.value }
        />
      </View>
    );
  }
}