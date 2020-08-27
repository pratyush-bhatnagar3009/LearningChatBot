import React, {Component} from 'react';
import PropTypes from 'prop-types';
import LogoSignup from './LogoSignup';
import FormSignup from './FormSignup';
import Wallpaper from './Wallpaper';

export default class SignUp extends Component {
  render() {
    return (
      <Wallpaper>
        <FormSignup/>
      </Wallpaper>
    );
  }
}
