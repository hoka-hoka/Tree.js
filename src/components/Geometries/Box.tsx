import { useEffect } from 'react';
import * as Three from 'three';
import * as dat from 'dat.gui';

export const Box = () => {
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
    const geometry = new Three.BoxGeometry(1, 1, 1);
    const material = new Three.MeshBasicMaterial({
      color: 0xffffff,
      wireframe: true,
      side: Three.DoubleSide,
    });
    const materialFolder = gui.addFolder('Material');
    materialFolder.add(material as any, 'wireframe');
    materialFolder.open();
    const box = new Three.Mesh(geometry, material);
    scene.add(box);

    const renderer = new Three.WebGL1Renderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);
    renderer.render(scene, camera);

    const animate = () => {
      requestAnimationFrame(animate);
      box.rotation.x += 0.005;
      box.rotation.y += 0.005;
      renderer.render(scene, camera);
    };

    const redraw = () => {
      const newGeometry = new Three.BoxGeometry(
        planeProps.width,
        planeProps.height,
        planeProps.depth,
        planeProps.widthSegments,
        planeProps.heightSegments,
        planeProps.depthSegments
      );
      box.geometry.dispose();
      box.geometry = newGeometry;
    };
    const planeProps = {
      width: 1,
      height: 1,
      depth: 1,
      widthSegments: 1,
      heightSegments: 1,
      depthSegments: 1,
    };
    const props = gui.addFolder('Properties');
    props.add(planeProps, 'width', 1, 30, 1).onChange(redraw);
    props.add(planeProps, 'height', 1, 30, 1).onChange(redraw);
    props.add(planeProps, 'depth', 1, 30, 1).onChange(redraw);
    props.add(planeProps, 'widthSegments', 1, 30, 1).onChange(redraw);
    props.add(planeProps, 'heightSegments', 1, 30).onChange(redraw);
    props.add(planeProps, 'depthSegments', 1, 30).onChange(redraw);
    props.open();

    animate();
  }, []);

  return <></>;
};
