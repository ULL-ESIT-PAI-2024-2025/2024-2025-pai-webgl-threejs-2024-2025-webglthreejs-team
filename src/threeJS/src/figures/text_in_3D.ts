import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry';


function animate(controls: OrbitControls, scene: THREE.Scene, camera: THREE.PerspectiveCamera, renderer: THREE.WebGLRenderer): void {
  requestAnimationFrame(() => (animate(controls, scene, camera, renderer)));
  controls.update();
  renderer.render(scene, camera);
}

function createCamera(): THREE.PerspectiveCamera {
  const FOV: number = 75;
  const ASPECT_RATIO: number = window.innerWidth / window.innerHeight;
  const NEAR: number = 0.1;
  const FAR: number = 1000;
  return new THREE.PerspectiveCamera(FOV, ASPECT_RATIO, NEAR, FAR);
}

function createRenderer(): THREE.WebGLRenderer {
  const renderer: THREE.WebGLRenderer = new THREE.WebGLRenderer();
  renderer.domElement.classList.add("fullscreen");
  const RIGHT_MARGIN: number = 35;
  const CANVAS_WIDTH: number = window.innerWidth - RIGHT_MARGIN;
  renderer.setSize(CANVAS_WIDTH, window.innerHeight); 
  return renderer;
}

function addRendererToDOM(renderer: THREE.WebGLRenderer): void {
  const ELEMENT_TO_ADD_AFTER: string = "h1";
  const title: HTMLElement = document.querySelector(ELEMENT_TO_ADD_AFTER)!;
  title.after(renderer.domElement);
}

function createOrbitControls(camera: THREE.PerspectiveCamera, renderer: THREE.WebGLRenderer): OrbitControls {
  const controls: OrbitControls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  return controls;
}

function addGridHelper(scene: THREE.Scene): void {
  const gridHelper: THREE.GridHelper = new THREE.GridHelper(20, 20);
  gridHelper.position.y = -0.1; 
  scene.add(gridHelper);
}

function addPlane(scene: THREE.Scene): void {
  const planeGeometry: THREE.PlaneGeometry = new THREE.PlaneGeometry(20, 20);
  const planeMaterial: THREE.MeshStandardMaterial = new THREE.MeshStandardMaterial({ color: 0x808080, side: THREE.DoubleSide });
  const plane: THREE.Mesh = new THREE.Mesh(planeGeometry, planeMaterial);
  plane.rotation.x = -Math.PI / 2;
  plane.position.y = -0.1; 
  scene.add(plane);
}

function addLighting(scene: THREE.Scene): void {
  const ambientLight: THREE.AmbientLight = new THREE.AmbientLight(0xffffff, 0.5);
  scene.add(ambientLight);

  const directionalLight: THREE.DirectionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
  directionalLight.position.set(5, 10, 7.5);
  scene.add(directionalLight);
}


function addText(scene: THREE.Scene, material: THREE.Material, text: string): void {
  const loader = new FontLoader();
  loader.load('http://localhost:3000/src/figures/Hefana_Regular.json', (font) => {
    const textGeometry = new TextGeometry(text, {
      font: font,
      size: 1,
      depth: 0.5,
      curveSegments: 12,
      bevelEnabled: true,
      bevelThickness: 0.03,
      bevelSize: 0.02,
      bevelSegments: 5,
    });

    const textMesh = new THREE.Mesh(textGeometry, material);
    textMesh.position.set(-5, 1, 0);
    scene.add(textMesh);
  });
}

function main(): void {
  const SCENE: THREE.Scene = new THREE.Scene();
  const CAMERA: THREE.PerspectiveCamera = createCamera();
  const RENDERER: THREE.WebGLRenderer = createRenderer();
  const CONTROLS: OrbitControls = createOrbitControls(CAMERA, RENDERER);
  addRendererToDOM(RENDERER);
  CAMERA.position.set(0, 3, 5);
  CAMERA.lookAt(0, 1, 0);
  addGridHelper(SCENE);
  addPlane(SCENE);
  addLighting(SCENE);
  const material: THREE.MeshStandardMaterial = new THREE.MeshStandardMaterial({ color: 0x0077ff });
  addText(SCENE, material, "Hello, 3D World!");
  animate(CONTROLS, SCENE, CAMERA, RENDERER);
}

main();