import { createStackNavigator } from 'react-navigation';
import Main from './src/screens/Main/Main';
import CreateProfile from './src/screens/CreateProfile/CreateProfile';
import EditProfile from './src/screens/EditProfile/EditProfile';
import ManageProfileHOC from './src/screens/ManageProfileHOC';

const AppNavigator = createStackNavigator({
  Main: {
    screen: Main,
    navigationOptions: () => {
      return {
        headerTitle: "Volume Manager v0.1",
      };
    }
  },
  CreateProfile: {
    screen: ManageProfileHOC(CreateProfile),
    navigationOptions: () => {
      return {
        headerLeft: null,
        headerTitle: "Create Profile",
      };
    }
  },
  EditProfile: {
    screen: ManageProfileHOC(EditProfile),
    navigationOptions: () => {
      return {
        headerTitle: "Edit Profile",
      };
    }
  }
}, {
  mode: 'modal',
});

export default AppNavigator;