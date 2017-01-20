import { takeLatest } from 'redux-saga'
import API from '../Services/Api'
import RegisterApi from '../Services/RegisterApi'
import LoginApi from '../Services/LoginApi'
import ActivateUserApi from '../Services/ActivateUserApi'
import FixtureAPI from '../Services/FixtureApi'
import DebugSettings from '../Config/DebugSettings'

/* ------------- Types ------------- */

import { StartupTypes } from '../Redux/StartupRedux'
import { TemperatureTypes } from '../Redux/TemperatureRedux'
import { LoginTypes } from '../Redux/LoginRedux'
import { RegisterTypes } from '../Redux/RegisterRedux'
import { ActivateUserTypes } from '../Redux/ActivateUserRedux'

/* ------------- Sagas ------------- */

import { startup } from './StartupSagas'
import { login, login_startup, logout } from './LoginSagas'
import { register } from './RegisterSagas'
import { activateUser } from './ActivateUserSagas'
import { getTemperature } from './TemperatureSagas'

/* ------------- API ------------- */

// The API we use is only used from Sagas, so we create it here and pass along
// to the sagas which need it.
const api = DebugSettings.useFixtures ? FixtureAPI : API.create()
const registerApi = RegisterApi.create();
const login_api = LoginApi.create();

/* ------------- Connect Types To Sagas ------------- */

export default function * root () {
  yield [
    // some sagas only receive an action
    //takeLatest(StartupTypes.STARTUP, startup),
    takeLatest(LoginTypes.LOGIN_REQUEST, login, login_api),
    takeLatest(LoginTypes.LOGOUT, logout),
    takeLatest(LoginTypes.LOGIN_STARTUP, login_startup),
    takeLatest(RegisterTypes.REGISTER_REQUEST, register, registerApi),
    takeLatest(ActivateUserTypes.ACTIVATE_USER_REQUEST, activateUser, ActivateUserApi.create()),


    // some sagas receive extra parameters in addition to an action
    takeLatest(TemperatureTypes.TEMPERATURE_REQUEST, getTemperature, api)
  ]
}
