import React from 'react'

export const Logo = ({logo, width, padding, otherStyles}) => {
  return <img src={logo} alt="Logo" style={{padding: padding, maxWidth: width, width: '100%', ...otherStyles}}/>;
}
