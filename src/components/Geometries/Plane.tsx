import { useEffect } from 'react';
import * as Three from 'three';
import * as dat from 'dat.gui';

export const Plane = () => {
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
    camFolder
      .add(camera.position as any, 'z')
      .min(10)
      .max(60)
      .step(10);
    camFolder.open();

    // light
    const ambientLight = new Three.AmbientLight(0xffffff, 1);
    scene.add(ambientLight);
    const pointLight = new Three.PointLight(0xffffff, 0.2);
    pointLight.position.set(2, 3, 4);
    scene.add(pointLight);

    // plane
    const geometry = new Three.PlaneGeometry(1, 1);
    const material = new Three.MeshBasicMaterial({
      color: 0xffffff,
      wireframe: true,
      side: Three.DoubleSide,
    });
    const materialFolder = gui.addFolder('Material');
    materialFolder.add(material as any, 'wireframe');
    materialFolder.open();
    const plane = new Three.Mesh(geometry, material);
    scene.add(plane);

    const renderer = new Three.WebGL1Renderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);
    renderer.render(scene, camera);

    const animate = () => {
      requestAnimationFrame(animate);
      plane.rotation.x += 0.05;
      plane.rotation.y += 0.01;
      renderer.render(scene, camera);
    };

    const redraw = () => {
      const newGeometry = new Three.PlaneGeometry(
        planeProps.width,
        planeProps.height,
        planeProps.widthSegments,
        planeProps.heightSegments
      );
      plane.geometry.dispose();
      plane.geometry = newGeometry;
    };
    const planeProps = {
      width: 1,
      height: 1,
      widthSegments: 1,
      heightSegments: 1,
    };

    const props = gui.addFolder('Properties');
    props.add(planeProps, 'width', 1, 30, 1).onChange(redraw);
    props.add(planeProps, 'height', 1, 30, 1).onChange(redraw);
    props.add(planeProps, 'widthSegments', 1, 30, 1).onChange(redraw);
    props.add(planeProps, 'heightSegments', 1, 30, 1).onChange(redraw);

    animate();
  }, []);

  return <></>;
};
