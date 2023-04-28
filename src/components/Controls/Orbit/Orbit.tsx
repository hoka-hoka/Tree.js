import * as dat from 'dat.gui';
import { useEffect } from 'react';
import * as Three from 'three';
import { MeshBasicMaterial } from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

export const Orbit = () => {
  useEffect(() => {
    const gui = new dat.GUI();
    let controls: OrbitControls;

    const animate = () => {
      requestAnimationFrame(animate);
      // controls.update();
      renderer.render(scene, camera);
    };

    window.addEventListener('resize', () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.render(scene, camera);
    });

    // scene
    const scene = new Three.Scene();
    scene.background = new Three.Color(0x262626);

    // light
    const ambientLight = new Three.AmbientLight(0xffffff, 0.5);
    const light = new Three.PointLight(0xffffff, 0.5);
    light.position.set(0, 10, 10);
    light.castShadow = true;
    light.shadow.mapSize.width = 1024;
    light.shadow.mapSize.height = 1024;
    light.shadow.camera.near = 0.5;
    light.shadow.camera.far = 100;
    scene.add(ambientLight);
    scene.add(light);

    const camera = new Three.PerspectiveCamera(
      60,
      window.innerWidth / innerHeight,
      0.1,
      1000
    );
    camera.position.set(0, 0, 10);
    const camFolder = gui.addFolder('Camera');
    camFolder.add(camera.position as any, 'z', 10, 80, 1);
    camFolder.open();

    const planeGeometry = new Three.PlaneGeometry(100, 100);
    const plane = new Three.Mesh(
      planeGeometry,
      new Three.MeshPhongMaterial({ color: 0xffffff, side: Three.DoubleSide })
    );

    plane.rotateX(-Math.PI / 2);
    plane.position.y = -5;
    plane.receiveShadow = true;
    scene.add(plane);

    const axesHelper = new Three.AxesHelper(20);
    scene.add(axesHelper);

    const geometry = new Three.BoxGeometry(2, 2, 2);
    const matArray = [
      new Three.MeshPhongMaterial({ color: 0xff8b8b }),
      new Three.MeshPhongMaterial({ color: 0xf5ffa2 }),
      new Three.MeshPhongMaterial({ color: 0xb5dccd }),
      new Three.MeshPhongMaterial({ color: 0xaaffa2 }),
      new Three.MeshPhongMaterial({ color: 0x9fd1ff }),
      new Three.MeshPhongMaterial({ color: 0xffaef7 }),
    ];
    const cube = new Three.Mesh(geometry, matArray);
    cube.position.set(0, 0.5, 0);
    cube.rotateX(Math.PI / 6);
    cube.castShadow = true;
    cube.receiveShadow = true;
    scene.add(cube);

    const renderer = new Three.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = Three.PCFSoftShadowMap;
    document.body.appendChild(renderer.domElement);
    renderer.render(scene, camera);

    controls = new OrbitControls(camera, renderer.domElement);
    const orbitControl = gui.addFolder('Orbit Controls');
    orbitControl.add(controls as any, 'enabled');
    orbitControl.add(controls as any, 'enableZoom');
    orbitControl.add(controls as any, 'enableRotate');
    orbitControl.add(controls as any, 'enablePan');
    orbitControl.add(controls as any, 'autoRotateSpeed', 1, 100, 1);
    orbitControl.open();

    animate();
  }, []);

  return <></>;
};
