import * as THREE from "three";

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75, // Campo de visión (FOV - Field of View)
  window.innerWidth / window.innerHeight, // Relación de aspecto
  0.1, // Distancia mínima
  1000 // Distancia máxima
);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight); // Tamaño del lienzo
const title = document.querySelector("h1")!;
title.appendChild(renderer.domElement); // Se añade el lienzo al body del HTML
renderer.render(scene, camera); // Renderizar la escena desde la cámara
