import React, {Component} from 'react';
import {
  StyleSheet,
  KeyboardAvoidingView,
  View,
  ActivityIndicator,
  TouchableOpacity,
  Image,
  Dimensions,
  Animated,
  Easing,
  Text,
} from 'react-native';
import {Actions, ActionConst} from 'react-native-router-flux';

import UserInput from './UserInput';
import usernameImg from '../images/username.png';
import passwordImg from '../images/password.png';

import spinner from '../images/loading.gif';
import logoImg from '../images/logo.png';

const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height;
const MARGIN = 40;

const SIZE = 40;

export default class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showPass: true,
      press: false,
    };
    this.showPass = this.showPass.bind(this);
    this._onPress = this._onPress.bind(this);
    this.growAnimated = new Animated.Value(0);
    this.buttonAnimated = new Animated.Value(0);
  }

  showPass() {
    this.state.press === false
      ? this.setState({showPass: false, press: true})
      : this.setState({showPass: true, press: false});
  }

  _onPress() {
    if (this.state.isLoading) return;

    this.setState({isLoading: true});
    Animated.timing(this.buttonAnimated, {
      toValue: 1,
      duration: 200,
      easing: Easing.linear,
    }).start();

    setTimeout(() => {
      this._onGrow();
    }, 2000);

    setTimeout(() => {
      Actions.loginScreen();
      this.setState({isLoading: false});
      this.buttonAnimated.setValue(0);
      this.growAnimated.setValue(0);
    }, 2300);
  }

  _onGrow() {
    Animated.timing(this.growAnimated, {
      toValue: 1,
      duration: 200,
      easing: Easing.linear,
    }).start();
  }

  render() {
    const changeWidth = this.buttonAnimated.interpolate({
      inputRange: [0, 1],
      outputRange: [DEVICE_WIDTH - MARGIN, MARGIN],
    });
    const changeScale = this.growAnimated.interpolate({
      inputRange: [0, 1],
      outputRange: [1, MARGIN],
    });

    return (
      <>
      <View style={styles.container}>
      <View style={styles.logowrapper}>
      <Image source={logoImg} style={styles.imageLogo} />
      <Text style={styles.text}>Learning ChatBot</Text>
      </View>
      <View style={styles.wrapper}>
        <View style={styles.inputWrap}>
          <UserInput
            source={usernameImg}
            placeholder="Full Name"
            autoCapitalize={'none'}
            returnKeyType={'done'}
            autoCorrect={false}
          />
        </View>
         <View style={styles.inputWrap}>
          <UserInput
            source={usernameImg}
            placeholder="Phone"
            autoCapitalize={'none'}
            returnKeyType={'done'}
            autoCorrect={false}
          />
        </View>
        <View style={styles.inputWrap}>
          <UserInput
            source={passwordImg}
            secureTextEntry={this.state.showPass}
            placeholder="Password"
            returnKeyType={'done'}
            autoCapitalize={'none'}
            autoCorrect={false}
          />
        </View>
        <View style={styles.inputWrap}>
          <UserInput
            source={passwordImg}
            secureTextEntry={this.state.showPass}
            placeholder="Confirm Password"
            returnKeyType={'done'}
            autoCapitalize={'none'}
            autoCorrect={false}
          />
        </View>
        <View style={styles.inputWrap}>
        <Animated.View style={{width: changeWidth}}>
          <TouchableOpacity
            style={styles.button}
            onPress={this._onPress}
            activeOpacity={1}>
            {this.state.isLoading ? (
              <Image source={spinner} style={styles.image} />
            ) : (
              <Text style={styles.textButton}>Sign Up</Text>
            )}
          </TouchableOpacity>
          <Animated.View
            style={[styles.circle, {transform: [{scale: changeScale}]}]}
          />
        </Animated.View>
        </View>
        </View>
      </View>
      </>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  textButton: {
    color: 'white',
    backgroundColor: 'transparent',
  },
  wrapper: {
    flex:1,
    paddingHorizontal: 10,
  },
  logowrapper: {
    flex:0.5,
    paddingHorizontal: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputWrap: {
    flexDirection: "row",
    marginVertical: 10,
    height: 45,
    backgroundColor: "transparent"
  },
  button: {
    marginHorizontal: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#1703fc',
    height: MARGIN,
    borderRadius: 20,
    zIndex: 100,
    paddingHorizontal: 10,
    width: DEVICE_WIDTH - 40,
  },
  circle: {
    height: MARGIN,
    width: MARGIN,
    marginTop: -MARGIN,
    borderWidth: 1,
    borderColor: '#03f0fc',
    borderRadius: 100,
    alignSelf: 'center',
    zIndex: 99,
    backgroundColor: '#03f0fc',
  },
  image: {
    width: 24,
    height: 24,
  },
  fixed: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0
  },
  imageLogo: {
    width: 80,
    height: 80,
  },
  text: {
    color: '#7b32a8',
    fontWeight: 'bold',
    backgroundColor: 'transparent',
    marginTop: 20,
    fontSize: 30,
    fontFamily: 'lucida grande',
  },
});
