import { useEffect } from 'react';
import { render } from 'react-dom';
import * as Three from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

export const Light = () => {
  useEffect(() => {
    const animate = () => {
      requestAnimationFrame(animate);
      renderer.render(scene, camera);
    };

    // scene
    const scene = new Three.Scene();
    scene.background = new Three.Color(0x262626);
    const axesHelper = new Three.AxesHelper(20);
    scene.add(axesHelper);

    // geometry
    const planeGeometry = new Three.PlaneGeometry(100, 100);
    const plane = new Three.Mesh(
      planeGeometry,
      new Three.MeshPhongMaterial({ color: 0xffffff, side: Three.DoubleSide })
    );

    plane.rotateX(-Math.PI / 2);
    plane.position.y = -5;
    plane.receiveShadow = true;
    scene.add(plane);

    const geometry = new Three.BoxGeometry(2, 2, 2);
    const cube = new Three.Mesh(
      geometry,
      new Three.MeshPhongMaterial({ color: 0xb5dccd })
    );
    cube.castShadow = true;
    cube.rotateX(Math.PI / 4);
    scene.add(cube);

    // light
    const ambLight = new Three.AmbientLight(0x404040);
    const light = new Three.PointLight(0xffffff, 1, 100);
    light.castShadow = true;
    light.position.set(10, 10, 10);
    // light.shadow.mapSize.width = 2048;
    // light.shadow.mapSize.height = 2048;

    scene.add(ambLight);
    scene.add(light);

    // camera
    const camera = new Three.PerspectiveCamera(
      90,
      window.innerWidth / innerHeight,
      0.1,
      1000
    );
    camera.position.set(0, 0, 10);

    // render
    const renderer = new Three.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = true;
    document.body.appendChild(renderer.domElement);
    renderer.render(scene, camera);

    // controls
    new OrbitControls(camera, renderer.domElement);

    animate();
  });

  return <></>;
};
