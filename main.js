import * as THREE from "three";

// Scene
const scene = new THREE.Scene();

// Creating a sphere
const geometry = new THREE.SphereGeometry(1, 64, 64);
// Radius: size of the sphere
// Width segments: number of horizontal segments
// Height segments: number of vertical segments
const material = new THREE.MeshStandardMaterial({ color: "#00ff83" });
const mesh = new THREE.Mesh(geometry, material); // combine material and geometry
scene.add(mesh);

// Camera
const camera = new THREE.PerspectiveCamera(
  45, // Field of view
  window.innerWidth / window.innerHeight // Aspect ratio
  // 0.1, // Near clipping plane
  // 1000 // Far clipping plane
);

scene.add(camera);

// Renderer
const canvas = document.querySelector(".webgl");
const renderer = new THREE.WebGLRenderer({
  canvas,
});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.render(scene, camera);
