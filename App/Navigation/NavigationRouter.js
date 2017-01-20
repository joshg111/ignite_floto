// @flow
import { View, Text } from 'react-native'
import React, { Component } from 'react'
import { Scene, Router } from 'react-native-router-flux'
import Styles from './Styles/NavigationContainerStyle'
import NavigationDrawer from './NavigationDrawer'
import NavItems from './NavItems'
import CustomNavBar from '../Components/CustomNavBar'

// screens identified by the router
import PresentationScreen from '../Containers/PresentationScreen'
import AllComponentsScreen from '../Containers/AllComponentsScreen'
import UsageExamplesScreen from '../Containers/UsageExamplesScreen'
import LoginScreen from '../Containers/LoginScreen'
import ListviewExample from '../Containers/ListviewExample'
import ListviewGridExample from '../Containers/ListviewGridExample'
import ListviewSectionsExample from '../Containers/ListviewSectionsExample'
import MapviewExample from '../Containers/MapviewExample'
import APITestingScreen from '../Containers/APITestingScreen'
import ThemeScreen from '../Containers/ThemeScreen'
import DeviceInfoScreen from '../Containers/DeviceInfoScreen'

// Josh's
import {getCache, setCache} from '../Services/LocalStorage'
import RegisterFloto from '../Containers/RegisterFloto'
import ActivateUser from '../Containers/ActivateUser'
import MyFlowsScreen from '../Containers/MyFlowsScreen'
import LoginActions from '../Redux/LoginRedux'
import { connect } from 'react-redux'


/* **************************
* Documentation: https://github.com/aksonov/react-native-router-flux
***************************/

type NavigationRouterProps = {
  dispatch: () => any,
  startup_fetching: boolean,
  user_id: string,
  startup: () => void
}

class NavigationRouter extends Component {

  state: {}

  props: NavigationRouterProps

  constructor (props: NavigationRouterProps) {
    super(props)
    this.state = {}

  }

  componentDidMount() {
    this.props.startup();
  }

  // getUserId()
  // {
  //   getCache('login->user_id').then((res) =>
  //   {
  //     this.setState({user_id: res, is_loading: false});
  //     console.log("user_id = " + res)
  //   });
  // }

  render () {

    if(this.props.startup_fetching)
    {
      return (
        <View><Text>Loading...</Text></View>
      );
    }
    return (
      <Router>
        <Scene initial={this.props.user_id==null} type='reset' key='registerfloto' component={RegisterFloto} title='Register Floto' />
        <Scene key='activate_user' component={ActivateUser} title='Activate User'/>
        <Scene key='login' type='reset' component={LoginScreen} title='Login' />
        <Scene key='my_flows_screen' type='reset' initial={this.props.user_id!=null} component={MyFlowsScreen} title='My Flows Screen'/>

        <Scene key='drawer' component={NavigationDrawer} open={false}>
          <Scene key='drawerChildrenWrapper' navigationBarStyle={Styles.navBar} titleStyle={Styles.title} leftButtonIconStyle={Styles.leftButton} rightButtonTextStyle={Styles.rightButton}>
            <Scene initial key='presentationScreen' component={PresentationScreen} title='Ignite' renderLeftButton={NavItems.hamburgerButton} />
            <Scene key='componentExamples' component={AllComponentsScreen} title='Components' />
            <Scene key='usageExamples' component={UsageExamplesScreen} title='Usage' rightTitle='Example' onRight={() => window.alert('Example Pressed')} />
            <Scene key='listviewExample' component={ListviewExample} title='Listview Example' />
            <Scene key='listviewGridExample' component={ListviewGridExample} title='Listview Grid' />
            <Scene key='listviewSectionsExample' component={ListviewSectionsExample} title='Listview Sections' />
            <Scene key='mapviewExample' component={MapviewExample} title='Mapview Example' />
            <Scene key='apiTesting' component={APITestingScreen} title='API Testing' />
            <Scene key='theme' component={ThemeScreen} title='Theme' />

            {/* Custom navigation bar example */}
            <Scene key='deviceInfo' component={DeviceInfoScreen} title='Device Info' navBar={CustomNavBar} />
          </Scene>
        </Scene>
      </Router>
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

export default connect(mapStateToProps, mapDispatchToProps)(NavigationRouter)
