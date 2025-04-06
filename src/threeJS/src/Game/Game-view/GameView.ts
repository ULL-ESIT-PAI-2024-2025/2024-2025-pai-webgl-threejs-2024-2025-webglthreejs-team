/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 * Programación de Aplicaciones Interactivas
 * 
 * @summary class to controll Game graphycs and html disposition
 * @version 0.1.0
 * 
 * @since Sat 06 Apr 2025 
 * @author Aarón Jano Barreto
 * @author Roberto Padrón Castañeda
 * @author Samuel Montoya Diaz
 * 
 * @see {@link https://github.com/ULL-ESIT-PAI-2024-2025/2024-2025-pai-webgl-threejs-2024-2025-webglthreejs-team.git}
 */

import * as THREE from 'three';

export class GameView {
  private readonly rootElement: HTMLDivElement = document.querySelector('#root') as HTMLDivElement;
  private readonly scoreAndTimeContainer: HTMLDivElement = GameView.createElement('div', 'scoreAndTimeContainer') as HTMLDivElement;
  private readonly gameContainer: HTMLDivElement = GameView.createElement('div', 'gameContainer') as HTMLDivElement;
  private scoreElement: HTMLDivElement = GameView.createElement('div', 'OverGame') as HTMLDivElement;
  private timeElement: HTMLDivElement = GameView.createElement('div', 'OverGame') as HTMLDivElement;
  private startButton: HTMLButtonElement = GameView.createElement('button', 'OverGame') as HTMLButtonElement;
  private resetButton: HTMLButtonElement = GameView.createElement('button', 'OverGame') as HTMLButtonElement;
  private scene: THREE.Scene;
  private camera: THREE.PerspectiveCamera;
  private renderer: THREE.WebGLRenderer;
  private sceneElements: THREE.Object3D[] = [];

  constructor(scene: THREE.Scene, camera: THREE.PerspectiveCamera, renderer: THREE.WebGLRenderer, maxTime: number = 69) {
    
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap; 
    
    this.scene = scene;
    
    camera.position.z = 5;
    camera.lookAt(0, 0, 0);

    const ambientLight = new THREE.AmbientLight('white', 0.5); 
    this.scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight('white', 30); 
    directionalLight.position.set(5, 10, 7.5);
    this.scene.add(directionalLight);

    //floor
    const planeGeometry = new THREE.PlaneGeometry(1000, 1000);
    const planeMaterial = new THREE.MeshStandardMaterial({ color: 'gray', side: THREE.DoubleSide });
    const plane = new THREE.Mesh(planeGeometry, planeMaterial);
    plane.rotation.x = -Math.PI / 2;
    plane.position.y = -4;
    this.scene.add(plane);

    this.sceneElements.push(ambientLight);
    this.sceneElements.push(directionalLight);
    this.sceneElements.push(plane);

    this.camera = camera;
    this.renderer = renderer;
    this.rootElement.append(this.scoreAndTimeContainer); 
    this.scoreAndTimeContainer.append(this.scoreElement, this.timeElement, this.startButton, this.resetButton); 
    this.rootElement.append(this.gameContainer);
    this.gameContainer.append(renderer.domElement);
    renderer.domElement.className = 'gameCanvas';
    
    this.scoreElement.textContent = 'Score: 0';
    this.timeElement.textContent = 'Time: ' + maxTime;
    this.startButton.textContent = 'Start';
    this.resetButton.textContent = 'Reset';
    this.renderer.render(this.scene, this.camera);
  }

  public getGameContainer(): HTMLDivElement {
    return this.gameContainer;
  }

  public getScoreElement(): HTMLDivElement {
    return this.scoreElement;
  }

  public getTimeElement(): HTMLDivElement {
    return this.timeElement;
  }

  public getStartButton(): HTMLButtonElement {
    return this.startButton;
  }

  public getResetButton(): HTMLButtonElement {
    return this.resetButton;
  }

  public updateScore(score: number): void {
    this.scoreElement.textContent = `Score: ${Math.floor(score)}`;
  }
  
  public updateTime(time: number): void {
    this.timeElement.textContent = `Time: ${time}`;
  }

  public addElements(scene: THREE.Scene) {
    this.sceneElements.forEach(element => {
      scene.add(element);
    });
  }

  protected static createElement(tag: string, className?: string): HTMLElement {
    const element = document.createElement(tag);
    if (className) {
      element.classList.add(className);
    }
    return element;
  }
}