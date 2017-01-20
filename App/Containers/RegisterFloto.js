// @flow
import {create} from 'apisauce'
import React from 'react'
import { ScrollView, View, Text, TouchableHighlight, Picker } from 'react-native'
const Item = Picker.Item;

import { connect } from 'react-redux'
import RegisterActions from '../Redux/RegisterRedux'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'
import { Actions as NavigationActions } from 'react-native-router-flux'

import t from 'tcomb-form-native'
import CountryPicker from 'react-native-country-picker-modal';

import {myPasswordTemplate} from './PasswordTemplate';

// Styles
import {styles} from './Styles/RegisterFlotoStyle'

// var AsYouTypeFormatter = require('google-libphonenumber').RegionCode;
//
// // Require `AsYouTypeFormatter`.
var AsYouTypeFormatter = require('google-libphonenumber').AsYouTypeFormatter;



// Get an instance of `PhoneNumberUtil`.
var phoneUtil = require('google-libphonenumber').PhoneNumberUtil.getInstance();

const Type = t.struct({
  password: t.String
})




var Form = t.form.Form;

var Email = t.refinement(t.String, function (s) {
  var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(s);
});

function samePasswords(x) {
  return x.pwd === x.verify_password
}

// here we are: define your domain model
// var Person = t.subtype(t.struct({
//   // username: t.String,              // a required string
//   // email: Email,  // an optional string
//   // phone_number: t.Number,
//   pwd: t.String,
// }), samePasswords);

var Person = t.struct({
  username: t.String,              // a required string
  email: Email,  // an optional string
  phone_number: t.String,
  password: t.String,
});

// var Person = t.struct({
//   password: t.String        // a boolean
// });


type RegisterFlotoProps = {
  dispatch: () => any,
  user_id: boolean,
  register_error: string,
  attemptReg: () => void
}

class RegisterFloto extends React.Component {

  options = {
    auto: "placeholders",
    fields: {
      email: {
        error: 'Insert a valid email'
      },
      password: {
        template: myPasswordTemplate,
        hasError: false,
        error: 'Password must be valid'
      }
    }
  };

  // options = {
  //   auto: "placeholders",
  //   fields: {
  //     password: {
  //       template: myPasswordTemplate,
  //     }
  //   }
  // };

  props: RegisterFlotoProps

  state: {
    options: Object,
    value: Object,
    country: Object
  }

  countryPicker: Object
  formatter: Object


  constructor (props: RegisterFlotoProps) {
    super(props);

    this.state = {
      options: this.options,
      value: {
        // username: "b2",
        // email: "b2@gmail.com",
        // phone_number: 1111111113,
        // pwd: "a1",
        // verify_password: "a1"
      },
      country: {cca2: "US", currency: "USD", callingCode: "1", flag: undefined, name: "United States"}
    };

    // this.setState({options: options, value: {}});
  }

  componentWillReceiveProps (newProps) {
    this.forceUpdate()
    // Did the login attempt complete?
    if (newProps.user_id != null) {
      // 1/9/17: Comment out activate_user since this is cumbersome to test.
      // For now, go straight to MyFlowsScreen
      // NavigationActions.activate_user()
      NavigationActions.my_flows_screen();
    }
  }

  onPress () {
    // call getValue() to get the values of the form
    console.log("inside onPress");
    var value = this.refs.form.getValue();
    if (value) { // if validation fails, value will be null
      console.log(value); // value here is an instance of Person
      console.log("Form validated successfully");
      this.props.attemptReg(value.username, value.email, this.state.country.callingCode + value.phone_number.toString().replace(/\D/g, ''), value.password);


    }

    // else if (this.state.value.pwd && !samePasswords(this.state.value)) {
    //   this.setState({options: t.update(this.state.options, {
    //     fields: {
    //       verify_password: {
    //         hasError: { $set: true }
    //       }
    //     }
    //   })});
    // }
  }

  onChange(value) {

    // var formatter = phoneUtil.getAsYouTypeFormatter(this.state.country.cca2);
    console.log(this.state.country.cca2);
    var formatter = new AsYouTypeFormatter(this.state.country.cca2);
    var newNum = '';
    // value.phone_number.forEach((i) => newNum = formatter.inputDigit(i))
    console.log(value.phone_number);
    var num = value.phone_number;
    if (num)
    {
      num = num.toString();
      num = num.replace(/\D/g, '');
      console.log("num = " + num);
      for (var i = 0; i < num.length; i++)
      {
        newNum = formatter.inputDigit(num[i]);

      }
      console.log(newNum);
      // value.phone_number.forEach(function(i) {} )

      var newState = {...value, phone_number: newNum};
      console.log(newState);
      this.setState({value: newState}, (state) => console.log(state));
    }
    // Parse number with country code.
    // this.state.value.phone_number = phoneUtil.parse(value.phone_number, this.state.country.cca2);

    // this.setState({value: value}, function (){
    //   if (this.state.value.verify_password)
    //   {
    //     if (!samePasswords(this.state.value)) {
    //       this.setState({options: t.update(this.state.options, {
    //         fields: {
    //           verify_password: {
    //             hasError: { $set: true }
    //           }
    //         }
    //       })});
    //     }
    //     else {
    //       this.setState({options: t.update(this.state.options, {
    //         fields: {
    //           verify_password: {
    //             hasError: { $set: false }
    //           }
    //         }
    //       })});
    //     }
    //   }
    // });
  }

  render () {
    return (
      <ScrollView style={styles.container}>
        {this.props.register_error != null ? (<Text>{this.props.register_error}</Text>) : null }
        <View style={styles.country}>
          <CountryPicker
            ref={countryPicker => this.countryPicker = countryPicker}
            onChange={(value)=> console.log(value) || this.setState({country: value}, ()=>this.onChange(this.state.value))}
            cca2={this.state.country.cca2}
            translation='eng'
          />
          <TouchableHighlight
            style={{flex:1, flexDirection:"column", justifyContent: 'center', alignItems: "flex-start", backgroundColor:"lightgray"}}
            onPress={()=> this.countryPicker.openModal()}>

              <Text style={{padding: 10, fontSize: 20}}>
                {this.state.country.name + " +" + this.state.country.callingCode}
              </Text>

          </TouchableHighlight>
        </View>
        <Form
          ref="form"
          type={Person}
          options={this.state.options}
          value={this.state.value}
          onChange={this.onChange.bind(this)}
        />
        <TouchableHighlight style={styles.button} onPress={this.onPress.bind(this)} underlayColor='#99d9f4'>
          <Text style={styles.buttonText}>Save</Text>
        </TouchableHighlight>
        <TouchableHighlight style={styles.button} onPress={NavigationActions.login} underlayColor='#99d9f4'>
          <Text style={styles.buttonText}>Go To Login</Text>
        </TouchableHighlight>
      </ScrollView>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    user_id: state.login.user_id,
    register_error: state.register.error
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    attemptReg: (username, email, phone_number, password) => dispatch(RegisterActions.registerRequest(username, email, phone_number, password))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RegisterFloto)
