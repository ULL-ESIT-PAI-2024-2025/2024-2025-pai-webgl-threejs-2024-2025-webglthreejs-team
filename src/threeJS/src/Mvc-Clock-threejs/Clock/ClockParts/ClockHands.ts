/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 * Programación de Aplicaciones Interactivas
 * 
 * @summary This script defines a class that creates and updates the clock hands.
 * 
 * @since  01 Apr 2025 
 * @author Aarón Jano Barreto
 * @author Roberto Padrón Castañeda
 * @author Samuel Montoya Diaz
 * 
 * @see {@link https://github.com/ULL-ESIT-PAI-2024-2025/2024-2025-pai-webgl-threejs-2024-2025-webglthreejs-team.git}
 */

import Hand from "./Hand";
import * as THREE from 'three';

export default class ClockHands {
  private readonly centerSphere: THREE.Mesh;
  
  constructor(
    private hourHand: Hand, 
    private minuteHand: Hand, 
    private secondHand: Hand
  ) {
    const centerSphereGeometry = new THREE.SphereGeometry(0.15, 32, 32);
    const centerSphereMaterial = new THREE.MeshBasicMaterial({ color: 'black' });
    this.centerSphere = new THREE.Mesh(centerSphereGeometry, centerSphereMaterial);
  }

  public updateClockHands(hours: number, minutes: number, seconds: number): void {
    // const NOW: Date = new Date();
    // const SECONDS: number = NOW.getSeconds();
    // const MINUTES: number = NOW.getMinutes();
    // const HOURS: number = NOW.getHours() % 12;

    this.hourHand.rotateHand(-(hours * Math.PI / 6) + (minutes * Math.PI / (6 * 60)) + (seconds * Math.PI / (360 * 60)));
    this.minuteHand.rotateHand(-(minutes * Math.PI / 30) + (seconds * Math.PI / (30 * 60)));
    this.secondHand.rotateHand(-(seconds * Math.PI / 30));
  }

  public renderClockHands(scene: THREE.Scene): void {
    scene.add(this.centerSphere);
    this.hourHand.renderHand(scene);
    this.minuteHand.renderHand(scene);
    this.secondHand.renderHand(scene);
  }
}