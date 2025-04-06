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

/**
 * Represents the three clock hands (hour, minute, second) and the central axis point.
 * Responsible for updating and rendering the clock hands in a Three.js scene.
 */
export default class ClockHands {
  /**
   * A sphere mesh at the center of the clock, representing the axis of rotation for the hands.
   * @private
   * @readonly
   */
  private readonly centerSphere: THREE.Mesh;
  
  /**
   * Creates a new ClockHands instance with hour, minute, and second hands.
   * @param hourHand - The hand representing the hour.
   * @param minuteHand - The hand representing the minutes.
   * @param secondHand - The hand representing the seconds.
   */
  constructor(
    private hourHand: Hand, 
    private minuteHand: Hand, 
    private secondHand: Hand
  ) {
    const centerSphereGeometry = new THREE.SphereGeometry(0.15, 32, 32);
    const centerSphereMaterial = new THREE.MeshBasicMaterial({ color: 'black' });
    this.centerSphere = new THREE.Mesh(centerSphereGeometry, centerSphereMaterial);
  }

  /**
   * Updates the rotation of the clock hands based on the current system time.
   */
  public updateClockHands(): void {
    const NOW: Date = new Date();
    const SECONDS: number = NOW.getSeconds();
    const MINUTES: number = NOW.getMinutes();
    const HOURS: number = NOW.getHours() % 12;

    this.hourHand.rotateHand(
      -(HOURS * Math.PI / 6) +
      (MINUTES * Math.PI / (6 * 60)) +
      (SECONDS * Math.PI / (360 * 60))
    );

    this.minuteHand.rotateHand(
      -(MINUTES * Math.PI / 30) +
      (SECONDS * Math.PI / (30 * 60))
    );

    this.secondHand.rotateHand(
      -(SECONDS * Math.PI / 30)
    );
  }

  /**
   * Renders the clock hands and center sphere into the given Three.js scene.
   * @param scene - The scene where the clock hands will be added.
   */
  public renderClockHands(scene: THREE.Scene): void {
    scene.add(this.centerSphere);
    this.hourHand.renderHand(scene);
    this.minuteHand.renderHand(scene);
    this.secondHand.renderHand(scene);
  }
}
