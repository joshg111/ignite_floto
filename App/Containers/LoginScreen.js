// @flow

import React from 'react'
import {
  View,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  Keyboard,
  LayoutAnimation
} from 'react-native'
import { connect } from 'react-redux'
import Styles from './Styles/LoginScreenStyle'
import {Images, Metrics} from '../Themes'
import LoginActions from '../Redux/LoginRedux'
import { Actions as NavigationActions } from 'react-native-router-flux'
import I18n from 'react-native-i18n'

type LoginScreenProps = {
  dispatch: () => any,
  fetching: boolean,
  user_id: string,
  attemptLogin: () => void,
  loginResetError: () => void
}

class LoginScreen extends React.Component {

  props: LoginScreenProps

  state: {
    username: string,
    password: string,
    visibleHeight: number,
    topLogo: {
      width: number
    }
  }

  isAttempting: boolean
  keyboardDidShowListener: Object
  keyboardDidHideListener: Object

  constructor (props: LoginScreenProps) {
    super(props)
    this.state = {
      username: '',
      password: '',
      visibleHeight: Metrics.screenHeight,
      topLogo: { width: Metrics.screenWidth }
    }
    this.isAttempting = false
  }

  componentWillReceiveProps (newProps) {
    this.forceUpdate()
    // Did the login attempt complete?
    // if (this.isAttempting && !newProps.fetching) {
    if (newProps.user_id != null) {
      NavigationActions.my_flows_screen()
    }
  }

  componentWillMount () {
    // Using keyboardWillShow/Hide looks 1,000 times better, but doesn't work on Android
    // TODO: Revisit this if Android begins to support - https://github.com/facebook/react-native/issues/3468
    this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this.keyboardDidShow)
    this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this.keyboardDidHide)
  }

  componentWillUnmount () {
    this.keyboardDidShowListener.remove()
    this.keyboardDidHideListener.remove()
  }

  keyboardDidShow = (e) => {
    // Animation types easeInEaseOut/linear/spring
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)
    let newSize = Metrics.screenHeight - e.endCoordinates.height
    this.setState({
      visibleHeight: newSize,
      topLogo: {width: 100, height: 70}
    })
  }

  keyboardDidHide = (e) => {
    // Animation types easeInEaseOut/linear/spring
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)
    this.setState({
      visibleHeight: Metrics.screenHeight,
      topLogo: {width: Metrics.screenWidth}
    })
  }

  handlePressLogin = () => {
    const { username, password } = this.state
    this.isAttempting = true
    // attempt a login - a saga is listening to pick it up from here.
    this.props.attemptLogin(username, password)
  }

  handlePressOrRegister()
  {
    this.props.loginResetError();
    NavigationActions.registerfloto();
  }

  handleChangeUsername = (text) => {
    this.setState({ username: text })
  }

  handleChangePassword = (text) => {
    this.setState({ password: text })
  }

  render () {
    const { username, password } = this.state
    const { fetching } = this.props
    const editable = !fetching
    const textInputStyle = editable ? Styles.textInput : Styles.textInputReadonly

    return (
      <ScrollView contentContainerStyle={{justifyContent: 'center'}} style={[Styles.container, {height: this.state.visibleHeight}]} keyboardShouldPersistTaps>
        <Image
          style={{width: Metrics.screenWidth, height: 200, alignSelf: 'stretch', backgroundColor: 'pink'}}
          source={{uri: 'http://38.media.tumblr.com/52d707ec600162594e1ea34ec1a8da70/tumblr_nkln8rQA7Q1shpedgo1_540.gif'}}
        />
        <View style={Styles.form}>
          <View style={Styles.row}>
            {
              (this.props.login_error != null) &&
                <Text style={{backgroundColor: "red"}}>
                  {this.props.login_error}
                </Text>

            }
            <Text style={Styles.rowLabel}>{I18n.t('username')}</Text>
            <TextInput
              ref='username'
              style={textInputStyle}
              value={username}
              editable={editable}
              keyboardType='default'
              returnKeyType='next'
              autoCapitalize='none'
              autoCorrect={false}
              onChangeText={this.handleChangeUsername}
              underlineColorAndroid='transparent'
              onSubmitEditing={() => this.refs.password.focus()}
              placeholder={I18n.t('username')} />
          </View>

          <View style={Styles.row}>
            <Text style={Styles.rowLabel}>{I18n.t('password')}</Text>
            <TextInput
              ref='password'
              style={textInputStyle}
              value={password}
              editable={editable}
              keyboardType='default'
              returnKeyType='go'
              autoCapitalize='none'
              autoCorrect={false}
              secureTextEntry
              onChangeText={this.handleChangePassword}
              underlineColorAndroid='transparent'
              onSubmitEditing={this.handlePressLogin}
              placeholder={I18n.t('password')} />
          </View>

          <View style={[Styles.loginRow]}>
            <TouchableOpacity style={Styles.loginButtonWrapper} onPress={this.handlePressLogin}>
              <View style={Styles.loginButton}>
                <Text style={Styles.loginText}>{I18n.t('submit')}</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={Styles.loginButtonWrapper} onPress={this.handlePressOrRegister.bind(this)}>
              <View style={Styles.loginButton}>
                <Text style={Styles.loginText}>{I18n.t('or register')}</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>

      </ScrollView>
    )
  }

}

const mapStateToProps = (state) => {
  return {
    fetching: state.login.fetching,
    user_id: state.login.user_id,
    login_error: state.login.error
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    attemptLogin: (username, password) => dispatch(LoginActions.loginRequest(username, password)),
    loginResetError: () => dispatch(LoginActions.loginResetError())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen)
