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

export default class View {
  private readonly scene : THREE.Scene = new THREE.Scene()
  private readonly renderer : THREE.WebGLRenderer = new THREE.WebGLRenderer();
  constructor(
    private readonly camera : THREE.Camera, 
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
   * Adds the shapes to the scene and renders the scene with the camera.
   * @private
   */
  private animate(animation: (lights: THREE.Group) => void | undefined): void {
    requestAnimationFrame(() => this.animate(animation));
    if (animation) animation(this.lights);
    this.renderer.render(this.scene, this.camera);
  }
  
  /**
   * Starts the rendering process by initiating the animation loop.
   */
  public render(animation: (lights: THREE.Group) => void | undefined): void {
    this.animate(animation);
  }
}