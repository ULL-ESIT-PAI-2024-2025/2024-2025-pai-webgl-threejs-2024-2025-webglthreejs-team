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

// Crear objetos con diferentes materiales
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


function createOrbitControls(camera: THREE.PerspectiveCamera, renderer: THREE.WebGLRenderer): OrbitControls {
	const controls: OrbitControls = new OrbitControls(camera, renderer.domElement);
	controls.enableDamping = true;
	return controls;
}

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

function addGridHelper(scene: THREE.Scene): void {
	const gridHelper: THREE.GridHelper = new THREE.GridHelper(20, 20);
	gridHelper.position.y = -1.1;
	scene.add(gridHelper);
}

function addPlane(scene: THREE.Scene): void {
	const planeGeometry: THREE.PlaneGeometry = new THREE.PlaneGeometry(20, 20);
	const planeMaterial: THREE.MeshStandardMaterial = new THREE.MeshStandardMaterial({ color: 0x808080, side: THREE.DoubleSide });
	const plane: THREE.Mesh = new THREE.Mesh(planeGeometry, planeMaterial);
	plane.rotation.x = -Math.PI / 2;
	plane.position.y = -1.1;
	scene.add(plane);
}

function addLighting(scene: THREE.Scene): void {
	const ambientLight: THREE.AmbientLight = new THREE.AmbientLight(0xffffff, 0.5);
	scene.add(ambientLight);

	const directionalLight: THREE.DirectionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
	directionalLight.position.set(5, 10, 7.5);
	scene.add(directionalLight);
}

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
	// Materiales
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
