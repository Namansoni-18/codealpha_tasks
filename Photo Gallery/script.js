// ---- Element references ----
const mediaItems = document.querySelectorAll('.gallery-media'); // both <img> and <video>

const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const lightboxVideo = document.getElementById('lightbox-video');
const lightboxCounter = document.getElementById('lbCounter');
const closeBtn = document.getElementById('closeBtn');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');

const filterBtns = document.querySelectorAll('.filter-btn');
const searchInput = document.getElementById('searchInput');
const sortSelect = document.getElementById('sortSelect');
const photoCount = document.getElementById('photoCount');
const galleryEl = document.querySelector('.gallery');

let currentIndex = 0;

// Helper: get the searchable/display title, whether it's an image (alt) or video (data-title)
function getTitle(item) {
  return item.tagName === 'IMG' ? item.alt : item.dataset.title;
}

const originalOrder = Array.from(mediaItems);
let activeList = originalOrder;

// ---- Loading skeleton + staggered fade-in (works for both images and videos) ----
mediaItems.forEach((item, i) => {
  const card = item.closest('.photo-card');

  function markLoaded() {
    item.classList.add('loaded');
    card.classList.add('loaded');
  }

  if (item.tagName === 'IMG') {
    if (item.complete) markLoaded();
    else item.addEventListener('load', markLoaded);
  } else {
    if (item.readyState >= 2) markLoaded();
    else item.addEventListener('loadeddata', markLoaded);
  }

  item.style.transitionDelay = `${i * 0.08}s`;
});

// ---- Tilt-on-hover effect ----
const MAX_TILT = 8;

document.querySelectorAll('.photo-card').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateY = ((x - centerX) / centerX) * MAX_TILT;
    const rotateX = -((y - centerY) / centerY) * MAX_TILT;
    card.style.transform =
      `perspective(700px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-6px) scale(1.03)`;
  });

  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
  });
});

// ---- Search, Sort, Category filter ----
function applyFilters() {
  const searchTerm = searchInput.value.trim().toLowerCase();
  const activeCategory = document.querySelector('.filter-btn.active').dataset.filter;
  const sortValue = sortSelect.value;

  let visibleItems = originalOrder.filter(item => {
    const matchesCategory = activeCategory === 'all' || item.dataset.category === activeCategory;
    const matchesSearch = getTitle(item).toLowerCase().includes(searchTerm);
    return matchesCategory && matchesSearch;
  });

  if (sortValue === 'name-asc') {
    visibleItems.sort((a, b) => getTitle(a).localeCompare(getTitle(b)));
  } else if (sortValue === 'name-desc') {
    visibleItems.sort((a, b) => getTitle(b).localeCompare(getTitle(a)));
  } else if (sortValue === 'category') {
    visibleItems.sort((a, b) => a.dataset.category.localeCompare(b.dataset.category));
  }

  originalOrder.forEach(item => item.closest('.photo-card').style.display = 'none');
  visibleItems.forEach(item => {
    item.closest('.photo-card').style.display = 'block';
    galleryEl.appendChild(item.closest('.photo-card'));
  });

  photoCount.textContent = `${visibleItems.length} item${visibleItems.length !== 1 ? 's' : ''}`;
  activeList = visibleItems;
}

searchInput.addEventListener('input', applyFilters);
sortSelect.addEventListener('change', applyFilters);

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    applyFilters();
  });
});

// ---- Lightbox ----
mediaItems.forEach(item => {
  item.addEventListener('click', () => {
    currentIndex = activeList.indexOf(item);
    showItem(currentIndex);
    lightbox.classList.add('active');
  });
});

function showItem(index) {
  const item = activeList[index];

  lightboxVideo.pause();
  lightboxVideo.classList.remove('active');
  lightboxImg.style.display = 'none';

  if (item.tagName === 'IMG') {
    lightboxImg.src = item.src.replace('400/300', '1000/700');
    lightboxImg.style.display = 'block';
  } else {
    const sourceUrl = item.querySelector('source').src;
    lightboxVideo.src = sourceUrl;
    lightboxVideo.classList.add('active');
    lightboxVideo.play();
  }

  lightboxCounter.textContent = `${index + 1} / ${activeList.length}`;
}

closeBtn.addEventListener('click', () => {
  lightbox.classList.remove('active');
  lightboxVideo.pause();
});

nextBtn.addEventListener('click', () => {
  currentIndex = (currentIndex + 1) % activeList.length;
  showItem(currentIndex);
});

prevBtn.addEventListener('click', () => {
  currentIndex = (currentIndex - 1 + activeList.length) % activeList.length;
  showItem(currentIndex);
});

lightbox.addEventListener('click', (e) => {
  if (e.target === lightbox) {
    lightbox.classList.remove('active');
    lightboxVideo.pause();
  }
});

document.addEventListener('keydown', (e) => {
  if (!lightbox.classList.contains('active')) return;
  if (e.key === 'ArrowRight') nextBtn.click();
  if (e.key === 'ArrowLeft') prevBtn.click();
  if (e.key === 'Escape') closeBtn.click();
});

applyFilters();