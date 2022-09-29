import * as THREE from 'three'

// For mobility of camera.
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

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

// Mobility of camear with mouse: 1
const orbit = new OrbitControls(camera, renderer.domElement)

// To show the axis
const axesHelper = new THREE.AxesHelper(5)
scene.add(axesHelper)

camera.position.set(0, 2, 5)

// 1: update the orbit
orbit.update()

// Create a geometry
const boxGeometry = new THREE.BoxGeometry()
// Create a instance of material for the geometry
const boxMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00 })
// Create a mesh with geometry and material.
const box = new THREE.Mesh(boxGeometry, boxMaterial)

// Add box to scen to display
scene.add(box)

function animate() {
  box.rotation.x += 0.01
  box.rotation.y += 0.01
  // Render the scene and camera
  renderer.render(scene, camera)
}

renderer.setAnimationLoop(animate)
