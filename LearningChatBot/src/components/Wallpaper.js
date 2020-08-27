import React, {Component} from 'react';
import {StyleSheet, ImageBackground, StatusBar} from 'react-native';

import bgSrc from '../images/wallpaper.jpg';

export default class Wallpaper extends Component {
  render() {
    return (
    <>
    <StatusBar barStyle="dark-content" />
    <ImageBackground source={bgSrc} style={styles.picture}> 
      {this.props.children}
    </ImageBackground>
    </>
    );
  }
}

const styles = StyleSheet.create({
  picture: {
    flex: 1,
    width: null,
    height: null,
    resizeMode: 'cover',
  }
});
