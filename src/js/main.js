import AOS from 'aos';
import 'aos/dist/aos.css';
import { templates } from './templates.js';
import '../css/main.css';

// Initialize AOS library for scroll animations
document.addEventListener('DOMContentLoaded', () => {
  AOS.init({
    duration: 800,
    easing: 'ease-out',
    once: true
  });
  
  // Load templates into the template grid
  loadTemplates();
  
  // Set up event listeners
  setupEventListeners();
});

// Load templates into the grid
function loadTemplates() {
  const templateGrid = document.getElementById('template-grid');
  
  templates.forEach((template, index) => {
    const templateCard = createTemplateCard(template, index);
    templateGrid.appendChild(templateCard);
  });
}

// Create a template card element
function createTemplateCard(template, index) {
  const card = document.createElement('div');
  card.className = 'template-card bg-white rounded-lg overflow-hidden';
  card.setAttribute('data-aos', 'fade-up');
  card.setAttribute('data-aos-delay', (index * 100).toString());
  
  card.innerHTML = `
    <div class="relative overflow-hidden h-48">
      <img 
        src="${template.image}" 
        alt="${template.title}" 
        class="template-card-image w-full h-full object-cover object-top transition-transform"
      >
      <div class="absolute bottom-0 left-0 p-4 w-full">
        <div class="flex space-x-2">
          ${template.tags.map(tag => `
            <span class="knowledge-tag ${getTagColor(tag.toLowerCase())}">${tag}</span>
          `).join('')}
        </div>
      </div>
    </div>
    <div class="p-6">
      <h3 class="text-xl font-bold text-gray-900 mb-2">${template.title}</h3>
      <p class="text-gray-600 mb-4">${template.description}</p>
      <div class="flex flex-wrap items-center gap-3 mt-4">
        <a 
          href="${template.demoUrl}" 
          target="_blank" 
          rel="noopener noreferrer" 
          class="text-gray-900 hover:text-gray-600 font-medium text-sm flex items-center"
        >
          View Demo
          <svg class="ml-1 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
        </a>
        ${template.originalTemplateUrl ? `
        <a 
          href="${template.originalTemplateUrl}" 
          target="_blank" 
          rel="noopener noreferrer" 
          class="text-gray-900 hover:text-gray-600 font-medium text-sm flex items-center"
        >
          Cloned Template
          <svg class="ml-1 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
        </a>
        ` : ''}
        <a 
          href="${template.githubUrl}" 
          target="_blank" 
          rel="noopener noreferrer" 
          class="text-gray-500 hover:text-gray-900"
        >
          <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
          </svg>
        </a>
      </div>
    </div>
  `;
  
  return card;
}

// Get appropriate color class for a tag
function getTagColor(tag) {
  // Always return the same class for all tags to maintain black and white scheme
  return 'knowledge-tag-blue';
}

// Set up event listeners
function setupEventListeners() {
  // Smooth scrolling for navigation links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        window.scrollTo({
          top: target.offsetTop - 80, // Offset for fixed header
          behavior: 'smooth'
        });
      }
    });
  });
  
  // Mobile menu toggle if needed
  const mobileMenuButton = document.getElementById('mobile-menu-button');
  const mobileMenu = document.getElementById('mobile-menu');
  
  if (mobileMenuButton && mobileMenu) {
    mobileMenuButton.addEventListener('click', () => {
      mobileMenu.classList.toggle('hidden');
    });
  }
}

// Handle scroll events for sticky header
let lastScrollY = 0;
window.addEventListener('scroll', () => {
  const header = document.querySelector('nav');
  if (!header) return;
  
  const scrollY = window.scrollY;
  
  if (scrollY > 100) {
    header.classList.add('bg-white', 'shadow-sm');
  } else {
    header.classList.remove('bg-white', 'shadow-sm');
  }
  
  lastScrollY = scrollY;
});