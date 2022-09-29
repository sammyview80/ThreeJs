import * as THREE from 'three'

// Create instance of webglrender
const renderer = new THREE.WebGL1Renderer()

// Set the size of the space.
renderer.setSize(window.innerWidth, window.innerHeight)

// Inject the canvas element to page
document.body.appendChild(renderer.domElement)

// There are 3 main pre-requisite scene, camera
// Camera are of two type: prespective and othographic.
// Prespecitive is how real camera function where as orthographic don't count depth.

// Creating a scene in three js
const scene = new THREE.Scene()

// Creating a camera params{ fielOfView, aspectRatio, nearClipping, farclipping}
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
)

// Render the scene and camera
renderer.render(scene, camera)
