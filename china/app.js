// Chinese University Entry Requirements Widget
// Consolidated single-file application

// CSS Styles
const styles = `
/* Base styles from requirements */
body {
  font-family: 'Source Sans Pro', sans-serif;
  max-width: 700px;
  margin: 2em auto;
  padding: 1em;
  line-height: 1.6;
  background-color: #F8F8F9;
  color: #333;
}

h1, h2 {
  font-family: 'Source Serif Pro', serif;
  font-weight: 700;
}

h1 {
  margin-bottom: 0;
  color: #2c3e50;
  font-size: 2.2em;
}

p {
  margin-top: 0.25rem;
  color: #5a6c7d;
}

/* Screen reader only content */
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}

/* Large column layout */
.large-8 {
  width: 100%;
  max-width: 700px;
}

/* Header styling */
header{
  margin-bottom: 2rem;
}

header p {
  font-size: 1.1em;
  margin-top: 0.5rem;
}

/* Search section */
.search-section {
  margin-bottom: 1rem;
}

.search-wrapper {
  position: relative;
  margin-bottom: 1em;
}

input[type="text"] {
  width: 100%;
  padding: 12px 45px 12px 15px;
  font-size: 16px;
  font-weight: 500;
  box-sizing: border-box;
  border: 2px solid #e2e8f0;
  border-radius: 6px;
  outline: none;
  transition: all 0.3s ease;
  background: #FEFEFE;
  font-family: 'Source Sans Pro', sans-serif;
}

input[type="text"]:focus {
  outline: 2px solid #007BFF;
  outline-offset: 1px;
  border-color: #007BFF;
  z-index: 1;
  position: relative;
}

input[type="text"]:hover {
  border-color: #cbd5e0;
}

/* Clear button */
.clear-button {
  position: absolute;
  right: 8px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  cursor: pointer;
  padding: 4px 8px;
  border-radius: 4px;
  color: #64748b;
  font-size: 18px;
  line-height: 1;
  opacity: 0;
  transition: all 0.2s ease;
  z-index: 2;
}

.clear-button:hover,
.clear-button:focus {
  background-color: #f1f5f9;
  color: #475569;
  outline: none;
}

.clear-button.show {
  opacity: 1;
}

.clear-icon {
  display: block;
  font-weight: bold;
}

/* Search button */
.search-button {
  background-color: #440099;
  color: white;
  border: none;
  padding: 12px 24px;
  font-size: 16px;
  font-weight: 600;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.2s ease;
  font-family: 'Source Sans Pro', sans-serif;
  margin-top: 1rem;
  margin-bottom: 1rem;
  width: 100%;
  box-sizing: border-box;
}

.search-button:hover {
  background-color: #2d0066;
}

.search-button:focus {
  outline: 2px solid #007BFF;
  outline-offset: 2px;
}

.search-button:active {
  background-color: #1a0033;
}

/* Search help text */
.search-help {
  font-size: 0.9em;
  color: #64748b;
  margin-top: 0.5rem;
}

/* Suggestions dropdown */
.suggestions-dropdown {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: white;
  border: 2px solid #e2e8f0;
  border-top: none;
  border-radius: 0 0 6px 6px;
  max-height: 300px;
  overflow-y: auto;
  z-index: 1000;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  scrollbar-width: none;
  -ms-overflow-style: none;
}

.suggestions-dropdown::-webkit-scrollbar {
  display: none;
}

.suggestions-dropdown::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 20px;
  background: linear-gradient(transparent, rgba(255, 255, 255, 0.6));
  pointer-events: none;
  opacity: 0;
  transition: opacity 0.2s ease;
  z-index: 1;
}

.suggestions-dropdown.has-more-content::after {
  opacity: 1;
}

.suggestion-item {
  padding: 12px 15px;
  cursor: pointer;
  border-bottom: 1px solid #f1f5f9;
  transition: background-color 0.2s ease;
  font-size: 15px;
  color: #1e293b;
  position: relative;
  z-index: 1;
}

.suggestion-item:last-child {
  border-bottom: none;
}

.suggestion-item:hover,
.suggestion-item.highlighted {
  background-color: #f8fafc;
}

.suggestion-item:focus,
.suggestion-item.selected {
  background-color: #440099 !important;
  color: white !important;
  outline: none;
  transition: background-color 0.2s ease;
  position: relative;
  z-index: 2;
}

.suggestion-item.selected * {
  color: white !important;
}

.suggestion-item .match {
  font-weight: 600;
  background-color: #fef3c7;
  padding: 1px 2px;
  border-radius: 2px;
}

.suggestion-item.selected .match {
  background-color: #440099;
  color: white !important;
  font-weight: 700;
}

/* No results state */
.no-results {
  text-align: center;
  padding: 2rem;
  color: #64748b;
  background: white;
  border-radius: 8px;
  border: 2px solid #f1f5f9;
}

/* Results display */
.results {
  animation: fadeIn 0.3s ease-in;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

.result-card {
  background: white;
  border-radius: 8px;
  padding: 0;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  border: 2px solid #C6BBFF;
  margin-top: 1.5rem;
  max-width: 100%;
  overflow: hidden;
}

.university-header {
  padding-top: 1.5rem;
  padding-left: 1.5rem;
  padding-right: 1.5rem;
  color: white;
}

.university-name {
  color: #2b353e;
  font-size: 1.3em;
  margin: 0;
  line-height: 1.4;
  font-family: 'Source Serif Pro', serif;
}

.university-name .chinese-name {
  font-size: 0.9em;
  color: #2b353e;
  font-weight: 400;
  margin-top: 0.5rem;
  display: block;
}

.grade-section {
  padding-bottom: 0;
  padding-left: 1.5rem;
  padding-right: 1.5rem;  
}

.grade-section-title {
  font-family: 'Source Serif Pro', serif;
  font-size: 1.2em;
  font-weight: 700;
  color: #1e293b;
  margin-bottom: 1rem;
}

.grade-info {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.grade-item {
  background: #f8fafc;
  padding: 1.25rem;
  border-radius: 6px;
  border-left: 3px solid #C6BBFF;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  transition: all 0.2s ease;
}

.grade-item:hover {
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
  transform: translateY(-1px);
}

h4.grade-label {
  font-size: 1em;
  font-weight: 600;
  color: #374151;
  margin-bottom: 0.5rem;
}

.grade-value {
  font-size: 1.2em;
  font-weight: 700;
  color: #1e293b;
}

.additional-info {
  display: none;
  // padding: 1.5rem;
  padding-top: 0;
  padding-bottom: 1.5rem;
  padding-left: 1.5rem;
  padding-right: 1.5rem;
  position: relative;
}

// .additional-info::before {
//   content: '';
//   position: absolute;
//   top: 0;
//   left: 2rem;
//   right: 2rem;
//   height: 1px;
//   background-color: #e5e7eb;
// }

.additional-info.has-content {
  display: block;
}

.info-label {
  font-family: 'Source Serif Pro', serif;
  font-size: 1.2em;
  font-weight: 700;
  color: #374151;
  margin-bottom: 0.75rem;
}

.cta-button {
  background-color: #9ADBEB;
  color: #2B353E;
  border: none;
  padding: 12px 16px;
  font-size: 14px;
  font-weight: 700;
  cursor: pointer;
  transition: background-color 0.2s ease;
  font-family: 'Source Sans Pro', sans-serif;
  margin-top: 1rem;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  border-radius: 0;
  text-align: left;
  text-decoration: none;
  width: fit-content;
}

.cta-button:hover {
  background-color: #7AC8D8;
}

.cta-button:focus {
  outline: 2px solid #2B353E;
  outline-offset: 2px;
}

.cta-arrow {
  width: 16px;
  height: 16px;
  background-image: url("data:image/svg+xml;utf8,%3Csvg%20xmlns=%22http://www.w3.org/2000/svg%22%20viewBox=%220%200%20448%20512%22%3E%3Cpath%20d=%22M190.5%2066.9l22.2-22.2c9.4-9.4%2024.6-9.4%2033.9%200L441%20239c9.4%209.4%209.4%2024.6%200%2033.9L246.6%20467.3c-9.4%209.4-24.6%209.4-33.9%200l-22.2-22.2c-9.5-9.5-9.3-25%20.4-34.3L311.4%20296H24c-13.3%200-24-10.7-24-24v-32c0-13.3%2010.7-24%2024-24h287.4L190.9%20101.2c-9.8-9.3-10-24.8-.4-34.3z%22/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center;
}

.info-content {
  font-size: 1em;
  color: #4b5563;
  line-height: 1.6;
  word-wrap: break-word; /* Add word wrapping for long URLs */
  overflow-wrap: break-word; /* Modern property for better word breaking */
  hyphens: auto; /* Add hyphenation for better text flow */
}

.info-content:empty {
  display: none;
}

.info-content:empty + .info-label {
  display: none;
}

.info-content ul {
  margin: 0.5rem 0;
  padding-left: 1.5rem;
}

.info-content li {
  margin-bottom: 0.25rem;
  line-height: 1.5;
  word-wrap: break-word; /* Ensure list items wrap properly */
  overflow-wrap: break-word;
}

.info-link {
  color: #440099;
  text-decoration: underline;
  transition: color 0.2s ease;
  word-break: break-all; /* Break long URLs to prevent overflow */
}

.info-link:hover {
  color: #2d0066;
  text-decoration: none;
}

.info-link:focus {
  outline: 2px solid #440099;
  outline-offset: 2px;
  border-radius: 2px;
}

/* Responsive design */
@media (max-width: 768px) {
  body {
    margin: 1em auto;
    padding: 0.5em;
  }
  
  .grade-info {
    grid-template-columns: 1fr;
    gap: 0.75rem;
  }

  .grade-value {
    font-size: 1.4em;
  }
  
  .grade-item {
    padding: 1rem;
  }
  
  .university-name {
    font-size: 1.4em;
  }
  
  .university-name .chinese-name {
    font-size: 0.9em;
  }
  
  .grade-section-title {
    font-size: 1.3em;
  }
  
  .info-label {
    font-size: 1.3em;
  }
  
  .result-card {
    margin-top: 1rem;
  }
  
  .search-button {
    margin-top: 1rem;
    margin-bottom: 0.5rem;
  }
  
  input[type="text"] {
    font-size: 16px; /* Prevent zoom on iOS */
  }
}

@media (max-width: 480px) {
  body {
    padding: 0.75em; 
  }
  
  .university-header,
  .grade-section,
  .additional-info {
    padding-left: 1.5rem; 
    padding-right: 1.5rem;
  }
  
  h1 {
    font-size: 1.6em;
  }
  
  .grade-item {
    padding: 0.75rem;
  }
  
  .grade-value {
    font-size: 1.3em;
  }

  .university-name {
    font-size: 1.3em;
  }
  
  .university-name .chinese-name {
    font-size: 0.85em;
  }
  
  .grade-section-title {
    font-size: 1.2em;
  }
  
  .info-label {
    font-size: 1.2em;
  }
  
  .result-card {
    margin-top: 0.75rem;
  }
  
  .search-button {
    margin-top: 0.75rem;
    margin-bottom: 0.5rem;
  }
  
  .suggestions-dropdown {
    max-height: 200px;
  }
}

/* High contrast mode support */
@media (prefers-contrast: high) {
  input[type="text"] {
    border-color: #000;
  }
  
  input[type="text"]:focus {
    outline: 3px solid #000;
    border-color: #000;
  }
  
  .suggestion-item:focus,
  .suggestion-item.selected {
    background-color: #000;
    color: #fff;
  }
}

/* Reduced motion support */
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
  
  .loading-spinner {
    animation: none;
  }
}

/* Focus visible for better keyboard navigation */
*:focus-visible {
  outline: 2px solid #007BFF;
  outline-offset: 2px;
}

/* Add more aggressive mobile optimizations */
@media (max-width: 375px) {
  body {
    margin: 0.5em auto;
    padding: 0.5em; 
  }
  
  .university-header,
  .grade-section,
  .additional-info {
    padding-left: 1.25rem; 
    padding-right: 1.25rem;
  }
  
  .grade-item {
    padding: 0.75rem;
  }
  
  .result-card {
    margin-top: 0.5rem;
  }
  
  h1 {
    font-size: 1.4em;
  }
  
  .university-name {
    font-size: 1.2em;
  }
  
  .grade-section-title,
  .info-label {
    font-size: 1.1em;
  }
}

/* Improve touch targets */
@media (max-width: 768px) {
  .search-button {
    min-height: 44px; /* Keep search button at 44px for accessibility */
    padding: 12px 20px;
  }
  
  .cta-button {
    min-height: 36px; 
    padding: 8px 16px;
    font-size: 14px; 
  }
  
  .suggestion-item {
    min-height: 44px;
    padding: 12px 15px;
  }
}
`;

// Inject CSS into the document
const styleSheet = document.createElement("style");
styleSheet.textContent = styles;
document.head.appendChild(styleSheet);

// University Search Widget Class
class UniversitySearchWidget {
    constructor() {
        this.universities = [];
        this.suggestions = [];
        this.currentSelection = -1;
        this.searchTimeout = null;
        this.lastSearchQuery = '';
        
        this.elements = {
            searchInput: document.getElementById('university-search'),
            clearButton: document.getElementById('clear-search'),
            searchButton: document.getElementById('search-button'),
            suggestionsDropdown: document.getElementById('suggestions-dropdown'),
            results: document.getElementById('results'),
            noResults: document.getElementById('no-results'),
            universityName: document.getElementById('university-name'),
            grade21: document.getElementById('grade-2-1'),
            grade22: document.getElementById('grade-2-2'),
            infoContent: document.getElementById('info-content'),
            ctaButton: document.getElementById('cta-button')
        };
        
        this.init();
    }
    
    async init() {
        await this.loadUniversities();
        this.bindEvents();
    }
    
    async loadUniversities() {
        try {
            const response = await fetch('universities.csv?v=' + Date.now());
            const csvText = await response.text();
            
            this.universities = this.parseCSV(csvText);
        } catch (error) {
            console.error('Error loading universities:', error);
            this.showError('Failed to load university data. Please refresh the page.');
        }
    }
    
    parseCSVLine(line) {
        const result = [];
        let current = '';
        let inQuotes = false;
        
        for (let i = 0; i < line.length; i++) {
            const char = line[i];
            
            if (char === '"') {
                inQuotes = !inQuotes;
            } else if (char === ',' && !inQuotes) {
                result.push(current.trim());
                current = '';
            } else {
                current += char;
            }
        }
        
        result.push(current.trim());
        return result;
    }
    

    
    parseCSV(csvText) {
        const lines = csvText.split('\n');
        const headers = this.parseCSVLine(lines[0]);
        const universities = [];
        
        let i = 1;
        while (i < lines.length) {
            const line = lines[i].trim();
            if (line) {
                // Check if this line starts a quoted field
                if (line.includes('"') && !line.includes('","')) {
                    // This is a multi-line quoted field, need to find the end
                    let fullLine = line;
                    let quoteCount = (line.match(/"/g) || []).length;
                    let j = i + 1;
                    
                    // Continue until we find the closing quote
                    while (j < lines.length && quoteCount % 2 !== 0) {
                        fullLine += '\n' + lines[j];
                        quoteCount += (lines[j].match(/"/g) || []).length;
                        j++;
                    }
                    
                    const values = this.parseCSVLine(fullLine);
                    if (values.length === headers.length) {
                        const university = {};
                        headers.forEach((header, index) => {
                            university[header] = values[index];
                        });
                        universities.push(university);
                    }
                    
                    i = j; // Skip the lines we've already processed
                } else {
                    // Regular single-line entry
                    const values = this.parseCSVLine(line);
                    if (values.length === headers.length) {
                        const university = {};
                        headers.forEach((header, index) => {
                            university[header] = values[index];
                        });
                        universities.push(university);
                    }
                    i++;
                }
            } else {
                i++;
            }
        }
        
        return universities;
    }
    
    bindEvents() {
        this.elements.searchInput.addEventListener('input', (e) => this.handleInput(e));
        this.elements.searchInput.addEventListener('keydown', (e) => this.handleKeyDown(e));
        this.elements.searchInput.addEventListener('focus', () => this.handleFocus());
        this.elements.searchInput.addEventListener('blur', (e) => this.handleBlur(e));
        
        this.elements.clearButton.addEventListener('click', () => this.clearSearch());
        this.elements.searchButton.addEventListener('click', () => this.handleSearchButton());
        
        document.addEventListener('click', (e) => this.handleOutsideClick(e));
        
        // Clear button visibility
        this.elements.searchInput.addEventListener('input', () => {
            if (this.elements.searchInput.value.length > 0) {
                this.elements.clearButton.classList.add('show');
            } else {
                this.elements.clearButton.classList.remove('show');
            }
        });
    }
    
    handleInput(e) {
        const query = e.target.value.trim();
        
        // Clear any existing timeout
        if (this.searchTimeout) {
            clearTimeout(this.searchTimeout);
        }
        
        // Hide clear button if input is empty
        if (query.length === 0) {
            this.elements.clearButton.classList.remove('show');
            this.hideSuggestions();
            this.hideResults();
            this.hideNoResults();
            return;
        }
        
        // Show clear button
        this.elements.clearButton.classList.add('show');
        
        // Debounce search
        this.searchTimeout = setTimeout(() => {
            if (query.length >= 1) {
                this.search(query);
            } else {
                this.hideSuggestions();
            }
        }, 300);
    }
    
    handleKeyDown(e) {
        const items = this.elements.suggestionsDropdown.querySelectorAll('.suggestion-item');
        
        switch (e.key) {
            case 'ArrowDown':
                e.preventDefault();
                this.navigateDown();
                break;
            case 'ArrowUp':
                e.preventDefault();
                this.navigateUp();
                break;
            case 'Enter':
                e.preventDefault();
                if (this.currentSelection >= 0 && this.currentSelection < items.length) {
                    this.selectSuggestion(this.currentSelection);
                } else {
                    this.handleSearchButton();
                }
                break;
            case 'Escape':
                this.hideSuggestions();
                this.elements.searchInput.blur();
                break;
        }
    }
    
    handleFocus() {
        if (this.elements.searchInput.value.trim().length >= 2) {
            this.showSuggestions();
        }
    }
    
    handleBlur(e) {
        // Delay hiding to allow for clicks on suggestions
        setTimeout(() => {
            if (!this.elements.suggestionsDropdown.contains(e.relatedTarget)) {
                this.hideSuggestions();
            }
        }, 150);
    }
    
    handleOutsideClick(e) {
        if (!this.elements.searchInput.contains(e.target) && 
            !this.elements.suggestionsDropdown.contains(e.target)) {
            this.hideSuggestions();
        }
    }
    
    search(query) {
        this.suggestions = this.fuzzySearch(query);
        
        if (this.suggestions.length > 0) {
            this.showSuggestions();
            this.hideNoResults();
        } else {
            this.hideSuggestions();
            this.showNoResults();
        }
    }
    
    fuzzySearch(query) {
        const normalizedQuery = query.toLowerCase().trim();
        const words = normalizedQuery.split(/\s+/);
        
        return this.universities.filter(university => {
            const englishName = university['Name of Institution (English)'].toLowerCase();
            const chineseName = university['Name of Institution (Chinese)'].toLowerCase();
            
            return words.every((word, index) => {
                // First word must start with the search term
                if (index === 0) {
                    return englishName.startsWith(word) || chineseName.startsWith(word);
                }
                // Subsequent words can be anywhere in the name
                return englishName.includes(word) || chineseName.includes(word);
            });
        }).sort((a, b) => {
            const aName = a['Name of Institution (English)'].toLowerCase();
            const bName = b['Name of Institution (English)'].toLowerCase();
            
            // Sort by relevance (exact matches first, then partial matches)
            const aExact = aName.startsWith(normalizedQuery);
            const bExact = bName.startsWith(normalizedQuery);
            
            if (aExact && !bExact) return -1;
            if (!aExact && bExact) return 1;
            
            return aName.localeCompare(bName);
        });
    }
    
    showSuggestions() {
        this.currentSelection = -1;
        this.elements.suggestionsDropdown.innerHTML = '';
        
        this.suggestions.forEach((university, index) => {
            const item = document.createElement('div');
            item.className = 'suggestion-item';
            item.setAttribute('role', 'option');
            item.setAttribute('id', `suggestion-${index}`);
            item.setAttribute('aria-selected', 'false');
            item.textContent = `${university['Name of Institution (English)']} (${university['Name of Institution (Chinese)']})`;
            
            // Highlight matching text
            this.highlightMatches(item, this.elements.searchInput.value.trim());
            
            item.addEventListener('click', () => this.selectSuggestion(index));
            item.addEventListener('mouseenter', () => this.highlightSuggestion(index));
            
            this.elements.suggestionsDropdown.appendChild(item);
        });
        
        this.elements.suggestionsDropdown.hidden = false;
        this.elements.searchInput.setAttribute('aria-expanded', 'true');
        
        // Add gradient indicator if there are many items
        if (this.suggestions.length > 8) {
            this.elements.suggestionsDropdown.classList.add('has-more-content');
        } else {
            this.elements.suggestionsDropdown.classList.remove('has-more-content');
        }
        
        // Add scroll event listener to update gradient indicator
        this.elements.suggestionsDropdown.addEventListener('scroll', () => {
            this.updateGradientIndicator();
        });
    }
    
    updateGradientIndicator() {
        const dropdown = this.elements.suggestionsDropdown;
        const isAtBottom = dropdown.scrollTop + dropdown.clientHeight >= dropdown.scrollHeight - 5;
        
        if (isAtBottom) {
            dropdown.classList.remove('has-more-content');
        } else if (this.suggestions.length > 8) {
            dropdown.classList.add('has-more-content');
        }
    }
    
    hideSuggestions() {
        this.elements.suggestionsDropdown.hidden = true;
        this.elements.searchInput.setAttribute('aria-expanded', 'false');
        this.currentSelection = -1;
    }
    
    highlightMatches(element, query) {
        const text = element.textContent;
        const normalizedQuery = query.toLowerCase();
        const words = normalizedQuery.split(/\s+/);
        
        let highlightedText = text;
        words.forEach(word => {
            if (word.length > 1) {
                const regex = new RegExp(`(${this.escapeRegExp(word)})`, 'gi');
                highlightedText = highlightedText.replace(regex, '<span class="match">$1</span>');
            }
        });
        
        element.innerHTML = highlightedText;
    }
    
    escapeRegExp(string) {
        return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    }
    
    convertUrlsToLinks(text) {
        // Regular expression to match URLs starting with www.
        const urlRegex = /(www\.[^\s]+)/g;
        
        return text.replace(urlRegex, (match) => {
            // Add https:// if the URL doesn't already have a protocol
            const url = match.startsWith('http') ? match : `https://${match}`;
            return `<a href="${url}" target="_blank" rel="noopener noreferrer" class="info-link">${match}</a>`;
        });
    }
    
    formatAdditionalInfo(text) {
        // Remove the specific text about English language requirements
        let cleanedText = text.replace(/Please see www\.sheffield\.ac\.uk\/postgraduate\/english-language for further information\./gi, '');
        
        // First convert URLs to links
        let formattedText = this.convertUrlsToLinks(cleanedText);
        
        // Convert bullet points (lines starting with -) to proper HTML lists
        const lines = formattedText.split('\n');
        let inList = false;
        let formattedLines = [];
        
        for (let i = 0; i < lines.length; i++) {
            const line = lines[i].trim();
            
            if (line.startsWith('- ')) {
                // Start a list if we haven't already
                if (!inList) {
                    formattedLines.push('<ul>');
                    inList = true;
                }
                // Add the list item (remove the "- " prefix)
                formattedLines.push(`<li>${line.substring(2)}</li>`);
            } else if (line === '') {
                // Empty line - close list if we're in one, but don't add <br> if we're about to start a new list
                if (inList) {
                    formattedLines.push('</ul>');
                    inList = false;
                }
                // Only add <br> if the next non-empty line doesn't start with a bullet point
                let nextNonEmptyLine = '';
                for (let k = i + 1; k < lines.length; k++) {
                    if (lines[k].trim() !== '') {
                        nextNonEmptyLine = lines[k].trim();
                        break;
                    }
                }
                if (nextNonEmptyLine && !nextNonEmptyLine.startsWith('- ')) {
                    formattedLines.push('<br>');
                }
            } else {
                // Regular text - close list if we're in one, then add the text
                if (inList) {
                    formattedLines.push('</ul>');
                    inList = false;
                }
                formattedLines.push(line);
            }
        }
        
        // Close any open list
        if (inList) {
            formattedLines.push('</ul>');
        }
        
        const result = formattedLines.join('\n');
        return result;
    }
    
    navigateDown() {
        const items = this.elements.suggestionsDropdown.querySelectorAll('.suggestion-item');
        if (items.length === 0) return;
        
        // If no selection or at the end, start from the beginning
        if (this.currentSelection < 0 || this.currentSelection >= items.length - 1) {
            this.currentSelection = 0;
        } else {
            this.currentSelection = this.currentSelection + 1;
        }
        
        this.highlightSuggestion(this.currentSelection);
    }
    
    navigateUp() {
        const items = this.elements.suggestionsDropdown.querySelectorAll('.suggestion-item');
        if (items.length === 0) return;
        
        // If no selection or at the beginning, go to the end
        if (this.currentSelection <= 0) {
            this.currentSelection = items.length - 1;
        } else {
            this.currentSelection = this.currentSelection - 1;
        }
        
        this.highlightSuggestion(this.currentSelection);
    }
    
    highlightSuggestion(index) {
        const items = this.elements.suggestionsDropdown.querySelectorAll('.suggestion-item');
        
        // Remove previous selection
        items.forEach(item => {
            item.classList.remove('selected');
            item.setAttribute('aria-selected', 'false');
        });
        
        // Add selection to current item
        if (index >= 0 && index < items.length) {
            const selectedItem = items[index];
            selectedItem.classList.add('selected');
            selectedItem.setAttribute('aria-selected', 'true');
            this.scrollToItem(selectedItem);
        }
        
        this.currentSelection = index;
    }
    
    scrollToItem(item) {
        item.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
    }
    
    selectSuggestion(index) {
        const selectedUniversity = this.suggestions[index];
        if (!selectedUniversity) return;
        
        const englishName = selectedUniversity['Name of Institution (English)'];
        const chineseName = selectedUniversity['Name of Institution (Chinese)'];
        this.elements.searchInput.value = `${englishName} (${chineseName})`;
        
        this.hideSuggestions();
        this.showResults(selectedUniversity);
        this.hideNoResults();
        
        // Announce result to screen readers
        this.announceResult(selectedUniversity);
    }
    
    showResults(university) {
        // Display both English and Chinese names
        const englishName = university['Name of Institution (English)'];
        const chineseName = university['Name of Institution (Chinese)'];
        this.elements.universityName.innerHTML = `${englishName}<span class="chinese-name">${chineseName}</span>`;
        
        this.elements.grade21.textContent = university['Grade Equivalent to UK 2:1'] || 'Not available';
        this.elements.grade22.textContent = university['Grade Equivalent to UK 2:2'] || 'Not available';
        
        const additionalInfo = university['Additional Information'] || '';
        const additionalInfoElement = document.getElementById('additional-info');
        
        if (additionalInfo.trim()) {
            // Format additional info with proper bullet points and links
            const formattedInfo = this.formatAdditionalInfo(additionalInfo);
            this.elements.infoContent.innerHTML = formattedInfo;
            additionalInfoElement.classList.add('has-content');
            // Show CTA button for universities with additional information
            this.elements.ctaButton.hidden = false;
        } else {
            additionalInfoElement.classList.remove('has-content');
            // Hide CTA button for universities without additional information
            this.elements.ctaButton.hidden = true;
        }
        
        this.elements.results.hidden = false;
        this.elements.results.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
    
    hideResults() {
        this.elements.results.hidden = true;
    }
    
    handleSearchButton() {
        let query = this.elements.searchInput.value.trim();
        
        // Extract English name if the query contains the format "English Name (Chinese Name)"
        if (query.includes('(') && query.includes(')')) {
            const englishName = query.split('(')[0].trim();
            query = englishName;
        }
        
        if (query.length >= 1) {
            // If we already have results displayed and the query hasn't changed, don't search again
            if (this.elements.results.hidden === false && this.lastSearchQuery === this.elements.searchInput.value.trim()) {
                return;
            }
            this.lastSearchQuery = this.elements.searchInput.value.trim();
            
            // Perform the search
            const searchResults = this.fuzzySearch(query);
            
            if (searchResults.length > 0) {
                // If we have results, show the first one
                this.showResults(searchResults[0]);
                this.hideSuggestions();
                this.hideNoResults();
            } else {
                // If no results, show no results message
                this.showNoResults();
                this.hideSuggestions();
                this.hideResults();
            }
        }
    }
    
    showNoResults() {
        this.elements.noResults.hidden = false;
        this.hideResults();
    }
    
    hideNoResults() {
        this.elements.noResults.hidden = true;
    }
    
    showError(message) {
        this.elements.noResults.querySelector('p').textContent = message;
        this.showNoResults();
    }
    
    clearSearch() {
        this.elements.searchInput.value = '';
        this.elements.clearButton.classList.remove('show');
        this.hideSuggestions();
        this.hideResults();
        this.hideNoResults();
        this.lastSearchQuery = '';
        
        // Return focus to search input
        this.elements.searchInput.focus();
        
        // Clear any pending searches
        if (this.searchTimeout) {
            clearTimeout(this.searchTimeout);
        }
    }
    
    announceResult(university) {
        const englishName = university['Name of Institution (English)'];
        const chineseName = university['Name of Institution (Chinese)'];
        const announcement = `Selected ${englishName} (${chineseName}). Grade equivalents: 2:1 is ${university['Grade Equivalent to UK 2:1'] || 'not available'}, 2:2 is ${university['Grade Equivalent to UK 2:2'] || 'not available'}.`;
        
        // Create a temporary element for screen reader announcement
        const announcer = document.createElement('div');
        announcer.setAttribute('aria-live', 'polite');
        announcer.setAttribute('aria-atomic', 'true');
        announcer.className = 'sr-only';
        announcer.textContent = announcement;
        
        document.body.appendChild(announcer);
        
        // Remove after announcement
        setTimeout(() => {
            document.body.removeChild(announcer);
        }, 1000);
    }
}

// Initialize the widget when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => new UniversitySearchWidget());
} else {
    new UniversitySearchWidget();
} 
