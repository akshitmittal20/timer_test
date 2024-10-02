

import { useState, useEffect } from 'react';

// UserTimeTracker component to track the time spent on the site
const UserTimeTracker = () => {
  // Initialize timeSpent with the saved value from localStorage or 0 if not present
  const [timeSpent, setTimeSpent] = useState(() => {
    const savedTime = localStorage.getItem('timeSpent');
    return savedTime ? parseInt(savedTime, 10) : 0; // Start with saved time or 0
  });

  useEffect(() => {
    const startTime = Date.now();

    // Update time every second
    const timer = setInterval(() => {
      setTimeSpent((prevTimeSpent) => {
        const newTime = prevTimeSpent + 1; // Increment time spent
        localStorage.setItem('timeSpent', newTime.toString()); // Update localStorage
        return newTime; // Return the new time
      });
    }, 1000);

    // Cleanup the interval when the component unmounts
    return () => {
      clearInterval(timer); // Clear the timer
      const currentTime = Date.now();
      const timeDiff = Math.floor((currentTime - startTime) / 1000); // Calculate session time
      const totalTime = timeSpent + timeDiff; // Add session time to the time spent
      localStorage.setItem('timeSpent', totalTime.toString()); // Store total time spent
    };
  }, [timeSpent]); // Depend on timeSpent to keep it updated

  return (
    <div>
      <h1>Time spent on site: {timeSpent} seconds</h1>
    </div>
  );
};

function App() {
  return (
    <div>
      <h1>POSTS</h1>
      <UserTimeTracker />
    </div>
  );
}

export default App;
