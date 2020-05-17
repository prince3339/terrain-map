
import React from "react";
import { css } from "styled-components";

const GlobalFontStyle = css`
	@font-face {
    font-family: 'MarianText';
		src: url('./fonts/staMarianText-1800Italic.eot?#iefix') format('embedded-opentype'),
				 url('./fonts/MarianText-1800Italic.otf')  format('opentype'),
				 url('./fonts/MarianText-1800Italic.woff') format('woff'),
				 url('./fonts/MarianText-1800Italic.ttf')  format('truetype'),
				 url('./fonts/MarianText-1800Italic.svg#MarianText-1800Italic') format('svg');
    font-weight: normal;
    font-style: normal;
	}
	@font-face {
		font-family: 'droulersregular';
		src: url('./fonts/droulers-webfont.woff2') format('woff2'),
				url('./fonts/droulers-webfont.woff') format('woff');
		font-weight: normal;
		font-style: normal;

	}
	@font-face {
		font-family: 'simplon_monolight';
		src: url('./fonts/simplonmono-light-webfont.woff2') format('woff2'),
				url('./fonts/simplonmono-light-webfont.woff') format('woff');
		font-weight: normal;
		font-style: normal;
	}
`;

export default GlobalFontStyle;
