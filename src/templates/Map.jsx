import React from "react";
import ArcText from 'arc-text';
import ReactDOM from 'react-dom';
import ImageMapper from 'react-image-mapper';
// import imageMapResize from 'image-map-resizer';
import { TransformWrapper, TransformComponent } from "@prince3339/customized-react-zoom-pan-pinch";
import Logo from './Logo';
import AreaTitle from './AreaTitle';
import ZoomPercentage from './ZoomPercentage';
// import imageMapResize from '../lib/imageMapResize';
import {
  MapImgStyle,
  MapWrapperStyle,
  MapContainerStyle,
  MainContainerStyle,
  LogoContainerStyle,
} from './MapStyle';

class MapFigure extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      type: true,
      isMapLoaded: false,
      mapImageSrc: '',
      limitToBounds: true,
      panningEnabled: true,
      transformEnabled: true,
      pinchEnabled: true,
      limitToWrapper: true,
      disabled: false,
      dbClickEnabled: true,
      lockAxisX: false,
      lockAxisY: false,
      velocityEqualToMove: true,
      enableWheel: true,
      enableTouchPadPinch: true,
      enableVelocity: true,
      limitsOnWheel: false,
      hoveredArea: {},
    };

    this.toggleSetting = this.toggleSetting.bind(this);
    this.enterArea = this.enterArea.bind(this);
    this.leaveArea = this.leaveArea.bind(this);
    this.getTipPosition = this.getTipPosition.bind(this);
    this.generateAreaTitle = this.generateAreaTitle.bind(this);
  }
  componentDidMount() {
    if (process.browser) {
      window.imageMapResize && window.imageMapResize(this.generateAreaTitle)();
    }
  }

  // componentDidUpdate() {
  //   if (process.browser) {
  //     window.imageMapResize && window.imageMapResize(this.generateAreaTitle)();
  //   }
  // }

  generateAreaTitle() {
    setTimeout(() => {
      const ImageMap = document.querySelectorAll('#image-map > area');
      const mapContainer = document.getElementById('map-container');
      const titleWrapperContainer = document.getElementById('title-wrapper');
      if (titleWrapperContainer) {
        mapContainer.removeChild(titleWrapperContainer);
      }
      const mapImage = new Image();
      const mapImageSrc = "./xx-largemap-compressed.png";
      mapImage.src = mapImageSrc;
      mapImage.onload = () => {
      this.setState({
        mapImageSrc: mapImageSrc,
        isMapLoaded: true,
      })
      }
      const titleWrapper = document.createElement('div');
      ImageMap.forEach(area => {
        const title = area.getAttribute('title');
        const coords = area.getAttribute('coords');
        const coorA = coords.split(',');
        let left = coorA[0];
        let top = coorA[1];
        let right = coorA[2];
        let bottom = coorA[3];

        // in order to properly calculate the height and width
        // left position must be less than the right
        if (parseInt(left) > parseInt(right)) {
          let tmp = right;
          right = left;
          left = tmp;
        }
        // The same applies to top and bottom
        if (parseInt(top) > parseInt(bottom)) {
          let tmp = top;
          top = bottom;
          bottom = tmp;
        }

        // calculate the width and height of the rectangle
        const width = Math.abs(right - left);
        const height = Math.abs(bottom - top);
        const areaTitleContainer = document.createElement('div');
        const areaTitle = document.createElement('div');
        const areaDOT = document.createElement('span');
        areaDOT.classList.add('area-dot');
        
        titleWrapper.setAttribute('id', 'title-wrapper');
        areaTitleContainer.classList.add('title-container');
        areaTitleContainer.setAttribute('id', 'title-container');
        areaTitleContainer.style.width = `${width}px`;
        areaTitleContainer.style.height = `${height}px`;
        areaTitleContainer.style.position = 'absolute';
        areaTitleContainer.style.pointerEvents = 'none';
        areaTitleContainer.style.top = `${top}px`;
        areaTitleContainer.style.left = `${parseInt(left) > parseInt(right) ? right : left}px`;
        areaTitle.classList.add('area-title');
        areaTitle.innerHTML = title;
        areaTitle.setAttribute('id', title);
        areaTitleContainer.appendChild(areaTitle);
        areaTitleContainer.appendChild(areaDOT);
        if (title !== 'Easter Egg 3, 4' && title !== 'Easter Egg 1') {
          titleWrapper.appendChild(areaTitleContainer);
        }
      });
      mapContainer.appendChild(titleWrapper);

      ImageMap.forEach((area) => {
        const title = area.getAttribute('title');
        const titleText = document.getElementById(title);
        if (titleText) {
          const arcText = new ArcText(titleText);
          if (title === 'Talent Management') {
            arcText.arc(160);
            arcText.direction(1);
          } else {
            arcText.arc(250);
            arcText.direction(-1);
          }
        }
      });
    }, 300);
  }

  toggleSetting(type) {
    this.setState(p => ({ [type]: !p[type] }));
  }

  enterArea(area) {
      this.setState({ hoveredArea: area });
  }

  leaveArea(area) {
      this.setState({ hoveredArea: null });
  }

  getTipPosition(area) {
      return { top: `${area.center[1]}px`, left: `${area.center[0]}px` };
  }

  render() {
    const {
      type,
      mapImageSrc,
      limitToBounds,
      panningEnabled,
      transformEnabled,
      pinchEnabled,
      limitToWrapper,
      disabled,
      dbClickEnabled,
      lockAxisX,
      lockAxisY,
      velocityEqualToMove,
      enableWheel,
      enableTouchPadPinch,
      enableVelocity,
      limitsOnWheel,
    } = this.state;
    const MAP = {
      name: "my-map",
      areas: [
        { name: "1", shape: "poly", coords: [25,33,27,300,128,240,128,94], preFillColor: "green", fillColor: "blue"  },
        { name: "2", shape: "poly", coords: [219,118,220,210,283,210,284,119], preFillColor: "pink"  },
        { name: "3", shape: "poly", coords: [381,241,383,94,462,53,457,282], fillColor: "yellow"  },
        { name: "4", shape: "poly", coords: [245,285,290,285,274,239,249,238], preFillColor: "red"  },
        { name: "5", shape: "circle", coords: [170, 100, 25 ] },
      ]
    }
    return (
      <MainContainerStyle className="body">
        <LogoContainerStyle>
          <Logo />
        </LogoContainerStyle>
        <MapWrapperStyle>
          <div style={{position: 'relative'}} className="">
            <TransformWrapper
              options={{
                limitToBounds,
                transformEnabled,
                disabled,
                limitToWrapper,
              }}
              pan={{
                disabled: !panningEnabled,
                lockAxisX,
                lockAxisY,
                velocityEqualToMove,
                velocity: enableVelocity,
                disableOnTarget: ['clickMe'],
              }}
              pinch={{ disabled: !pinchEnabled }}
              doubleClick={{
                disabled: !dbClickEnabled,
                disableOnTarget: ['clickMe'],
              }}
              wheel={{
                step: 300,
                wheelEnabled: enableWheel,
                touchPadEnabled: enableTouchPadPinch,
                limitsOnWheel,
                
              }}
            >
              {({
                zoomIn,
                zoomOut,
                resetTransform,
                setDefaultState,
                positionX,
                positionY,
                scale,
                previousScale,
                options: { limitToBounds, transformEnabled, disabled },
                ...rest
              }) => {
                  return (<React.Fragment>
                    {/* <div className="tools">
                      <button className="btn-gradient yellow small btn-type" data-testid="toggle-button" onClick={() => {
                        setDefaultState();
                        this.setState(p => ({ type: !p.type }));
                      } }>
                        {type ? "Div example" : "Image example"}
                      </button>
                      <div className="spacer" />
                      <button className="btn-gradient cyan small" onClick={zoomIn} data-testid="zoom-in-button">
                        ZoomIn+
                      </button>
                      <button className="btn-gradient blue small" onClick={zoomOut} data-testid="zoom-out-button">
                        ZoomOut-
                      </button>
                      <button className="btn-gradient purple small" onClick={resetTransform} data-testid="reset-button">
                        Zoom Reset
                      </button>
                    </div> */}
                    <TransformComponent className="transform-container">
                      <div>
                        {/* <div
                          className="clickMe"
                          style={{position: 'absolute'}}
                          onClick={(e) => {
                            e.stopPropagation();
                            console.log('HAHAHHAH');
                          }}
                        >
                          Click Me!
                        </div> */}
                        {/* <ImageMapper src={'./Map.jpg'} map={MAP} width={500}
                          onLoad={() => () => {}}
                          onClick={area => () => {}}
                          onMouseEnter={area => this.enterArea(area)}
                          onMouseLeave={area => this.leaveArea(area)}
                          onMouseMove={(area, _, evt) => this.moveOnArea(area, evt)}
                          onImageClick={evt => () => {}}
                          onImageMouseMove={evt => () => {}}
                        /> */}
                          {/* <img onClick={(e) => {
                            e.preventDefault();
                            alert('test');
                          } } src="./Map.jpg" alt="" useMap="#my-map" />
                          */}
                        
                        <MapContainerStyle
                          id="map-container"
                          className="map-container"
                        >
                          <MapImgStyle
                            src="https://dev.golamdostogir.com/map-img/xx-largemap-compressed.png"
                            useMap="#image-map"
                            className="map-img"
                            onLoad={(e) => console.log(e)}
                          />
                        </MapContainerStyle>
                        <map
                          id="image-map"
                          name="image-map"
                        >
                            {/* <area
                              onClick={(event) => {
                                event.preventDefault();
                                console.log(event);
                              }}
                              target="_top"
                              alt="Contact"
                              title="C  o  n  t  a  c  t"
                              href=""
                              coords="930,2,299,526"
                              shape="rect"
                            />
                            <area
                              onClick={(event) => {
                                event.preventDefault();
                                console.log(event);
                              }}
                              target="_top"
                              alt="Talent Management"
                              title="Talent Management"
                              href=""
                              coords="1597,3,932,527"
                              shape="rect"
                            />
                            <area
                              onClick={(event) => {
                                event.preventDefault();
                                console.log(event);
                              }}
                              target="_top"
                              alt="Production"
                              title="Production"
                              href=""
                              coords="1597,529,929,1114"
                              shape="rect"
                            />
                            <area
                              onClick={(event) => {
                                event.preventDefault();
                                console.log(event);
                              }}
                              target="_top"
                              alt="About"
                              title="About"
                              href=""
                              coords="927,1109,298,1709"
                              shape="rect"
                            />
                            <area
                              onClick={(event) => {
                                event.preventDefault();
                                console.log(event);
                              }}
                              target="_top"
                              alt="Easter Egg 3, 4"
                              title="Easter Egg 3, 4"
                              href=""
                              coords="299,527,929,1107"
                              shape="rect"
                            />
                            <area
                              onClick={(event) => {
                                event.preventDefault();
                                console.log(event);
                              }}
                              target="_top"
                              alt="Easter Egg 1"
                              title="Easter Egg 1"
                              href=""
                              coords="1595,1116,929,1708"
                              shape="rect"
                            /> */}
                            <area
                              target="_top"
                              alt="About"
                              title="About"
                              href=""
                              coords="4513,263,7483,3306"
                              shape="rect"
                            />
                            <area
                              target="_top"
                              alt="Talent Management"
                              title="Talent Management"
                              href=""
                              coords="10567,263,7521,3306"
                              shape="rect"
                            />
                            <area
                              target="_top"
                              alt="Production"
                              title="Production"
                              href=""
                              coords="10567,3343,7521,6010"
                              shape="rect"
                            />
                            <area
                              target="_top"
                              alt="Easter Egg 1"
                              title="Easter Egg 1"
                              href=""
                              coords="10567,6048,7521,8490"
                              shape="0"
                            />
                            <area
                              target="_top"
                              alt="Easter Egg 3, 4"
                              title="Easter Egg 3, 4"
                              href=""
                              coords="4513,3343,7483,6010"
                              shape="rect"
                            />
                            <area
                              target="_top"
                              alt="Contact"
                              title="Contact"
                              href=""
                              coords="4513,6048,7483,8490"
                              shape="rect"
                            />
                        </map>
                      </div>
                      {process.browser && document.getElementById('zoomPlaceholder') ?
                        ReactDOM.createPortal(<ZoomPercentage zoom={scale} />, document.getElementById('zoomPlaceholder'))
                        :
                        null
                      }
                    </TransformComponent>
                    {/* <div className="info">
                      <h3>State</h3>
                      <h5>
                        <span className="badge badge-secondary">
                          Position x: {positionX}px
                        </span>
                        <span className="badge badge-secondary">
                                                  Position y: {positionY}px
                        </span>
                        <span className="badge badge-secondary">
                                                      Scale: {scale}
                        </span>
                        <span className="badge badge-secondary">
                                                Previous scale: {previousScale}
                        </span>
                      </h5>
                    </div>
                    <div className="functions">
                      <h3>Functions</h3>
                      <h6>
                        <button className={"btn-gradient grey small" +
                          (disabled ? " active" : "")} onClick={() => this.toggleSetting("disabled")}>
                          <span /> Disable
                        </button>
                        <button className={"btn-gradient grey small" +
                          (limitToBounds ? " active" : "")} onClick={() => this.toggleSetting("limitToBounds")}>
                          <span /> Limit bounds
                        </button>
                        <button className={"btn-gradient grey small" +
                          (limitToWrapper ? " active" : "")} onClick={() => this.toggleSetting("limitToWrapper")}>
                          <span /> Limit to wrapper bounds
                        </button>
                        <button className={"btn-gradient grey small" +
                          (!rest.pan.disabled ? " active" : "")} onClick={() => this.toggleSetting("panningEnabled")}>
                          <span /> Enable panning
                        </button>
                        <button className={"btn-gradient grey small" +
                          (!rest.pinch.disabled ? " active" : "")} onClick={() => this.toggleSetting("pinchEnabled")}>
                          <span /> Enable pinch
                        </button>
                        <button className={"btn-gradient grey small" +
                          (transformEnabled ? " active" : "")} onClick={() => this.toggleSetting("transformEnabled")}>
                          <span /> Enable transform
                        </button>
                        <button className={"btn-gradient grey small" +
                          (!rest.doubleClick.disabled ? " active" : "")} onClick={() => this.toggleSetting("dbClickEnabled")}>
                          <span /> Double click
                        </button>
                        <button className={"btn-gradient grey small" +
                          (rest.pan.lockAxisX ? " active" : "")} onClick={() => this.toggleSetting("lockAxisX")}>
                          <span /> Lock X axis
                        </button>
                        <button className={"btn-gradient grey small" +
                          (rest.pan.lockAxisY ? " active" : "")} onClick={() => this.toggleSetting("lockAxisY")}>
                          <span /> Lock Y axis
                        </button>
                        <button className={"btn-gradient grey small" +
                          (rest.pan.velocityEqualToMove ? " active" : "")} onClick={() => this.toggleSetting("velocityEqualToMove")}>
                          <span /> Velocity time based on move
                        </button>
                        <button className={"btn-gradient grey small" +
                          (rest.pan.velocity ? " active" : "")} onClick={() => this.toggleSetting("enableVelocity")}>
                          <span /> Enable velocity
                        </button>
                        <button className={"btn-gradient grey small" +
                          (rest.wheel.wheelEnabled ? " active" : "")} onClick={() => this.toggleSetting("enableWheel")}>
                          <span /> Enable wheel
                        </button>
                        <button className={"btn-gradient grey small" +
                          (rest.wheel.touchPadEnabled ? " active" : "")} onClick={() => this.toggleSetting("enableTouchPadPinch")}>
                          <span /> Enable touch pad pinch
                        </button>
                        <button className={"btn-gradient grey small" +
                          (rest.wheel.limitsOnWheel ? " active" : "")} onClick={() => this.toggleSetting("limitsOnWheel")}>
                          <span /> Bound limits on wheel
                        </button>
                      </h6>
                    </div> */}
                  </React.Fragment>);
                }}
            </TransformWrapper>
          </div>
        </MapWrapperStyle>
      </MainContainerStyle>
    );
  }
}

export default MapFigure;