import { useEffect } from 'react';
import * as Three from 'three';
import * as dat from 'dat.gui';

export const Ring = () => {
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
    const geometry = new Three.RingGeometry();
    const material = new Three.MeshBasicMaterial({
      color: 0xffffff,
      wireframe: true,
      side: Three.DoubleSide,
    });
    const materialFolder = gui.addFolder('Material');
    materialFolder.add(material as any, 'wireframe');
    materialFolder.open();
    const ring = new Three.Mesh(geometry, material);
    scene.add(ring);

    const renderer = new Three.WebGL1Renderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);
    renderer.render(scene, camera);

    const animate = () => {
      requestAnimationFrame(animate);
      ring.rotation.x += 0.005;
      ring.rotation.y += 0.005;
      renderer.render(scene, camera);
    };

    const redraw = () => {
      const newGeometry = new Three.RingGeometry(
        planeProps.innerRadius,
        planeProps.externalRadius,
        planeProps.thetaSegments,
        planeProps.phiSegments,
        planeProps.thetaStart,
        planeProps.thetaLength
      );
      ring.geometry.dispose();
      ring.geometry = newGeometry;
    };
    const planeProps = {
      innerRadius: 1,
      externalRadius: 1,
      thetaSegments: 8,
      phiSegments: 8,
      thetaStart: 2 * Math.PI,
      thetaLength: 2 * Math.PI,
    };
    const props = gui.addFolder('Properties');
    props.add(planeProps, 'innerRadius', 1, 50).step(1).onChange(redraw);
    props.add(planeProps, 'externalRadius', 1, 50, 1).onChange(redraw);
    props.add(planeProps, 'thetaSegments', 1, 50, 1).onChange(redraw);
    props.add(planeProps, 'phiSegments', 1, 50, 1).onChange(redraw);
    props.add(planeProps, 'thetaStart', 1, 2 * Math.PI).onChange(redraw);
    props.add(planeProps, 'thetaLength', 1, 2 * Math.PI).onChange(redraw);
    props.open();

    animate();
  }, []);

  return <></>;
};
