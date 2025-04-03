import * as THREE from "three";

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75, // Campo de visión (FOV - Field of View)
  window.innerWidth / window.innerHeight, // Relación de aspecto
  0.1, // Distancia mínima
  1000 // Distancia máxima
);

camera.position.set(5, 5, 5); // Posición de la cámara (x, y, z)
camera.lookAt(0, 0, 0); // Enfocar la cámara en el cubo

const geometry = new THREE.BoxGeometry(1, 1, 1); // Cubo de 1x1x1
const material = new THREE.MeshBasicMaterial({ color: "red" }); // Material verde
const cube = new THREE.Mesh(geometry, material); // Crear el cubo
cube.position.set(3, 3, 3); // Posición del cubo (x, y, z)
scene.add(cube); // Añadir el cubo a la escena

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight); // Tamaño del lienzo
const title = document.querySelector("h1")!;
title.appendChild(renderer.domElement); // Se añade el lienzo al body del HTML
renderer.render(scene, camera); // Renderizar la escena desde la cámara
