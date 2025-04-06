/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 * Programación de Aplicaciones Interactivas
 * Patrón Modelo Vista Controlador
 *
 * @since Tue 25 Mar 2025
 * @desc Controller class for the shopping list
 * @author Guillermo Silva González
 * @author Himar Edhey Hernández Alonso
 * @author Samuel Rodríguez Cuesta
 * @see {@link https://github.com/ULL-ESIT-PAI-2024-2025/2024-2025-pai-mvc-2425-pai-mvc-team}
 * @see {@link https://github.com/taniarascia/mvc}
 */

import { View } from '../View.js';
import * as THREE from 'three';
import Clock from './Colck.js';
import ClockBuilder from './ClockBuilder';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

/**
 * @class ClockView
 * @implements View<Clock, {seconds: number, minutes: number, hours: number}>
 * @description Manages the UI rendering and event handling for the Cocktail app.
 */
export class ClockView implements View<{seconds: number, minutes: number, hours: number}> {
  private readonly scene: THREE.Scene = new THREE.Scene();
  private readonly camera: THREE.PerspectiveCamera;
  private readonly clock: Clock;
  private readonly renderer: THREE.WebGLRenderer = new THREE.WebGLRenderer({ alpha: true });
  /**
   * Creates an instance of `CocktailAppView`.
   *
   * @param {View<void, string>} searchBar - The view component responsible for the search bar.
   * @param {View<Cocktail>} cardView - The view component responsible for rendering individual cocktail cards.
   */
  public constructor() {
    this.renderer.setSize(window.innerWidth, window.innerHeight)
    this.clock = ClockBuilder.buildClock('black', 'white', 2);
    this.camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 500);
    this.camera.position.z = 5;
    document.body.appendChild(this.renderer .domElement);
    this.clock.render(this.scene);    
    const controls = new OrbitControls(this.camera, this.renderer.domElement);
    controls.enableDamping = true;
  }

  /**
   * Registers an event listener for user interactions.
   *
   * @param {string} event - The event type (currently supports 'search').
   * @param {({}) => void} callback - The callback function to execute when the event occurs.
   */
  public onEvent(event: string, callback: ({}) => void): void {}


  private animate(currentTime: {seconds: number, minutes: number, hours: number}): void {
    requestAnimationFrame(() => this.animate(currentTime));
    this.clock.updateClock(currentTime.seconds, currentTime.minutes, currentTime.hours);
    this.renderer.render(this.scene, this.camera);
  }
  /**
   * Renders the search bar and a list of cocktail cards inside a container element.
   *
   * @param {Cocktail[]} cocktails - The list of cocktails to display.
   * @returns {HTMLElement} The generated HTML structure.
   */
  public render(currentTime: {seconds: number, minutes: number, hours: number}): HTMLElement {
    this.animate(currentTime);
    return this.renderer.domElement;
  }
}