import React, { Component } from 'react';
import { FlatList, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import Icon from 'react-native-ionicons';

import { STYLES, CONSTS } from '../../constants';

import styles from '../../styles/';

export default class Main extends Component {
  constructor(props) {
    super(props);

    StatusBar.setHidden(true);

    this.addProfile = this.addProfile.bind(this);
    this.onDeleteProfile = this.onDeleteProfile.bind(this);
    this.onEditProfile = this.onEditProfile.bind(this);
    this.renderItem = this.renderItem.bind(this);
  }

  componentDidUpdate() {
    if (this.props.screenProps.profiles.length === 0) {
      this.props.navigation.navigate('CreateProfile', { name: CONSTS.default });
    }
  }

  renderItem(data) {
    const { index } = data,
          stylesList = [styles.flatListItem];
    
    if (index % 2) {
      stylesList.push(styles.flatListItemOdd);
    } else {
      stylesList.push(styles.flatListItemEven);
    }

    return (
      <View style={ stylesList }>
        <TouchableOpacity onPress={ () => { this.onEditProfile.call(this, data.item) } } style={ styles.flatListItemLeft }>
          <Text style={ styles.flatListItemTitle }>{data.item.name}</Text>
        </TouchableOpacity>
        { data.item.name !== CONSTS.default &&
          <TouchableOpacity onPress={ () => { this.onDeleteProfile.call(this, data.item.id) } } style={ styles.flatListItemRight }>
            <Icon name="trash" color={ STYLES.mainColor }/>
          </TouchableOpacity>
        }
      </View>
    );
  }

  addProfile() {
    this.props.navigation.navigate('CreateProfile', {});
  }

  onDeleteProfile(profileId) {
    this.props.screenProps.deleteProfile(profileId);
  }

  onEditProfile(profile) {
    this.props.navigation.navigate('EditProfile', { profile });
  }

  render() {
    return (
      <View style={ styles.parentView }>
        <FlatList
          style={ styles.flatList }
          data={ this.props.screenProps.profiles }
          keyExtractor={ (item, index) => index.toString() }
          renderItem={ this.renderItem }
          style={ {borderColor: 'transparent', borderWidth: 1} }
          showsVerticalScrollIndicator={ false }
        />
        <View style={ styles.actionsContainer }>
          <TouchableOpacity
              activeOpacity={ 0.6 }
              onPress={ this.addProfile }
              style={ styles.actionButton }
            >
              <Text style={ styles.actionButtonLabel }>Add Profile</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}