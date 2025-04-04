import * as THREE from 'three';
export default class ClockCase {
  private readonly clockInCase: THREE.Mesh;
  private readonly clockOutCase: THREE.Mesh;
  constructor(radius: number, width: number,  color: string) { 
    // Creamos la carcasa que es un cilindro vacio viene ciendo la carcasa exterior
    const caseGeometry = new THREE.CylinderGeometry(radius, radius, width, 100, 1, true);
    const caseMaterial = new THREE.MeshBasicMaterial({ color: color, side: THREE.DoubleSide });
    this.clockOutCase = new THREE.Mesh(caseGeometry, caseMaterial);
    this.clockOutCase.position.z = -0.2; // Mover la carcasa detrás del reloj
    this.clockOutCase.rotation.x = Math.PI / 2; // Alinear con el reloj
    const inCaseGeometry = new THREE.CylinderGeometry(radius - 0.01, radius - 0.01, width, 100, 1, false);
    this.clockInCase = new THREE.Mesh(inCaseGeometry, caseMaterial);
    this.clockInCase.position.z = -0.3; // Mover la carcasa detrás del reloj
    this.clockInCase.rotation.x = Math.PI / 2; // Alinear con el reloj
    
  }

  public renderClockCase(scene: THREE.Scene): void {
    scene.add(this.clockOutCase);
    scene.add(this.clockInCase);
  }
}