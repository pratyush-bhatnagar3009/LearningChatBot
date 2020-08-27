import React, {Component} from 'react';
import {Dimensions, StyleSheet, View, Text} from 'react-native';
import {Actions, ActionConst} from 'react-native-router-flux';

export default class SignupSection extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.loginText}
          onPress={() => Actions.signUpScreen()}>
          Don't have account? Click here to signup
        </Text>
      </View>
    );
  }
}

const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height;

const styles = StyleSheet.create({
  container: {
    flex: 2,
    top: 120,
    width: DEVICE_WIDTH,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  loginText: {
    color: '#3740FE',
    marginTop: 25,
    textAlign: 'center',
    textDecorationLine: 'underline',
  }
});
