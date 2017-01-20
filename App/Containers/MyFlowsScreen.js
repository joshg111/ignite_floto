// @flow
import React from 'react'
import { ScrollView, View, Text, TouchableHighlight, Picker } from 'react-native'

import { connect } from 'react-redux'
import ActivateUserActions from '../Redux/ActivateUserRedux'

import { Actions as NavigationActions } from 'react-native-router-flux'

import { Button } from 'react-native-material-design'

import {styles} from './Styles/MyFlowsStyle'

import LoginActions from '../Redux/LoginRedux'

import t from 'tcomb-form-native'

// Styles
// import {styles, stylesheet} from './Styles/ActivateUserStyle'

// const Type = t.struct({
//   activation_code: t.Number
// })
//
// const options = {
//   auto: "placeholders",
// };
//
// var Form = t.form.Form;



type MyFlowsProps = {
  dispatch: () => any,
  attemptLogout: () => void,
  user_id: string
}

class MyFlowsScreen extends React.Component {



  props: MyFlowsProps

  // state: {
  // }
  constructor (props: MyFlowsProps) {
    super(props);
  }

  componentWillReceiveProps (newProps) {
    this.forceUpdate()

    console.log("MyFlowScreen newProps = ");
    console.log(newProps);
    console.log("newProps.user_id = ");
    console.log(newProps.user_id == null)

    if (newProps.user_id == null)
    {
      console.log("resetting and going to login screen")
      NavigationActions.login();
    }
  }

  onPress()
  {
    this.props.attemptLogout();
    //NavigationActions.login();
  }

  render () {
    return (
      <View style={styles.container}>
        <Text>
          {this.props.user_id}
        </Text>
        <Button text='Logout' raised={true} onPress={this.onPress.bind(this)} />
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    user_id: state.login.user_id
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    attemptLogout: () => dispatch(LoginActions.logout())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MyFlowsScreen)
