// Three.js 3D Scene Setup with Only Animated Circles
let scene, camera, renderer, particles, geometryParticles, animatedCircles = [];

function initThreeScene() {
    const container = document.getElementById('three-container');
    if (!container) return;

    // Scene setup
    scene = new THREE.Scene();
    
    // Camera setup
    camera = new THREE.PerspectiveCamera(
        75, 
        container.offsetWidth / container.offsetHeight, 
        0.1, 
        1000
    );
    camera.position.z = 5;

    // Renderer setup
    renderer = new THREE.WebGLRenderer({ 
        alpha: true, 
        antialias: true 
    });
    renderer.setSize(container.offsetWidth, container.offsetHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    container.appendChild(renderer.domElement);

    // Create ONLY animated circles (NO CUBES)
    createAnimatedCircles();
    
    // Create enhanced particle system
    createParticleSystem();
    
    // Start animation loop
    animate();
    
    // Handle resize
    window.addEventListener('resize', onWindowResize);
}

function createAnimatedCircles() {
    const circleCount = 15; // Increased count since we're not using cubes
    
    for (let i = 0; i < circleCount; i++) {
        // Create circle geometry - ONLY CIRCLES
        const radius = Math.random() * 1.2 + 0.4; // Random size between 0.4 and 1.6
        const segments = 32; // Smooth circles
        const geometry = new THREE.CircleGeometry(radius, segments);
        
        // Create beautiful gradient-like material with opacity
        const colors = [
            new THREE.Color(0x00d4ff), // Primary blue
            new THREE.Color(0x4ecdc4), // Teal
            new THREE.Color(0x8b5cf6), // Purple
            new THREE.Color(0xec4899), // Pink
            new THREE.Color(0xf97316), // Orange
            new THREE.Color(0x14b8a6), // Vibrant teal
            new THREE.Color(0x06b6d4), // Sky blue
            new THREE.Color(0x10b981)  // Emerald
        ];
        
        const randomColor = colors[Math.floor(Math.random() * colors.length)];
        
        const material = new THREE.MeshBasicMaterial({ 
            color: randomColor,
            transparent: true,
            opacity: Math.random() * 0.5 + 0.2, // Random opacity between 0.2 and 0.7
            side: THREE.DoubleSide
        });
        
        const circle = new THREE.Mesh(geometry, material);
        
        // Random positioning across a wider area
        circle.position.x = (Math.random() - 0.5) * 15;
        circle.position.y = (Math.random() - 0.5) * 12;
        circle.position.z = (Math.random() - 0.5) * 10;
        
        // Random rotation
        circle.rotation.x = Math.random() * Math.PI;
        circle.rotation.y = Math.random() * Math.PI;
        circle.rotation.z = Math.random() * Math.PI;
        
        // Store animation properties for smooth movements
        circle.userData = {
            // Floating movement
            floatSpeed: Math.random() * 0.015 + 0.008,
            floatOffset: Math.random() * Math.PI * 2,
            floatAmplitudeY: Math.random() * 2.5 + 1,
            floatAmplitudeX: Math.random() * 1.5 + 0.5,
            
            // Rotation speed - very gentle
            rotationSpeed: {
                x: (Math.random() - 0.5) * 0.008,
                y: (Math.random() - 0.5) * 0.008,
                z: (Math.random() - 0.5) * 0.012
            },
            
            // Scale pulsing
            pulseSpeed: Math.random() * 0.025 + 0.015,
            pulseOffset: Math.random() * Math.PI * 2,
            basePulse: Math.random() * 0.3 + 0.7,
            
            // Opacity animation
            opacitySpeed: Math.random() * 0.02 + 0.008,
            opacityOffset: Math.random() * Math.PI * 2,
            baseOpacity: material.opacity,
            
            // Movement boundaries
            originalPosition: {
                x: circle.position.x,
                y: circle.position.y,
                z: circle.position.z
            },
            
            // Color transition
            colorPhase: Math.random() * Math.PI * 2,
            colorSpeed: Math.random() * 0.005 + 0.002
        };
        
        scene.add(circle);
        animatedCircles.push(circle);
    }
}

function createParticleSystem() {
    const particleCount = 600; // Optimized particle count
    geometryParticles = new THREE.BufferGeometry();
    
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const sizes = new Float32Array(particleCount);
    
    const colorPalette = [
        new THREE.Color(0x00d4ff),
        new THREE.Color(0x4ecdc4),
        new THREE.Color(0x8b5cf6),
        new THREE.Color(0xec4899),
        new THREE.Color(0xf97316),
        new THREE.Color(0x14b8a6)
    ];
    
    for (let i = 0; i < particleCount; i++) {
        const i3 = i * 3;
        
        // Positions
        positions[i3] = (Math.random() - 0.5) * 30;
        positions[i3 + 1] = (Math.random() - 0.5) * 25;
        positions[i3 + 2] = (Math.random() - 0.5) * 20;
        
        // Colors
        const color = colorPalette[Math.floor(Math.random() * colorPalette.length)];
        colors[i3] = color.r;
        colors[i3 + 1] = color.g;
        colors[i3 + 2] = color.b;
        
        // Sizes
        sizes[i] = Math.random() * 2.5 + 0.8;
    }
    
    geometryParticles.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometryParticles.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    geometryParticles.setAttribute('size', new THREE.BufferAttribute(sizes, 1));
    
    const materialParticles = new THREE.ShaderMaterial({
        uniforms: {
            time: { value: 0 }
        },
        vertexShader: `
            attribute float size;
            varying vec3 vColor;
            uniform float time;
            
            void main() {
                vColor = color;
                vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
                
                // Add gentle wave movement to particles
                vec3 pos = position;
                pos.y += sin(time * 0.4 + position.x * 0.08) * 0.3;
                pos.x += cos(time * 0.25 + position.y * 0.08) * 0.2;
                
                mvPosition = modelViewMatrix * vec4(pos, 1.0);
                gl_PointSize = size * (250.0 / -mvPosition.z);
                gl_Position = projectionMatrix * mvPosition;
            }
        `,
        fragmentShader: `
            varying vec3 vColor;
            
            void main() {
                // Create perfect circular particles
                float distanceToCenter = distance(gl_PointCoord, vec2(0.5));
                float alpha = 1.0 - smoothstep(0.0, 0.5, distanceToCenter);
                
                // Add soft glow effect
                float glow = 1.0 - smoothstep(0.0, 0.35, distanceToCenter);
                alpha = max(alpha * 0.7, glow * 0.25);
                
                gl_FragColor = vec4(vColor, alpha);
            }
        `,
        transparent: true,
        vertexColors: true,
        blending: THREE.AdditiveBlending
    });
    
    particles = new THREE.Points(geometryParticles, materialParticles);
    scene.add(particles);
}

function animate() {
    requestAnimationFrame(animate);
    
    const time = Date.now() * 0.001;
    
    // Animate ONLY circles (NO CUBES AT ALL)
    animatedCircles.forEach((circle, index) => {
        const userData = circle.userData;
        
        // Smooth floating movement
        circle.position.y = userData.originalPosition.y + 
            Math.sin(time * userData.floatSpeed + userData.floatOffset) * userData.floatAmplitudeY;
        circle.position.x = userData.originalPosition.x + 
            Math.cos(time * userData.floatSpeed * 0.6 + userData.floatOffset) * userData.floatAmplitudeX;
        circle.position.z = userData.originalPosition.z + 
            Math.sin(time * userData.floatSpeed * 0.4 + userData.floatOffset) * 0.5;
        
        // Gentle rotation
        circle.rotation.x += userData.rotationSpeed.x;
        circle.rotation.y += userData.rotationSpeed.y;
        circle.rotation.z += userData.rotationSpeed.z;
        
        // Scale pulsing - breathing effect
        const pulseScale = userData.basePulse + 
            Math.sin(time * userData.pulseSpeed + userData.pulseOffset) * 0.15;
        circle.scale.setScalar(pulseScale);
        
        // Opacity animation - gentle fading in and out
        const newOpacity = userData.baseOpacity + 
            Math.sin(time * userData.opacitySpeed + userData.opacityOffset) * 0.15;
        circle.material.opacity = Math.max(0.1, Math.min(0.8, newOpacity));
        
        // Subtle color shifting
        userData.colorPhase += userData.colorSpeed;
        const hue = (userData.colorPhase % (Math.PI * 2)) / (Math.PI * 2);
        const saturation = 0.7 + Math.sin(time * 0.3 + index) * 0.2;
        const lightness = 0.5 + Math.sin(time * 0.2 + index) * 0.1;
        circle.material.color.setHSL(hue, saturation, lightness);
    });
    
    // Animate particles
    if (particles) {
        particles.rotation.x += 0.0003;
        particles.rotation.y += 0.0007;
        
        const positions = particles.geometry.attributes.position.array;
        
        for (let i = 0; i < positions.length; i += 3) {
            // Very gentle wave movement for particles
            positions[i + 1] += Math.sin(time * 0.4 + positions[i] * 0.008) * 0.001;
            positions[i] += Math.cos(time * 0.25 + positions[i + 1] * 0.008) * 0.0008;
        }
        
        particles.geometry.attributes.position.needsUpdate = true;
        particles.material.uniforms.time.value = time;
    }
    
    // Mouse interaction - very subtle camera movement
    if (window.mouseX !== undefined && window.mouseY !== undefined) {
        camera.position.x += (window.mouseX * 0.015 - camera.position.x) * 0.02;
        camera.position.y += (-window.mouseY * 0.015 - camera.position.y) * 0.02;
        camera.lookAt(scene.position);
    }
    
    renderer.render(scene, camera);
}

function onWindowResize() {
    const container = document.getElementById('three-container');
    if (!container) return;
    
    camera.aspect = container.offsetWidth / container.offsetHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(container.offsetWidth, container.offsetHeight);
}

// Mouse tracking for smooth interaction
document.addEventListener('mousemove', (event) => {
    window.mouseX = (event.clientX / window.innerWidth) * 2 - 1;
    window.mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
});

// Scroll-based animation effects
window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    const maxScroll = document.body.scrollHeight - window.innerHeight;
    const scrollRatio = Math.min(scrollY / maxScroll, 1);
    
    // Adjust circle animations based on scroll
    animatedCircles.forEach((circle, index) => {
        // Gentle rotation based on scroll
        circle.rotation.z += scrollRatio * 0.0005;
        
        // Fade circles as user scrolls down
        const fadeMultiplier = Math.max(0.2, 1 - scrollRatio * 0.6);
        circle.material.opacity = circle.userData.baseOpacity * fadeMultiplier;
        
        // Slight position shift on scroll
        circle.position.y = circle.userData.originalPosition.y - scrollRatio * 2;
    });
});

// Interactive hover effects for circles
document.addEventListener('mousemove', (event) => {
    const mouseX = (event.clientX / window.innerWidth) * 2 - 1;
    const mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
    
    // Make circles react to mouse position
    animatedCircles.forEach((circle, index) => {
        const distance = Math.sqrt(
            Math.pow(circle.position.x - mouseX * 6, 2) + 
            Math.pow(circle.position.y - mouseY * 6, 2)
        );
        
        if (distance < 4) {
            // Circles get slightly larger and more vibrant when mouse is near
            const proximity = Math.max(0, 4 - distance) / 4;
            circle.scale.setScalar(circle.userData.basePulse * (1 + proximity * 0.3));
            circle.material.opacity = Math.min(0.9, circle.userData.baseOpacity * (1 + proximity * 0.4));
        }
    });
});

// Initialize Three.js scene when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(initThreeScene, 1000);
});

// Performance optimization for mobile devices
const optimizePerformance = () => {
    if (window.innerWidth < 768) {
        // Reduce animation complexity on mobile
        animatedCircles.forEach(circle => {
            circle.userData.floatSpeed *= 0.7;
            circle.userData.pulseSpeed *= 0.7;
            circle.userData.rotationSpeed.x *= 0.6;
            circle.userData.rotationSpeed.y *= 0.6;
            circle.userData.rotationSpeed.z *= 0.6;
        });
    }
};

// Apply performance optimization
window.addEventListener('load', optimizePerformance);
