import React from 'react';
import styled, { css } from "styled-components";

const LogoStyle = styled.div`
	text-align: center;
	text-transform: uppercase;
	width: 100%;
	h1 {
		font-size: 10.6rem;
		font-family: 'droulersregular';
		
		writing-mode: vertical-lr;
		-webkit-text-fill-color: transparent; /* Will override color (regardless of order) */
		-webkit-text-stroke-width: 1px;
		-webkit-text-stroke-color: var(--primary);
		letter-spacing: 10px;
		margin: 0;
		width: 100%;
	}
	.zoom-value {
		color: var(--primary);
		font-size: 2rem;
		padding-left: 3rem;
		font-family: 'simplon_monolight';
	}
`;

export default LogoStyle;
