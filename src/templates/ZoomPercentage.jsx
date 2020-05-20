import React from 'react';
import PropTypes from 'prop-types';
import LogoStyle from './LogoStyle';

const ZoomPercentage = ({
	zoom,
}) => (
  <span className="zoom-value">
    {parseInt(zoom * 100)}%
  </span>
);

ZoomPercentage.defaultProps = {
	zoom: 1,
}

ZoomPercentage.propTypes = {
	zoom: PropTypes.number,
}

export default ZoomPercentage;
