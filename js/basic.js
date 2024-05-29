import * as THREE from '../js/three.module.js';
import OrbitControls from '../js/OrbitControls.js';
import Stats from '../js/stats.module.js';

let scene = new THREE.Scene();
scene.background = new THREE.Color( 0xAACCFF );

let camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
camera.position.set(0, 2, 5);

let ambientLight = new THREE.AmbientLight(0x888888, 1);
scene.add(ambientLight);

let directionalLight = new THREE.DirectionalLight(0xFFFFFF, 2);
directionalLight.position.set(2, 2, 0);
directionalLight.target.position.set(0, 0, 0);
scene.add(directionalLight);
scene.add(directionalLight.target);

let renderer = new THREE.WebGLRenderer( {antialias: true} );
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

// optional: stats panel (show FPS etc); remember to update
var statpanel = new Stats();
statpanel.domElement.style.cssText = 'position:absolute;top:0px;left:0px;';
document.body.appendChild(statpanel.domElement);

// optional: camera movement controls
let controls = new OrbitControls( camera, renderer.domElement );

// optional: handle window resizing
window.addEventListener( 'resize', onWindowResize );

// custom scene elements

// use for loading images
let loader = new THREE.TextureLoader();
let earthTexture = loader.load( '../images/earth-sphere.jpg' );
let skyTexture = loader.load( '../images/starfield.jpg' );
skyTexture.colorSpace = THREE.SRGBColorSpace;

/*
let gridSize = 10;
let gridDivisions = 10;
let gridCenterColor = 0xFF0000;
let gridLineColor = 0x000000;
let gridHelper = new THREE.GridHelper( gridSize, gridDivisions, gridCenterColor, gridLineColor );
scene.add( gridHelper );

let floorGeo = new THREE.PlaneGeometry(gridSize, gridSize);
let floorMat = new THREE.MeshLambertMaterial({ 
	color: 0xFFFFFF, side: THREE.DoubleSide, transparent: true, opacity: 0.8 });
let floor = new THREE.Mesh(floorGeo, floorMat);
floor.rotation.x = -Math.PI / 2;
scene.add(floor);
*/
 
let skyGeo = new THREE.SphereGeometry( 500 );
let skyMat = new THREE.MeshBasicMaterial( { map: skyTexture, side:THREE.BackSide } );
let sky = new THREE.Mesh( skyGeo, skyMat );
scene.add( sky );

let earthGeo = new THREE.SphereGeometry( 1 );
let earthMat = new THREE.MeshLambertMaterial( { map: earthTexture } );
let earth = new THREE.Mesh( earthGeo, earthMat );
earth.position.set(0, 0, 0);
scene.add( earth );


function update()
{
	statpanel.update();
    // controls.update(); // not needed

	// earth.rotation.x += 0.01;
	// earth.rotation.y += 0.01;
}

function render()
{
	renderer.render( scene, camera );
}

function onWindowResize()
{
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();
	renderer.setSize( window.innerWidth, window.innerHeight );
}

function loop() 
{
	requestAnimationFrame( loop );
	update();
	render();
};

loop();
