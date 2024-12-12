/*// three-setup.js
// Initialize scene, camera, and renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });

renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById('hero-canvas').appendChild(renderer.domElement);

// Set camera position
camera.position.z = 5;

// Add a rotating 3D object (Torus)
const geometry = new THREE.TorusGeometry(1, 0.4, 16, 100);
const material = new THREE.MeshBasicMaterial({ color: 0x00f0ff, wireframe: true });
const torus = new THREE.Mesh(geometry, material);
scene.add(torus);

// Adding particle background
const particleGeometry = new THREE.BufferGeometry();
const particlesCount = 500;
const positions = new Float32Array(particlesCount * 3);

// Populate the position array with random values
for (let i = 0; i < particlesCount * 3; i++) {
    positions[i] = (Math.random() - 0.5) * 10; // Spread particles in the scene
}

particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

const particleMaterial = new THREE.PointsMaterial({
    color: 0x00f0ff, // Particle color
    size: 0.05,      // Size of each particle
    transparent: true,
    opacity: 0.7     // Slight transparency for particles
});

// Create the particle system and add to the scene
const particles = new THREE.Points(particleGeometry, particleMaterial);
scene.add(particles);

// Animation function
function animate() {
    requestAnimationFrame(animate);
    torus.rotation.x += 0.01;
    torus.rotation.y += 0.01;
    renderer.render(scene, camera);
}

animate();

// Handle window resize
window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
});*/





// three-setup.js
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });

renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById('hero-canvas').appendChild(renderer.domElement);

// Create the video element
const video = document.createElement('video');
video.src = 'Video.mp4'; // Path to your video
video.crossOrigin = 'anonymous'; // Set crossOrigin to anonymous
video.loop = true; // Loop the video
video.muted = true; // Mute the video
video.play(); // Start playing the video

// Create video texture
const videoTexture = new THREE.VideoTexture(video);

// Create a large plane that covers the entire screen
const geometry = new THREE.PlaneGeometry(3.6, 3.6); // Adjust size to cover the viewport
const material = new THREE.MeshBasicMaterial({ map: videoTexture });
const plane = new THREE.Mesh(geometry, material);
scene.add(plane);

// Position the camera
camera.position.z = 1;

// Animation loop
function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}

animate();

// Handle window resize
window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
});