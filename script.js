// Weather App JavaScript
class WeatherApp {
    constructor() {
        // API Configuration
        this.API_KEY = 'dbfbd2f21c3be0cedd0c8871e80d00fc'; // OpenWeatherMap API key
        this.API_BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';
        
        // DOM Elements
        this.elements = {
            searchForm: document.getElementById('searchForm'),
            cityInput: document.getElementById('cityInput'),
            loadingContainer: document.getElementById('loadingContainer'),
            errorContainer: document.getElementById('errorContainer'),
            errorMessage: document.getElementById('errorMessage'),
            retryBtn: document.getElementById('retryBtn'),
            weatherSection: document.getElementById('weatherSection'),
            cityName: document.getElementById('cityName'),
            countryName: document.getElementById('countryName'),
            dateTime: document.getElementById('dateTime'),
            weatherIcon: document.getElementById('weatherIcon'),
            temperature: document.getElementById('temperature'),
            weatherDescription: document.getElementById('weatherDescription'),
            feelsLike: document.getElementById('feelsLike'),
            humidity: document.getElementById('humidity'),
            windSpeed: document.getElementById('windSpeed'),
            visibility: document.getElementById('visibility'),
            pressure: document.getElementById('pressure'),
            sunrise: document.getElementById('sunrise'),
            sunset: document.getElementById('sunset')
        };
        
        // Initialize the app
        this.init();
    }
    
    init() {
        this.bindEvents();
        this.updateDateTime();
        this.checkAPIKey();
        
        // Update date/time every minute
        setInterval(() => this.updateDateTime(), 60000);
        
        // Load default city (London) if API key is available
        if (this.API_KEY !== 'YOUR_API_KEY_HERE') {
            // For demo purposes, show sample data if API key is invalid
            setTimeout(() => {
                if (document.getElementById('errorContainer').classList.contains('show')) {
                    this.showDemoData();
                }
            }, 2000);
        }
    }
    
    bindEvents() {
        // Search form submission
        this.elements.searchForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const city = this.elements.cityInput.value.trim();
            if (city) {
                this.searchWeather(city);
            }
        });
        
        // Retry button
        this.elements.retryBtn.addEventListener('click', () => {
            const city = this.elements.cityInput.value.trim() || 'London';
            this.searchWeather(city);
        });
        
        // Enter key on input
        this.elements.cityInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                this.elements.searchForm.dispatchEvent(new Event('submit'));
            }
        });
    }
    
    checkAPIKey() {
        if (this.API_KEY === 'YOUR_API_KEY_HERE') {
            this.showError(
                'API Key Required',
                'Please get your free API key from OpenWeatherMap and replace "YOUR_API_KEY_HERE" in script.js'
            );
        }
    }
    
    async searchWeather(city) {
        if (this.API_KEY === 'YOUR_API_KEY_HERE') {
            this.checkAPIKey();
            return;
        }
        
        try {
            this.showLoading();
            const weatherData = await this.fetchWeatherData(city);
            this.displayWeatherData(weatherData);
            this.elements.cityInput.value = '';
        } catch (error) {
            console.error('Weather fetch error:', error);
            this.handleError(error);
        }
    }
    
    async fetchWeatherData(city) {
        const url = `${this.API_BASE_URL}?q=${encodeURIComponent(city)}&appid=${this.API_KEY}&units=metric`;
        
        const response = await fetch(url);
        
        if (!response.ok) {
            if (response.status === 404) {
                throw new Error(`City "${city}" not found. Please check the spelling and try again.`);
            } else if (response.status === 401) {
                throw new Error('Invalid API key. Please check your OpenWeatherMap API key.');
            } else if (response.status === 429) {
                throw new Error('Too many requests. Please try again later.');
            } else {
                throw new Error(`Weather service error (${response.status}). Please try again later.`);
            }
        }
        
        const data = await response.json();
        return data;
    }
    
    displayWeatherData(data) {
        // Hide loading and error states
        this.hideLoading();
        this.hideError();
        
        // Update location information
        this.elements.cityName.textContent = data.name;
        this.elements.countryName.textContent = data.sys.country;
        
        // Update weather icon
        const iconCode = data.weather[0].icon;
        this.elements.weatherIcon.src = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
        this.elements.weatherIcon.alt = data.weather[0].description;
        
        // Update temperature
        this.elements.temperature.textContent = Math.round(data.main.temp);
        this.elements.feelsLike.textContent = `${Math.round(data.main.feels_like)}°C`;
        
        // Update weather description
        this.elements.weatherDescription.textContent = data.weather[0].description;
        
        // Update weather details
        this.elements.humidity.textContent = `${data.main.humidity}%`;
        this.elements.windSpeed.textContent = `${Math.round(data.wind.speed * 3.6)} km/h`;
        this.elements.visibility.textContent = `${(data.visibility / 1000).toFixed(1)} km`;
        this.elements.pressure.textContent = `${data.main.pressure} hPa`;
        
        // Update sunrise and sunset
        this.elements.sunrise.textContent = this.formatTime(data.sys.sunrise);
        this.elements.sunset.textContent = this.formatTime(data.sys.sunset);
        
        // Show weather section with animation
        this.showWeatherSection();
        
        // Update background based on weather
        this.updateBackgroundForWeather(data.weather[0].main, data.weather[0].icon);
        
        // Add weather animation
        this.addWeatherAnimation(data.weather[0].main);
    }
    
    showLoading() {
        this.elements.loadingContainer.classList.add('show');
        this.elements.errorContainer.classList.remove('show');
        this.elements.weatherSection.classList.remove('show');
    }
    
    hideLoading() {
        this.elements.loadingContainer.classList.remove('show');
    }
    
    showError(title = 'Error', message) {
        this.hideLoading();
        this.elements.weatherSection.classList.remove('show');
        this.elements.errorContainer.querySelector('.error-title').textContent = title;
        this.elements.errorMessage.textContent = message;
        this.elements.errorContainer.classList.add('show');
    }
    
    hideError() {
        this.elements.errorContainer.classList.remove('show');
    }
    
    handleError(error) {
        let errorMessage = 'Unable to fetch weather data. Please try again.';
        
        if (error.message.includes('not found')) {
            errorMessage = error.message;
        } else if (error.message.includes('API key')) {
            errorMessage = error.message;
        } else if (error.message.includes('Too many requests')) {
            errorMessage = error.message;
        } else if (!navigator.onLine) {
            errorMessage = 'No internet connection. Please check your connection and try again.';
        }
        
        this.showError('Oops! Something went wrong', errorMessage);
    }
    
    showWeatherSection() {
        this.elements.weatherSection.classList.add('show');
        
        // Add staggered animation to detail cards
        const detailCards = document.querySelectorAll('.detail-card');
        detailCards.forEach((card, index) => {
            card.style.animationDelay = `${index * 0.1}s`;
            card.classList.add('fadeIn');
        });
    }
    
    updateDateTime() {
        const now = new Date();
        const options = {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        };
        this.elements.dateTime.textContent = now.toLocaleDateString('en-US', options);
    }
    
    formatTime(timestamp) {
        const date = new Date(timestamp * 1000);
        return date.toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: true
        });
    }
    
    updateBackgroundForWeather(weatherMain, iconCode) {
        // Remove existing weather animation overlays
        const existingOverlays = document.querySelectorAll('.weather-animation-overlay');
        existingOverlays.forEach(overlay => {
            overlay.classList.remove('active');
            setTimeout(() => overlay.remove(), 1000);
        });
        
        // Create new weather animation overlay
        this.createWeatherAnimation(weatherMain.toLowerCase(), iconCode);
    }
    
    createWeatherAnimation(weatherMain, iconCode) {
        // Create animation overlay container
        const overlay = document.createElement('div');
        overlay.className = 'weather-animation-overlay';
        
        // Determine animation type based on weather
        let animationType = weatherMain;
        if (weatherMain === 'clear') {
            animationType = 'clear';
        } else if (weatherMain === 'clouds') {
            animationType = 'clouds';
        } else if (weatherMain === 'rain' || weatherMain === 'drizzle') {
            animationType = 'rain';
        } else if (weatherMain === 'snow') {
            animationType = 'snow';
        } else if (weatherMain === 'thunderstorm') {
            animationType = 'thunderstorm';
        } else if (weatherMain === 'mist' || weatherMain === 'fog' || weatherMain === 'haze') {
            animationType = 'mist';
        }
        
        overlay.classList.add(`weather-animation-${animationType}`);
        
        // Add specific animation elements based on weather type
        this.addWeatherElements(overlay, animationType);
        
        // Add to DOM
        document.body.appendChild(overlay);
        
        // Activate with fade-in effect
        setTimeout(() => {
            overlay.classList.add('active');
        }, 100);
    }
    
    addWeatherElements(container, weatherType) {
        switch (weatherType) {
            case 'clouds':
                this.createCloudElements(container);
                break;
            case 'rain':
                this.createRainElements(container);
                break;
            case 'snow':
                this.createSnowElements(container);
                break;
            case 'thunderstorm':
                this.createThunderstormElements(container);
                break;
            case 'mist':
                this.createMistElements(container);
                break;
            // Clear/sunny animation is handled by CSS pseudo-elements
        }
    }
    
    createCloudElements(container) {
        // Create 3 animated clouds
        for (let i = 1; i <= 3; i++) {
            const cloud = document.createElement('div');
            cloud.className = `cloud cloud-${i}`;
            container.appendChild(cloud);
        }
    }
    
    createRainElements(container) {
        // Create multiple raindrops
        for (let i = 0; i < 50; i++) {
            const raindrop = document.createElement('div');
            raindrop.className = 'raindrop';
            raindrop.style.left = Math.random() * 100 + '%';
            raindrop.style.animationDelay = Math.random() * 2 + 's';
            raindrop.style.animationDuration = (Math.random() * 0.5 + 0.5) + 's';
            container.appendChild(raindrop);
        }
    }
    
    createSnowElements(container) {
        // Create snowflakes
        const snowflakeSymbols = ['❄', '❅', '❆'];
        for (let i = 0; i < 30; i++) {
            const snowflake = document.createElement('div');
            snowflake.className = 'snowflake';
            snowflake.textContent = snowflakeSymbols[Math.floor(Math.random() * snowflakeSymbols.length)];
            snowflake.style.left = Math.random() * 100 + '%';
            snowflake.style.animationDelay = Math.random() * 3 + 's';
            snowflake.style.animationDuration = (Math.random() * 2 + 2) + 's';
            snowflake.style.fontSize = (Math.random() * 10 + 10) + 'px';
            container.appendChild(snowflake);
        }
    }
    
    createThunderstormElements(container) {
        // Create lightning bolt
        const lightningBolt = document.createElement('div');
        lightningBolt.className = 'lightning-bolt';
        container.appendChild(lightningBolt);
        
        // Add some rain for thunderstorm
        this.createRainElements(container);
    }
    
    createMistElements(container) {
        // Create 3 mist layers
        for (let i = 1; i <= 3; i++) {
            const mistLayer = document.createElement('div');
            mistLayer.className = `mist-layer mist-${i}`;
            container.appendChild(mistLayer);
        }
    }
    
    addWeatherAnimation(weatherMain) {
        // Remove existing animations
        this.clearWeatherAnimations();
        
        // Create animation container
        const animationLayer = this.createAnimationLayer();
        
        switch (weatherMain.toLowerCase()) {
            case 'clear':
                this.createSunAnimation(animationLayer);
                break;
            case 'clouds':
                this.createCloudAnimation(animationLayer);
                break;
            case 'rain':
            case 'drizzle':
                this.createRainAnimation(animationLayer);
                break;
            case 'snow':
                this.createSnowAnimation(animationLayer);
                break;
            case 'thunderstorm':
                this.createThunderstormAnimation(animationLayer);
                break;
            case 'mist':
            case 'fog':
            case 'haze':
                this.createMistAnimation(animationLayer);
                break;
            default:
                this.createWindAnimation(animationLayer);
        }
    }
    
    createAnimationLayer() {
        const layer = document.createElement('div');
        layer.className = 'weather-animation-layer';
        layer.id = 'weatherAnimationLayer';
        document.body.appendChild(layer);
        return layer;
    }
    
    clearWeatherAnimations() {
        const existingLayer = document.getElementById('weatherAnimationLayer');
        if (existingLayer) {
            existingLayer.remove();
        }
    }
    
    createSunAnimation(container) {
        const sunContainer = document.createElement('div');
        sunContainer.className = 'sun-container';
        
        // Create sun rays
        for (let i = 0; i < 12; i++) {
            const ray = document.createElement('div');
            ray.className = 'sun-ray';
            ray.style.cssText = `
                left: 50%;
                top: 20%;
                transform-origin: bottom center;
                transform: rotate(${i * 30}deg);
                animation-delay: ${i * 0.1}s;
            `;
            sunContainer.appendChild(ray);
        }
        
        container.appendChild(sunContainer);
    }
    
    createCloudAnimation(container) {
        const cloudContainer = document.createElement('div');
        cloudContainer.className = 'cloud-container';
        
        // Create floating clouds
        for (let i = 0; i < 3; i++) {
            const cloud = document.createElement('div');
            cloud.className = 'floating-cloud';
            const size = 80 + Math.random() * 40;
            cloud.style.cssText = `
                width: ${size}px;
                height: ${size * 0.6}px;
                top: ${10 + i * 15}%;
                left: -200px;
                animation-delay: ${i * 7}s;
                animation-duration: ${20 + i * 5}s;
            `;
            
            // Add cloud details
            cloud.innerHTML = `
                <div style="
                    position: absolute;
                    width: ${size * 0.7}px;
                    height: ${size * 0.4}px;
                    background: rgba(255, 255, 255, 0.08);
                    border-radius: 50px;
                    top: -20%;
                    left: 20%;
                "></div>
                <div style="
                    position: absolute;
                    width: ${size * 0.5}px;
                    height: ${size * 0.3}px;
                    background: rgba(255, 255, 255, 0.06);
                    border-radius: 50px;
                    top: -10%;
                    right: 10%;
                "></div>
            `;
            
            cloudContainer.appendChild(cloud);
        }
        
        container.appendChild(cloudContainer);
    }
    
    createMistAnimation(container) {
        const mistContainer = document.createElement('div');
        mistContainer.className = 'mist-container';
        
        // Create mist layers
        for (let i = 0; i < 4; i++) {
            const mistLayer = document.createElement('div');
            mistLayer.className = 'mist-layer';
            mistLayer.style.cssText = `
                top: ${20 + i * 20}%;
                animation-delay: ${i * 2}s;
                animation-duration: ${15 + i * 3}s;
                opacity: ${0.3 - i * 0.05};
            `;
            mistContainer.appendChild(mistLayer);
        }
        
        container.appendChild(mistContainer);
    }
    
    createWindAnimation(container) {
        const windContainer = document.createElement('div');
        windContainer.className = 'wind-container';
        
        // Create wind particles
        for (let i = 0; i < 20; i++) {
            const particle = document.createElement('div');
            particle.className = 'wind-particle';
            particle.style.cssText = `
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
                animation-delay: ${Math.random() * 2}s;
                animation-duration: ${2 + Math.random() * 2}s;
            `;
            windContainer.appendChild(particle);
        }
        
        container.appendChild(windContainer);
    }
    
    showDemoData() {
        // Demo data to show how the app looks
        const demoData = {
            name: "Paris",
            sys: { country: "FR", sunrise: 1640156400, sunset: 1640188800 },
            weather: [{ main: "Clouds", description: "partly cloudy", icon: "02d" }],
            main: { temp: 18, feels_like: 20, humidity: 65, pressure: 1013 },
            wind: { speed: 3.5 },
            visibility: 10000
        };
        
        this.hideError();
        this.displayWeatherData(demoData);
        
        // Show demo notice
        setTimeout(() => {
            const notice = document.createElement('div');
            notice.style.cssText = `
                position: fixed;
                top: 20px;
                left: 50%;
                transform: translateX(-50%);
                background: rgba(255, 193, 7, 0.9);
                color: #000;
                padding: 12px 20px;
                border-radius: 8px;
                font-size: 14px;
                font-weight: 500;
                z-index: 1000;
                backdrop-filter: blur(10px);
            `;
            notice.textContent = '📱 Demo Mode - Get a valid API key for real data';
            document.body.appendChild(notice);
            
            setTimeout(() => notice.remove(), 5000);
        }, 1000);
    }
    
    createRainAnimation(container) {
        for (let i = 0; i < 20; i++) {
            const drop = document.createElement('div');
            drop.className = 'rain-drop';
            drop.style.cssText = `
                position: absolute;
                width: 2px;
                height: 10px;
                background: rgba(255, 255, 255, 0.6);
                border-radius: 1px;
                left: ${Math.random() * 100}%;
                animation: rainFall ${0.5 + Math.random() * 0.5}s linear infinite;
                animation-delay: ${Math.random() * 2}s;
            `;
            container.appendChild(drop);
        }
        
        // Add rain animation keyframes
        if (!document.querySelector('#rainAnimation')) {
            const style = document.createElement('style');
            style.id = 'rainAnimation';
            style.textContent = `
                @keyframes rainFall {
                    0% { transform: translateY(-100px); opacity: 1; }
                    100% { transform: translateY(100px); opacity: 0; }
                }
            `;
            document.head.appendChild(style);
        }
    }
    
    createSnowAnimation(container) {
        for (let i = 0; i < 15; i++) {
            const flake = document.createElement('div');
            flake.className = 'snow-flake';
            flake.style.cssText = `
                position: absolute;
                width: 4px;
                height: 4px;
                background: white;
                border-radius: 50%;
                left: ${Math.random() * 100}%;
                animation: snowFall ${2 + Math.random() * 2}s linear infinite;
                animation-delay: ${Math.random() * 2}s;
            `;
            container.appendChild(flake);
        }
        
        // Add snow animation keyframes
        if (!document.querySelector('#snowAnimation')) {
            const style = document.createElement('style');
            style.id = 'snowAnimation';
            style.textContent = `
                @keyframes snowFall {
                    0% { transform: translateY(-100px) rotate(0deg); opacity: 1; }
                    100% { transform: translateY(100px) rotate(360deg); opacity: 0; }
                }
            `;
            document.head.appendChild(style);
        }
    }
    
    createThunderstormAnimation(container) {
        const lightning = document.createElement('div');
        lightning.className = 'lightning';
        lightning.style.cssText = `
            position: absolute;
            width: 100%;
            height: 100%;
            background: rgba(255, 255, 255, 0.1);
            animation: lightning 3s infinite;
        `;
        container.appendChild(lightning);
        
        // Add lightning animation keyframes
        if (!document.querySelector('#lightningAnimation')) {
            const style = document.createElement('style');
            style.id = 'lightningAnimation';
            style.textContent = `
                @keyframes lightning {
                    0%, 90%, 100% { opacity: 0; }
                    5%, 10% { opacity: 1; }
                }
            `;
            document.head.appendChild(style);
        }
    }
}

// Utility Functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Enhanced Error Handling
window.addEventListener('error', (event) => {
    console.error('Global error:', event.error);
});

window.addEventListener('unhandledrejection', (event) => {
    console.error('Unhandled promise rejection:', event.reason);
});

// Network Status Monitoring
window.addEventListener('online', () => {
    console.log('Connection restored');
    const errorContainer = document.getElementById('errorContainer');
    if (errorContainer.classList.contains('show')) {
        const errorMessage = document.getElementById('errorMessage');
        if (errorMessage.textContent.includes('internet connection')) {
            errorContainer.classList.remove('show');
        }
    }
});

window.addEventListener('offline', () => {
    console.log('Connection lost');
});

// Performance Monitoring
if ('performance' in window) {
    window.addEventListener('load', () => {
        setTimeout(() => {
            const perfData = performance.getEntriesByType('navigation')[0];
            console.log(`Page load time: ${perfData.loadEventEnd - perfData.loadEventStart}ms`);
        }, 0);
    });
}

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Add loading class to body initially
    document.body.classList.add('loading');
    
    // Initialize the weather app
    const app = new WeatherApp();
    
    // Remove loading class after initialization
    setTimeout(() => {
        document.body.classList.remove('loading');
    }, 500);
    
    // Add smooth scroll behavior
    document.documentElement.style.scrollBehavior = 'smooth';
    
    // Add focus management for accessibility
    const focusableElements = document.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    
    // Keyboard navigation support
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Tab') {
            document.body.classList.add('keyboard-navigation');
        }
    });
    
    document.addEventListener('mousedown', () => {
        document.body.classList.remove('keyboard-navigation');
    });
});

// Service Worker Registration (for future PWA features)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        // Uncomment when you have a service worker
        // navigator.serviceWorker.register('/sw.js')
        //     .then(registration => console.log('SW registered'))
        //     .catch(error => console.log('SW registration failed'));
    });
}

// Export for testing purposes
if (typeof module !== 'undefined' && module.exports) {
    module.exports = WeatherApp;
}
