import React from "react";
import { createGlobalStyle } from "styled-components";
import Colors from './variables';
import GlobalFontStyle from './fonts';

const GlobalStyle = createGlobalStyle`
  ${GlobalFontStyle};
  html {
    ${Colors};

    position: relative;
    width: 100%;
    box-sizing: border-box;
    min-height: 100%;

    font-family: sans-serif;
    font-size: 0.625rem;
  
    -webkit-tap-highlight-color: rgba(0,0,0,0);
    -ms-text-size-adjust: 100%;
    -webkit-text-size-adjust: 100%;
    -moz-osx-font-smoothing: grayscale;
     -webkit-font-smoothing: antialiased;
  }
  body {
    font-family: 'MarianText';
    overflow: hidden;
    margin: 0;
    padding: 0;
    background: #fdf7f3;
    position: relative;

    area {
      outline: none;
    }
  }
`;

export default GlobalStyle;