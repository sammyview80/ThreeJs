import * as THREE from 'three'
import * as dat from 'dat.gui'
// For mobility of camera.
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

// Create instance of webglrender
const renderer = new THREE.WebGL1Renderer()

// Show shadow
renderer.shadowMap.enabled = true

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
const planeMaterial = new THREE.MeshStandardMaterial({
  color: 0xffffff,
  side: THREE.DoubleSide
})
const plane = new THREE.Mesh(planeGeometry, planeMaterial)
scene.add(plane)
// Rotate the plane
plane.rotation.x = -0.5 * Math.PI
// Receive shadow
plane.receiveShadow = true

// Adding sphare
const sphereGeometry = new THREE.SphereGeometry(4, 50, 50)
const sphereMaterial = new THREE.MeshStandardMaterial({
  color: 0x0000ff,
  wireframe: false
})
const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial)
scene.add(sphere)
sphere.position.x = -10
sphere.position.y = 10
sphere.position.z = 0
// Cast the shadow
sphere.castShadow = true

const ambientLight = new THREE.AmbientLight(0x333333)
scene.add(ambientLight)

// const directionaLight = new THREE.DirectionalLight(0xffffff, 0.8)
// scene.add(directionaLight)
// // Set the position of directionaLight
// directionaLight.position.set(-30, 50, 0)
// // Cast shadow
// directionaLight.castShadow = true
// directionaLight.shadow.camera.bottom = -10
// // Add a directional light helper
// const dLightHelper = new THREE.DirectionalLightHelper(directionaLight, 5)
// scene.add(dLightHelper)

// // Add the shadow camera helper
// const dLightShadowHelper = new THREE.CameraHelper(directionaLight.shadow.camera)
// scene.add(dLightShadowHelper)

// Spotlight
const spotLight = new THREE.SpotLight(0xffffff)
scene.add(spotLight)
spotLight.castShadow = true
spotLight.angle = 0.75
spotLight.position.set(-30, 30, 0)

const sLightHelper = new THREE.SpotLightHelper(spotLight)
scene.add(sLightHelper)

// Gui pallet
const gui = new dat.GUI()

// color option for shpere
const optionsSphere = {
  shpereColor: '#ffea00',
  speed: 0.01,
  wireframe: false,
  angle: 0.2,
  penumbra: 0,
  intensity: 1
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

// Set the spotlight value and using spheraOptions
gui.add(optionsSphere, 'angle', 0, 1)
gui.add(optionsSphere, 'penumbra', 0, 1)
gui.add(optionsSphere, 'intensity', 0, 1)

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

  spotLight.angle = optionsSphere.angle
  spotLight.penumbra = optionsSphere.penumbra
  spotLight.intensity = optionsSphere.intensity
  sLightHelper.update()

  // Render the scene and camera
  renderer.render(scene, camera)
}

renderer.setAnimationLoop(animate)
