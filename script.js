// Mobile Menu Toggle
const menuBtn = document.getElementById('mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');

if (menuBtn && mobileMenu) {
    menuBtn.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
    });

    // Close mobile menu when clicking a link
    document.querySelectorAll('#mobile-menu a').forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.add('hidden');
        });
    });
}

// Scroll Animation (Intersection Observer)
const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px"
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.reveal').forEach(el => {
    observer.observe(el);
});

// Staggered animation for Mission & Vision cards
const missionVisionObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            // Add a staggered delay based on card position
            const cards = entry.target.closest('#mission-vision').querySelectorAll('.mission-vision-card');
            cards.forEach((card, i) => {
                setTimeout(() => {
                    card.classList.add('mv-visible');
                }, i * 200);
            });
            missionVisionObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.2 });

// Observe the mission-vision section
const missionSection = document.getElementById('mission-vision');
if (missionSection) {
    missionVisionObserver.observe(missionSection);
}

// --- NEW: Form Submission Logic ---
async function handleSubmit(event) {
    event.preventDefault(); // Stop page reload

    const btn = document.getElementById('submitBtn');
    const originalText = btn.innerText;
    
    // Show loading state
    btn.innerText = 'Sending...';
    btn.disabled = true;

    // Collect data
    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        message: document.getElementById('message').value,
        timestamp: new Date().toISOString()
    };

    // Your Production n8n URL
    const webhookUrl = 'https://n8n.we-automate-it.me/webhook-test/contact-form';

    try {
        const response = await fetch(webhookUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData)
        });

        if (response.ok) {
            alert('Message received! We will be in touch shortly.');
            event.target.reset(); // Clear form
        } else {
            alert('Error sending message. Please try again.');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Something went wrong. Please check your connection.');
    } finally {
        // Restore button
        btn.innerText = originalText;
        btn.disabled = false;
    }
}