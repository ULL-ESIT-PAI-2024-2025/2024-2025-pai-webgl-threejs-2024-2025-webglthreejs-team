/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 * Programación de Aplicaciones Interactivas
 * 
 * @summary This script demonstrates the use of different materials.
 * 
 * @since Sat 05 Apr 2025 
 * @author Aarón Jano Barreto
 * @author Roberto Padrón Castañeda
 * @author Samuel Montoya Diaz
 * 
 * @see {@link https://github.com/ULL-ESIT-PAI-2024-2025/2024-2025-pai-webgl-threejs-2024-2025-webglthreejs-team.git}
 */

import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

/**
 * Creates various objects using different materials and adds them to the scene.
 * @param {THREE.Scene} scene - The scene to which the objects will be added.
 * @param {THREE.Material[]} materials - An array of materials to be used for the objects.
 */
function createMaterialObjects(scene: THREE.Scene, materials: THREE.Material[]): void {
	materials.forEach((material, index) => {
		const sphereGeometry = new THREE.SphereGeometry(0.5, 32, 32);
		let object;
		if (material instanceof THREE.PointsMaterial) {
			object = new THREE.Points(sphereGeometry, material);
		} else if (material instanceof THREE.LineBasicMaterial || material instanceof THREE.LineDashedMaterial) {
			object = new THREE.LineSegments(new THREE.EdgesGeometry(sphereGeometry), material);
			if (material instanceof THREE.LineDashedMaterial) {
				object.computeLineDistances();
			}
		} else {
			object = new THREE.Mesh(sphereGeometry, material);
		}
		object.position.set(index - 4.5, 0, 0);
		scene.add(object);
	});
}

/**
 * Creates and returns an instance of OrbitControls.
 * @param {THREE.PerspectiveCamera} camera - The camera to be controlled.
 * @param {THREE.WebGLRenderer} renderer - The renderer associated with the camera's DOM element.
 * @returns {OrbitControls} The OrbitControls instance.
 */
function createOrbitControls(camera: THREE.PerspectiveCamera, renderer: THREE.WebGLRenderer): OrbitControls {
	const controls: OrbitControls = new OrbitControls(camera, renderer.domElement);
	controls.enableDamping = true;
	return controls;
}

/**
 * The animation loop that continuously updates and renders the scene.
 * @param {OrbitControls} controls - The controls to update.
 * @param {THREE.Scene} scene - The scene to render.
 * @param {THREE.PerspectiveCamera} camera - The camera to use for rendering.
 * @param {THREE.WebGLRenderer} renderer - The renderer to use for rendering.
 */
function animate(controls: OrbitControls, scene: THREE.Scene, camera: THREE.PerspectiveCamera, renderer: THREE.WebGLRenderer): void {
	requestAnimationFrame(() => (animate(controls, scene, camera, renderer)));
	controls.update();
	renderer.render(scene, camera);
}

/**
 * Creates a perspective camera with specific parameters.
 * @returns {THREE.PerspectiveCamera} The created perspective camera.
 */
function createCamera(): THREE.PerspectiveCamera {
	const FOV: number = 75;
	const ASPECT_RATIO: number = window.innerWidth / window.innerHeight;
	const NEAR: number = 0.1;
	const FAR: number = 1000;
	return new THREE.PerspectiveCamera(FOV, ASPECT_RATIO, NEAR, FAR);
}

/**
 * Creates a WebGL renderer and configures its size.
 * @returns {THREE.WebGLRenderer} The created WebGL renderer.
 */
function createRenderer(): THREE.WebGLRenderer {
	const renderer: THREE.WebGLRenderer = new THREE.WebGLRenderer();
	renderer.domElement.classList.add('fullscreen');
	const RIGHT_MARGIN: number = 35;
	const CANVAS_WIDTH: number = window.innerWidth - RIGHT_MARGIN;
	renderer.setSize(CANVAS_WIDTH, window.innerHeight);
	return renderer;
}

/**
 * Adds the renderer's DOM element to the HTML document.
 * @param {THREE.WebGLRenderer} renderer - The renderer whose DOM element is to be added.
 */
function addRendererToDOM(renderer: THREE.WebGLRenderer): void {
	const ELEMENT_TO_ADD_AFTER: string = 'h1';
	const title: HTMLElement = document.querySelector(ELEMENT_TO_ADD_AFTER)!;
	title.after(renderer.domElement);
}

/**
 * Adds a grid helper to the scene, useful for visual reference.
 * @param {THREE.Scene} scene - The scene to which the grid helper will be added.
 */
function addGridHelper(scene: THREE.Scene): void {
	const gridHelper: THREE.GridHelper = new THREE.GridHelper(20, 20);
	gridHelper.position.y = -1.1;
	scene.add(gridHelper);
}

/**
 * Adds a plane to the scene.
 * @param {THREE.Scene} scene - The scene to which the plane will be added.
 */
function addPlane(scene: THREE.Scene): void {
	const planeGeometry: THREE.PlaneGeometry = new THREE.PlaneGeometry(20, 20);
	const planeMaterial: THREE.MeshStandardMaterial = new THREE.MeshStandardMaterial({ color: 0x808080, side: THREE.DoubleSide });
	const plane: THREE.Mesh = new THREE.Mesh(planeGeometry, planeMaterial);
	plane.rotation.x = -Math.PI / 2;
	plane.position.y = -1.1;
	scene.add(plane);
}

/**
 * Adds basic lighting to the scene.
 * @param {THREE.Scene} scene - The scene to which the lighting will be added.
 */
function addLighting(scene: THREE.Scene): void {
	const ambientLight: THREE.AmbientLight = new THREE.AmbientLight(0xffffff, 0.5);
	scene.add(ambientLight);

	const directionalLight: THREE.DirectionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
	directionalLight.position.set(5, 10, 7.5);
	scene.add(directionalLight);
}

/**
 * Main function that initializes the scene, camera, renderer, and all objects.
 * Also starts the animation loop and adds objects to the scene.
 */
function main(): void {
	const SCENE: THREE.Scene = new THREE.Scene();
	const CAMERA: THREE.PerspectiveCamera = createCamera();
	const RENDERER: THREE.WebGLRenderer = createRenderer();
	const CONTROLS: OrbitControls = createOrbitControls(CAMERA, RENDERER);
	addRendererToDOM(RENDERER);
	CAMERA.position.set(5, 5, 5);
	CAMERA.lookAt(0, 0, 0);
	addGridHelper(SCENE);
	addPlane(SCENE);
	addLighting(SCENE);
	
	const materials: THREE.Material[] = [
		new THREE.MeshBasicMaterial({ color: 0xff0000 }),
		new THREE.MeshStandardMaterial({ color: 0x00ff00, roughness: 0.5, metalness: 0.5, }),
		new THREE.MeshPhongMaterial({ color: 0x0000ff, shininess: 100 }),
		new THREE.MeshLambertMaterial({ color: 0xffff00 }),
		new THREE.MeshToonMaterial({ color: 0xff00ff }),
		new THREE.MeshPhysicalMaterial({ color: 0x00ffff, clearcoat: 1, clearcoatRoughness: 0 }),
		new THREE.ShadowMaterial({ opacity: 0.5 }),
		new THREE.PointsMaterial({ color: 0xffffff, size: 0.03 }),
		new THREE.LineBasicMaterial({ color: 0xffa500 }),
		new THREE.LineDashedMaterial({ color: 0x00ff00, dashSize: 0.2, gapSize: 0.1 }),
		new THREE.MeshNormalMaterial(),
		new THREE.MeshDepthMaterial(),
		new THREE.MeshDistanceMaterial({ referencePosition: new THREE.Vector3(0, 0, 0) }),
	];

	createMaterialObjects(SCENE, materials);
	animate(CONTROLS, SCENE, CAMERA, RENDERER);
}

main();
