/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 * Programación de Aplicaciones Interactivas
 * 
 * @summary client for the point and click game
 * @version 0.1.0
 * 
 * @since Sat 06 Apr 2025 
 * @author Aarón Jano Barreto
 * @author Roberto Padrón Castañeda
 * @author Samuel Montoya Diaz
 * 
 * @see {@link https://github.com/ULL-ESIT-PAI-2024-2025/2024-2025-pai-webgl-threejs-2024-2025-webglthreejs-team.git}
 */

import { GameModel } from './Game-model/GameModel.js';
import { GameView } from './Game-view/GameView.js';
import { GameController } from './Game-controller/GameController.js';

import * as THREE from 'three';

function main() {
  const SCENE = new THREE.Scene();
  const RENDERER = new THREE.WebGLRenderer();
  const WIDTH = window.innerWidth - 35;
  const CAMERA = new THREE.PerspectiveCamera(75, WIDTH / (window.innerHeight - 100), 0.1, 1000);
  RENDERER.setSize(WIDTH, window.innerHeight - 100);

  const maxTime: number = 30;
  const model = new GameModel(maxTime);
  const view = new GameView(SCENE, CAMERA, RENDERER, maxTime);
  const controller = new GameController(model, view, SCENE, CAMERA, RENDERER);

  controller.initialize();
}

main();