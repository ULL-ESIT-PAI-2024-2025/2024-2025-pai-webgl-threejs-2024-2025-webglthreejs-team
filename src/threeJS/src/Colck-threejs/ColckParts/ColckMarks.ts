import * as THREE from 'three';

export default class ClockMarks {
  private readonly marks: THREE.Group = new THREE.Group();
  constructor(width: number, height: number, color: string) {
    for (let i = 0; i < 12; i++) {
      const markGeometry = new THREE.BoxGeometry(width, height, 0.1);
      const markMaterial = new THREE.MeshBasicMaterial({ color: color });
      const mark = new THREE.Mesh(markGeometry, markMaterial);
      const angle = (i / 12) * Math.PI * 2;
      mark.position.set(Math.cos(angle) * 1.8, Math.sin(angle) * 1.8, 0.05);
      mark.rotation.z = angle;
      this.marks.add(mark);
    }
  }

  public renderMarks(scene: THREE.Scene): void {
    scene.add(this.marks);
  }
} 