import React from "react";
// import favicon from "./favicon.png"

// let inlinedStyles = ""
// if (process.env.NODE_ENV === "production") {
//   try {
//     inlinedStyles = require("!raw-loader!../public/styles.css")
//   } catch (e) {
//     console.log(e)
//   }
// }

function HTML(props) {
  let css
  // if (process.env.NODE_ENV === "production") {
  //   css = (
  //     <style
  //       id="gatsby-inlined-css"
  //       dangerouslySetInnerHTML={{ __html: inlinedStyles }}
  //     />
  //   )
  // }
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no" />
        <title>Terrain Map</title>
        {props.headComponents}
        {/* <link rel="icon" href={favicon} /> */}
        {css}
        <script src="./lib/imageMapResize.js" />
      </head>
      <body>
        <div id="___gatsby" dangerouslySetInnerHTML={{ __html: props.body }} />
        {props.postBodyComponents}
      </body>
    </html>
  )
}

export default HTML;
