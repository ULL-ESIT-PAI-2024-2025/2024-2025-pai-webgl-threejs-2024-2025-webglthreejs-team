import Hand from "./Hand";
import * as THREE from 'three';

export default class ClockHands {
  private readonly centerSphere: THREE.Mesh;
  
  constructor(
    private hourHand: Hand, 
    private minuteHand: Hand, 
    private secondHand: Hand
  ) {
    const centerSphereGeometry = new THREE.SphereGeometry(0.15, 32, 32);
    const centerSphereMaterial = new THREE.MeshBasicMaterial({ color: 'black' });
    this.centerSphere = new THREE.Mesh(centerSphereGeometry, centerSphereMaterial);
  }

  public updateClockHands(): void {
    const NOW: Date = new Date();
    const SECONDS: number = NOW.getSeconds();
    const MINUTES: number = NOW.getMinutes();
    const HOURS: number = NOW.getHours() % 12;

    this.hourHand.rotateHand(-(HOURS * Math.PI / 6) + (MINUTES * Math.PI / (6 * 60)) + (SECONDS * Math.PI / (360 * 60)));
    this.minuteHand.rotateHand(-(MINUTES * Math.PI / 30) + (SECONDS * Math.PI / (30 * 60)));
    this.secondHand.rotateHand(-(SECONDS * Math.PI / 30));
  }

  public renderClockHands(scene: THREE.Scene): void {
    scene.add(this.centerSphere);
    this.hourHand.renderHand(scene);
    this.minuteHand.renderHand(scene);
    this.secondHand.renderHand(scene);
  }
}