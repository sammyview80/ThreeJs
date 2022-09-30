import * as THREE from 'three'
import * as dat from 'dat.gui'
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

camera.position.set(-10, 30, 30)

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

// Adding the plane
const planeGeometry = new THREE.PlaneGeometry(30, 30)
const planeMaterial = new THREE.MeshBasicMaterial({
  color: 0xffffff,
  side: THREE.DoubleSide
})
const plane = new THREE.Mesh(planeGeometry, planeMaterial)
scene.add(plane)
// Rotate the plane
plane.rotation.x = -0.5 * Math.PI

// Adding sphare
const sphereGeometry = new THREE.SphereGeometry(4, 50, 50)
const sphereMaterial = new THREE.MeshBasicMaterial({
  color: 0x0000ff,
  wireframe: false
})
const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial)
scene.add(sphere)
sphere.position.x = 10
sphere.position.y = 10
sphere.position.z = 10

// Gui pallet
const gui = new dat.GUI()

// color option for shpere
const optionsSphere = {
  shpereColor: '#ffea00',
  speed: 0.01,
  wireframe: false
}
// color option for square
const optionsBox = {
  squareColor: '#ffea00',
  wireframe: false
}

// Change the color onChange on pallet value
gui.addColor(optionsSphere, 'shpereColor').onChange(function (e) {
  sphere.material.color.set(e)
})

// Set the wireframe
gui.add(optionsSphere, 'wireframe').onChange(function (e) {
  sphere.material.wireframe = e
})

// Set the speed bounce
gui.add(optionsSphere, 'speed', 0, 1)

gui.addColor(optionsBox, 'squareColor').onChange(function (e) {
  box.material.color.set(e)
})

let step = 0

const gridHelper = new THREE.GridHelper(30)
scene.add(gridHelper)

function animate() {
  box.rotation.x += 0.01
  box.rotation.y += 0.01

  step += optionsSphere.speed
  sphere.position.y = 10 * Math.abs(Math.sin(step))

  // Render the scene and camera
  renderer.render(scene, camera)
}

renderer.setAnimationLoop(animate)
