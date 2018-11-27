import { StyleSheet } from 'react-native';

import { STYLES } from '../constants';

export default styles = StyleSheet.create({
  screenContainer: {
    paddingHorizontal: 16,
    backgroundColor: 'lightgray',
    flex: 1,
  },
  formField: {
    marginBottom: 8,
  },
  label: {
    fontSize: 24,
  },
  slider: {
    width: '100%',
  },
  sliderThumb: {
    width: 30,
    height: 30,
    backgroundColor: 'rgba(150, 150, 150, 0.3)',
    borderColor: 'rgba(150, 150, 150, 0.6)',
    borderWidth: 14,
    borderRadius: 15,
  },
  sliderTrack: {
    height: 1,
    backgroundColor: '#303030',
  },
  textInput: {
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: STYLES.mainAltColor,
    paddingVertical: 0,
    height: 40,
    fontSize: 24,
  },
  textInputFocused: {
    borderColor: STYLES.mainColor,
  },
  parentView: {
    flex: 1,
  },
  flatList: {
    flex: 1,
    borderColor: 'transparent',
    borderWidth: 1,
  },
  flatListItem: {
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#aaa',
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  flatListItemLeft: {
    flex: 1,
  },
  flatListItemOdd: {
    backgroundColor: '#eee',
  },
  flatListItemEven: {
    backgroundColor: '#fff',
  },
  flatListItemTitle: {
    color: STYLES.mainColor,
    fontSize: 24,
  },
  flatListItemCount: {
    fontSize: 20,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'stretch',
  },
  locationRightContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    paddingHorizontal: 8,
    top: 10
  },
  orText: {
    marginRight: 8,
    fontSize: 20,
  },
  useLocationButton: {
    height: 40,
    backgroundColor: STYLES.mainColor,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 6,
  },
  useLocationButtonLabel: {
    fontSize: 12,
    color: STYLES.mainAltContrastColor,
    fontWeight: '600',
  },
  actionsContainer: {
    flexDirection: 'row',
    backgroundColor: 'lightgray',
  },
  actionButton: {
    height: 75,
    flex: 1,
    backgroundColor: STYLES.mainColor,
    justifyContent: 'center',
    alignItems: 'center',
  },
  actionButtonLabel: {
    fontSize: 24,
    color: STYLES.mainAltContrastColor,
    fontWeight: '600',
  },
  rightActionButton: {
    marginLeft: 1,
  }
});