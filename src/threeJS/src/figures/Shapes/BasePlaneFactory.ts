/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 * Programación de Aplicaciones Interactivas
 * 
 * @summary  This script defines a class that creates a base plane shape using Three.js.
 * 
 * @since Sat 05 Apr 2025 
 * @author Aarón Jano Barreto
 * @author Roberto Padrón Castañeda
 * @author Samuel Montoya Diaz
 * 
 * @see {@link https://github.com/ULL-ESIT-PAI-2024-2025/2024-2025-pai-webgl-threejs-2024-2025-webglthreejs-team.git}
 */

import ShapesFactory from "./ShapesFacotry";
import * as THREE from "three";

export default class BasePlaneFactory implements ShapesFactory {
  public createShape(size: number, texture: THREE.Material): THREE.Mesh {
    const plane = new THREE.Mesh(new THREE.PlaneGeometry(size, size), texture);
    plane.rotation.x = -Math.PI / 2; 
    return plane;
  }
}