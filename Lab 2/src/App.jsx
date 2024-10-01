import React, { useState } from 'react';
import './App.css';
import samosaImage from './assets/photos/samosa.png';

function App() {
  // Initialize state variables
  const [count, setCount] = useState(0);
  const [multiplier] = useState(1); // Initial multiplier value is 1

  // Function to update count when samosa is clicked
  const updateCount = () => setCount(count + multiplier);

  return (
    <div className="App">
      <div className="header">
        <h1>Samosa Selector</h1>
        {/* Display the current count */}
        <h2>Count: {count}</h2>
        {/* Add the onClick event to the image */}
        <img
          className="samosa"
          src={samosaImage}
          alt="Samosa"
          onClick={updateCount}
        />
      </div>
    </div>
  );
}

export default App;
