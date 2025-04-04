import * as THREE from 'three';
import ClockView from './View';

function main(): void {
  const view = new ClockView();
  document.body.appendChild(view.getRenderer().domElement);
  function animate() {
    requestAnimationFrame(animate);
    view.render();
  }
  animate();
}

main();