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
class View {
  private readonly scene : THREE.Scene = new THREE.Scene()
  private readonly renderer : THREE.WebGLRenderer = new THREE.WebGLRenderer({ alpha: true })
  constructor(private readonly camera : THREE.Camera, private lights: THREE.Light) {
    let hola = new THREE.Mesh();
    

  }
}