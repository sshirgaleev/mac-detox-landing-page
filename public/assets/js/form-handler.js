/**
 * Form Handler - Static HTML Version
 * Replaces PHP mailer.php functionality
 *
 * Options to use:
 * 1. FormSpree (https://formspree.io) - Free tier available
 * 2. EmailJS (https://www.emailjs.com) - Free tier available
 * 3. Web3Forms (https://web3forms.com) - Free, no registration needed
 * 4. Your own backend API
 */

// ===== OPTION 1: Using FormSpree =====
// Replace 'YOUR_FORM_ID' with your FormSpree form ID
// Sign up at https://formspree.io to get your form ID
/*
function handleFormSpree(form) {
    const formData = new FormData(form);

    fetch('https://formspree.io/f/YOUR_FORM_ID', {
        method: 'POST',
        body: formData,
        headers: {
            'Accept': 'application/json'
        }
    })
    .then(response => {
        if (response.ok) {
            showMessage('Thank You! Your message has been sent.', 'success');
            form.reset();
        } else {
            showMessage('Oops! Something went wrong. Please try again.', 'error');
        }
    })
    .catch(error => {
        showMessage('Oops! There was a problem submitting your form.', 'error');
    });
}
*/

// ===== OPTION 2: Using Web3Forms (No Registration Required) =====
// Get your access key from https://web3forms.com
function handleWeb3Forms(form) {
    const formData = new FormData(form);

    // Add your Web3Forms access key here
    formData.append('access_key', 'YOUR_ACCESS_KEY_HERE');

    fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            showMessage('Thank You! Your message has been sent.', 'success');
            form.reset();
        } else {
            showMessage('Oops! Something went wrong. Please try again.', 'error');
        }
    })
    .catch(error => {
        showMessage('Oops! There was a problem submitting your form.', 'error');
    });
}

// ===== OPTION 3: Local Storage (For Demo/Testing Only) =====
// This saves form data to browser's local storage - for testing purposes only
function handleLocalStorage(form) {
    const formData = new FormData(form);
    const data = {
        name: formData.get('name'),
        email: formData.get('email'),
        message: formData.get('message'),
        timestamp: new Date().toISOString()
    };

    // Save to local storage
    const submissions = JSON.parse(localStorage.getItem('contactSubmissions') || '[]');
    submissions.push(data);
    localStorage.setItem('contactSubmissions', JSON.stringify(submissions));

    showMessage('Thank You! Your message has been saved locally (demo mode).', 'success');
    form.reset();

    console.log('Form submission saved:', data);
}

// Display message to user
function showMessage(message, type) {
    // Create message element
    const messageDiv = document.createElement('div');
    messageDiv.className = `alert alert-${type === 'success' ? 'success' : 'danger'} mt-3`;
    messageDiv.style.padding = '15px';
    messageDiv.style.borderRadius = '5px';
    messageDiv.style.marginTop = '15px';
    messageDiv.textContent = message;

    // Find form and append message
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        const existingMessage = form.querySelector('.alert');
        if (existingMessage) {
            existingMessage.remove();
        }
        form.appendChild(messageDiv);
    });

    // Remove message after 5 seconds
    setTimeout(() => {
        messageDiv.remove();
    }, 5000);
}

// Initialize form handlers
document.addEventListener('DOMContentLoaded', function() {
    const forms = document.querySelectorAll('form');

    forms.forEach(form => {
        // Skip newsletter forms (they might need different handling)
        if (form.querySelector('input[type="email"][placeholder*="newsletter" i]')) {
            return;
        }

        form.addEventListener('submit', function(e) {
            e.preventDefault();

            // Validate form
            const name = form.querySelector('input[name="name"]');
            const email = form.querySelector('input[name="email"]');
            const message = form.querySelector('textarea[name="message"]');

            if (!name || !email || !message) {
                // Form doesn't have required fields, might be newsletter form
                return;
            }

            if (!name.value.trim()) {
                showMessage('Please enter your name.', 'error');
                return;
            }

            if (!email.value.trim() || !isValidEmail(email.value)) {
                showMessage('Please enter a valid email address.', 'error');
                return;
            }

            if (!message.value.trim()) {
                showMessage('Please enter your message.', 'error');
                return;
            }

            // Choose your preferred method:
            // handleFormSpree(form);      // Option 1: FormSpree
            // handleWeb3Forms(form);      // Option 2: Web3Forms
            handleLocalStorage(form);      // Option 3: Local Storage (demo only)
        });
    });
});

// Email validation helper
function isValidEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Newsletter form handler (optional)
document.addEventListener('DOMContentLoaded', function() {
    const newsletterForms = document.querySelectorAll('form');

    newsletterForms.forEach(form => {
        const emailInput = form.querySelector('input[type="email"]');
        const hasOnlyEmail = form.querySelectorAll('input').length === 1;

        if (emailInput && hasOnlyEmail) {
            form.addEventListener('submit', function(e) {
                e.preventDefault();

                if (!emailInput.value.trim() || !isValidEmail(emailInput.value)) {
                    alert('Please enter a valid email address.');
                    return;
                }

                // Handle newsletter subscription
                console.log('Newsletter subscription:', emailInput.value);
                alert('Thank you for subscribing to our newsletter!');
                form.reset();
            });
        }
    });
});
