import React from 'react';
import PropTypes from 'prop-types';
import LogoStyle from './LogoStyle';

const TerrainLogo = ({
	zoom,
}) => (
	<LogoStyle>
		<h1>
			Terrains
		</h1>
		<div id="zoomPlaceholder" />
	</LogoStyle>
);

TerrainLogo.defaultProps = {
	zoom: 100,
}

TerrainLogo.propTypes = {
	zoom: PropTypes.number,
}

export default TerrainLogo;
