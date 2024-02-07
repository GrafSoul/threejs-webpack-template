import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

//** Scene */
const scene = new THREE.Scene();

//** Perspective Camera */
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  35
);
camera.position.z = 5;

//** Objects */
const cubeGeometry = new THREE.BoxGeometry(1, 1, 1);
const cubeMaterial = new THREE.MeshBasicMaterial({
  color: 0xf00ff00,
  wireframe: true,
});
const cubeMesh = new THREE.Mesh(cubeGeometry, cubeMaterial);
cubeMesh.position.x = 0.5;
cubeMesh.position.y = 0.5;
cubeMesh.position.z = 0.5;

scene.add(cubeMesh);

//** Helpers */
const axesHelper = new THREE.AxesHelper(5);
scene.add(axesHelper);

//** Grid */
const gridHelper = new THREE.GridHelper(10);
scene.add(gridHelper);

//** Renderer */
const canvas = document.querySelector(".threejs");
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);

//** Pixel Ratio */
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

//** Controls */
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;
controls.autoRotate = true;

//** Resize Event Listeners */
window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

//** Render Loop */
function renderLoop() {
  controls.update();
  renderer.render(scene, camera);
  window.requestAnimationFrame(renderLoop);
}

renderLoop();
