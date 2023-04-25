import { useEffect } from 'react';
import * as Three from 'three';
import { PerspectiveCamera } from 'three';

export const Cube2D = () => {
  useEffect(() => {
    const scene = new Three.Scene();
    scene.background = new Three.Color('#000');

    const camera = new PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 10;

    const renderer = new Three.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    const geometry = new Three.BoxGeometry(2, 2, 2);
    const material = new Three.MeshBasicMaterial({ wireframe: true });
    const cube = new Three.Mesh(geometry, material);

    scene.add(cube);

    renderer.render(scene, camera);
  });

  return <></>;
};
