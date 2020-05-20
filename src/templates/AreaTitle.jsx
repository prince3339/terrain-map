import React from 'react';
import PropTypes from 'prop-types';
import AreaTitleStyle from './AreaTitleStyle';

const AreaTitle = ({
	title
}) => (
	<AreaTitleStyle>
		<span>
			{title}
		</span>
	</AreaTitleStyle>
);

AreaTitle.propTypes = {
	title: PropTypes.string,
};

export default AreaTitle;
