import { useEffect } from 'react';
import * as Three from 'three';

export const Adaptive = () => {
  useEffect(() => {
    let width = window.innerWidth;
    let height = window.innerHeight;

    window.addEventListener('resize', () => {
      width = window.innerWidth;
      height = window.innerHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
      renderer.render(scene, camera);
    });

    const animate = () => {
      requestAnimationFrame(animate);
      cube.rotation.x += 0.01;
      cube.rotation.y += 0.01;
      renderer.render(scene, camera);
    };

    const scene = new Three.Scene();
    scene.background = new Three.Color(0x262626);

    const camera = new Three.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 0, 20);

    const geometry = new Three.BoxGeometry(2, 2, 2);
    const material = new Three.MeshBasicMaterial({
      color: 0xffffff,
      wireframe: true,
    });
    const cube = new Three.Mesh(geometry, material);
    scene.add(cube);

    const renderer = new Three.WebGLRenderer();
    document.body.appendChild(renderer.domElement);
    renderer.setSize(width, height);
    renderer.render(scene, camera);
    animate();
  });

  return <></>;
};
