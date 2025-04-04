import ClockHands from "./ColckParts/ClockHands";
import ClockFace from "./ColckParts/ClockFace";
import ClockCase from "./ColckParts/ClockCase";
import * as THREE from 'three';

export default class Clock { 
  constructor(
    private readonly clockHands: ClockHands,
    private readonly clockFace: ClockFace,
    private readonly clockCase: ClockCase
  ) { }
  public updateClock(): void { this.clockHands.updateClockHands(); }

  public render(scene: THREE.Scene): void { 
    this.clockFace.renderClockFace(scene); 
    this.clockCase.renderClockCase(scene); 
    this.clockHands.renderClockHands(scene); 
  }
}