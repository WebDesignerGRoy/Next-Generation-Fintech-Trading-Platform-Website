// NexTrade - Main JavaScript

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    console.log('NexTrade Platform Loaded');
    
    // Mobile menu toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function() {
            navLinks.classList.toggle('active');
        });
    }
    
    // Add active class to current nav link
    const currentPath = window.location.pathname;
    const navLinksItems = document.querySelectorAll('.nav-link');
    
    navLinksItems.forEach(link => {
        if (link.getAttribute('href') === currentPath) {
            link.classList.add('active');
        }
        
        link.addEventListener('click', function(e) {
            navLinksItems.forEach(l => l.classList.remove('active'));
            this.classList.add('active');
        });
    });
    
    // Filter button functionality for Profit Chart
    const filterButtons = document.querySelectorAll('.filter-btn');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Here you would typically fetch new data based on the filter
            console.log('Filter changed to:', this.textContent);
        });
    });
    
    // Post action handlers (like, comment, share)
    const postActions = document.querySelectorAll('.post-action');
    
    postActions.forEach(action => {
        action.addEventListener('click', function() {
            const icon = this.querySelector('svg');
            const iconName = icon.getAttribute('data-lucide');
            
            // Add visual feedback
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 100);
            
            console.log('Post action:', iconName);
            
            // You would typically handle the action here (API call, etc.)
        });
    });
    
    // Bot card "Run Bot" button handlers
    const runBotButtons = document.querySelectorAll('.bot-card .btn-primary');
    
    runBotButtons.forEach(button => {
        button.addEventListener('click', function() {
            const botCard = this.closest('.bot-card');
            const botName = botCard.querySelector('.bot-name').textContent;
            
            // Show loading state
            const originalText = this.innerHTML;
            this.innerHTML = '<i data-lucide="loader"></i> Starting...';
            this.disabled = true;
            
            // Simulate bot starting (replace with actual API call)
            setTimeout(() => {
                this.innerHTML = '<i data-lucide="check"></i> Running';
                this.classList.add('btn-success');
                
                console.log(`Bot "${botName}" started successfully`);
                
                // Reset after 2 seconds
                setTimeout(() => {
                    this.innerHTML = originalText;
                    this.disabled = false;
                    this.classList.remove('btn-success');
                    lucide.createIcons(); // Reinitialize icons
                }, 2000);
            }, 1500);
            
            lucide.createIcons(); // Reinitialize icons for loader
        });
    });
    
    // Balance card deposit/withdraw handlers
    const balanceActions = document.querySelectorAll('.balance-card .btn-outline');
    
    balanceActions.forEach(button => {
        button.addEventListener('click', function() {
            const action = this.textContent.trim();
            const balanceCard = this.closest('.balance-card');
            const balanceType = balanceCard.querySelector('.card-label').textContent;
            
            console.log(`${action} requested for ${balanceType}`);
            
            // You would typically open a modal or navigate to deposit/withdraw page
            alert(`${action} dialog for ${balanceType} would open here`);
        });
    });
    
    // Mining action buttons
    const miningBuyBtn = document.querySelector('.mining-actions .btn-success');
    const miningInvestBtn = document.querySelector('.mining-actions .btn-outline');
    
    if (miningBuyBtn) {
        miningBuyBtn.addEventListener('click', function() {
            console.log('Buy Mining Machine clicked');
            alert('Mining Machine purchase dialog would open here');
        });
    }
    
    if (miningInvestBtn) {
        miningInvestBtn.addEventListener('click', function() {
            console.log('Invest in Pool clicked');
            alert('Mining Pool investment dialog would open here');
        });
    }
    
    // Animate numbers on scroll (optional enhancement)
    const animateValue = (element, start, end, duration) => {
        let startTimestamp = null;
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            
            const value = Math.floor(progress * (end - start) + start);
            element.textContent = '$' + value.toLocaleString();
            
            if (progress < 1) {
                window.requestAnimationFrame(step);
            }
        };
        window.requestAnimationFrame(step);
    };
    
    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe sections for fade-in animations
    const sections = document.querySelectorAll('.section, .balance-card, .bot-card');
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'opacity 0.5s ease-out, transform 0.5s ease-out';
        observer.observe(section);
    });
    
    // Live ticker simulation (updates prices every 5 seconds)
    const updateTicker = () => {
        const tickerValues = document.querySelectorAll('.ticker-value');
        const tickerChanges = document.querySelectorAll('.ticker-change');
        
        tickerValues.forEach((value, index) => {
            const currentValue = parseFloat(value.textContent.replace('$', '').replace(',', ''));
            const change = (Math.random() - 0.5) * 100; // Random change
            const newValue = currentValue + change;
            
            value.textContent = '$' + newValue.toFixed(2);
            
            // Update change percentage
            if (tickerChanges[index]) {
                const changePercent = ((change / currentValue) * 100).toFixed(1);
                tickerChanges[index].textContent = (changePercent > 0 ? '+' : '') + changePercent + '%';
                
                // Update classes
                if (changePercent > 0) {
                    tickerChanges[index].classList.add('positive');
                    tickerChanges[index].classList.remove('negative');
                    value.classList.add('positive');
                    value.classList.remove('negative');
                } else {
                    tickerChanges[index].classList.add('negative');
                    tickerChanges[index].classList.remove('positive');
                    value.classList.add('negative');
                    value.classList.remove('positive');
                }
            }
        });
    };
    
    // Update ticker every 5 seconds
    setInterval(updateTicker, 5000);
    
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Add hover effect to cards
    const cards = document.querySelectorAll('.glass-card, .balance-card, .bot-card, .security-card');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
    
    console.log('All event listeners initialized');
});

// Handle window resize
let resizeTimer;
window.addEventListener('resize', function() {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function() {
        console.log('Window resized to:', window.innerWidth, 'x', window.innerHeight);
        // You can add responsive behavior here
    }, 250);
});

// Export functions for potential external use
window.NexTrade = {
    version: '1.0.0',
    initialized: true,
    
    // Add any public methods here
    showNotification: function(message, type = 'info') {
        console.log(`[${type.toUpperCase()}] ${message}`);
        // You could implement a toast notification system here
    },
    
    refreshData: function() {
        console.log('Refreshing dashboard data...');
        // Implement data refresh logic
    }
};
