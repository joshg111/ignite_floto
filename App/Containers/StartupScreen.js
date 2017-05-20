// @flow
import { View, Text } from 'react-native'
import React, { Component } from 'react'
import { Scene, Router } from 'react-native-router-flux'
import {styles} from './Styles/StartupScreenStyle'

// Josh's
import RegisterFloto from '../Containers/RegisterFloto'
import ActivateUser from '../Containers/ActivateUser'
import MyFlowsScreen from '../Containers/MyFlowsScreen'
import LoginActions from '../Redux/LoginRedux'
import { connect } from 'react-redux'
import { StackNavigator } from 'react-navigation';


type NavigationRouterProps = {
  dispatch: () => any,
  startup_fetching: boolean,
  user_id: string,
  startup: () => void,
  navigation: Object
}

class StartupScreen extends Component {

  static navigationOptions = {
      title: '',
    };

  state: {}

  props: NavigationRouterProps

  constructor (props: NavigationRouterProps) {
    super(props)
    this.state = {}

  }

  componentDidMount() {
    this.props.startup();
  }

  componentWillReceiveProps(nextProps) {
    const { navigate } = this.props.navigation;
    if (nextProps.startup_fetching === false) {
      // Conditionally go to next route.
      if (nextProps.user_id == null) {
        // Go to RegisterFloto
        navigate('RegisterFloto');

      }
      else {
        // Go to MyFlowsScreen
        navigate('MyFlowsScreen');
      }
    }
  }

  render () {
    return (
      <View><Text>Loading...</Text></View>
    );

  }
}

const mapStateToProps = (state) => {
  return {
    startup_fetching: state.login.startup_fetching,
    user_id: state.login.user_id
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    startup: () => dispatch(LoginActions.loginStartup())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(StartupScreen)
