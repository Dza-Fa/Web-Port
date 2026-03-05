// Menunggu hingga seluruh konten DOM dimuat sebelum menjalankan skrip
document.addEventListener('DOMContentLoaded', () => {

    // --- Inisialisasi Fungsi ---
    setupSplashTransition();
    setupCustomCursor();
    setupScrollReveal();
    setupRippleEffect();
    setupNavFocus();
    setupSplashInteractivity();
    setupTiltEffect();
// --- 🌊 SPLASH SCREEN TRANSITION ---
    function setupSplashTransition() {
        const enterBtn = document.getElementById('enter-btn');
        const splashScreen = document.getElementById('splash-screen');
        const mainContent = document.getElementById('main-content');

        if (enterBtn && splashScreen && mainContent) {
            enterBtn.addEventListener('click', () => {
                splashScreen.classList.add('animate-exit');
                mainContent.classList.add('visible');
                splashScreen.addEventListener('animationend', (e) => {
                    if (e.target === splashScreen) {
                        splashScreen.style.display = 'none';
                    }
                });
            });
        }
    }

    // --- 🌟 SPLASH SCREEN INTERACTIVITY (Typing & Parallax) ---
    function setupSplashInteractivity() {
        const typingText = document.getElementById('typing-text');
        const subtitle = document.querySelector('.splash-subtitle');
        const textToType = "Selamat Datang";
        let charIndex = 0;

        // 1. Typing Animation Logic
        function type() {
            if (charIndex < textToType.length) {
                typingText.textContent += textToType.charAt(charIndex);
                charIndex++;
                setTimeout(type, 54); // Kecepatan mengetik (ms)
            } else {
                // Setelah selesai mengetik, munculkan subtitle
                if (subtitle) subtitle.classList.add('visible');
            }
        }

        // Mulai mengetik setelah jeda singkat
        if (typingText) setTimeout(type, 500);
    }

    // --- ✨ CUSTOM CURSOR EFFECT ---
    function setupCustomCursor() {
        const cursor = document.querySelector('.custom-cursor');
        if (!cursor) return;

        document.addEventListener('mousemove', (e) => {
            cursor.style.left = e.clientX + 'px';
            cursor.style.top = e.clientY + 'px';
        });

        // Hover elements that trigger cursor expansion
        const hoverElements = document.querySelectorAll('a, button, .card-interactive, .karya-card, .contact-icon');
        hoverElements.forEach(el => {
            el.addEventListener('mouseenter', () => cursor.classList.add('expand'));
            el.addEventListener('mouseleave', () => cursor.classList.remove('expand'));
        });
    }

    // --- 🎯 NAVIGATION FOCUS MODE ---
    function setupNavFocus() {
        const navLinks = document.querySelectorAll('nav ul li a');
        const mainContainer = document.querySelector('main');
        const pageSections = document.querySelectorAll('.page-section');

        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                // Dapatkan ID target
                const targetId = link.getAttribute('href').substring(1);
                
                // Aktifkan mode fokus
                mainContainer.classList.add('focus-mode');
                
                // Blur section lain
                pageSections.forEach(section => {
                    if (section.id === targetId) {
                        section.classList.remove('is-blurred');
                    } else {
                        section.classList.add('is-blurred');
                    }
                });

                // Fungsi restore
                const restoreAllSections = () => {
                    mainContainer.classList.remove('focus-mode');
                    pageSections.forEach(section => {
                        section.classList.remove('is-blurred');
                    });
                    window.removeEventListener('wheel', restoreAllSections);
                    window.removeEventListener('touchmove', restoreAllSections);
                    window.removeEventListener('keydown', handleKeyDown);
                };

                const handleKeyDown = (e) => {
                    if (['ArrowDown', 'ArrowUp', 'PageDown', 'PageUp', 'Home', 'End', ' '].includes(e.key)) {
                        restoreAllSections();
                    }
                };

                setTimeout(() => {
                    window.addEventListener('wheel', restoreAllSections, { once: true });
                    window.addEventListener('touchmove', restoreAllSections, { once: true });
                    window.addEventListener('keydown', handleKeyDown);
                }, 800);
            });
        });
    }

    // --- 🧊 3D TILT EFFECT FOR CARDS ---
    function setupTiltEffect() {
        const cards = document.querySelectorAll('.card-interactive, .karya-card, .card.glassmorphism');

        cards.forEach(card => {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;

                const centerX = rect.width / 2;
                const centerY = rect.height / 2;

                let intensity = 5; // Default intensity
                if (card.closest('#biodata, #karya')) {
                    intensity = 2; // Lower intensity for these sections
                }

                // Kalkulasi rotasi berdasarkan posisi mouse
                const rotateX = ((y - centerY) / centerY) * -intensity;
                const rotateY = ((x - centerX) / centerX) * intensity;

                card.style.transition = 'none'; // Hapus transisi agar gerakan instan (tidak lag)
                card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
            });

            card.addEventListener('mouseleave', () => {
                card.style.transition = 'transform 0.5s ease'; // Kembalikan transisi untuk reset halus
                card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)'; // Reset ke posisi awal
            });
        });
    }

    // --- 📜 SCROLL REVEAL ANIMATION ---
    function setupScrollReveal() {
        const observerOptions = {
            threshold: 0.15,
            rootMargin: "0px 0px -50px 0px"
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        const revealElements = document.querySelectorAll('.reveal-on-scroll');
        revealElements.forEach(el => observer.observe(el));
    }

});
