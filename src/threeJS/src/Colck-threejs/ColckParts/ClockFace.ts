import ClockMarks from "./ColckMarks";
import * as THREE from 'three';

export default class ClockFace {
  private readonly clockFace: THREE.Mesh;
  constructor(private clockMarks: ClockMarks, radius: number, color: string) {
    const clockGeometry = new THREE.CircleGeometry(radius, 100);
    const clockMaterial = new THREE.MeshBasicMaterial({ color: color, side: THREE.DoubleSide });
    this.clockFace = new THREE.Mesh(clockGeometry, clockMaterial);
  }
  
  public renderClockFace(scene: THREE.Scene): void {
    scene.add(this.clockFace);
    this.clockMarks.renderMarks(scene);
  }
}