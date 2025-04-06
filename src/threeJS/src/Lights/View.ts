/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 * Programación de Aplicaciones Interactivas
 * 
 * @summary This script defines a class that creates a view for a Three.js scene. 
 * 
 * @since Sat 05 Apr 2025 
 * @author Aarón Jano Barreto
 * @author Roberto Padrón Castañeda
 * @author Samuel Montoya Diaz
 * 
 * @see {@link https://github.com/ULL-ESIT-PAI-2024-2025/2024-2025-pai-webgl-threejs-2024-2025-webglthreejs-team.git}
 */


import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

/**
 * Class representing the 3D view and rendering logic.
 */
export default class View {
  /**
   * The Three.js scene containing all objects, lights, and the camera.
   * @private
   * @readonly
   */
  private readonly scene: THREE.Scene = new THREE.Scene();

  /**
   * The WebGL renderer used to draw the scene.
   * @private
   * @readonly
   */
  private readonly renderer: THREE.WebGLRenderer = new THREE.WebGLRenderer();

  /**
   * Creates a View instance that manages the rendering of the scene.
   * @param camera - The camera used to view the scene.
   * @param shapes - A group or object containing all the 3D shapes.
   * @param lights - A group containing all the lights used in the scene.
   */
  constructor(
    private readonly camera: THREE.Camera,
    private readonly shapes: THREE.Object3D,
    private readonly lights: THREE.Group
  ) {
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(this.renderer.domElement);

    const controls = new OrbitControls(this.camera, this.renderer.domElement);
    controls.enableDamping = true;

    this.scene.add(this.shapes);
    this.scene.add(this.lights);
  }

  /**
   * Enables shadow mapping for the renderer, shapes, and lights.
   */
  public enableShadows(): void {
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    this.renderer.shadowMap.autoUpdate = true;

    this.shapes.traverse((object) => {
      object.castShadow = true;
      object.receiveShadow = true;
    });

    this.lights.traverse((light) => {
      light.castShadow = true;
    });
  }

  /**
   * Animates the scene by rendering it continuously.
   * Executes an optional animation function on the lights before rendering.
   * @private
   * @param animation - Optional callback to animate the lights before each render frame.
   */
  private animate(animation: (lights: THREE.Group) => void | undefined): void {
    requestAnimationFrame(() => this.animate(animation));
    if (animation) animation(this.lights);
    this.renderer.render(this.scene, this.camera);
  }

  /**
   * Starts the rendering process by initiating the animation loop.
   * @param animation - Optional callback to animate the lights each frame.
   */
  public render(animation: (lights: THREE.Group) => void | undefined): void {
    this.animate(animation);
  }
}
