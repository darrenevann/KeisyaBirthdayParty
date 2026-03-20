document.addEventListener("DOMContentLoaded", () => {
    // 1. Logika Buka Undangan
    const openBtn = document.getElementById("open-btn");
    const coverPage = document.getElementById("cover-page");
    const mainContent = document.getElementById("main-content");

    openBtn.addEventListener("click", () => {
        coverPage.style.transform = "translateY(-100vh)";
        setTimeout(() => {
            coverPage.style.display = "none";
            mainContent.classList.remove("hidden");
            createPetals();
            initScrollAnimations(); 
        }, 800);
    });

    // 2. Countdown Timer Logika (Ganti targetDate dengan tanggal asli)
    const targetDate = new Date("June 22, 2026 18:00:00").getTime();

    const updateCountdown = setInterval(() => {
        const now = new Date().getTime();
        const distance = targetDate - now;

        if (distance < 0) {
            clearInterval(updateCountdown);
            document.querySelector(".countdown-container").innerHTML = "<p>Acara Sedang Berlangsung!</p>";
            return;
        }

        document.getElementById("days").innerText = Math.floor(distance / (1000 * 60 * 60 * 24)).toString().padStart(2, '0');
        document.getElementById("hours").innerText = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)).toString().padStart(2, '0');
        document.getElementById("minutes").innerText = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)).toString().padStart(2, '0');
        document.getElementById("seconds").innerText = Math.floor((distance % (1000 * 60)) / 1000).toString().padStart(2, '0');
    }, 1000);

    // 3. Efek Partikel Jatuh (Coquette Aesthetic)
    function createPetals() {
        const container = document.getElementById("petals-container");
        const count = 150;

        for (let i = 0; i < count; i++) {
            const petal = document.createElement("div");
            petal.classList.add("petal");

            const size = Math.random() * 8 + 5;
            petal.style.width = `${size}px`;
            petal.style.height = `${size}px`;

            petal.style.left = `${Math.random() * 100}%`;

            petal.style.animationDuration = `${Math.random() * 15 + 10}s`;

           
            petal.style.animationDelay = `${Math.random() * -25}s`;
          
           
            petal.style.opacity = Math.random() * 0.4 + 0.2;

       
            const isAlternateColor = Math.random() > 0.5;
            petal.style.background = isAlternateColor ? '#ffc0cb' : '#ffb6c1';
            if (Math.random() > 0.7) {
                petal.style.filter = "blur(0.5px)"; 
            }

            container.appendChild(petal);
        }
    }
    // 4. Scroll Animation Logic (Intersection Observer murni, tanpa library berat)
    function initScrollAnimations() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.15 });

        document.querySelectorAll('.animate-on-scroll').forEach(section => {
            observer.observe(section);
        });
    }

    // 5. Placeholder Fetch API Supabase (Gunakan instruksi saya sebelumnya untuk mengisinya)
    document.getElementById('rsvp-form').addEventListener('submit', function (e) {
        e.preventDefault();
    
        document.getElementById('rsvp-status').innerText = "Simulasi: Data berhasil dikirim.";
    });
});