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
      
      <hr class="my-3 border-gray-200" />
      
      <div class="flex items-center gap-2 mt-3 justify-between">
        <a 
          href="${template.demoUrl}" 
          target="_blank" 
          rel="noopener noreferrer" 
          class="flex-1 flex items-center justify-center py-2 bg-gray-800 hover:bg-gray-900 text-white rounded text-sm font-medium transition-all duration-200 shadow-sm hover:shadow-md hover:-translate-y-0.5"
        >
          View Demo
        </a>
        
        ${template.originalTemplateUrl ? `
        <a 
          href="${template.originalTemplateUrl}" 
          target="_blank" 
          rel="noopener noreferrer" 
          class="flex-1 flex items-center justify-center py-1.5 bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded text-sm font-medium text-gray-700 transition-colors"
        >
          Cloned
        </a>
        ` : ``}
        
        <a 
          href="${template.githubUrl}" 
          target="_blank" 
          rel="noopener noreferrer" 
          class="flex-1 flex items-center justify-center py-1.5 bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded text-sm font-medium text-gray-700 transition-colors"
        >
          GitHub
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