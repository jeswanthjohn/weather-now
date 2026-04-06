## Weather Now

Weather Now is a frontend-focused weather application designed to demonstrate robust API handling, controlled UI state management, and predictable asynchronous behavior using Vanilla JavaScript.

It emphasizes handling real-world scenarios such as rapid user input, API failures, race conditions, and redundant request prevention while maintaining a clean and accessible user experience.

**Live Demo:**  
https://weather-now-jeswanth.netlify.app/

### Features

- Real-time weather lookup by city name  
- Asynchronous API handling using async/await  
- Clear loading, success, and error states  
- Accessible form inputs and user feedback messages  
- Clear separation of UI logic, API logic, and application flow 
- Request cancellation using AbortController to prevent race conditions  
- Prevention of redundant API calls for repeated searches 

### Key Engineering Decisions

- **Request Cancellation over Request Locking**  
  Ongoing requests are cancelled instead of blocking user interaction, ensuring only the latest response updates the UI.
- **Explicit UI State Management**  
  Loading, success, and error states are handled explicitly to prevent inconsistent UI behavior.
- **Redundant Request Prevention**  
  Repeated searches for the same city are skipped to avoid unnecessary API calls.
- **Separation of Concerns**  
  API interaction, UI rendering, and application flow are structured into distinct functions.

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

- User input is normalized and validated before triggering any API interaction  
- Previous requests are cancelled before initiating a new one to prevent stale updates  
- The application transitions through explicit UI states: idle → loading → success/error  
- API responses are validated and safely mapped to UI components  
- UI updates occur only after successful data verification to maintain consistency  

### API Flow & State Management

The application follows a controlled request lifecycle to ensure predictable UI behavior:

1. Input is validated before any API request is made  
2. Ongoing requests are safely handled using request cancellation to prevent race conditions during rapid submissions    
3. Redundant requests for the same city are skipped to avoid unnecessary API calls  
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
- No multi-city caching is implemented (only last-search optimization is present)    
- The application is not production-ready without a backend proxy  

### Tradeoffs

- **No Backend Proxy**  
  Prioritized simplicity and ease of deployment over API key security 
- **No Full Caching Layer**  
  Avoided added complexity; only redundant request prevention is implemented
- **Manual State Management**  
  State is handled without frameworks to keep the implementation simple but less scalable  

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