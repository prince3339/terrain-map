import React from "react";
import styled from "styled-components";

const MapImgStyle = styled.img`
    // pointer-events: initial !important;
		// transform: scale(0.5);
		width: 100%;
`;

const MapContainerStyle = styled.div`
	position: relative;
	.area-title {
		position: absolute;
    top: 50%;
    left: 50%;
		transform: translate(-50%,-50%) rotate(15deg);
		font-size: 2rem;
		color: var(--primary);
		text-transform: uppercase;
		font-family: 'MarianText';
	}
`;

const LogoContainerStyle = styled.aside`
	position: fixed;
	bottom: 6rem;
	z-index: 10;
	pointer-events: none;
	left: 5rem;
	width: 13rem;
`;

const MainContainerStyle = styled.div`

`;

const MapWrapperStyle = styled.div`
	.react-transform-component, .react-transform-element {
		width: 100%;
	}
`;

export {
	MapImgStyle,
	MapWrapperStyle,
	MapContainerStyle,
	MainContainerStyle,
	LogoContainerStyle,
};
