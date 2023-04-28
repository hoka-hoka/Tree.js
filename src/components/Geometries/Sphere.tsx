import { useEffect } from 'react';
import * as Three from 'three';
import * as dat from 'dat.gui';

export const Sphere = () => {
  useEffect(() => {
    const gui = new dat.GUI();
    const width = window.innerWidth;
    const height = window.innerHeight;

    // scene
    const scene = new Three.Scene();
    scene.background = new Three.Color(0x262626);

    // camera
    const camera = new Three.PerspectiveCamera(30, width / height, 0.1, 100);
    camera.position.set(0, 0, 10);
    const camFolder = gui.addFolder('Camera');
    camFolder.add(camera.position as any, 'z', 10, 60, 5);
    camFolder.open();

    // light
    const ambientLight = new Three.AmbientLight(0xffffff, 1);
    scene.add(ambientLight);
    const pointLight = new Three.PointLight(0xffffff, 0.2);
    pointLight.position.set(2, 3, 4);
    scene.add(pointLight);

    // geometry
    const geometry = new Three.SphereGeometry();
    const material = new Three.MeshBasicMaterial({
      color: 0xffffff,
      wireframe: true,
      side: Three.DoubleSide,
    });
    const materialFolder = gui.addFolder('Material');
    materialFolder.add(material as any, 'wireframe');
    materialFolder.open();
    const sphere = new Three.Mesh(geometry, material);
    scene.add(sphere);

    const renderer = new Three.WebGL1Renderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);
    renderer.render(scene, camera);

    const animate = () => {
      requestAnimationFrame(animate);
      sphere.rotation.x += 0.005;
      sphere.rotation.y += 0.005;
      renderer.render(scene, camera);
    };

    const redraw = () => {
      const newGeometry = new Three.SphereGeometry(
        planeProps.radius,
        planeProps.widthSegments,
        planeProps.heightSegments,
        planeProps.phiStart,
        planeProps.phiLength,
        planeProps.thetaStart,
        planeProps.thetaLength
      );
      sphere.geometry.dispose();
      sphere.geometry = newGeometry;
    };
    const planeProps = {
      radius: 1,
      widthSegments: 8,
      heightSegments: 6,
      phiStart: 0,
      phiLength: 2 * Math.PI,
      thetaStart: 0,
      thetaLength: 2 * Math.PI,
    };
    const props = gui.addFolder('Properties');
    props.add(planeProps, 'radius', 1, 50, 1).onChange(redraw);
    props.add(planeProps, 'widthSegments', 1, 50, 1).onChange(redraw);
    props.add(planeProps, 'heightSegments', 1, 50, 1).onChange(redraw);
    props.add(planeProps, 'phiStart', 0, 2 * Math.PI).onChange(redraw);
    props.add(planeProps, 'phiLength', 1, 2 * Math.PI).onChange(redraw);
    props.add(planeProps, 'thetaStart', 0, 2 * Math.PI).onChange(redraw);
    props.add(planeProps, 'thetaLength', 1, 2 * Math.PI).onChange(redraw);
    props.open();

    animate();
  }, []);

  return <></>;
};
