import * as THREE from 'three';

export default class Hand {
  private readonly hand: THREE.Mesh;
  private readonly handGroup: THREE.Group = new THREE.Group();
  constructor(width: number, height: number, color: string) {
    const geometry = new THREE.BoxGeometry(width, height, 0.1);
    const material = new THREE.MeshBasicMaterial({ color: color });
    this.hand = new THREE.Mesh(geometry, material);
    this.hand.position.y = height / 2;
    this.handGroup.add(this.hand); // Para que giren sobre el centro del reloj y no sobre si mismas
  }

  public rotateHand(angle: number): void {
    this.handGroup.rotation.z = angle;
  }

  public renderHand(scene: THREE.Scene): void {
    scene.add(this.handGroup);
  }
}