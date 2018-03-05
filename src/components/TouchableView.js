import React from 'react'
import { PropTypes } from 'prop-types'
import { View, TouchableNativeFeedback, TouchableOpacity } from 'react-native'

const TouchableView = ({ isRippleDisabled, rippleColor, children, style, ...props }) => {
    return (
      <TouchableOpacity {...props} style={style}>
        {children}
      </TouchableOpacity>
    )
}

TouchableView.propTypes = {
  isRippleDisabled: PropTypes.bool,
  rippleColor: PropTypes.string,
  children: PropTypes.any,
  style: View.propTypes.style
}

export default TouchableView
