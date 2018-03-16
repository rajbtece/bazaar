import React, { Component } from 'react';
import { Text, View, Image, Dimensions } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import _ from 'lodash';

import { sharedActions } from 'app/shared';
import { ContentWrapper, TextInput, Card, Button, Loader } from 'app/components';

export default class AuthScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: null,
      email: null,
      phone: null,
      password: null,
    }
  }

  componentDidMount() {
    this.props.dispatch(sharedActions.loadUser());
  }

  shouldComponentUpdate(nextProps, nextState) {
    return !_.isEqual(nextProps.auth, this.props.auth) || !_.isEqual(nextState, this.state);
  }

  onChange(type, value) {
    let state = this.state;
    state[type] = value;
    this.setState(state);
  }

  onLogin() {
    this.props.dispatch(sharedActions.loginUser(this.state));
  }

  onSignup() {
    this.props.dispatch(sharedActions.createAccount(this.state));
  }

  toggleForms() {
    this.props.dispatch(sharedActions.toggleAuthForm());
  }

  render() {
    if (_.isEmpty(this.props.auth)) {
      return <Loader />;
    }

    let scrollViewProps = {
      contentContainerStyle: styles.scrollView,
      keyboardShouldPersistTaps: 'always',
      enableOnAndroid: true,
      style: {
        backgroundColor: '#bf360c',
      }
    };

    let card = (
      <View style={styles.wrapper}>
        <Text style={styles.infoText}>Login to your account to shop local food directly from your local producers</Text>

        <TextInput style={textInputStyle} defaultValue={this.state.email} editable={!this.props.auth.loading} placeholder='Your email' onChangeText={this.onChange.bind(this, 'email')} />

        <TextInput style={textInputStyle} defaultValue={this.state.password} editable={!this.props.auth.loading} placeholder='Your password' onChangeText={this.onChange.bind(this, 'password')} secureTextEntry />

        <Button style={buttonStyle} onPress={this.onLogin.bind(this)} title="Login" accessibilityLabel="Login" loading={this.props.auth.loading} />

        <Text onPress={this.toggleForms.bind(this)} style={styles.toggleLink}>or sign up</Text>
      </View>
    );

    if (this.props.auth.createAccountForm) {
      card = (
        <View style={styles.wrapper}>
          <Text style={styles.infoText}>Find local food nodes near you and order directly from your local producers</Text>
          <TextInput style={textInputStyle} defaultValue={this.state.name} editable={!this.props.auth.loading} placeholder="Your name" onChangeText={this.onChange.bind(this, 'name')} />

          <TextInput style={textInputStyle} defaultValue={this.state.email} editable={!this.props.auth.loading} placeholder="Your email" onChangeText={this.onChange.bind(this, 'email')} />

          <TextInput style={textInputStyle} defaultValue={this.state.phone} editable={!this.props.auth.loading} placeholder="Your phone number" onChangeText={this.onChange.bind(this, 'phone')} />

          <TextInput style={textInputStyle} defaultValue={this.state.password} editable={!this.props.auth.loading} placeholder="Choose a password" hint="Minimum 8 characters" onChangeText={this.onChange.bind(this, 'password')} secureTextEntry />

          <Button style={buttonStyle} onPress={this.onSignup.bind(this)} title="Sign up" accessibilityLabel="Sign up" loading={this.props.auth.loading} />

          <Text onPress={this.toggleForms.bind(this)} style={styles.toggleLink}>or login to your account</Text>
        </View>
      );
    }

    return (
      <KeyboardAwareScrollView {...scrollViewProps}>
        <Image style={styles.logo} source={require('../../../assets/images/logo-white.png')} />
        {card}
      </KeyboardAwareScrollView>
    );
  }
}

const styles = {
  logo: {
    height: 60,
    width: 70,
    margin: 15,
    justifyContent: 'center',
    alignSelf: 'center',
  },
  infoText: {
    color: '#fff',
    fontFamily: 'montserrat-regular',
    marginBottom: 15,
    marginHorizontal: 30,
    textAlign: 'center',
  },
  wrapper: {
    padding: 15,
  },
  header: {
    color: '#fff',
    fontFamily: 'montserrat-semibold',
  },
  toggleLink: {
    alignSelf: 'center',
    color: '#fff',
    fontFamily: 'montserrat-regular',
    paddingTop: 5,
    paddingBottom: 0,
    textDecorationLine: 'underline',
  }
};

const textInputStyle = {
  label: {
    color: '#fff',
    fontFamily: 'montserrat-semibold',
  },
  textInput: {
    backgroundColor: '#fff',
    borderWidth: 0,
  },
};

const buttonStyle = {
  button: {
    backgroundColor: '#fff',
  },
  title: {
    color: '#333',
    fontFamily: 'montserrat-semibold',
  },
};
