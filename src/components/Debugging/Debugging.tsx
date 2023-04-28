import { useEffect } from 'react';
import * as Three from 'three';
import * as dat from 'dat.gui';
import { MeshBasicMaterial } from 'three';

export const Debugging = () => {
  useEffect(() => {
    console.log('1');

    const animate = () => {
      requestAnimationFrame(animate);
      cube.rotation.x += 0.005;
      cube.rotation.y += 0.01;
      renderer.render(scene, camera);
    };

    const gui = new dat.GUI({ width: 300 });

    const scene = new Three.Scene();
    scene.background = new Three.Color(0x262626);

    const camera = new Three.PerspectiveCamera(
      90,
      window.innerWidth / window.innerHeight,
      1,
      100
    );
    camera.position.set(0, 0, 10);

    const geometry = new Three.BoxGeometry(1, 1, 1);
    const material = new MeshBasicMaterial({
      color: 0xffffff,
      wireframe: true,
    });

    gui.add(material as any, 'wireframe');

    const cube = new Three.Mesh(geometry, material);
    scene.add(cube);

    gui.add(cube.position as any, 'x');
    gui.add(cube.position as any, 'y');
    gui.add(cube.position as any, 'z');

    const renderer = new Three.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    document.body.appendChild(renderer.domElement);
    renderer.render(scene, camera);

    animate();
  }, []);

  return <></>;
};
