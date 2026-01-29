// products.js - Product page functionality

document.addEventListener('DOMContentLoaded', function() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const productCards = document.querySelectorAll('.product-card');

    // Filter functionality
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const category = this.getAttribute('data-category');
            
            // Update active button
            filterBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            // Filter products
            productCards.forEach(card => {
                const cardCategory = card.getAttribute('data-category');
                
                if (category === 'all' || cardCategory === category) {
                    card.classList.remove('hidden');
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 10);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        card.classList.add('hidden');
                    }, 300);
                }
            });
        });
    });
});

// Customize product function
function customizeProduct(productName) {
    // Check if user is logged in
    const currentUser = firebase.auth().currentUser;
    
    if (!currentUser) {
        // Show login modal
        const authModal = document.getElementById('authModal');
        if (authModal) {
            authModal.classList.add('active');
        }
        
        // Show message
        alert('Please login to customize products');
        return;
    }
    
    // If logged in, proceed to customization
    alert(`Customizing: ${productName}\n\nThis will redirect to the customization tool (coming soon!)`);
    
    // In a real application, you would redirect to a customization page:
    // window.location.href = `customize.html?product=${encodeURIComponent(productName)}`;
}