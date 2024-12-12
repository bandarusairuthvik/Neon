// gsap-animations.js
gsap.registerPlugin(ScrollTrigger);

// Hero section animation
gsap.from(".hero-section h1", {
    opacity: 0,
    y: -50,
    duration: 1,
    ease: "power2.out"
});

gsap.from(".hero-section p", {
    opacity: 0,
    y: 50,
    duration: 1,
    delay: 0.5,
    ease: "power2.out"
});

gsap.from(".cta-button", {
    opacity: 0,
    scale: 0.5,
    duration: 1,
    delay: 1,
    ease: "back.out(1.7)"
});

// Parallax effect for the 3D scene on scroll
gsap.to(camera.position, {
    z: 2,
    scrollTrigger: {
        trigger: ".hero-section",
        start: "top top",
        end: "bottom top",
        scrub: true
    }
});

// gsap-animations.js
// Register the ScrollTrigger plugin with GSAP
gsap.registerPlugin(ScrollTrigger);

// Animate the product cards
gsap.from(".product-card", {
    opacity: 0,          // Start with no opacity
    y: 100,              // Start 100 pixels below the original position
    stagger: 0.2,        // Delay each animation by 0.2 seconds
    duration: 1,         // Animation duration for each element
    scrollTrigger: {
    trigger: ".products-section", // The section that triggers the animation
    start: "top 80%",             // When the top of the section reaches 80% of the viewport
    end: "bottom 60%",            // When the bottom of the section reaches 60% of the viewport
    scrub: true                   // Smooth animation as the user scrolls
    }
});