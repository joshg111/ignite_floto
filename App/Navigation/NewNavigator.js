// @flow
import { View, Text } from 'react-native'
import React, { Component } from 'react'
import { Scene, Router } from 'react-native-router-flux'
import Styles from './Styles/NavigationContainerStyle'
import NavigationDrawer from './NavigationDrawer'
import NavItems from './NavItems'
import CustomNavBar from '../Components/CustomNavBar'

// Josh's
import StartupScreen from '../Containers/StartupScreen'
import RegisterFloto from '../Containers/RegisterFloto'
import ActivateUser from '../Containers/ActivateUser'
import MyFlowsScreen from '../Containers/MyFlowsScreen'
import LoginActions from '../Redux/LoginRedux'
import { connect } from 'react-redux'
import { StackNavigator } from 'react-navigation';


const Navigator = StackNavigator({
  StartupScreen: { screen: StartupScreen },
  RegisterFloto: { screen: RegisterFloto },
  MyFlowsScreen: { screen: MyFlowsScreen },
},
{
  initialRouteName: "StartupScreen"
});

export default Navigator;
