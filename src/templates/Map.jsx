import React from "react";
import ImageMapper from 'react-image-mapper';
import { TransformWrapper, TransformComponent } from "@prince3339/customized-react-zoom-pan-pinch";

class MapFigure extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      type: true,
      limitToBounds: false,
      panningEnabled: true,
      transformEnabled: true,
      pinchEnabled: true,
      limitToWrapper: false,
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
  }
  componentDidMount() {

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
      <div className="body">
        <section>
          <div className="container">
            <div className="row align-items-center">
              <div style={{position: 'relative'}} className="col-lg-12 order-lg-2 example">
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
                    disableOnTarget: ['clickMe', 'fuck'],
                  }}
                  pinch={{ disabled: !pinchEnabled }}
                  doubleClick={{
                    disabled: !dbClickEnabled,
                    disableOnTarget: ['clickMe'],
                  }}
                  wheel={{
                    step: 200,
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
                        <div className="tools">
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
                        </div>
                        <div className="element">
                          <TransformComponent>
                            <div>
                            <div
                              className="clickMe"
                              style={{position: 'absolute'}}
                              onClick={(e) => {
                                e.stopPropagation();
                                console.log('HAHAHHAH');
                              }}
                            >
                              Click Me!
                            </div>
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
                               
                              <img className="fuck" src="./Map.jpg" useMap="#image-map" />
                              <map name="image-map">
                                  <area
                                    onClick={(event) => {
                                      event.preventDefault();
                                      console.log(event);
                                    }}
                                    target="" alt="" title="" href="" coords="301,58,172,1375,1091,1352,1445,117,354,85,599,134,388,273,334,201,341,121,359,95,1253,712" shape="poly" />
                              </map>
                            </div>
                          </TransformComponent>
                        </div>
                        <div className="info">
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
                        </div>
                      </React.Fragment>);
                    }}
                </TransformWrapper>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
}

export default MapFigure;