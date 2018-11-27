import React, { Component } from 'react';
import { Text, TextInput, View } from 'react-native';

import PropTypes from 'prop-types';

import styles from '../styles/';
import { STYLES } from '../constants';

export default class FormInputField extends Component {
  static propTypes = {
    value: PropTypes.string,
    editable: PropTypes.bool,
    keyboardType: PropTypes.oneOf(['default', 'number-pad', 'decimal-pad', 'numeric', 'email-address', 'phone-pad']),
    label: PropTypes.string,
    onChangeText: PropTypes.func,
  };

  static defaultProps = {
    value: '',
    editable: true,
    keyboardType: 'default',
    label: '',
    onChangeText: () => {},
  };

  constructor(props) {
    super(props);

    this.state = {
      focusStyles: [ styles.textInput ]
    }

    this.onInputFocus = this.onInputFocus.bind(this);
    this.onInputBlur = this.onInputBlur.bind(this);
  }

  onInputFocus() {
    this.setState({
      focusStyles: [styles.textInput, styles.textInputFocused]
    });
  }

  onInputBlur() {
    this.setState({
      focusStyles: [styles.textInput]
    });
  }

  render() {
    return (
      <View style={ styles.formField }>
        { this.props.label !== '' && <Text style={ styles.label }>{ this.props.label }</Text> }
        <TextInput
          value={ this.props.value }
          editable={ this.props.editable }
          keyboardType={ this.props.keyboardType }
          onBlur={ this.onInputBlur }
          onChangeText={ this.props.onChangeText }
          onFocus={ this.onInputFocus }
          style={ this.state.focusStyles }
          underlineColorAndroid={ STYLES.mainAltContrastColor }
        />
      </View>
      
    );
  }
}