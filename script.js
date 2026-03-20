

document.addEventListener("DOMContentLoaded", () => {
    const openBtn = document.getElementById("open-btn");
    const coverPage = document.getElementById("cover-page");
    const mainContent = document.getElementById("main-content");
    const bgMusic = document.getElementById("bg-music"); // Menangkap elemen audio

    openBtn.addEventListener("click", () => {
        // Memutar musik saat tombol ditekan
        bgMusic.play().catch(error => {
            console.log("Audio diblokir oleh browser:", error);
        });

        coverPage.style.transform = "translateY(-100vh)";
        setTimeout(() => {
            coverPage.classList.add("hidden");
            mainContent.classList.remove("hidden");
            createPetals();
            initScrollAnimations(); 
        }, 800);
    });

    // Set correct date for the countdown timer
    const targetDate = new Date("June 22, 2026 18:00:00").getTime();

    const updateCountdown = setInterval(() => {
        const now = new Date().getTime();
        const distance = targetDate - now;

        if (distance < 0) {
            clearInterval(updateCountdown);
            document.querySelector(".countdown-container").innerHTML = "<p style='font-size: 1.5rem; color: var(--dark-pink); font-weight: bold;'>The Event is Ongoing!</p>";
            return;
        }

        document.getElementById("days").innerText = Math.floor(distance / (1000 * 60 * 60 * 24)).toString().padStart(2, '0');
        document.getElementById("hours").innerText = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)).toString().padStart(2, '0');
        document.getElementById("minutes").innerText = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)).toString().padStart(2, '0');
        document.getElementById("seconds").innerText = Math.floor((distance % (1000 * 60)) / 1000).toString().padStart(2, '0');
    }, 1000);

    function createPetals() {
        const container = document.getElementById("petals-container");
        // Reduced to 40 elements for performance optimization (was previously 150)
        const count = 40; 

        for (let i = 0; i < count; i++) {
            const petal = document.createElement("div");
            petal.classList.add("petal");

            const sizeMultiplier = Math.random() * 0.5 + 0.5;
            petal.style.transform = `scale(${sizeMultiplier})`;
            petal.style.left = `${Math.random() * 100}%`;
            petal.style.animationDuration = `${Math.random() * 10 + 8}s`;
            petal.style.animationDelay = `${Math.random() * -15}s`;

            container.appendChild(petal);
        }
    }

    function initScrollAnimations() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1, rootMargin: "0px 0px -50px 0px" });

        document.querySelectorAll('.animate-on-scroll').forEach(section => {
            observer.observe(section);
        });
    }

    document.getElementById('rsvp-form').addEventListener('submit', function (e) {
        e.preventDefault();
        const btn = document.getElementById('submit-rsvp');
        const status = document.getElementById('rsvp-status');
        
        btn.disabled = true;
        btn.innerText = "Sending...";
        
        // Simulation of data submission
        setTimeout(() => {
            status.innerText = "Your attendance confirmation has been successfully recorded.";
            btn.innerText = "Send Confirmation";
            btn.disabled = false;
            this.reset();
        }, 1500);
    });
});