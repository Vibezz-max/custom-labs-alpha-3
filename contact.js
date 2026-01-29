// contact.js - Contact form functionality

document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    const formStatus = document.getElementById('formStatus');

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const formData = {
                name: document.getElementById('contactName').value,
                email: document.getElementById('contactEmail').value,
                phone: document.getElementById('contactPhone').value,
                subject: document.getElementById('contactSubject').value,
                message: document.getElementById('contactMessage').value,
                newsletter: document.getElementById('contactNewsletter').checked
            };
            
            // Validate required fields
            if (!formData.name || !formData.email || !formData.subject || !formData.message) {
                showFormStatus('Please fill in all required fields.', 'error');
                return;
            }
            
            // Validate email format
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(formData.email)) {
                showFormStatus('Please enter a valid email address.', 'error');
                return;
            }
            
            // Show loading state
            const submitBtn = contactForm.querySelector('.submit-btn');
            const originalBtnContent = submitBtn.innerHTML;
            submitBtn.innerHTML = '<span>SENDING...</span><i class="fas fa-spinner fa-spin"></i>';
            submitBtn.disabled = true;
            
            // Simulate sending (in production, this would be an API call)
            setTimeout(() => {
                // Log form data (in production, send to backend)
                console.log('Contact Form Submitted:', formData);
                
                // Show success message
                showFormStatus('Thank you for your message! We\'ll get back to you within 24 hours.', 'success');
                
                // Reset form
                contactForm.reset();
                
                // Reset button
                submitBtn.innerHTML = originalBtnContent;
                submitBtn.disabled = false;
                
                // In production, you would send this data to your backend:
                /*
                fetch('/api/contact', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(formData)
                })
                .then(response => response.json())
                .then(data => {
                    showFormStatus('Thank you for your message! We\'ll get back to you within 24 hours.', 'success');
                    contactForm.reset();
                })
                .catch(error => {
                    showFormStatus('Oops! Something went wrong. Please try again or email us directly.', 'error');
                })
                .finally(() => {
                    submitBtn.innerHTML = originalBtnContent;
                    submitBtn.disabled = false;
                });
                */
            }, 1500);
        });
    }
    
    function showFormStatus(message, type) {
        formStatus.textContent = message;
        formStatus.style.display = 'block';
        
        if (type === 'success') {
            formStatus.style.background = 'rgba(76, 175, 80, 0.1)';
            formStatus.style.border = '1px solid rgba(76, 175, 80, 0.3)';
            formStatus.style.color = '#4CAF50';
        } else {
            formStatus.style.background = 'rgba(244, 67, 54, 0.1)';
            formStatus.style.border = '1px solid rgba(244, 67, 54, 0.3)';
            formStatus.style.color = '#F44336';
        }
        
        // Auto-hide after 5 seconds
        setTimeout(() => {
            formStatus.style.display = 'none';
        }, 5000);
    }
});