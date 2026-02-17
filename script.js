console.log('hello');


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

// --- Form Submission Logic ---
async function handleSubmit(event) {
	console.log('i am in handle submit function');
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
        phone: document.getElementById('phone').value, // Added phone number field
        message: document.getElementById('message').value,
        timestamp: new Date().toISOString()
    };

    // Your Production n8n URL
    const webhookUrl = 'https://n8n.we-automate-it.me/webhook/contact-form';

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

// Attach the listener directly to the form to ensure it is reachable
const contactForm = document.querySelector('form');
if (contactForm) {
    contactForm.addEventListener('submit', handleSubmit);
}


// --- Chatbot Logic ---

document.addEventListener('DOMContentLoaded', () => {
    const chatbotButton = document.getElementById('chatbot-button');
    const chatInterface = document.getElementById('chat-interface');
    const closeChat = document.getElementById('close-chat');
    const chatInput = document.getElementById('chat-input');
    const sendButton = document.getElementById('send-button');
    const chatMessages = document.getElementById('chat-messages');

    let isChatOpen = false;

    // Toggle chat
    if (chatbotButton) {
        chatbotButton.addEventListener('click', () => {
            if (!isChatOpen) {
                chatInterface.classList.add('active');
                chatInput.focus();
                isChatOpen = true;
            } else {
                chatInterface.classList.remove('active');
                isChatOpen = false;
            }
        });
    }

    if (closeChat) {
        closeChat.addEventListener('click', () => {
            chatInterface.classList.remove('active');
            isChatOpen = false;
        });
    }

    // Send Message Logic
    async function sendMessage() {
        const message = chatInput.value.trim();
        if (!message) return;

        // Add user message
        addMessage(message, 'user');
        chatInput.value = '';

        // Add typing indicator
        addTypingIndicator();

        try {
            // Call Backend API
            const response = await fetch('http://localhost:5000/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ message: message })
            });

            const data = await response.json();
            removeTypingIndicator();

            if (data.status === 'success') {
                addMessage(data.response, 'bot');
            } else {
                addMessage("Sorry, I'm having trouble connecting to the server.", 'bot');
            }
        } catch (error) {
            console.error('Chat Error:', error);
            removeTypingIndicator();
            addMessage("Network error. Please ensure the backend is running.", 'bot');
        }
    }

    // Event Listeners for Sending
    if (sendButton) {
        sendButton.addEventListener('click', sendMessage);
    }

    if (chatInput) {
        chatInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') sendMessage();
        });
    }

    // UI Helper: Add Message
    function addMessage(text, sender) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${sender}-message`;

        const avatar = document.createElement('div');
        avatar.className = 'message-avatar';
        avatar.innerHTML = sender === 'bot' ? '<i class="fas fa-robot"></i>' : '<i class="fas fa-user"></i>';

        const content = document.createElement('div');
        content.className = 'message-content';
        content.innerHTML = `<p>${text}</p>`;

        messageDiv.appendChild(avatar);
        messageDiv.appendChild(content);
        chatMessages.appendChild(messageDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    // UI Helper: Typing Indicator
    function addTypingIndicator() {
        const typingDiv = document.createElement('div');
        typingDiv.className = 'message bot-message typing-indicator';
        typingDiv.id = 'typing-indicator';
        
        typingDiv.innerHTML = `
            <div class="message-avatar"><i class="fas fa-robot"></i></div>
            <div class="message-content">
                <div class="typing-dots">
                    <div class="typing-dot"></div>
                    <div class="typing-dot"></div>
                    <div class="typing-dot"></div>
                </div>
            </div>
        `;
        chatMessages.appendChild(typingDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    function removeTypingIndicator() {
        const indicator = document.getElementById('typing-indicator');
        if (indicator) indicator.remove();
    }
});