import React from "react"
import panAndZoomHoc from 'react-pan-and-zoom-hoc';
import Map from '../templates/Map';
import GlobalStyles from '../styles/global';

// const PannableAndZoomableFigure = panAndZoomHoc(Figure);

class App extends React.Component {
    render() {
        // return <PannableAndZoomableFigure
        //     renderOnChange={true}
        //     passOnProps={true}
        //     src="./Map.jpg"
        //     width="100%"
        //     height="100%"
        // />;
        return (
          <React.Fragment>
            <GlobalStyles />
            <Map />
          </React.Fragment>
        )
    }
}

export default () => <div><App /></div>
