import { useEffect } from 'react';
import './Text.css';
import * as Three from 'three';
import { CSS2DRenderer } from 'three/examples/jsm/renderers/CSS2DRenderer';

export const Text = () => {
  useEffect(() => {
    // const textElement = document.createElement('span');
    // textElement.className = 'text';
    // textElement.innerText = 'Description';
    // document.body.appendChild(textElement);

    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    if (context) {
      context.fillStyle = 'green';
      context.font = '60px sans-serif';
      context.fillText('Description', 0, 60);
    }

    const objectCss = new CSS2DRenderer();
    objectCss.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(objectCss.domElement);

    const texture = new Three.Texture(canvas);
    texture.needsUpdate = true;
  });

  return <></>;
};
