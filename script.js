window.onload = function () {

    gsap.registerPlugin(ScrollTrigger);

    const tl = gsap.timeline();

    // Hero Heading
    tl.from("#home h1", {
        y: -80,
        opacity: 0,
        duration: 1
    })
    .from("#home h2", {
        y: -60,
        opacity: 0,
        duration: 0.8
    }, "-=0.5")
    .from("#home p", {
        y: -40,
        opacity: 0,
        duration: 0.8
    }, "-=0.5")
    .from(".hero-buttons", {
        y: 30,
        opacity: 0,
        duration: 0.8
    }, "-=0.4")
    .from(".social-icons", {
        y: 30,
        opacity: 0,
        duration: 0.8
    }, "-=0.4")
    .from(".profile-image", {
        x: 100,
        opacity: 0,
        duration: 1
    }, "-=1");

    gsap.from("#about", {
        scrollTrigger: {
            trigger: "#about",
            start: "top 80%"
        },
        y: 100,
        opacity: 0,
        duration: 1
    });

    // ==========================
    // SMOOTH SCROLL NAVIGATION
    // ==========================

    const navLinks = document.querySelectorAll('nav a');

    navLinks.forEach(link => {

        link.addEventListener('click', function (event) {

            event.preventDefault();

            const targetId = this.getAttribute('href');

            const targetSection = document.querySelector(targetId);

            targetSection.scrollIntoView({
                behavior: 'smooth'
            });

        });

    });


    // ==========================
    // MOBILE HAMBURGER MENU
    // ==========================

    const menuToggle = document.querySelector(".menu-toggle");
    const navMenu = document.querySelector("nav ul");

    menuToggle.addEventListener("click", function () {

        navMenu.classList.toggle("active");

    });


    const viewProjectsBtn = document.getElementById("view-projects-btn");

    viewProjectsBtn.addEventListener("click", function () {

        document.getElementById("projects").scrollIntoView({

            behavior: "smooth"

        });

    });

    // Close menu after clicking a link

    navLinks.forEach(link => {

        link.addEventListener("click", function () {

            navMenu.classList.remove("active");

        });

    });



    // ==========================
    // ACTIVE NAVBAR
    // ==========================

    const sections = document.querySelectorAll("section");
    const navItems = document.querySelectorAll("nav a");

    window.addEventListener("scroll", function () {

        let currentSection = "";

        sections.forEach(section => {

            const sectionTop = section.offsetTop - 150;
            const sectionHeight = section.offsetHeight;

            if (window.scrollY >= sectionTop &&
                window.scrollY < sectionTop + sectionHeight) {

                currentSection = section.getAttribute("id");
            }

        });

        navItems.forEach(link => {

            link.classList.remove("active");

            if (link.getAttribute("href") === "#" + currentSection) {
                link.classList.add("active");
            }

        });

    });


    // ==========================
    // PROJECT CARD 3D HOVER
    // ==========================

    const projectCards = document.querySelectorAll(".project-card");

    projectCards.forEach(card => {      

        card.addEventListener("mousemove", function (e) {

            const rect = card.getBoundingClientRect();

            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const rotateY = ((x / rect.width) - 0.5) * 20;
            const rotateX = ((y / rect.height) - 0.5) * -20;

            card.style.transform =
                `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;

        });

        card.addEventListener("mouseleave", function () {

            card.style.transform =
                "perspective(1000px) rotateX(0deg) rotateY(0deg)";

        });

    });


    // ==========================
    // MOUSE GLOW EFFECT
    // ==========================

    const glow = document.querySelector(".mouse-glow");

    document.addEventListener("mousemove", function (event) {

        mouse.x = event.clientX;
        mouse.y = event.clientY;

        glow.style.left = event.clientX + "px";
        glow.style.top = event.clientY + "px";

    });


    // ==========================
    // AI NETWORK - LESSON 1
    // ==========================

    const canvas = document.getElementById("network-canvas");

    const ctx = canvas.getContext("2d");

    canvas.width = window.innerWidth;

    canvas.height = window.innerHeight;

    const particles = [];

    function createParticles() {

        particles.length = 0;

        const particleCount =
            window.innerWidth < 768 ? 30 : 60;

        for (let i = 0; i < particleCount; i++) {

            particles.push({

                x: Math.random() * canvas.width,

                y: Math.random() * canvas.height,

                radius: 3,

                dx: (Math.random() - 0.5) * 1,

                dy: (Math.random() - 0.5) * 1,

                angle: Math.random() * Math.PI * 2,

                pulse: Math.random() * Math.PI * 2

            });

        }

    }

    createParticles();


    let time = 0;

    function animate() {

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        time += 0.02;


        for (let i = 0; i < particles.length; i++) {

            for (let j = i + 1; j < particles.length; j++) {

                const dx = particles[i].x - particles[j].x;

                const dy = particles[i].y - particles[j].y;

                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < 120) {

                    ctx.beginPath();

                    ctx.moveTo(particles[i].x, particles[i].y);

                    ctx.lineTo(particles[j].x, particles[j].y);

                    const opacity = 1 - (distance / 120);

                    const blue = 200 + Math.sin(time) * 55;

                    ctx.strokeStyle = `rgba(0,${blue},255,${opacity})`;

                    ctx.lineWidth = 0.5 + (1 - distance / 120);

                    ctx.stroke();

                }

            }

        }

        ctx.fillStyle = "#00E5FF";

        particles.forEach(function (particle) {

            particle.angle += 0.01;

            particle.pulse += 0.05;

            particle.x += particle.dx + Math.cos(particle.angle) * 0.3;

            particle.y += particle.dy + Math.sin(particle.angle) * 0.3;

            if (
                particle.x <= 0 ||
                particle.x >= canvas.width
            ) {
                particle.dx *= -1;
            }

            if (
                particle.y <= 0 ||
                particle.y >= canvas.height
            ) {
                particle.dy *= -1;
            }


            const dxMouse = mouse.x - particle.x;

            const dyMouse = mouse.y - particle.y;

            const mouseDistance = Math.sqrt(
                dxMouse * dxMouse +
                dyMouse * dyMouse
            );

            if (mouseDistance < 150) {

                const force = (150 - mouseDistance) / 150;

                particle.x -= dxMouse * force * 0.05;

                particle.y -= dyMouse * force * 0.05;

            }

            ctx.beginPath();

            ctx.arc(
                particle.x,
                particle.y,
                particle.radius + Math.sin(particle.pulse) * 0.5,
                0,
                Math.PI * 2
            );

            ctx.shadowBlur = mouseDistance < 150 ? 25 : 15;

            ctx.shadowColor = "#00E5FF";

            ctx.fillStyle = "#00E5FF";

            ctx.fill();

            ctx.shadowBlur = 0;

        });

        requestAnimationFrame(animate);

    }


    const mouse = {

        x: 0,

        y: 0

    };

    document.addEventListener("mousemove", function (event) {

        mouse.x = event.clientX;

        mouse.y = event.clientY;

    });


    window.addEventListener("resize", function () {

        canvas.width = window.innerWidth;

        canvas.height = window.innerHeight;

        createParticles();

    });


    const contactForm = document.getElementById("contact-form");
    const successMessage = document.getElementById("success-message");

    contactForm.addEventListener("submit", async function(event){

        event.preventDefault();

        const formData = new FormData(contactForm);

        const response = await fetch(contactForm.action,{

            method:"POST",

            body:formData,

            headers:{
                "Accept":"application/json"
            }

        });

        if(response.ok){

            successMessage.style.display = "block";

            contactForm.reset();

            setTimeout(function(){

                successMessage.style.display = "none";

            }, 5000);

        }else{

            alert("Something went wrong. Please try again.");

        }

    });



    animate();


};






// Skills Section
gsap.from("#skills", {
    scrollTrigger: {
        trigger: "#skills",
        start: "top 80%"
    },
    y: 100,
    opacity: 0,
    duration: 1
});

// gsap.from(".skill-card", {
//     scrollTrigger: {
//         trigger: "#skills",
//         start: "top 80%"
//     },
//     y: 50,
//     opacity: 0,
//     duration: 0.8,
//     stagger: 0.2
// });

// Projects Section
gsap.from("#projects", {
    scrollTrigger: {
        trigger: "#projects",
        start: "top 80%"
    },
    y: 100,
    opacity: 0,
    duration: 1
});

// // Project Cards
// gsap.from(".project-card", {
//     scrollTrigger: {
//         trigger: "#projects",
//         start: "top 80%"
//     },
//     y: 50,
//     opacity: 0,
//     duration: 0.8,
//     stagger: 0.3
// });

// Contact Section
gsap.from("#contact", {
    scrollTrigger: {
        trigger: "#contact",
        start: "top 80%"
    },
    y: 100,
    opacity: 0,
    duration: 1
});