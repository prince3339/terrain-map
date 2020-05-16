import React from "react";
import * as THREE from "three";
import TerrainLoader from '../lib/TerrainLoader';
import panAndZoomHoc from 'react-pan-and-zoom-hoc';

class MapFigure extends React.Component {
  constructor(props) {
    super(props);
    // this.handleMouseMove = this.handleMouseMove.bind(this);
    // this.handleTouchMove = this.handleTouchMove.bind(this);
  }
  componentDidMount() {
    /* Two options
 * 1. Get FileSaver.js from here
 *     https://github.com/eligrey/FileSaver.js/blob/master/FileSaver.min.js -->
 *     <script src="FileSaver.min.js" />
 *
 * Or
 *
 * 2. If you want to support only modern browsers like Chrome, Edge, Firefox, etc., 
 *    then a simple implementation of saveAs function can be:
 */

  // function saveAs(blob, fileName) {
  //   var url = window.URL.createObjectURL(blob);

  //   var anchorElem = document.createElement("a");
  //   anchorElem.style = "display: none";
  //   anchorElem.href = url;
  //   anchorElem.download = fileName;

  //   document.body.appendChild(anchorElem);
  //   anchorElem.click();

  //   document.body.removeChild(anchorElem);

  //   // On Edge, revokeObjectURL should be called only after
  //   // a.click() has completed, atleast on EdgeHTML 15.15048
  //   setTimeout(function() {
  //       window.URL.revokeObjectURL(url);
  //   }, 1000);
  // }

  // (function() {
  //   // convert base64 string to byte array
  //   var oReq = new XMLHttpRequest();
  //   oReq.open("GET", "/Map.png", true);
  //   oReq.responseType = "arraybuffer";

  //   oReq.onload = function (oEvent) {
  //     var arrayBuffer = oReq.response; // Note: not oReq.responseText
  //     if (arrayBuffer) {
  //       var byteArray = new Uint8Array(arrayBuffer);
  //       var blob1 = new Blob([byteArray], {type: "application/octet-stream"});

  //       var fileName1 = "cool.bin";
  //       saveAs(blob1, fileName1);

  //       // saving text file
  //       // var blob2 = new Blob(["cool"], {type: "text/plain"});
  //       // var fileName2 = "cool.txt";
  //       // saveAs(blob2, fileName2);
  //     }
  //   };

  //   oReq.send(null);
  //   // now that we have the byte array, construct the blob from it
    
  // })();

    // === THREE.JS CODE START ===
    var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize( window.innerWidth, window.innerHeight );
    this.mount.appendChild( renderer.domElement );
    var geometry = new THREE.BoxGeometry( 10, 10, 1 );
    var material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
    var cube = new THREE.Mesh( geometry, material );
    scene.add( cube );
    camera.position.z = 5;

    var terrainLoader = new TerrainLoader();
    terrainLoader.load('/map.bin', function(data) {

        var geometry = new THREE.PlaneGeometry(60, 60, 199, 199);

        for (var i = 0, l = geometry.vertices.length; i < l; i++) {
            geometry.vertices[i].z = data[i] / 65535 * 10;
        }

        var material = new THREE.MeshPhongMaterial({
            color: 0xdddddd, 
            wireframe: true
        });

        var plane = new THREE.Mesh(geometry, material);
        scene.add(plane);

    });

    var animate = function () {
      requestAnimationFrame( animate );
      // cube.rotation.x += 0.01;
      // cube.rotation.y += 0.01;
      renderer.render( scene, camera );
    };
    animate();
    // === THREE.JS EXAMPLE CODE END ===
  }

  render() {
    return (
      <div ref={ref => (this.mount = ref)} />
    );
  }
}

export default MapFigure;