import React, {Component} from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
  Animated,
  Easing,
  Text,
  View,
} from 'react-native';

import {Actions, ActionConst} from 'react-native-router-flux';

import spinner from '../images/loading.gif';

const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height;
const MARGIN = 40;
const window = Dimensions.get('window');

export const IMAGE_HEIGHT = DEVICE_WIDTH / 2;
export const IMAGE_HEIGHT_SMALL = DEVICE_WIDTH /7;

import UserInput from './UserInput';
import usernameImg from '../images/username.png';
import passwordImg from '../images/password.png';

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      phone:'',
      password:'',
      isLoading: false,
      genValidate:false,
      pwdValidate:false,
    };
    this.buttonAnimated = new Animated.Value(0);
    this.growAnimated = new Animated.Value(0);
    this._onPress = this._onPress.bind(this);
    this.imageHeight = new Animated.Value(IMAGE_HEIGHT);
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
        Actions.subjectScreen();
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

  validate(text,type) {
    const mobileVal = /^(\d{10}$)/;
    if(type == 'data') {
      if(mobileVal.test(text)) {
        this.setState({phone:text});
        this.setState({genValidate:true});
      } else {
        this.setState({genValidate:false});
      }
    } 
  }

  pwdValidate(text,type) {
    if(type == 'password') {
        this.setState({password:text});
        this.setState({pwdValidate:true});
      } else {
        this.setState({pwdValidate:false});
      }
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
      <View style={styles.wrapper}>
          <View style={styles.inputWrap}>
            <UserInput
              style={[!this.state.genValidate ? styles.error : null]}
              source={usernameImg}
              placeholder="Phone"
              autoCapitalize={'none'}
              returnKeyType={'done'}
              autoCorrect={false}
              onChangeText={(text) => this.validate(text,'data')}
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
              onChangeText={(text) => this.pwdValidate(text,'password')}
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
                  <Text style={styles.text}>LOGIN</Text>
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
  wrapper: {
    paddingHorizontal: 10,
  },
  inputWrap: {
    flexDirection: "row",
    marginVertical: 10,
    height: 45,
    backgroundColor: "transparent"
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
  text: {
    color: 'white',
    backgroundColor: 'transparent',
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
});
