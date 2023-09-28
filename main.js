import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

let width = window.innerWidth;
let height = window.innerHeight;
let aspectRatio = width / height;

// Scene
const scene = new THREE.Scene();

// Creating a sphere
const geometry = new THREE.SphereGeometry(3, 64, 64);
// Radius: size of the sphere
// Width segments: number of horizontal segments
// Height segments: number of vertical segments
const material = new THREE.MeshStandardMaterial({
  color: "#00ff83",
  roughness: 0.5,
});
const mesh = new THREE.Mesh(geometry, material); // combine material and geometry
scene.add(mesh);

// Lights
const pointLight = new THREE.PointLight(0xffffff, 100, 100, 1.5); // decay: The amount the light dims along the distance of the light.
pointLight.position.set(0, 10, 10);
scene.add(pointLight);

// Camera
const camera = new THREE.PerspectiveCamera(
  50, // Field of view
  aspectRatio, // Aspect ratio
  0.1, // Near clipping plane
  150 // Far clipping plane => like Minecraft
);
camera.position.z = 20;
scene.add(camera);

// Renderer
const canvas = document.querySelector(".webgl");
const renderer = new THREE.WebGLRenderer({
  canvas,
});
renderer.setSize(width, height);
renderer.setPixelRatio(2);
renderer.render(scene, camera);

// Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;
controls.enablePan = false;
controls.enableZoom = false;
controls.autoRotate = true;
controls.autoRotateSpeed = 5;
// Resize
window.addEventListener("resize", () => {
  // Update sizes
  width = window.innerWidth;
  height = window.innerHeight;
  aspectRatio = width / height;

  // Update camera
  camera.aspect = aspectRatio;
  camera.updateProjectionMatrix();
  // Update renderer
  renderer.setSize(width, height);
});

const loop = () => {
  // pointLight.position.x = Math.sin(Date.now() * 0.001) * 10;
  // pointLight.position.x += 0.1;
  controls.update();
  renderer.render(scene, camera);
  window.requestAnimationFrame(loop);
};

loop();
