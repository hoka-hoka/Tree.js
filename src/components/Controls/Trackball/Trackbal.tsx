import { useEffect } from 'react';
import * as Three from 'three';
import { TrackballControls } from 'three/examples/jsm/controls/TrackballControls.js';

export const Trackball = () => {
  useEffect(() => {
    const frustumSize = 400;
    const aspect = window.innerWidth / window.innerHeight;
    let controls: TrackballControls;

    const animate = () => {
      requestAnimationFrame(animate);
      cylinder.rotation.x += 0.005;
      cylinder.rotation.y += 0.01;
      controls.update();
      renderer.render(scene, camera);
    };

    const onWindowResize = () => {
      camera.left = (-frustumSize * aspect) / 2;
      camera.right = (frustumSize * aspect) / 2;
      camera.top = frustumSize / 2;
      camera.bottom = -frustumSize / 2;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
      controls.handleResize();
    };

    const createControls = (camera: Three.OrthographicCamera) => {
      controls = new TrackballControls(camera, renderer.domElement);
      controls.rotateSpeed = 5;
      controls.zoomSpeed = 1.2;
      controls.panSpeed = 0.8;
      controls.keys = ['KeyA', 'KeyS', 'KeyD'];
    };

    const scene = new Three.Scene();
    scene.background = new Three.Color(0xcccccc);
    scene.fog = new Three.FogExp2(0xcccccc, 0.002);

    const camera = new Three.OrthographicCamera(
      (frustumSize * aspect) / -2,
      (frustumSize * aspect) / 2,
      frustumSize / 2,
      frustumSize / -2,
      1,
      1000
    );
    camera.position.z = 500;

    const geometry = new Three.CylinderGeometry(1, 10, 30, 4);
    const material = new Three.MeshPhongMaterial({
      color: 0xffffff,
      flatShading: true,
    });

    const cylinder = new Three.Mesh(geometry, material);
    scene.add(cylinder);

    const dirLight1 = new Three.DirectionalLight(0xffffff);
    dirLight1.position.set(1, 1, 1);
    scene.add(dirLight1);
    const dirLight2 = new Three.DirectionalLight(0x002288);
    dirLight2.position.set(-1, -1, -1);
    scene.add(dirLight2);
    const ambientLight = new Three.AmbientLight(0x222222);
    scene.add(ambientLight);

    const renderer = new Three.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    document.body.appendChild(renderer.domElement);
    renderer.render(scene, camera);

    window.addEventListener('resize', onWindowResize);
    createControls(camera);

    animate();
  }, []);

  return <></>;
};
