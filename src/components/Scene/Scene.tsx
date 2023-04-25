import { useEffect } from 'react';
import * as Three from 'three';

export const Scene = () => {
  useEffect(() => {
    const addCubeElem = document.createElement('button');
    addCubeElem.className = 'add';
    addCubeElem.innerText = 'add';
    const removeCubeElem = document.createElement('button');
    removeCubeElem.className = 'remove';
    removeCubeElem.innerText = 'remove';
    document.body.appendChild(addCubeElem);
    document.body.appendChild(removeCubeElem);

    addCubeElem.addEventListener('click', () => {
      addCube();
    });
    removeCubeElem.addEventListener('click', () => {
      removeCube();
    });

    const addCube = () => {
      const cubeSize = Math.ceil(Math.random() * 3);
      const cubeGeometry = new Three.BoxGeometry(cubeSize, cubeSize, cubeSize);
      const cubeMaterial = new Three.MeshLambertMaterial({
        color: Math.random() * 0xffffff,
      });
      const cube = new Three.Mesh(cubeGeometry, cubeMaterial);
      cube.castShadow = true;
      cube.name = 'cube-' + scene.children.length;
      cube.position.x = -30 + Math.round(Math.random() * 50);
      cube.position.y = Math.round(Math.random() * 5);
      cube.position.z = -20 + Math.round(Math.random() * 50);
      scene.add(cube);
    };

    const removeCube = () => {
      const allChildren = scene.children;
      const lastObject = allChildren[allChildren.length - 1];
      if (lastObject.name) {
        scene.remove(lastObject);
      }
    };

    const animate = () => {
      requestAnimationFrame(animate);
      renderer.render(scene, camera);
    };

    const scene = new Three.Scene();
    scene.background = new Three.Color(0x262626);

    const ambientLight = new Three.AmbientLight(0x404040);
    scene.add(ambientLight);

    const light = new Three.PointLight(0xffffff, 0.5);
    light.position.set(-10, 10, -10);
    light.castShadow = true;
    light.shadow.mapSize.width = 1024;
    light.shadow.mapSize.height = 1024;
    light.shadow.camera.near = 0.1;
    light.shadow.camera.far = 1000;
    scene.add(light);

    const camera = new Three.PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.set(0, 10, 40);
    camera.lookAt(0, 0, 0);

    const planeGeometry = new Three.PlaneGeometry(100, 100);
    const plane = new Three.Mesh(
      planeGeometry,
      new Three.MeshPhongMaterial({
        color: 0xffffff,
        side: Three.DoubleSide,
      })
    );
    plane.rotateX(Math.PI / 2);
    plane.position.y = -1.75;
    plane.receiveShadow = true;
    scene.add(plane);

    const renderer = new Three.WebGLRenderer();
    document.body.appendChild(renderer.domElement);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.render(scene, camera);
    animate();
  });

  return <></>;
};
