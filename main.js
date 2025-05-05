        let imagesData = {
            "images": [
                {
                    "id": 1,
                    "title": "Hòa Bình 30/4/2025",
                    "url": "C:\\Users\\Việt Tùng\\OneDrive\\Máy tính\\Profile\\images\\1.jpg",
                    "description": "Hòa chung niềm vui của Lễ Diễu Binh. Bức ảnh được chụp vào thời điểm trực thăng đang bay, vươn cờ Việt Nam tung bay phấp phới."
                },
                {
                    "id": 2,
                    "title": "Tổng duyệt 27/4/2025",
                    "url": "C:\\Users\\Việt Tùng\\OneDrive\\Máy tính\\Profile\\images\\2.jpg",
                    "description": "Hôm đó đi xem khá vui và có nhiều ảnh đẹp."
                },
                {
                    "id": 3,
                    "title": "Phụ san Báo Nhân Dân số đặc biệt",
                    "url": "C:\\Users\\Việt Tùng\\OneDrive\\Máy tính\\Profile\\images\\3.jpg",
                    "description": "Đẹp nha, đẹp nha (dù ảnh AI :))."
                },
                {
                    "id": 4,
                    "title": "Chào đón lễ lớn",
                    "url": "C:\\Users\\Việt Tùng\\OneDrive\\Máy tính\\Profile\\images\\4.jpg",
                    "description": "Những ngày gần đến 30/4 nhưng sao mưa quá :>."
                }
            ]
        };

        // DOM Elements
        const galleryContainer = document.getElementById('galleryContainer');
        const totalImagesElement = document.getElementById('totalImages');
        const searchInput = document.querySelector('.search-bar input');
        const searchButton = document.querySelector('.search-bar button');
        
        // Modal elements
        const imageModal = document.getElementById('imageModal');
        const modalImage = document.getElementById('modalImage');
        const modalTitle = document.getElementById('modalTitle');
        const modalDescription = document.getElementById('modalDescription');
        const modalClose = document.querySelector('.modal-close');
        
        // Current image being viewed
        let currentImageId = null;

        // Render gallery from data
        function renderGallery() {
            galleryContainer.innerHTML = '';
            imagesData.images.forEach(image => {
                const galleryItem = document.createElement('div');
                galleryItem.className = 'gallery-item';
                galleryItem.dataset.id = image.id;
                
                galleryItem.innerHTML = `
                    <img src="${image.url}" alt="${image.title}" class="gallery-image">
                    <div class="gallery-info">
                        <h3 class="gallery-title">${image.title}</h3>
                        <div class="gallery-actions">
                            <button class="view-detail-btn">Xem chi tiết</button>
                        </div>
                    </div>
                `;
                
                galleryContainer.appendChild(galleryItem);
            });
            
            totalImagesElement.textContent = imagesData.images.length.toLocaleString();
            
            attachEventListeners();
        }
        
        // Attach event listeners to gallery items
        function attachEventListeners() {
            // View buttons
            document.querySelectorAll('.view-detail-btn').forEach(button => {
                button.addEventListener('click', (e) => {
                    const galleryItem = e.target.closest('.gallery-item');
                    currentImageId = parseInt(galleryItem.dataset.id);
                    const image = imagesData.images.find(img => img.id === currentImageId);
                    
                    // Set modal content
                    modalImage.src = image.url;
                    modalTitle.textContent = image.title;
                    modalDescription.textContent = image.description;
                    
                    imageModal.style.display = 'flex';
                    document.body.style.overflow = 'hidden';
                });
            });
            
            // Image click
            document.querySelectorAll('.gallery-image').forEach(image => {
                image.addEventListener('click', (e) => {
                    const galleryItem = e.target.closest('.gallery-item');
                    const viewBtn = galleryItem.querySelector('.view-detail-btn');
                    viewBtn.click();
                });
            });
        }
        
        // Search function
        function performSearch() {
            const searchTerm = searchInput.value.toLowerCase().trim();
            
            document.querySelectorAll('.gallery-item').forEach(item => {
                const title = item.querySelector('.gallery-title').textContent.toLowerCase();
                
                if (title.includes(searchTerm)) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        }
        
        // Load data
        function loadData() {
            renderGallery();
        }
        
        // Event listeners
        modalClose.addEventListener('click', () => {
            imageModal.style.display = 'none';
            document.body.style.overflow = 'auto';
        });
        
        imageModal.addEventListener('click', (e) => {
            if (e.target === imageModal) {
                imageModal.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
        });
        
        searchButton.addEventListener('click', performSearch);
        
        searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                performSearch();
            }
        });
        
        // Initialize
        loadData();
