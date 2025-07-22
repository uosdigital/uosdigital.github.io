// EventWidget Complete Bundle
// All dependencies and initialization inlined for single-file deployment

/**
 * Event Widget Utility Functions
 */
function parseCSV(csvText) {
    const lines = csvText.trim().split('\n');
    const headers = parseCSVLine(lines[0]).map(h => h.replace(/"/g, '').trim());
    const events = [];
    for (let i = 1; i < lines.length; i++) {
        const values = parseCSVLine(lines[i]);
        if (values.length === headers.length) {
            const event = {};
            headers.forEach((header, index) => {
                event[header] = values[index];
            });
            event.is_visible = event.is_visible === 'true';
            if (event.is_visible) {
                // Pre-format the date for better performance
                event.formattedDate = formatDate(event.Date);
                // Add unique ID for better DOM manipulation
                event.id = `event-${i}`;
                events.push(event);
            }
        }
    }
    return events;
}

function parseCSVLine(line) {
    const values = [];
    let current = '';
    let inQuotes = false;
    for (let i = 0; i < line.length; i++) {
        const char = line[i];
        const nextChar = line[i + 1];
        if (char === '"' && inQuotes && nextChar === '"') {
            current += '"';
            i++;
        } else if (char === '"') {
            inQuotes = !inQuotes;
        } else if (char === ',' && !inQuotes) {
            values.push(current.trim());
            current = '';
        } else {
            current += char;
        }
    }
    values.push(current.trim());
    return values;
}

// Cache date formatting options for better performance
const dateFormatOptions = { 
    weekday: 'short', 
    year: 'numeric', 
    month: 'short', 
    day: 'numeric' 
};

function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB', dateFormatOptions);
}

function injectStyles(cssStyles) {
    const styleId = 'event-widget-styles';
    if (!document.getElementById(styleId)) {
        const style = document.createElement('style');
        style.id = styleId;
        style.textContent = cssStyles;
        document.head.appendChild(style);
    }
}

// Cache regex pattern for better performance
const timeSplitRegex = /\s+to\s+|\s*-\s*/i;

function getStartTime(timeString) {
    if (!timeString) return '';
    // Split on 'to' or '-'
    let parts = timeString.split(timeSplitRegex);
    return parts[0].trim();
}

// CSS_STYLES (complete styling)
const CSS_STYLES = `
    @import url('https://fonts.googleapis.com/css2?family=Source+Serif+4:wght@700&family=Source+Sans+3:wght@200;300;400;600&display=swap');
    @import url('https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200');

    .event-widget {
        font-family: 'Source Sans 3', Arial, Helvetica, sans-serif;
        font-weight: 200;
        max-width: 600px;
        margin: 0 auto;
        padding: 20px;
        background: #ffffff;
        border-radius: 0;
    }

    .event-widget * {
        box-sizing: border-box;
    }

    .event-widget-header {
        margin-bottom: 30px;
        text-align: left;
    }

    .event-widget-title {
        font-family: 'Source Serif 4',serif;
        font-weight: 700;
        font-size: 1.5rem;
        color: #131E29;
        margin: 0 0 10px 0;
    }

    .event-widget-subtitle {
        font-size: 1.1rem;
        font-weight: 200;
        color: #64748b;
        margin: 0;
    }

    .event-controls {
        display: flex;
        flex-wrap: wrap;
        gap: 15px;
        margin-bottom: 30px;
        align-items: center;
        width: 100%;
    }

    .search-container {
        position: relative;
        flex: 1;
        min-width: 200px;
        max-width: 400px;
        width: 100%;
    }

    .search-input {
        width: 100%;
        padding: 12px 45px 12px 15px;
        border: 2px solid #e2e8f0;
        border-radius: 0;
        font-size: 16px;
        font-weight: 300;
        outline: none;
        transition: all 0.3s ease;
        background: #f8fafc;
    }

    .search-input:focus {
        outline: 2px solid #7000FF;
        // outline-offset: 2px;
        // border-color: #7000FF;
        // box-shadow: 0 0 0 2px rgba(112, 0, 255, 0.1);
    }

    .search-clear {
        position: absolute;
        right: 15px;
        top: 50%;
        transform: translateY(-50%);
        background: none;
        border: none;
        font-size: 20px;
        color: #94a3b8;
        cursor: pointer;
        padding: 0;
        line-height: 1;
        transition: color 0.2s ease;
        display: none;
    }

    .search-clear:hover {
        color: #64748b;
    }

    .search-clear:focus {
        outline: 2px solid #7000FF;
        outline-offset: 2px;
        background: #f1f5f9;
        color: #24125E;
    }
    
    .autocomplete-container {
        position: absolute;
        top: 100%;
        left: 0;
        right: 0;
        background: #ffffff;
        border: 1px solid #cbd5e1;
        background-color: #ffffff;
        border-top: none;
        padding-bottom: 10px;
        max-height: 250px;
        overflow-y: auto;
        z-index: 1000;
        display: none;
        box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
    }
    
    .autocomplete-suggestion {
        padding: 10px 15px;
        cursor: pointer;
        border-bottom: 1px solid #f1f5f9;
        font-size: 14px;
        color: #374151;
        font-weight: 400;
        font-family: 'Source Sans 3', Arial, Helvetica, sans-serif;
    }
    
    .autocomplete-suggestion:hover,
    .autocomplete-suggestion.active {
        background-color:#f1f5f9;
        color: #24125E;
        border-left: 3px solid #7000FF;
        padding-left: 12px;
    }
    
    .autocomplete-suggestion:last-child {
        border-bottom: none;
    }

    .category-filter {
        padding: 12px 40px 12px 15px;
        border: 2px solid #e2e8f0;
        border-radius: 0;
        background: #f8fafc;
        font-size: 14px;
        font-weight: 200;
        cursor: pointer;
        outline: none;
        position: relative;
        appearance: none;
        min-width: 150px;
        max-width: 250px;
        height: 48px;
        background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6,9 12,15 18,9'%3e%3c/polyline%3e%3c/svg%3e");
        background-repeat: no-repeat;
        background-position: right 15px center;
        background-size: 16px;
    }

    .category-filter:hover,
    .category-filter:focus {
        border-color: #7000FF;
        background: #ffffff;
        background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6,9 12,15 18,9'%3e%3c/polyline%3e%3c/svg%3e");
        background-repeat: no-repeat;
        background-position: right 15px center;
        background-size: 16px;
    }

    .category-filter:hover,
    .category-filter:focus {
        border-color: #7000FF;
        background: #ffffff;
    }

    /* Custom dropdown styling */
    .category-filter-container {
        position: relative;
        min-width: 150px;
        max-width: 250px;
        width: 100%;
        flex: 1;
    }

    /* Native select - hidden but functional for form submission */
    .category-filter {
        width: 100%;
        padding: 12px 40px 12px 15px;
        border: 2px solid #e2e8f0;
        border-radius: 0;
        background: #f8fafc;
        font-size: 14px;
        font-weight: 200;
        cursor: pointer;
        outline: none;
        appearance: none;
        height: 48px;
        background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6,9 12,15 18,9'%3e%3c/polyline%3e%3c/svg%3e");
        background-repeat: no-repeat;
        background-position: right 15px center;
        background-size: 16px;
        /* Hide the native select visually but keep it functional */
        opacity: 0;
        position: absolute;
        pointer-events: none;
    }

    /* Custom dropdown trigger button */
    .category-filter-trigger {
        width: 100%;
        padding: 12px 40px 12px 15px;
        border: 2px solid #e2e8f0;
        border-radius: 0;
        background: #f8fafc;
        font-size: 14px;
        font-weight: 200;
        cursor: pointer;
        outline: none;
        height: 48px;
        background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6,9 12,15 18,9'%3e%3c/polyline%3e%3c/svg%3e");
        background-repeat: no-repeat;
        background-position: right 15px center;
        background-size: 16px;
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    /* Only subtle hover effect - no purple border */
    .category-filter-trigger:hover {
        background: #ffffff;
        border-color: #cbd5e1;
    }

    .category-filter-trigger:focus {
        outline: 2px solid #7000FF;
        // outline-offset: 2px;
        // border-color: #7000FF;
        background: #ffffff;
    }

    .trigger-text {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        flex: 1;
        margin-right: 10px;
    }

    /* Custom dropdown options container */
    .category-dropdown {
        position: absolute;
        top: 100%;
        left: 0;
        right: 0;
        background: #ffffff;
        border: 2px solid #e2e8f0;
        border-top: none;
        max-height: 450px;
        overflow-y: auto;
        z-index: 1000;
        display: none;
        box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
        border-radius: 0 0 4px 4px;
    }

    .category-dropdown.active {
        display: block;
    }

    .category-option {
        padding: 12px 15px;
        cursor: pointer;
        border-bottom: 1px solid #f1f5f9;
        font-size: 14px;
        color: #374151;
        font-weight: 400;
        font-family: 'Source Sans 3', Arial, Helvetica, sans-serif;
        transition: background-color 0.2s ease;
    }

    .category-option:hover {
        background-color: #f8fafc;
        color: #24125E;
    }

    .category-option.selected {
        background-color: #440099;
        color: #ffffff;
    }

    .category-option.focused {
        background-color: #f1f5f9;
        color: #24125E;
        outline: 2px solid #7000FF;
        outline-offset: -2px;
        position: relative;
    }

    /* Enhanced focus indicator for better visibility */
    .category-option.focused::before {
        content: '';
        position: absolute;
        left: 0;
        top: 0;
        bottom: 0;
        width: 4px;
        background-color: #7000FF;
    }

    /* Focused state takes precedence over selected state */
    .category-option.focused.selected {
        background-color: #f1f5f9;
        color: #24125E;
        outline: 2px solid #7000FF;
        outline-offset: -2px;
    }

    /* Enhanced focus indicator for selected focused state */
    .category-option.focused.selected::before {
        content: '';
        position: absolute;
        left: 0;
        top: 0;
        bottom: 0;
        width: 4px;
        background-color: #7000FF;
    }

    .category-option:last-child {
        border-bottom: none;
    }

    /* Scrollbar styling for dropdown */
    .category-dropdown::-webkit-scrollbar {
        width: 6px;
    }

    .category-dropdown::-webkit-scrollbar-track {
        background: #f1f5f9;
    }

    .category-dropdown::-webkit-scrollbar-thumb {
        background: #cbd5e1;
        border-radius: 3px;
    }

    .category-dropdown::-webkit-scrollbar-thumb:hover {
        background: #94a3b8;
    }

    .events-grid {
        display: flex;
        flex-direction: column;
        gap: 15px;
        margin-bottom: 30px;
    }

    .event-card {
        background: #ffffff;
        border-radius: 0;
        padding: 0;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        transition: all 0.3s ease;
        cursor: pointer;
        overflow: hidden;
        border: 1px solid #e2e8f0;
        display: flex;
        flex-direction: row;
        min-height: 120px;
        width: 100%;
        max-width: 720px;
        box-sizing: border-box;
    }

    .event-card:hover {
        transform: translateY(-5px);
        box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
    }

    .event-card:focus {
        outline: 2px solid #7000FF;
        outline-offset: 2px;
        transform: translateY(-2px);
        box-shadow: 0 8px 25px -5px rgba(0, 0, 0, 0.1), 0 4px 10px -5px rgba(0, 0, 0, 0.04);
    }

    .event-card:focus:not(:focus-visible) {
        outline: none;
        transform: none;
        box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
    }

    .event-content {
        padding: 30px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        height: 100%;
        flex: 1;
    }

    .event-category {
        margin-bottom: 10px;
        display: inline-block;
        padding: 6px 16px;
        font-size: 14px;
        font-weight: 600;
        border-radius: 16px;
        width: fit-content;
    }

    .event-category.oncampus {
        background: #C6BBFF;
        color: #24125E;
    }

    .event-category.online {
        background: #9ADBE8;
        color: #131E29;
        font-family: 'Source Sans 3', sans-serif;
        font-size: 14px;
    }

    .event-subject {
        margin-bottom: 10px;
        display: inline-block;
        padding: 0;
        font-size: 14px;
        font-weight: 600;
        color: #64748b;
    }

    .event-title {
        font-family: 'Source Serif 4', serif;
        font-weight: 700;
        font-size: 18px;
        color: #1e293b;
        margin: 0 0 8px 0;
        line-height: 1.3;
        text-align: left;
    }

    .event-meta {
        display: flex;
        flex-wrap: wrap;
        gap: 12px;
        margin-bottom: 10px;
        font-size: 13px;
        font-weight: 300;
        color: #64748b;
        justify-content: flex-start;
        font-family: 'Source Sans 3', sans-serif;
    }

    .event-meta-item {
        display: flex;
        align-items: center;
        gap: 6px;
        font-family: 'Source Sans 3', sans-serif;
    }

    .event-meta-item .material-symbols-outlined {
        font-size: 16px;
        display: flex;
        align-items: center;
    }

    .event-description {
        color: #475569;
        font-family: 'Source Sans 3', sans-serif;
        font-weight: 400;
        line-height: 1.4;
        margin-bottom: 20px;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
        text-align: left;
    }

    .event-button {
        background: #440099;
        color: white;
        padding: 10px 40px;
        border: none;
        font-weight: 700;
        cursor: pointer;
        transition: all 0.3s ease;
        font-size: 14px;
        width: 100%;
        margin: 0 auto;
        display: block;
    }

    .event-button:hover {
        background: #330066;
        transform: translateY(-1px);
    }

    .event-button:focus {
        outline: 2px solid #7000FF;
        outline-offset: 2px;
        text-decoration: underline;
        text-decoration-color: white;
        text-underline-offset: 2px;
    }

    .loading {
        text-align: center;
        padding: 60px 20px;
        color: #64748b;
        font-weight: 200;
    }

    .loading-spinner {
        width: 40px;
        height: 40px;
        border: 4px solid #e2e8f0;
        border-top: 4px solid #24125E;
        border-radius: 50%;
        animation: spin 1s linear infinite;
        margin: 0 auto 20px;
    }

    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }

    .no-events {
        text-align: center;
        padding: 60px 20px;
        color: #64748b;
        font-weight: 400;
        font-family: 'Source Sans 3', sans-serif;
    }

    .no-events h3 {
        font-family: 'Source Serif 4', serif;
        font-weight: 700;
        font-size: 1.4rem;
        color: #1e293b;
        margin: 0 0 15px 0;
        line-height: 1.3;
    }

    .no-events-icon {
        font-size: 4rem;
        margin-bottom: 20px;
        opacity: 0.5;
    }

    .event-modal {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.75);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        padding: 10px;
    }

    .event-modal.active {
        opacity: 1;
        visibility: visible;
    }

    .modal-content {
        background: white;
        border-radius: 0;
        max-width: 500px;
        width: 100%;
        max-height: 90vh;
        overflow-y: auto;
        position: relative;
        transform: scale(0.9);
        transition: transform 0.3s ease;
    }
    
    @media (max-width: 768px) {
        .modal-content {
            width: 95%;
            margin: 0 auto;
            padding: 0 15px;
        }
    }

    .event-modal.active .modal-content {
        transform: scale(1);
    }

    .modal-close {
        position: absolute;
        top: 15px;
        right: 15px;
        width: 40px;
        height: 40px;
        background: #f1f5f9;
        border: none;
        border-radius: 50%;
        font-size: 20px;
        color: #64748b;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: all 0.2s ease;
        z-index: 10;
    }

    .modal-close:hover {
        background: #e2e8f0;
        color: #24125E;
    }

    .modal-close:focus {
        outline: 2px solid #7000FF !important;
        outline-offset: 2px !important;
        background: #f1f5f9 !important;
        color: #24125E !important;
        box-shadow: 0 0 0 2px #7000FF !important;
    }

    /* Enhanced focus visibility for modal close button */
    .event-modal .modal-content .modal-close:focus {
        outline: 2px solid #7000FF !important;
        outline-offset: 2px !important;
        background: #f1f5f9 !important;
        color: #24125E !important;
        box-shadow: 0 0 0 2px #7000FF !important;
    }

    .modal-body {
        padding: 20px;
    }

    .modal-category {
        display: inline-block;
        padding: 6px 16px;
        background: #C6BBFF;
        color: #24125E;
        font-size: 14px;
        font-weight: 600;
        border-radius: 16px;
        margin-bottom: 15px;
        margin-right: 10px;
    }

    .modal-category.oncampus {
        background: #C6BBFF;
        color: #24125E;
    }

    .modal-category.online {
        background: #9ADBE8;
        color: #131E29;
    }

    .modal-subject {
        font-family: 'Source Sans 3', sans-serif;
        font-size: 1.1rem;
        font-weight: 500;
        color: #64748b;
        margin-bottom: 15px;
    }

    .modal-subject.english-literature {
        background: #F8F8F9;
        border-color: #FF6371;
        color: #FF6371;
    }

    .modal-subject.languages-cultures-german {
        background: #F8F8F9;
        border-color: #981F92;
        color: #981F92;
    }

    .modal-subject.east-asian-studies {
        background: #F8F8F9;
        border-color: #005750;
        color: #005750;
    }

    .modal-subject.linguistics {
        background: #F8F8F9;
        border-color: #005A8F;
        color: #005A8F;
    }

    .modal-subject.music {
        background: #F8F8F9;
        border-color: #FF9664;
        color: #FF9664;
    }

    .modal-title {
        font-family: 'Source Serif 4', serif;
        font-weight: 700;
        font-size: 1.6rem;
        color: #1e293b;
        margin: 0 0 15px 0;
        line-height: 1.3;
        padding-right: 50px;
    }

    .modal-meta {
        display: grid;
        grid-template-columns: 1fr;
        gap: 8px;
        margin-bottom: 15px;
        padding: 12px;
        background: #f8fafc;
        border-radius: 12px;
    }

    .modal-meta-item {
        display: flex;
        align-items: center;
        gap: 6px;
        font-size: 14px;
        font-weight: 300;
        color: #475569;
        font-family: 'Source Sans 3', sans-serif;
    }

    .modal-meta-item .material-symbols-outlined {
        font-size: 16px;
        display: flex;
        align-items: center;
    }

    .modal-meta-item a {
        color: #24125E;
        text-decoration: none;
        transition: color 0.2s ease;
    }

    .modal-meta-item a:hover {
        color: #440099;
        text-decoration: underline;
    }

    .modal-description {
        color: #374151;
        font-family: 'Source Sans 3', sans-serif;
        font-weight: 400;
        line-height: 1.5;
        margin-bottom: 20px;
        font-size: 15px;
    }

    .modal-actions {
        display: flex;
        gap: 10px;
        flex-direction: column;
    }

    .modal-register-btn {
        background: #440099;
        color: white;
        padding: 12px 20px;
        border: none;
        border-radius: 0;
        font-weight: 400;
        cursor: pointer;
        transition: all 0.3s ease;
        text-decoration: none;
        display: inline-block;
        font-size: 15px;
        text-align: center;
    }

    .modal-register-btn:hover {
        background: linear-gradient(135deg, #1a0d42, #330066);
        transform: translateY(-1px);
    }

    .modal-register-btn:focus,
    .modal-share-btn:focus,
    .modal-close:focus {
        outline: 2px solid #7000FF;
        outline-offset: 2px;
    }

    .modal-share-btn {
        background: #f1f5f9;
        color: #475569;
        padding: 10px 16px;
        border: none;
        border-radius: 0;
        font-weight: 400;
        cursor: pointer;
        transition: all 0.3s ease;
        font-size: 14px;
    }

    .modal-share-btn:hover {
        background: #e2e8f0;
    }

    .modal-share-btn:focus {
        outline: 2px solid #7000FF;
        outline-offset: 2px;
        background: #f1f5f9;
        color: #24125E;
    }

    .modal-close:hover {
        background: #f1f5f9;
        color: #24125E;
    }

    .modal-close:focus {
        outline: 2px solid #7000FF !important;
        outline-offset: 2px !important;
        background: #f1f5f9 !important;
        color: #24125E !important;
        box-shadow: 0 0 0 2px #7000FF !important;
    }

    .event-count {
        color: #64748b;
        font-size: 14px;
        font-weight: 200;
        margin-bottom: 20px;
    }

    @media (max-width: 768px) {
        .event-widget {
            padding: 15px;
        }

        .event-widget-title {
            font-size: 2rem;
        }

        .events-grid {
            grid-template-columns: 1fr;
            gap: 20px;
        }

        .event-controls {
            flex-direction: column;
            align-items: stretch;
            gap: 10px;
        }

        .search-container {
            min-width: 100%;
            max-width: 100%;
            width: 100%;
        }

        .category-filter-container {
            min-width: 100%;
            max-width: 100%;
            width: 100%;
        }

        .category-filter-trigger {
            width: 100%;
            min-width: 100%;
            max-width: 100%;
        }

        .event-modal {
            padding: 5px;
        }

        .modal-content {
            max-height: 95vh;
            max-width: 100%;
        }

        .modal-body {
            padding: 16px;
        }

        .modal-title {
            font-size: 1.3rem;
            padding-right: 45px;
            margin-bottom: 12px;
        }

        .modal-subject {
            font-size: 1rem;
            margin-bottom: 12px;
        }

        .modal-close {
            top: 8px;
            right: 8px;
            width: 32px;
            height: 32px;
            font-size: 16px;
        }

        .modal-meta {
            padding: 10px;
            margin-bottom: 12px;
        }

        .modal-description {
            font-size: 14px;
            margin-bottom: 16px;
        }

        .modal-actions {
            gap: 8px;
        }

        .modal-register-btn {
            padding: 10px 16px;
            font-size: 14px;
        }

        .modal-share-btn {
            padding: 8px 14px;
            font-size: 13px;
        }
    }

    /* Enhanced responsive design for smaller screens */
    @media (max-width: 768px) and (min-width: 297px) {
        .event-controls {
            flex-direction: column;
            align-items: stretch;
            gap: 15px;
            width: 100%;
        }

        .search-container {
            width: 100%;
            min-width: 100%;
            max-width: 100%;
            flex: none;
        }

        .category-filter-container {
            width: 100%;
            min-width: 100%;
            max-width: 100%;
            flex: none;
        }

        .category-filter-trigger {
            width: 100%;
            min-width: 100%;
            max-width: 100%;
        }

        .search-input {
            width: 100%;
            box-sizing: border-box;
        }
    }

    /* Extra small screens */
    @media (max-width: 480px) {
        .event-widget {
            padding: 10px;
        }

        .event-widget-title {
            font-size: 1.5rem;
        }

        .event-controls {
            gap: 12px;
        }
    }

    /* Enhanced modal accessibility */
    .event-modal {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.5);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 1000;
        opacity: 0;
        visibility: hidden;
        transition: opacity 0.3s ease, visibility 0.3s ease;
    }

    .event-modal.active {
        opacity: 1;
        visibility: visible;
    }

    .modal-content {
        background: #ffffff;
        border-radius: 8px;
        padding: 0;
        max-width: 600px;
        width: 90%;
        max-height: 90vh;
        overflow-y: auto;
        position: relative;
        box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
    }

    /* Focus indicators for modal elements */
    .modal-content:focus-within {
        outline: none;
        outline-offset: 4px;
    }

    .modal-register-btn:focus,
    .modal-share-btn:focus,
    .modal-close:focus {
        outline: 2px solid #7000FF;
        outline-offset: 2px;
    }

    /* Ensure modal elements are focusable */
    .modal-register-btn,
    .modal-share-btn {
        cursor: pointer;
        position: relative;
        z-index: 1;
    }

    /* Modal close button should always be absolutely positioned */
    .modal-close {
        cursor: pointer;
        z-index: 10;
    }

    /* Enhanced focus visibility for modal links */
    .modal-content a:focus {
        outline: 2px solid #7000FF;
        outline-offset: 2px;
        text-decoration: underline;
    }

    /* High contrast mode support */
    @media (prefers-contrast: high) {
        .event-modal {
            background: rgba(0, 0, 0, 0.8);
        }
        
        .modal-content {
            border: 2px solid #000000;
        }
        
        .modal-register-btn:focus,
        .modal-share-btn:focus,
        .modal-close:focus {
            outline: 3px solid #7000FF;
            outline-offset: 1px;
        }
    }

    /* Reduced motion support */
    @media (prefers-reduced-motion: reduce) {
        .event-modal,
        .modal-content,
        .modal-register-btn,
        .modal-share-btn,
        .modal-close {
            transition: none;
        }
    }
`;

/**
 * Event Rendering Module
 */
class EventRenderer {
    constructor(container) {
        this.container = container;
    }
    
    renderWidget() {
        this.container.innerHTML = `
            <div class="event-widget">
                <!-- Header removed: add it in HTML instead -->
                <div class="event-controls">
                    <div class="search-container">
                        <input type="text" class="search-input" id="event-search" name="event-search" placeholder="Search events..." aria-label="Search events" tabindex="0">
                        <button class="search-clear" aria-label="Clear search" tabindex="0">×</button>
                    </div>
                    <div class="category-filter-container">
                        <select class="category-filter" id="faculty-filter" name="faculty-filter" aria-label="Filter by subject" tabindex="-1">
                            <option value="all">All Subjects</option>
                        </select>
                        <button class="category-filter-trigger" id="faculty-trigger" aria-label="Filter by subject" tabindex="0">
                            <span class="trigger-text">All Subjects</span>
                        </button>
                        <div class="category-dropdown" id="faculty-dropdown"></div>
                    </div>
                </div>
                <div class="event-count"></div>
                <div class="events-grid"></div>
                <div class="event-modal" role="dialog" aria-modal="true" aria-labelledby="modal-title" aria-describedby="modal-description">
                    <div class="modal-content" role="document">
                        <button class="modal-close" aria-label="Close modal" tabindex="0">×</button>
                        <div class="modal-body" id="modal-description"></div>
                    </div>
                </div>
            </div>
        `;
    }
    
    renderEvents(events) {
        const grid = this.container.querySelector('.events-grid');
        if (events.length === 0) {
            this.renderNoEvents(grid);
            return;
        }
        
        // Use DocumentFragment for better performance
        const fragment = document.createDocumentFragment();
        
        events.forEach(event => {
            const eventCard = document.createElement('div');
            eventCard.className = 'event-card';
            eventCard.dataset.eventId = event.id;
            eventCard.setAttribute('role', 'button');
            eventCard.setAttribute('tabindex', '0');
            eventCard.setAttribute('aria-label', `View details for ${event['Event Title']}`);
            
            eventCard.innerHTML = `
                <div class="event-content">
                    <span class="event-category ${event.category.toLowerCase().replace('-', '')}">${event.category}</span>
                    <span class="event-subject">${event.Subject}</span>
                    <h3 class="event-title">${event['Event Title']}</h3>
                    <div class="event-meta">
                        <div class="event-meta-item">
                            <svg class="event-icon" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                                <path d="M20 3H4c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-1 17H5V8h14v12z"/>
                                <path d="M7 2h2v2H7zm8 0h2v2h-2z"/>
                            </svg>
                            <span>${event.formattedDate}</span>
                        </div>
                        <div class="event-meta-item">
                            <svg class="event-icon" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                                <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"/>
                                <path d="M12.5 7H11v6l5.25 3.15.75-1.23-4.5-2.67z"/>
                            </svg>
                            <span>${event.Time} ${event.Timezone}</span>
                        </div>
                        <div class="event-meta-item">
                            <svg class="event-icon" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                            </svg>
                            <span>${event.Location}</span>
                        </div>
                    </div>
                    <p class="event-description">${event.Summary}</p>
                    <button class="event-button" tabindex="0" aria-label="View details for ${event['Event Title']}">View Details</button>
                </div>
            `;
            
            fragment.appendChild(eventCard);
        });
        
        // Clear and append all at once for better performance
        grid.innerHTML = '';
        grid.appendChild(fragment);
    }
    
    renderNoEvents(grid) {
        grid.innerHTML = `
            <div class="no-events">
                <h3>Sorry, we couldn't find any results for your search</h3>
                <p>Try adjusting your search or filter criteria.</p>
            </div>
        `;
    }
    
    showLoading() {
        const grid = this.container.querySelector('.events-grid');
        grid.innerHTML = `
            <div class="loading">
                <div class="loading-spinner"></div>
                <p>Loading events...</p>
            </div>
        `;
    }
    
    showError(message) {
        const grid = this.container.querySelector('.events-grid');
        grid.innerHTML = `
            <div class="no-events">
                <div class="no-events-icon">⚠️</div>
                <h3>Error</h3>
                <p>${message}</p>
            </div>
        `;
    }
    
    updateEventCount(filteredCount, totalCount, hasFilters) {
        const countElement = this.container.querySelector('.event-count');
        if (hasFilters) {
            countElement.textContent = `Showing ${filteredCount} of ${totalCount} events`;
        } else {
            countElement.textContent = `${totalCount} event${totalCount !== 1 ? 's' : ''} available`;
        }
    }
}

/**
 * Event Filtering Module
 */
class EventFilter {
    constructor() {
        this.currentSearch = '';
        this.currentSubject = 'all';
    }
    
    setSearch(searchTerm) {
        this.currentSearch = searchTerm;
    }
    
    setSubject(subject) {
        this.currentSubject = subject;
    }
    
    getSearch() {
        return this.currentSearch;
    }
    
    getSubject() {
        return this.currentSubject;
    }
    
    hasActiveFilters() {
        return this.currentSearch !== '' || this.currentSubject !== 'all';
    }
    
    filterEvents(events) {
        const filtered = events.filter(event => {
            const matchesSearch = this.currentSearch === '' || 
                event['Event Title'].toLowerCase().includes(this.currentSearch.toLowerCase()) ||
                event.Summary.toLowerCase().includes(this.currentSearch.toLowerCase()) ||
                event.Location.toLowerCase().includes(this.currentSearch.toLowerCase()) ||
                event.category.toLowerCase().includes(this.currentSearch.toLowerCase()) ||
                event.Faculty.toLowerCase().includes(this.currentSearch.toLowerCase()) ||
                event.Subject.toLowerCase().includes(this.currentSearch.toLowerCase());
            
            const eventSubjectFormatted = event.Subject.toLowerCase().replace(/[^a-z0-9]/g, '-');
            const matchesSubject = this.currentSubject === 'all' || eventSubjectFormatted === this.currentSubject;
            
            return matchesSearch && matchesSubject;
        });
        
        return filtered;
    }
    
    filterExpiredEvents(events, showPastEvents = false) {
        const now = new Date();
        
        const filteredEvents = events.filter(event => {
            const eventDate = event.Date;
            const eventTime = event.Time;
            const startTime = getStartTime(eventTime);
            
            let parsedDate;
            try {
                const eventDateString = `${eventDate} ${startTime}`;
                parsedDate = new Date(eventDateString);
                
                if (isNaN(parsedDate.getTime())) {
                    const dateParts = eventDate.split(' ');
                    const day = parseInt(dateParts[0]);
                    const month = dateParts[1];
                    const year = parseInt(dateParts[2]);
                    
                    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 
                                      'July', 'August', 'September', 'October', 'November', 'December'];
                    const monthIndex = monthNames.indexOf(month);
                    
                    if (monthIndex !== -1) {
                        const timeParts = startTime.match(/(\d+)(?::\d+)?\s*(am|pm)/i);
                        if (timeParts) {
                            let hour = parseInt(timeParts[1]);
                            const ampm = timeParts[2].toLowerCase();
                            
                            if (ampm === 'pm' && hour !== 12) hour += 12;
                            if (ampm === 'am' && hour === 12) hour = 0;
                            
                            parsedDate = new Date(year, monthIndex, day, hour, 0, 0);
                        } else {
                            parsedDate = new Date(year, monthIndex, day, 17, 0, 0);
                        }
                    }
                }
            } catch (error) {
                console.error('Error parsing date for event:', event['Event Title'], error);
                parsedDate = new Date();
            }
            
            return showPastEvents || parsedDate > now;
        });
        
        return filteredEvents;
    }
}

/**
 * Main EventWidget Class
 */
class EventWidget {
    constructor(containerSelector, csvPath, options = {}) {
        this.container = document.querySelector(containerSelector);
        this.csvPath = csvPath;
        this.options = {
            showPastEvents: false,
            theme: 'default',
            autoRefresh: true,
            ...options
        };
        this.events = [];
        this.filteredEvents = [];
        this.renderer = new EventRenderer(this.container);
        this.filter = new EventFilter();
        this.modal = new EventModal(this.container);
        this.init();
    }
    
    init() {
        injectStyles(CSS_STYLES);
        this.renderer.renderWidget();
        this.modal.init();
        this.loadEvents();
        this.bindEvents();
        if (this.options.autoRefresh) {
            setInterval(() => this.refreshEvents(), 60000);
        }
    }
    
    populateSubjectDropdown() {
        const subjects = new Set();
        this.events.forEach(event => {
            subjects.add(event.Subject);
        });
        
        const dropdown = this.container.querySelector('.category-filter');
        const dropdownContainer = this.container.querySelector('.category-dropdown');
        const triggerButton = this.container.querySelector('.category-filter-trigger');
        const triggerText = this.container.querySelector('.trigger-text');
        const currentValue = dropdown.value;
        
        dropdown.innerHTML = '<option value="all">All Subjects</option>';
        dropdownContainer.innerHTML = '';
        
        const allOption = document.createElement('div');
        allOption.className = 'category-option selected';
        allOption.dataset.value = 'all';
        allOption.textContent = 'All Subjects';
        allOption.setAttribute('role', 'option');
        allOption.setAttribute('tabindex', '-1');
        dropdownContainer.appendChild(allOption);
        
        Array.from(subjects).sort().forEach(subject => {
            const option = document.createElement('option');
            option.value = subject.toLowerCase().replace(/[^a-z0-9]/g, '-');
            option.textContent = subject;
            dropdown.appendChild(option);
            
            const customOption = document.createElement('div');
            customOption.className = 'category-option';
            customOption.dataset.value = subject.toLowerCase().replace(/[^a-z0-9]/g, '-');
            customOption.textContent = subject;
            customOption.setAttribute('role', 'option');
            customOption.setAttribute('tabindex', '-1');
            dropdownContainer.appendChild(customOption);
        });
        
        dropdownContainer.setAttribute('role', 'listbox');
        dropdownContainer.setAttribute('aria-label', 'Select subject filter');
        dropdownContainer.setAttribute('aria-expanded', 'false');
        
        triggerButton.setAttribute('role', 'combobox');
        triggerButton.setAttribute('aria-haspopup', 'listbox');
        triggerButton.setAttribute('aria-expanded', 'false');
        triggerButton.setAttribute('aria-label', 'Select subject filter');
        
        if (currentValue && dropdown.querySelector(`option[value="${currentValue}"]`)) {
            dropdown.value = currentValue;
            this.updateCustomDropdownSelection(currentValue);
            this.updateTriggerText(currentValue);
        }
    }

    updateCustomDropdownSelection(value) {
        const options = this.container.querySelectorAll('.category-option');
        options.forEach(option => {
            option.classList.remove('selected');
            option.classList.remove('focused');
            option.setAttribute('aria-selected', 'false');
            if (option.dataset.value === value) {
                option.classList.add('selected');
                option.setAttribute('aria-selected', 'true');
            }
        });
    }

    updateTriggerText(value) {
        const triggerText = this.container.querySelector('.trigger-text');
        const dropdown = this.container.querySelector('.category-filter');
        const selectedOption = dropdown.querySelector(`option[value="${value}"]`);
        
        if (selectedOption) {
            triggerText.textContent = selectedOption.textContent;
        }
    }
    
    async loadEvents() {
        try {
            this.renderer.showLoading();
            const response = await fetch(this.csvPath);
            const csvText = await response.text();
            this.events = parseCSV(csvText);
            this.populateSubjectDropdown();
            this.refreshEvents();
        } catch (error) {
            console.error('Error loading events:', error);
            this.renderer.showError('Failed to load events. Please try again later.');
        }
    }
    
    refreshEvents() {
        this.events = this.filter.filterExpiredEvents(this.events, this.options.showPastEvents);
        this.applyFilters();
    }
    
    applyFilters() {
        this.filteredEvents = this.filter.filterEvents(this.events);
        this.renderer.renderEvents(this.filteredEvents);
        this.renderer.updateEventCount(
            this.filteredEvents.length, 
            this.events.length, 
            this.filter.hasActiveFilters()
        );
    }
    
    bindEvents() {
        const self = this;
        const searchInput = this.container.querySelector('.search-input');
        const searchClear = this.container.querySelector('.search-clear');
        const facultyFilter = this.container.querySelector('.category-filter');
        const modalClose = this.container.querySelector('.modal-close');
        
        searchInput.addEventListener('input', (e) => {
            const searchTerm = e.target.value;
            this.filter.setSearch(searchTerm);
            this.applyFilters();
            searchClear.style.display = searchTerm ? 'block' : 'none';
            this.showAutocompleteSuggestions(searchTerm);
        });

        searchInput.addEventListener('blur', (e) => {
            setTimeout(() => {
                this.hideAutocompleteSuggestions();
            }, 200);
        });
        
        searchInput.addEventListener('focus', (e) => {
            e.target.focus();
        });
        
        searchInput.addEventListener('click', (e) => {
            e.target.focus();
        });
        
        searchInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                const suggestions = this.container.querySelectorAll('.autocomplete-suggestion');
                const activeSuggestion = this.container.querySelector('.autocomplete-suggestion.active');
                if (activeSuggestion) {
                    searchInput.value = activeSuggestion.textContent;
                    this.filter.setSearch(searchInput.value);
                    this.applyFilters();
                    this.hideAutocompleteSuggestions();
                }
            } else if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
                e.preventDefault();
                this.navigateAutocomplete(e.key === 'ArrowDown' ? 1 : -1);
            }
        });
        
        searchClear.addEventListener('click', () => {
            searchInput.value = '';
            this.filter.setSearch('');
            this.applyFilters();
            searchClear.style.display = 'none';
            this.hideAutocompleteSuggestions();
        });
        
        facultyFilter.addEventListener('change', (e) => {
            this.filter.setSubject(e.target.value);
            this.applyFilters();
        });
        
        const dropdownContainer = this.container.querySelector('.category-filter-container');
        const customDropdown = this.container.querySelector('.category-dropdown');
        const triggerButton = this.container.querySelector('.category-filter-trigger');
        
        let isDropdownOpen = false;
        let focusedOptionIndex = -1;
        
        triggerButton.addEventListener('click', (e) => {
            e.preventDefault();
            toggleDropdown();
        });
        
        triggerButton.addEventListener('keydown', (e) => {
            switch (e.key) {
                case 'Enter':
                case ' ':
                    e.preventDefault();
                    toggleDropdown();
                    break;
                case 'ArrowDown':
                    e.preventDefault();
                    if (!isDropdownOpen) {
                        openDropdown();
                    }
                    focusNextOption();
                    break;
                case 'ArrowUp':
                    e.preventDefault();
                    if (!isDropdownOpen) {
                        openDropdown();
                    }
                    focusPreviousOption();
                    break;
                case 'Escape':
                    if (isDropdownOpen) {
                        closeDropdown();
                    }
                    break;
            }
        });
        
        customDropdown.addEventListener('keydown', (e) => {
            if (!isDropdownOpen) return;
            
            switch (e.key) {
                case 'ArrowDown':
                    e.preventDefault();
                    focusNextOption();
                    break;
                case 'ArrowUp':
                    e.preventDefault();
                    focusPreviousOption();
                    break;
                case 'Enter':
                case ' ':
                    e.preventDefault();
                    selectFocusedOption();
                    break;
                case 'Escape':
                    e.preventDefault();
                    closeDropdown();
                    break;
                case 'Home':
                    e.preventDefault();
                    focusFirstOption();
                    break;
                case 'End':
                    e.preventDefault();
                    focusLastOption();
                    break;
            }
        });
        
        customDropdown.addEventListener('click', (e) => {
            if (e.target.classList.contains('category-option')) {
                selectOption(e.target);
            }
        });
        
        document.addEventListener('click', (e) => {
            if (!dropdownContainer.contains(e.target)) {
                closeDropdown();
            }
        });
        
        function toggleDropdown() {
            if (isDropdownOpen) {
                closeDropdown();
            } else {
                openDropdown();
            }
        }
        
        function openDropdown() {
            isDropdownOpen = true;
            customDropdown.classList.add('active');
            triggerButton.setAttribute('aria-expanded', 'true');
            customDropdown.setAttribute('aria-expanded', 'true');
            
            const options = customDropdown.querySelectorAll('.category-option');
            options.forEach(option => {
                option.classList.remove('selected');
            });
            
            if (focusedOptionIndex === -1) {
                focusFirstOption();
            }
        }
        
        function closeDropdown() {
            isDropdownOpen = false;
            customDropdown.classList.remove('active');
            triggerButton.setAttribute('aria-expanded', 'false');
            customDropdown.setAttribute('aria-expanded', 'false');
            
            const options = customDropdown.querySelectorAll('.category-option');
            const currentValue = facultyFilter.value;
            
            options.forEach(option => {
                option.classList.remove('focused');
                option.setAttribute('aria-selected', 'false');
                option.setAttribute('tabindex', '-1');
                
                if (option.dataset.value === currentValue) {
                    option.classList.add('selected');
                    option.setAttribute('aria-selected', 'true');
                }
            });
            
            const activeElement = document.activeElement;
            if (activeElement === triggerButton || activeElement === customDropdown || 
                customDropdown.contains(activeElement)) {
                triggerButton.focus();
            }
            focusedOptionIndex = -1;
        }
        
        function focusFirstOption() {
            const options = customDropdown.querySelectorAll('.category-option');
            if (options.length > 0) {
                focusOption(0);
            }
        }
        
        function focusLastOption() {
            const options = customDropdown.querySelectorAll('.category-option');
            if (options.length > 0) {
                focusOption(options.length - 1);
            }
        }
        
        function focusNextOption() {
            const options = customDropdown.querySelectorAll('.category-option');
            if (options.length === 0) return;
            
            let nextIndex = focusedOptionIndex + 1;
            if (nextIndex >= options.length) {
                nextIndex = 0;
            }
            focusOption(nextIndex);
        }
        
        function focusPreviousOption() {
            const options = customDropdown.querySelectorAll('.category-option');
            if (options.length === 0) return;
            
            let prevIndex = focusedOptionIndex - 1;
            if (prevIndex < 0) {
                prevIndex = options.length - 1;
            }
            focusOption(prevIndex);
        }
        
        function focusOption(index) {
            const options = customDropdown.querySelectorAll('.category-option');
            if (index >= 0 && index < options.length) {
                options.forEach(option => {
                    option.classList.remove('focused');
                    option.classList.remove('selected');
                    option.setAttribute('aria-selected', 'false');
                    option.setAttribute('tabindex', '-1');
                });
                
                options[index].classList.add('focused');
                options[index].setAttribute('aria-selected', 'true');
                options[index].setAttribute('tabindex', '0');
                options[index].focus();
                focusedOptionIndex = index;
            }
        }
        
        function selectFocusedOption() {
            const options = customDropdown.querySelectorAll('.category-option');
            if (focusedOptionIndex >= 0 && focusedOptionIndex < options.length) {
                selectOption(options[focusedOptionIndex]);
            }
        }
        
        function selectOption(optionElement) {
            const value = optionElement.dataset.value;
            const text = optionElement.textContent;
            
            facultyFilter.value = value;
            self.updateCustomDropdownSelection(value);
            self.updateTriggerText(value);
            self.filter.setSubject(value);
            self.applyFilters();
            closeDropdown();
        }
        
        this.container.addEventListener('click', (e) => {
            const eventCard = e.target.closest('.event-card');
            if (eventCard) {
                const eventId = eventCard.dataset.eventId;
                const event = this.events.find(e => e.id === eventId);
                if (event) {
                    this.modal.open(event);
                }
            }
            
            if (e.target.classList.contains('autocomplete-suggestion')) {
                searchInput.value = e.target.textContent;
                this.filter.setSearch(searchInput.value);
                this.applyFilters();
                this.hideAutocompleteSuggestions();
            }
        });
        
        this.container.addEventListener('keydown', (e) => {
            const eventCard = e.target.closest('.event-card');
            if (eventCard && (e.key === 'Enter' || e.key === ' ')) {
                e.preventDefault();
                const eventId = eventCard.dataset.eventId;
                const event = this.events.find(e => e.id === eventId);
                if (event) {
                    this.modal.open(event);
                }
            }
        });
        
        modalClose.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.modal.close();
            }
        });
        
        modalClose.addEventListener('click', () => {
            this.modal.close();
        });
        
        this.container.querySelector('.event-modal').addEventListener('click', (e) => {
            if (e.target.classList.contains('event-modal')) {
                this.modal.close();
            }
        });
        
        this.container.querySelector('.event-modal').addEventListener('keydown', (e) => {
            if (e.target.classList.contains('event-modal') && e.key === 'Escape') {
                this.modal.close();
            }
        });
        
        document.addEventListener('keydown', (e) => {
            if (this.modal.isOpen()) {
                if (e.key === 'Escape') {
                    this.modal.close();
                }
                return;
            }
            
            const eventCard = e.target.closest('.event-card');
            if (eventCard && (e.key === 'Enter' || e.key === ' ')) {
                e.preventDefault();
                const eventId = eventCard.dataset.eventId;
                const event = this.events.find(e => e.id === eventId);
                if (event) {
                    this.modal.open(event);
                }
            }
        });
        
        this.container.addEventListener('click', (e) => {
            if (e.target.classList.contains('modal-share-btn')) {
                const eventTitle = e.target.getAttribute('data-event-title');
                if (navigator.share) {
                    navigator.share({
                        title: eventTitle,
                        url: window.location.href
                    }).catch(err => {
                        console.log('Share failed:', err);
                    });
                } else {
                    navigator.clipboard.writeText(window.location.href).then(() => {
                        e.target.textContent = 'Copied!';
                        setTimeout(() => {
                            e.target.textContent = 'Share Event';
                        }, 2000);
                    }).catch(err => {
                        console.log('Copy failed:', err);
                    });
                }
            }
        });
        
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.modal.isOpen()) {
                this.modal.close();
            }
        });
        
        document.addEventListener('click', (e) => {
            if (!this.container.contains(e.target)) {
                this.hideAutocompleteSuggestions();
            }
        });
    }
    
    showAutocompleteSuggestions(searchTerm) {
        if (!searchTerm || searchTerm.length < 2) {
            this.hideAutocompleteSuggestions();
            return;
        }
        
        const suggestions = this.getSearchSuggestions(searchTerm);
        if (suggestions.length === 0) {
            this.hideAutocompleteSuggestions();
            return;
        }
        
        let autocompleteContainer = this.container.querySelector('.autocomplete-container');
        if (!autocompleteContainer) {
            autocompleteContainer = document.createElement('div');
            autocompleteContainer.className = 'autocomplete-container';
            this.container.querySelector('.search-container').appendChild(autocompleteContainer);
        }
        
        autocompleteContainer.innerHTML = suggestions.map(suggestion => 
            `<div class="autocomplete-suggestion">${suggestion}</div>`
        ).join('');
        autocompleteContainer.style.display = 'block';
    }
    
    hideAutocompleteSuggestions() {
        const autocompleteContainer = this.container.querySelector('.autocomplete-container');
        if (autocompleteContainer) {
            autocompleteContainer.style.display = 'none';
        }
    }
    
    navigateAutocomplete(direction) {
        const suggestions = this.container.querySelectorAll('.autocomplete-suggestion');
        const activeSuggestion = this.container.querySelector('.autocomplete-suggestion.active');
        
        if (suggestions.length === 0) return;
        
        let nextIndex = 0;
        if (activeSuggestion) {
            const currentIndex = Array.from(suggestions).indexOf(activeSuggestion);
            nextIndex = (currentIndex + direction + suggestions.length) % suggestions.length;
            activeSuggestion.classList.remove('active');
        }
        
        suggestions[nextIndex].classList.add('active');
    }
    
    getSearchSuggestions(searchTerm) {
        const suggestions = new Set();
        const lowerSearchTerm = searchTerm.toLowerCase();
        
        this.events.forEach(event => {
            if (event['Event Title'].toLowerCase().includes(lowerSearchTerm)) {
                suggestions.add(event['Event Title']);
            }
            if (event.Subject.toLowerCase().includes(lowerSearchTerm)) {
                suggestions.add(event.Subject);
            }
            if (event.Faculty.toLowerCase().includes(lowerSearchTerm)) {
                suggestions.add(event.Faculty);
            }
        });
        
        return Array.from(suggestions).slice(0, 5);
    }
}

/**
 * Event Modal Module
 */
class EventModal {
    constructor(container) {
        this.container = container;
        this.modal = null;
    }
    
    init() {
        this.modal = this.container.querySelector('.event-modal');
    }
    
    open(event) {
        if (!event || !this.modal) return;
        
        this.previousFocus = document.activeElement;
        
        const modalBody = this.modal.querySelector('.modal-body');
        const isOnline = event.Location.toLowerCase().includes('online');
        const googleMapsUrl = isOnline ? null : `https://maps.google.com/maps?q=${encodeURIComponent(event.Location)}`;
        const bookingPageUrl = event['Booking URL'] || '#BOOKING_PAGE_URL_TO_BE_ADDED';
        
        modalBody.innerHTML = `
            <span class="modal-category ${event.category.toLowerCase().replace('-', '')}" aria-label="Event category: ${event.category}">${event.category}</span>
            <h2 class="modal-title" id="modal-title">${event['Event Title']}</h2>
            <div class="modal-subject" aria-label="Subject: ${event.Subject}">${event.Subject}</div>
            <div class="modal-meta" role="list" aria-label="Event details">
                <div class="modal-meta-item" role="listitem">
                    <svg class="modal-icon" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                        <path d="M20 3H4c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-1 17H5V8h14v12z"/>
                        <path d="M7 2h2v2H7zm8 0h2v2h-2z"/>
                    </svg>
                    <span aria-label="Date: ${event.formattedDate}">${event.formattedDate}</span>
                </div>
                <div class="modal-meta-item" role="listitem">
                    <svg class="modal-icon" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                        <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"/>
                        <path d="M12.5 7H11v6l5.25 3.15.75-1.23-4.5-2.67z"/>
                    </svg>
                    <span aria-label="Time: ${event.Time} ${event.Timezone}">${event.Time} ${event.Timezone}</span>
                </div>
                <div class="modal-meta-item" role="listitem">
                    <svg class="modal-icon" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                    </svg>
                    <span aria-label="Location: ${event.Location}">${isOnline ? event.Location : `<a href="${googleMapsUrl}" target="_blank" rel="noopener noreferrer" tabindex="0" aria-label="View location on Google Maps: ${event.Location}">${event.Location}</a>`}</span>
                </div>
            </div>
            <div class="modal-description" id="modal-description" aria-label="Event description">${event.Summary}</div>
            <div class="modal-actions" role="group" aria-label="Event actions">
                <a href="${bookingPageUrl}" target="_blank" rel="noopener noreferrer" class="modal-register-btn" tabindex="0" aria-label="Register for this event (opens in new tab)">Register Now</a>
                <button class="modal-share-btn" tabindex="0" aria-label="Share this event: ${event['Event Title']}" data-event-title="${event['Event Title']}">Share Event</button>
            </div>
        `;
        
        this.modal.setAttribute('aria-labelledby', 'modal-title');
        this.modal.setAttribute('aria-describedby', 'modal-description');
        this.modal.setAttribute('aria-modal', 'true');
        this.modal.setAttribute('role', 'dialog');
        
        this.modal.classList.add('active');
        document.body.style.overflow = 'hidden';
        
        this.announceModal(event['Event Title']);
        this.trapFocus();
        
        setTimeout(() => {
            this.ensureModalFocus();
        }, 100);
    }
    
    ensureModalFocus() {
        const focusableElements = this.modal.querySelectorAll(
            'button, a[href], input, select, textarea, [tabindex]:not([tabindex="-1"]), a[tabindex="0"], .modal-register-btn, .modal-share-btn, .modal-close'
        );
        
        if (focusableElements.length > 0) {
            console.log('Modal focus trap ready - user can tab through elements');
        }
    }
    
    close() {
        if (!this.modal) return;
        
        this.removeFocusTrap();
        this.modal.classList.remove('active');
        document.body.style.overflow = '';
        
        if (this.previousFocus && typeof this.previousFocus.focus === 'function') {
            this.previousFocus.focus();
        }
    }
    
    isOpen() {
        return this.modal && this.modal.classList.contains('active');
    }
    
    trapFocus() {
        const focusableElements = this.modal.querySelectorAll(
            'button, a[href], input, select, textarea, [tabindex]:not([tabindex="-1"]), a[tabindex="0"], .modal-register-btn, .modal-share-btn, .modal-close'
        );
        
        if (focusableElements.length === 0) {
            return;
        }
        
        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];
        
        this.handleTabKey = (e) => {
            if (e.key === 'Tab') {
                const currentFocus = document.activeElement;
                const isFocusInModal = this.modal.contains(currentFocus);
                
                if (!isFocusInModal) {
                    e.preventDefault();
                    firstElement.focus();
                    return;
                }
                
                if (e.shiftKey) {
                    if (currentFocus === firstElement) {
                        e.preventDefault();
                        lastElement.focus();
                    }
                } else {
                    if (currentFocus === lastElement) {
                        e.preventDefault();
                        firstElement.focus();
                    }
                }
            }
        };
        
        if (this.handleTabKey) {
            this.modal.removeEventListener('keydown', this.handleTabKey);
        }
        
        this.modal.addEventListener('keydown', this.handleTabKey);
        
        this.handleDocumentTabKey = (e) => {
            if (e.key === 'Tab' && this.isOpen()) {
                const currentFocus = document.activeElement;
                const isFocusInModal = this.modal.contains(currentFocus);
                
                if (!isFocusInModal) {
                    e.preventDefault();
                    firstElement.focus();
                }
            }
        };
        
        document.addEventListener('keydown', this.handleDocumentTabKey);
    }
    
    removeFocusTrap() {
        if (this.handleTabKey) {
            this.modal.removeEventListener('keydown', this.handleTabKey);
            this.handleTabKey = null;
        }
        
        if (this.handleDocumentTabKey) {
            document.removeEventListener('keydown', this.handleDocumentTabKey);
            this.handleDocumentTabKey = null;
        }
    }
    
    announceModal(title) {
        const announcement = document.createElement('div');
        announcement.setAttribute('aria-live', 'assertive');
        announcement.setAttribute('aria-atomic', 'true');
        announcement.style.position = 'absolute';
        announcement.style.top = '0';
        announcement.style.left = '0';
        announcement.style.width = '1px';
        announcement.style.height = '1px';
        announcement.style.padding = '0';
        announcement.style.overflow = 'hidden';
        announcement.style.clip = 'rect(0, 0, 0, 0)';
        announcement.style.whiteSpace = 'nowrap';
        announcement.style.borderWidth = '0';
        announcement.textContent = `Event modal opened: ${title}`;
        document.body.appendChild(announcement);

        setTimeout(() => {
            announcement.remove();
        }, 1000);
    }
}

// Expose globally for CMS use
window.EventWidget = EventWidget;

// Auto-initialize using <script> data attributes
(function() {
  function createContainerIfMissing(selector) {
    if (!selector) return null;
    var container = document.querySelector(selector);
    if (container) return container;
    // Only support #id or .class selectors
    var el = document.createElement('div');
    if (selector[0] === '#') {
      el.id = selector.slice(1);
    } else if (selector[0] === '.') {
      el.className = selector.slice(1);
    }
    document.body.appendChild(el);
    return el;
  }
  function autoInit() {
    var script = document.currentScript || (function() {
      var scripts = document.getElementsByTagName('script');
      return scripts[scripts.length - 1];
    })();
    if (!script) return;
    var containerSelector = script.getAttribute('data-container') || '#event-widget-container';
    var csvPath = script.getAttribute('data-csv');
    if (containerSelector && csvPath) {
      createContainerIfMissing(containerSelector);
      new EventWidget(containerSelector, csvPath, {
        showPastEvents: false,
        autoRefresh: true
      });
    }
  }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', autoInit);
  } else {
    autoInit();
  }
})(); 