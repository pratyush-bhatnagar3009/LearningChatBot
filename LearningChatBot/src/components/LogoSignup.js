import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, View, Text, Image} from 'react-native';

import logoImg from '../images/logo.png';

export default class Logo extends Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.wrapper}>
         <View style={styles.inputWrap}>
        <Image source={logoImg} style={styles.image} />
        </View>
        <View style={styles.inputWrap}>
        <Text style={styles.text}>Learning ChatBot</Text>
        </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  image: {
    width: 80,
    height: 90,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: '#7b32a8',
    fontWeight: 'bold',
    backgroundColor: 'transparent',
    marginTop: 20,
    fontSize: 30,
    fontFamily: 'lucida grande',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
