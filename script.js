document.addEventListener('DOMContentLoaded', function() {
    // Your menu images with categories
    const MENU_IMAGES = [
        {
            id: 1,
            filename: "1.jpg",
            category: "light",
            title: "Light Bite - Snacks",
            order: 1
        },
        {
            id: 2,
            filename: "2.jpg",
            category: "light",
            title: "Light Bite - Appetizers",
            order: 2
        },
        {
            id: 3,
            filename: "3.jpg",
            category: "salad",
            title: "Salad & Soup",
            order: 3
        },
        {
            id: 4,
            filename: "4.jpg",
            category: "asian",
            title: "Khmer/Asian - Main Dishes",
            order: 4
        },
        {
            id: 5,
            filename: "5.jpg",
            category: "asian",
            title: "Khmer/Asian - Rice & Noodles",
            order: 5
        },
        {
            id: 6,
            filename: "6.jpg",
            category: "japanese",
            title: "Japanese",
            order: 6
        },
        {
            id: 7,
            filename: "7.jpg",
            category: "burger",
            title: "Burgers & Sandwiches",
            order: 7
        },
        {
            id: 8,
            filename: "8.jpg",
            category: "pizza",
            title: "Pizza & Pasta",
            order: 8
        },
        {
            id: 9,
            filename: "9.jpg",
            category: "pizza",
            title: "Pizza & Pasta",
            order: 9
        },
        {
            id: 10,
            filename: "10.jpg",
            category: "special",
            title: "Special Dishes",
            order: 10
        },
        {
            id: 11,
            filename: "11.jpg",
            category: "snack",
            title: "Khmer Snacks",
            order: 11
        },
        {
            id: 12,
            filename: "12.jpg",
            category: "dessert",
            title: "Desserts",
            order: 12
        },
        {
            id: 13,
            filename: "13.jpg",
            category: "drinks",
            title: "ONEDERZ Liquors",
            order: 13
        },
        {
            id: 14,
            filename: "14.jpg",
            category: "drinks",
            title: "ONEDERZ Liquors",
            order: 14
        },
        {
            id: 15,
            filename: "15.jpg",
            category: "drinks",
            title: "ONEDERZ Cocktails",
            order: 15
        },
        {
            id: 16,
            filename: "16.jpg",
            category: "drinks",
            title: "ONEDERZ Cocktails",
            order: 16
        },
        {
            id: 17,
            filename: "17.jpg",
            category: "drinks",
            title: "Signature Wines",
            order: 17
        },
        {
            id: 18,
            filename: "18.jpg",
            category: "drinks",
            title: "Signature Wines",
            order: 18
        }
    ];

    // Elements
    const gallery = document.getElementById('menu-gallery');
    const loading = document.getElementById('loading');
    const categoryBtns = document.querySelectorAll('.category-btn');
    const scrollTopBtn = document.getElementById('scroll-top-btn');
    const callBtn = document.getElementById('call-btn');
    const locationBtn = document.getElementById('location-btn');
    const zoomModal = document.getElementById('zoom-modal');
    const zoomedImage = document.getElementById('zoomed-image');
    const modalTitle = document.getElementById('modal-title');
    const closeModal = document.getElementById('close-modal');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const imageCounter = document.getElementById('image-counter');

    // State
    let currentCategory = 'all';
    let currentImages = [];
    let currentZoomIndex = 0;
    let filteredImages = [];

    // Initialize
    init();

    function init() {
        // Sort images by order
        MENU_IMAGES.sort((a, b) => a.order - b.order);
        
        // Load all images initially
        currentImages = [...MENU_IMAGES];
        renderGallery(currentImages);
        
        // Setup event listeners
        setupEventListeners();
        
        // Hide loading
        showLoading(false);
    }

    function renderGallery(images) {
        gallery.innerHTML = '';
        
        // Add stagger animation delay
        images.forEach((image, index) => {
            const menuItem = createMenuItem(image, index);
            menuItem.style.animationDelay = `${index * 0.1}s`;
            gallery.appendChild(menuItem);
        });
    }

    function createMenuItem(image, index) {
        const item = document.createElement('div');
        item.className = 'menu-item';
        item.dataset.id = image.id;
        item.dataset.category = image.category;
        item.dataset.index = index;
        
        // Create image
        const img = document.createElement('img');
        img.src = image.filename;
        img.alt = image.title;
        img.loading = 'lazy';
        
        // Add error handling
        img.onerror = function() {
            this.src = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="400" height="300" viewBox="0 0 400 300"><rect width="400" height="300" fill="%23222"/><text x="200" y="150" font-family="Arial" font-size="16" text-anchor="middle" fill="%23ff6b6b">' + image.title + '</text></svg>';
        };
        
        // Add click event for zoom
        item.addEventListener('click', () => openZoomModal(index));
        
        item.appendChild(img);
        return item;
    }

    function filterGallery(category) {
        showLoading(true);
        
        setTimeout(() => {
            if (category === 'all') {
                currentImages = [...MENU_IMAGES];
            } else {
                currentImages = MENU_IMAGES.filter(image => image.category === category);
            }
            
            renderGallery(currentImages);
            
            // Scroll to top of gallery
            gallery.scrollIntoView({ behavior: 'smooth' });
            
            showLoading(false);
        }, 300);
    }

    function openZoomModal(index) {
        currentZoomIndex = index;
        updateZoomModal();
        zoomModal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    }

    function updateZoomModal() {
        const image = currentImages[currentZoomIndex];
        zoomedImage.src = image.filename;
        modalTitle.textContent = image.title;
        imageCounter.textContent = `${currentZoomIndex + 1}/${currentImages.length}`;
        
        // Update navigation buttons state
        prevBtn.style.opacity = currentZoomIndex > 0 ? '1' : '0.5';
        prevBtn.style.pointerEvents = currentZoomIndex > 0 ? 'auto' : 'none';
        
        nextBtn.style.opacity = currentZoomIndex < currentImages.length - 1 ? '1' : '0.5';
        nextBtn.style.pointerEvents = currentZoomIndex < currentImages.length - 1 ? 'auto' : 'none';
    }

    function closeZoomModal() {
        zoomModal.style.animation = 'fadeOut 0.3s ease forwards';
        setTimeout(() => {
            zoomModal.style.display = 'none';
            document.body.style.overflow = 'auto';
            zoomModal.style.animation = 'fadeIn 0.3s ease';
        }, 300);
    }

    function navigateZoom(direction) {
        currentZoomIndex += direction;
        
        // Boundary check
        if (currentZoomIndex < 0) currentZoomIndex = 0;
        if (currentZoomIndex >= currentImages.length) currentZoomIndex = currentImages.length - 1;
        
        updateZoomModal();
    }

    function showLoading(show) {
        loading.style.display = show ? 'block' : 'none';
    }

    function setupEventListeners() {
        // Category filter buttons
        categoryBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                // Update active button
                categoryBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                
                // Filter gallery
                currentCategory = btn.dataset.category;
                filterGallery(currentCategory);
            });
        });

        // Scroll to top button
        scrollTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });

        // Call button
        callBtn.addEventListener('click', () => {
            window.location.href = 'tel:+1234567890'; // Replace with your phone number
        });

        // Location button
        locationBtn.addEventListener('click', () => {
            window.open('https://maps.google.com', '_blank'); // Replace with your Google Maps URL
        });

        // Show/hide scroll to top button
        window.addEventListener('scroll', () => {
            scrollTopBtn.style.opacity = window.scrollY > 300 ? '1' : '0.5';
        });

        // Zoom modal controls
        closeModal.addEventListener('click', closeZoomModal);
        
        prevBtn.addEventListener('click', () => navigateZoom(-1));
        nextBtn.addEventListener('click', () => navigateZoom(1));

        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (zoomModal.style.display === 'flex') {
                if (e.key === 'Escape') closeZoomModal();
                if (e.key === 'ArrowLeft') navigateZoom(-1);
                if (e.key === 'ArrowRight') navigateZoom(1);
            }
        });

        // Touch swipe in modal
        let touchStartX = 0;
        zoomModal.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        });

        zoomModal.addEventListener('touchend', (e) => {
            const touchEndX = e.changedTouches[0].screenX;
            const diff = touchStartX - touchEndX;
            
            if (Math.abs(diff) > 50) {
                if (diff > 0) {
                    // Swipe left - next image
                    navigateZoom(1);
                } else {
                    // Swipe right - previous image
                    navigateZoom(-1);
                }
            }
        });

        // Prevent scroll when modal is open
        zoomModal.addEventListener('touchmove', (e) => {
            if (zoomModal.style.display === 'flex') {
                e.preventDefault();
            }
        }, { passive: false });

        // Close modal when clicking outside image
        zoomModal.addEventListener('click', (e) => {
            if (e.target === zoomModal) {
                closeZoomModal();
            }
        });

        // Add CSS for fadeOut animation
        const style = document.createElement('style');
        style.textContent = `
            @keyframes fadeOut {
                from { opacity: 1; }
                to { opacity: 0; }
            }
        `;
        document.head.appendChild(style);
    }
});