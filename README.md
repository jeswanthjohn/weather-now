## Weather Now

Weather Now is a lightweight and accessible weather application built using Vanilla JavaScript.  
It retrieves real-time weather data from the OpenWeather API and demonstrates clean asynchronous control flow, UI state management, and maintainable frontend structure.

**Live Demo:**  
https://weather-now-jeswanth.netlify.app/

### Features

- Real-time weather lookup by city name  
- Asynchronous API handling using async/await  
- Clear loading, success, and error states  
- Accessible form inputs and user feedback messages  
- Clear separation of UI logic, API logic, and application flow  

### Tech Stack

- HTML5  
- CSS3  
- Vanilla JavaScript (ES6+)  
- OpenWeather REST API  
- Netlify (static deployment)

### How It Works

- The user submits a city name through a semantic and accessible form  
- The application requests weather data from the OpenWeather API  
- UI updates are managed through explicit loading and visibility states  
- Invalid inputs and API errors are handled gracefully without breaking the user experience  

### Known Limitations

- The API key is exposed on the frontend and is intended for demo purposes only  
- No caching is implemented for repeated city searches  
- The application is not production-ready without a backend proxy  

### Environment Setup (Local)

- Create a free OpenWeather account  
- Generate an API key  
- Replace the API key constant in `script.js`  
- Open `index.html` using a local server or browser  

### Author
 
**B. Jeswanth Reddy**  
Full Stack Developer (JavaScript | MERN | API-Driven & AI-Integrated Applications)