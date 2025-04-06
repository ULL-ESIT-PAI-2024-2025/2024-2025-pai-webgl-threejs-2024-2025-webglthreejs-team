/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 * Programación de Aplicaciones Interactivas
 * 
 * @summary class that coordinates the game values and logic, and the View 
 * @version 0.1.0
 * 
 * @since Sat 06 Apr 2025 
 * @author Aarón Jano Barreto
 * @author Roberto Padrón Castañeda
 * @author Samuel Montoya Diaz
 * 
 * @see {@link https://github.com/ULL-ESIT-PAI-2024-2025/2024-2025-pai-webgl-threejs-2024-2025-webglthreejs-team.git}
 */

import { GameView } from "../Game-view/GameView";
import { GameModel } from "../Game-model/GameModel";

import * as THREE from "three";

export class GameController {
  private model: GameModel;
  private view: GameView;
  private scene: THREE.Scene;
  private camera: THREE.PerspectiveCamera;
  private renderer: THREE.WebGLRenderer;
  private gameRunning: boolean = false;
  private lastTimeUpdate = Date.now();

  constructor(model: GameModel, view: GameView, scene: THREE.Scene, camera: THREE.PerspectiveCamera, renderer: THREE.WebGLRenderer) {
    this.scene = scene;
    this.camera = camera;
    this.renderer = renderer;
    this.model = model;
    this.view = view;
  }

  public initialize(): void {
    this.startGame();
    this.resetGame();  
    this.calculateIntersection();
  }

  public startGameLoop(): void {
    this.view.getGameContainer().appendChild(this.renderer.domElement);
    this.scene.add(this.model.getBall().ball);
    this.animate();
  }

  private calculateIntersection(): void {
    const raycaster = new THREE.Raycaster();
    raycaster.near = 0.01;
    raycaster.far = 1000;
    const mouse = new THREE.Vector2();
    window.addEventListener('click', (event) => {
      if(this.gameRunning) {
        mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
        raycaster.setFromCamera(mouse, this.camera);
        raycaster.ray
        const intersects = raycaster.intersectObject(this.model.getBall().ball);
        if (intersects.length > 0) {
          this.model.setScore(this.model.getScore() + this.model.getBall().value);
          this.view.updateScore(this.model.getScore());
          this.scene.remove(this.model.getBall().ball);
          this.model.setBall();
          this.scene.add(this.model.getBall().ball);
        }
      }
    })
  }

  private animate(): void {
    if (!this.gameRunning) {
      return;
    }
  
    requestAnimationFrame(() => this.animate());
  
    const now = Date.now();
    if (now - this.lastTimeUpdate >= 1000) {
      const newTime = this.model.getTime() - 1;
      this.model.setTime(newTime);
      this.view.updateTime(newTime);
      this.lastTimeUpdate = now;
  
      if (newTime <= 0) {
        this.stopGame();
        return;
      }
    }
  
    this.renderer.render(this.scene, this.camera);
  }
  
  private resetGame(): void {
    this.view.getResetButton().addEventListener('click', () => {
      this.scene.remove(this.model.getBall().ball);
      this.stopGame()
      this.view.updateScore(this.model.getScore());
      this.view.updateTime(this.model.getTime());
      this.model.resetGame();
      this.renderer.render(this.scene, this.camera);
    });
  }

  private startGame(): void {
    this.view.getStartButton().addEventListener('click', () => {
      this.scene.clear();
      this.view.addElements(this.scene);
      this.gameRunning = true;
      this.model.resetGame();
      this.view.updateScore(this.model.getScore());
      this.view.updateTime(this.model.getTime());
      this.startGameLoop();
    });
  }

  private stopGame(): void {
    this.gameRunning = false;
    this.scene.remove(this.model.getBall().ball)
    this.view.updateScore(this.model.getScore());
    this.view.updateTime(0);
  }

}