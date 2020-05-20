import React from "react";
import styled from "styled-components";

const MapImgStyle = styled.img`
    pointer-events: initial !important;
    // transform: scale(0.5);
`;

const MapContainerStyle = styled.div`
	position: relative;
	.area-title {
		position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
	}
`;

const LogoContainerStyle = styled.aside`
	position: fixed;
	bottom: 6rem;
	z-index: 10;
	pointer-events: none;
`;

export {
	MapImgStyle,
	MapContainerStyle,
	LogoContainerStyle,
};
