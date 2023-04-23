import { useEffect, useState } from 'react';
import './App.css';
import * as Three from 'three';

function App() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const scene = new Three.Scene();
  });

  return <></>;
}

export default App;
