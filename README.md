# 🌤️ Stunning Weather App

A beautiful, modern weather application built with vanilla HTML, CSS, and JavaScript featuring glassmorphism design, smooth animations, and responsive layout.

![Weather App Preview](https://via.placeholder.com/800x600/667eea/ffffff?text=Beautiful+Weather+App)

## ✨ Features

- **🎨 Modern UI Design**: Glassmorphism and neomorphism styling with gradient backgrounds
- **📱 Fully Responsive**: Optimized for mobile, tablet, and desktop devices
- **🌈 Dynamic Backgrounds**: Background changes based on weather conditions and time of day
- **⚡ Smooth Animations**: Fade-in, slide-in, and weather-specific animations
- **🌧️ Weather Animations**: Rain, snow, and lightning effects based on current weather
- **🔍 Real-time Search**: Search for any city worldwide
- **📊 Comprehensive Data**: Temperature, humidity, wind speed, visibility, pressure, sunrise/sunset
- **♿ Accessible**: Keyboard navigation and screen reader support
- **🌙 Dark Mode Friendly**: Adapts to system preferences
- **⚡ Fast Loading**: Optimized performance with loading states

## 🚀 Quick Start

### 1. Get Your API Key

1. Visit [OpenWeatherMap](https://openweathermap.org/api)
2. Sign up for a free account
3. Go to your API keys section
4. Copy your API key

### 2. Setup the App

1. Clone or download this repository
2. Open `script.js` in your text editor
3. Replace `YOUR_API_KEY_HERE` with your actual API key:
   ```javascript
   this.API_KEY = 'your_actual_api_key_here';
   ```
4. Save the file

### 3. Run the App

Simply open `index.html` in your web browser, or use a local server:

```bash
# Using Python 3
python -m http.server 8000

# Using Node.js (if you have http-server installed)
npx http-server

# Using PHP
php -S localhost:8000
```

Then visit `http://localhost:8000` in your browser.

## 🎯 Usage

1. **Search for a City**: Enter any city name in the search box and press Enter or click Search
2. **View Weather Data**: See current temperature, weather conditions, and detailed metrics
3. **Enjoy Animations**: Watch as the background and animations change based on weather
4. **Responsive Design**: Use on any device - the layout adapts automatically

## 🛠️ Technical Details

### Technologies Used
- **HTML5**: Semantic markup with accessibility features
- **CSS3**: Modern features including Grid, Flexbox, backdrop-filter, custom properties
- **JavaScript ES6+**: Async/await, classes, modules, fetch API
- **OpenWeatherMap API**: Real-time weather data

### Browser Support
- Chrome 88+
- Firefox 94+
- Safari 15.4+
- Edge 88+

### Performance Features
- Optimized animations with `transform` and `opacity`
- Efficient API calls with error handling
- Responsive images and icons
- Minimal DOM manipulation

## 🎨 Customization

### Changing Colors
Edit the CSS custom properties in `style.css`:

```css
:root {
    --primary-gradient: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    --secondary-gradient: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
    --accent-gradient: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
    /* ... more variables */
}
```

### Adding New Weather Animations
Extend the `addWeatherAnimation` method in `script.js`:

```javascript
addWeatherAnimation(weatherMain) {
    switch (weatherMain.toLowerCase()) {
        case 'your-weather-type':
            this.createYourAnimation(animationContainer);
            break;
        // ... existing cases
    }
}
```

### Modifying Layout
The app uses CSS Grid and Flexbox for responsive layouts. Key classes:
- `.weather-details-grid`: Main grid layout for weather details
- `.search-container`: Search input and button layout
- `.main-weather-card`: Primary weather display card

## 🔧 API Configuration

### Rate Limits
- Free tier: 1,000 calls/day, 60 calls/minute
- Paid tiers available for higher limits

### Supported Data
- Current weather conditions
- Temperature (actual and feels-like)
- Humidity, pressure, visibility
- Wind speed and direction
- Sunrise and sunset times
- Weather icons and descriptions

## 🐛 Troubleshooting

### Common Issues

**"API Key Required" Error**
- Make sure you've replaced `YOUR_API_KEY_HERE` with your actual API key
- Verify your API key is active (can take a few hours after signup)

**"City not found" Error**
- Check spelling of the city name
- Try including country code: "London, UK"
- Some small cities might not be in the database

**Loading Issues**
- Check your internet connection
- Verify the API key is correct
- Check browser console for detailed error messages

**Styling Issues**
- Ensure your browser supports modern CSS features
- Try refreshing the page
- Check if browser extensions are interfering

## 📱 Mobile Optimization

The app is optimized for mobile devices with:
- Touch-friendly button sizes (minimum 44px)
- Responsive typography using `clamp()`
- Optimized layouts for small screens
- Fast loading on slower connections

## ♿ Accessibility Features

- Semantic HTML structure
- ARIA labels and roles
- Keyboard navigation support
- High contrast mode support
- Screen reader compatibility
- Reduced motion support for users with vestibular disorders

## 🔮 Future Enhancements

Potential features to add:
- [ ] 5-day weather forecast
- [ ] Weather maps integration
- [ ] Location-based weather (geolocation)
- [ ] Weather alerts and notifications
- [ ] Historical weather data
- [ ] Multiple city comparison
- [ ] Weather widgets
- [ ] PWA features (offline support, install prompt)
- [ ] Voice search
- [ ] Weather-based recommendations

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request. For major changes, please open an issue first to discuss what you would like to change.

## 📞 Support

If you encounter any issues or have questions:
1. Check the troubleshooting section above
2. Search existing issues on GitHub
3. Create a new issue with detailed information

## 🙏 Acknowledgments

- [OpenWeatherMap](https://openweathermap.org/) for the weather API
- [Google Fonts](https://fonts.google.com/) for the beautiful typography
- Inspiration from modern weather app designs

---

**Made with ❤️ and modern web technologies**
