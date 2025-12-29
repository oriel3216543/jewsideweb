// API Configuration (allows hosted frontend with external API)
const DEPLOY_API_BASE = 'https://api.jewside.com';
const configuredApiBase = window.__JEWSIDE_API_BASE__ 
    || document.querySelector('meta[name="api-base"]')?.content;
const API_BASE = configuredApiBase
    ? configuredApiBase
    : window.location.origin.startsWith('file')
        ? 'http://localhost:3000'
        : window.location.hostname.endsWith('jewside.com')
            ? DEPLOY_API_BASE
            : window.location.origin;
const API_URL = `${API_BASE}/api`;
let authToken = localStorage.getItem('jewside_auth_token');

// State management
let prayers = [];
let isLoggedIn = false;
let currentEditingId = null;

// Initialize the app
document.addEventListener('DOMContentLoaded', function() {
    setupEventListeners();
    checkLoginStatus();
    loadPrayers();
});

// API Helper Functions
async function apiRequest(endpoint, options = {}) {
    const defaultOptions = {
        headers: {
            'Content-Type': 'application/json',
        }
    };
    
    if (authToken) {
        defaultOptions.headers['Authorization'] = `Bearer ${authToken}`;
    }
    
    const response = await fetch(`${API_URL}${endpoint}`, {
        ...defaultOptions,
        ...options,
        headers: {
            ...defaultOptions.headers,
            ...options.headers
        }
    });
    
    const data = await response.json();
    
    if (!response.ok) {
        throw new Error(data.message || 'API request failed');
    }
    
    return data;
}

// Load and display prayers
async function loadPrayers() {
    const container = document.getElementById('prayersContainer');
    
    try {
        container.innerHTML = '<p class="loading">Loading prayers</p>';
        
        const response = await apiRequest('/prayers');
        prayers = response.data;
        
        if (prayers.length === 0) {
            container.innerHTML = '<p class="loading">No prayers available yet.</p>';
            return;
        }
        
        container.innerHTML = prayers.map(prayer => `
            <div class="prayer-card" data-id="${prayer._id}">
                <span class="prayer-category">${prayer.category}</span>
                <h3 class="prayer-title">${prayer.title}</h3>
                <p class="prayer-hebrew">${prayer.hebrew}</p>
                ${prayer.transliteration ? `<p class="prayer-transliteration">${prayer.transliteration}</p>` : ''}
                <p class="prayer-translation">${prayer.translation}</p>
            </div>
        `).join('');
    } catch (error) {
        console.error('Error loading prayers:', error);
        container.innerHTML = `<p class="loading">Error loading prayers: ${error.message}</p>`;
    }
}

// Load prayers in admin dashboard
function loadAdminPrayers() {
    const container = document.getElementById('adminPrayersContainer');
    
    if (prayers.length === 0) {
        container.innerHTML = '<p class="loading">No prayers available yet.</p>';
        return;
    }
    
    container.innerHTML = prayers.map(prayer => `
        <div class="admin-prayer-item" data-id="${prayer._id}">
            <div class="admin-prayer-info">
                <h3>${prayer.title}</h3>
                <p><strong>Category:</strong> ${prayer.category}</p>
                <p>${prayer.translation.substring(0, 100)}${prayer.translation.length > 100 ? '...' : ''}</p>
            </div>
            <div class="admin-prayer-actions">
                <button class="edit-btn" onclick="editPrayer('${prayer._id}')">Edit</button>
                <button class="delete-btn" onclick="deletePrayer('${prayer._id}')">Delete</button>
            </div>
        </div>
    `).join('');
}

// Setup event listeners
function setupEventListeners() {
    // Footer login form submission
    const footerLoginForm = document.getElementById('footerLoginForm');
    footerLoginForm.addEventListener('submit', handleFooterLogin);
    
    // Admin dashboard close
    const closeAdmin = document.querySelector('.close-admin');
    const adminModal = document.getElementById('adminModal');
    
    closeAdmin.addEventListener('click', function() {
        adminModal.style.display = 'none';
    });
    
    // Add prayer button
    const addPrayerBtn = document.getElementById('addPrayerBtn');
    addPrayerBtn.addEventListener('click', function() {
        currentEditingId = null;
        document.getElementById('editModalTitle').textContent = 'Add New Prayer';
        document.getElementById('editPrayerForm').reset();
        document.getElementById('editPrayerId').value = '';
        document.getElementById('editPrayerModal').style.display = 'block';
    });
    
    // Logout button
    const logoutBtn = document.getElementById('logoutBtn');
    logoutBtn.addEventListener('click', handleLogout);
    
    // Edit prayer modal close
    const closeEdit = document.querySelector('.close-edit');
    const editPrayerModal = document.getElementById('editPrayerModal');
    
    closeEdit.addEventListener('click', function() {
        editPrayerModal.style.display = 'none';
    });
    
    // Cancel edit button
    const cancelEditBtn = document.getElementById('cancelEditBtn');
    cancelEditBtn.addEventListener('click', function() {
        editPrayerModal.style.display = 'none';
    });
    
    // Edit prayer form submission
    const editPrayerForm = document.getElementById('editPrayerForm');
    editPrayerForm.addEventListener('submit', handleSavePrayer);
    
    // Close modals when clicking outside
    window.addEventListener('click', function(event) {
        if (event.target.classList.contains('modal')) {
            event.target.style.display = 'none';
        }
    });
    
    // Smooth scrolling for navigation links
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function(e) {
            if (this.getAttribute('href').startsWith('#')) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth' });
                    
                    // Update active link
                    document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
                    this.classList.add('active');
                }
            }
        });
    });
}

// Handle footer login
async function handleFooterLogin(e) {
    e.preventDefault();
    
    const username = document.getElementById('footerUsername').value;
    const password = document.getElementById('footerPassword').value;
    const errorDiv = document.getElementById('footerLoginError');
    
    try {
        const response = await apiRequest('/auth/login', {
            method: 'POST',
            body: JSON.stringify({ username, password })
        });
        
        authToken = response.token;
        localStorage.setItem('jewside_auth_token', authToken);
        isLoggedIn = true;
        
        document.getElementById('footerLoginForm').reset();
        errorDiv.textContent = '';
        errorDiv.style.color = '#90EE90';
        errorDiv.textContent = '✓ Login successful! Opening dashboard...';
        
        setTimeout(() => {
            showAdminDashboard();
            errorDiv.textContent = '';
            errorDiv.style.color = '#FFA5A5';
        }, 1000);
    } catch (error) {
        errorDiv.textContent = error.message || 'Invalid credentials';
    }
}

// Handle logout
function handleLogout() {
    isLoggedIn = false;
    authToken = null;
    localStorage.removeItem('jewside_auth_token');
    document.getElementById('adminModal').style.display = 'none';
    
    // Restore footer login form
    const footerAdmin = document.querySelector('.footer-admin');
    footerAdmin.innerHTML = `
        <h3>Admin Access</h3>
        <form id="footerLoginForm" class="footer-login-form">
            <div class="footer-form-group">
                <input type="email" id="footerUsername" name="username" placeholder="Email" required>
            </div>
            <div class="footer-form-group">
                <input type="password" id="footerPassword" name="password" placeholder="Password" required>
            </div>
            <button type="submit" class="footer-login-btn">Login</button>
            <div id="footerLoginError" class="footer-error-message"></div>
        </form>
    `;
    
    // Re-attach event listener
    document.getElementById('footerLoginForm').addEventListener('submit', handleFooterLogin);
}

// Check login status on page load
async function checkLoginStatus() {
    const token = localStorage.getItem('jewside_auth_token');
    
    if (token) {
        authToken = token;
        try {
            await apiRequest('/auth/verify');
            isLoggedIn = true;
            updateFooterLogin();
        } catch (error) {
            // Token is invalid, clear it
            localStorage.removeItem('jewside_auth_token');
            authToken = null;
            isLoggedIn = false;
        }
    }
}

// Update footer login display
function updateFooterLogin() {
    const footerAdmin = document.querySelector('.footer-admin');
    if (isLoggedIn) {
        footerAdmin.innerHTML = `
            <h3>Admin Panel</h3>
            <div style="display: flex; flex-direction: column; gap: 0.8rem;">
                <button onclick="showAdminDashboard()" class="footer-login-btn">Open Dashboard</button>
                <button onclick="handleLogout()" class="footer-login-btn" style="background: linear-gradient(135deg, #E53E3E, #C53030);">Logout</button>
            </div>
        `;
    }
}

// Show admin dashboard
function showAdminDashboard() {
    loadAdminPrayers();
    document.getElementById('adminModal').style.display = 'block';
}

// Edit prayer
function editPrayer(id) {
    const prayer = prayers.find(p => p._id === id);
    if (!prayer) return;
    
    currentEditingId = id;
    document.getElementById('editModalTitle').textContent = 'Edit Prayer';
    document.getElementById('editPrayerId').value = id;
    document.getElementById('prayerTitle').value = prayer.title;
    document.getElementById('prayerCategory').value = prayer.category;
    document.getElementById('prayerHebrew').value = prayer.hebrew;
    document.getElementById('prayerTransliteration').value = prayer.transliteration || '';
    document.getElementById('prayerTranslation').value = prayer.translation;
    
    document.getElementById('editPrayerModal').style.display = 'block';
}

// Delete prayer
async function deletePrayer(id) {
    if (!confirm('Are you sure you want to delete this prayer?')) {
        return;
    }
    
    try {
        await apiRequest(`/prayers/${id}`, {
            method: 'DELETE'
        });
        
        await loadPrayers();
        loadAdminPrayers();
    } catch (error) {
        alert('Error deleting prayer: ' + error.message);
    }
}

// Handle save prayer
async function handleSavePrayer(e) {
    e.preventDefault();
    
    const id = document.getElementById('editPrayerId').value;
    const prayerData = {
        title: document.getElementById('prayerTitle').value,
        category: document.getElementById('prayerCategory').value,
        hebrew: document.getElementById('prayerHebrew').value,
        transliteration: document.getElementById('prayerTransliteration').value,
        translation: document.getElementById('prayerTranslation').value
    };
    
    try {
        if (id) {
            // Update existing prayer
            await apiRequest(`/prayers/${id}`, {
                method: 'PUT',
                body: JSON.stringify(prayerData)
            });
        } else {
            // Add new prayer
            await apiRequest('/prayers', {
                method: 'POST',
                body: JSON.stringify(prayerData)
            });
        }
        
        await loadPrayers();
        loadAdminPrayers();
        document.getElementById('editPrayerModal').style.display = 'none';
        document.getElementById('editPrayerForm').reset();
    } catch (error) {
        alert('Error saving prayer: ' + error.message);
    }
}

