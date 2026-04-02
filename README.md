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

### Accessibility Considerations

- Input focus is managed to support keyboard-first interaction  
- Error and status messages are clearly surfaced to users  
- Form behavior is predictable and does not rely on mouse interactions  

These improvements ensure the application remains usable across different interaction patterns.

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

### API Flow & State Management

The application follows a controlled request lifecycle to ensure predictable UI behavior:

1. Input is validated before any API request is made  
2. Ongoing requests are safely handled using request cancellation to prevent race conditions during rapid submissions    
3. The UI transitions into a loading state while disabling user input  
4. API responses are processed and mapped to UI updates (success or error)  
5. The loading state is cleared and input is re-enabled after completion  

This approach ensures consistent user experience and prevents race conditions during rapid interactions.

### Input Handling & UI Consistency

The application enforces a consistent input and UI lifecycle to maintain predictable behavior:

- User input is normalized before validation to ensure consistent processing
- Validation is performed prior to triggering any API request
- UI state (messages, weather card) is reset before each new request
- Loading state is explicitly controlled to prevent stale or overlapping UI states

This ensures that each request starts from a clean state and avoids residual UI inconsistencies during rapid interactions.


### Known Limitations

- The API key is exposed on the frontend and is intended for demo purposes only  
- No caching is implemented for repeated city searches  
- The application is not production-ready without a backend proxy  

### Error Handling Strategy

The application distinguishes between different failure scenarios to provide meaningful feedback:

- Network failures (e.g., offline or connectivity issues)  
- API-level errors (e.g., invalid city, unauthorized access)  
- Unexpected or malformed responses  

Errors are caught and surfaced through a centralized UI messaging system, ensuring that failures do not break the application flow.

### Environment Setup (Local)

- Create a free OpenWeather account  
- Generate an API key  
- Replace the API key constant in `script.js`  
- Open `index.html` using a local server or browser  

### Author
 
**B. Jeswanth Reddy**  
Full Stack Developer (JavaScript | MERN | API-Driven & AI-Integrated Applications)