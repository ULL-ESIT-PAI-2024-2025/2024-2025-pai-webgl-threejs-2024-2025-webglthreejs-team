/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 * Programación de Aplicaciones Interactivas
 * 
 * @summary class that has the logic of the game
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

export class GameModel {
  private maxTime: number = 3;
  private score: number;
  private time: number;
  private ball: { ball: THREE.Mesh, value: number };
  private readonly xRange: number = 16;
  private readonly yRange: number = 4;
  private readonly zRange: number = 4;
  private readonly minimunBallSize: number = 0.5;
  private readonly maximunBallSize: number = 2;

  constructor(maxtime: number = 69) {
    this.score = 0;
    this.time = maxtime;
    this.maxTime = maxtime;
    this.ball = this.randomBall()
  }

  public getScore(): number {
    return this.score;
  }
  
  public setScore(score: number): void {
    this.score = score;
  }
  
  public getTime(): number {
    return this.time;
  }

  public setTime(time: number): void {
    this.time = time;
  }

  public resetGame(): void {
    this.score = 0;
    this.time = this.maxTime;
    this.ball = this.randomBall();
  }

  public getBall(): { ball: THREE.Mesh, value: number } {
    return this.ball;
  }

  public setBall(): void {
    this.ball = this.randomBall();
  }

  private randomBall(): { ball: THREE.Mesh, value: number } {
    let value = 100;
    let size = Math.random() * (this.maximunBallSize - this.minimunBallSize) + this.minimunBallSize;
    value *= size;
    const geometry = new THREE.SphereGeometry(size, 16, 16);
    const material = new THREE.MeshStandardMaterial({ color: 0x00ff00 });
    let ball = new THREE.Mesh(geometry, material);

    const MINIMAL_DISTANCE_FROM_CAMERA: number = 2;
    ball.position.set(
      Math.random() * this.xRange - this.xRange / 2,
      Math.random() * this.yRange - this.yRange / 2,
      Math.random() * this.zRange - this.zRange / 2 - MINIMAL_DISTANCE_FROM_CAMERA
    );
    
    return {ball, value};
  }
}