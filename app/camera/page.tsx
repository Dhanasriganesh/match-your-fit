// "use client";
// import { useEffect, useRef } from 'react';
// import Link from 'next/link';
// import { FaCamera } from 'react-icons/fa';
// // import * as THREE from 'three';

// export default function CameraPage() {
//   const videoRef = useRef(null);

//   useEffect(() => {
//     // Access the device's camera
//     navigator.mediaDevices.getUserMedia({ video: true })
//       .then((stream) => {
//         // videoRef.current.srcObject = stream;
//         // videoRef.current.play();
//       })
//       .catch((err) => {
//         console.error("Error accessing the camera: ", err);
//       });

//     // Setup Three.js scene, camera, and renderer
//     const scene = new THREE.Scene();
//     const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
//     const renderer = new THREE.WebGLRenderer();
//     renderer.setSize(window.innerWidth, window.innerHeight);
//     document.getElementById('three-container').appendChild(renderer.domElement);

//     // Add a simple 3D object as a placeholder (e.g., a cube)
//     const geometry = new THREE.BoxGeometry();
//     const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
//     const cube = new THREE.Mesh(geometry, material);
//     scene.add(cube);

//     camera.position.z = 5;

//     const animate = function () {
//       requestAnimationFrame(animate);

//       cube.rotation.x += 0.01;
//       cube.rotation.y += 0.01;

//       renderer.render(scene, camera);
//     };

//     animate();
//   }, []);

//   return (
//     <div style={{ position: 'relative', overflow: 'hidden' }}>
//       <video ref={videoRef} style={{ width: '100%', height: 'auto', zIndex: 1, objectFit: 'cover' }} />
//       <div id="three-container" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 2 }}></div>
//     </div>
//   );
// }

