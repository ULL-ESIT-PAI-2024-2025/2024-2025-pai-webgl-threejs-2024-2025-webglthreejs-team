import * as THREE from 'three'
class View {
  private readonly scene : THREE.Scene = new THREE.Scene()
  private readonly renderer : THREE.WebGLRenderer = new THREE.WebGLRenderer({ alpha: true })
  constructor(private readonly camera : THREE.Camera, private lights: THREE.Light) {
    let hola = new THREE.Mesh();
    

  }
}