import React, { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setTime, incrementTime } from "../../Redux/TimeSlice"; // Import Redux actions
import "./TimeScale.css";

// Time Component
const Time = () => {
  const time = useSelector((state) => state.time.value); // Access time from Redux
  const dispatch = useDispatch(); // Get dispatch function from Redux
  const timelineRef = useRef(null); // Reference for the timeline
  const [isDragging, setIsDragging] = useState(false); // State for manual dragging
  const autoIncrementRef = useRef(null); // Reference for the auto-increment interval
  const [isPaused, setIsPaused] = useState(false); // Pause after interaction
  // Automatic time increment
  // useEffect(() => {
  //   if (!isPaused) {
  //     autoIncrementRef.current = setInterval(() => {
  //       dispatch(incrementTime(10)); // Increment time by 10 each second
  //     }, 1000); // Every second
  //   }

  //   return () => clearInterval(autoIncrementRef.current); // Cleanup
  // }, [isPaused, dispatch]);

  // Function to handle horizontal scrolling
  const handleScroll = (event) => {
    // Check if the scroll is horizontal (deltaX)
    if (event.deltaY === 0) { // No vertical scroll
      const scrollDirection = event.deltaX > 0 ? -1 : 1; // Right (+1) or left (-1)
      let newTime = time + (scrollDirection * 15); // Increment time by 15
  
      // Ensure the newTime is within the min (-3000) and max (2000) limits
      newTime = Math.max(-3000, Math.min(2024, newTime));
  
      dispatch(setTime(newTime)); // Update time in Redux
  
      setIsPaused(true); // Temporary pause
      setTimeout(() => setIsPaused(false), 2000); // Resume after 2 seconds
    } else {
      // Prevent vertical scroll from scrolling the page
      event.preventDefault();
    }
  };
  

  // Function to start manual dragging
  const handleMouseDown = () => {
    setIsDragging(true);
    clearInterval(autoIncrementRef.current); // Stop auto-increment
    setIsPaused(true);
  };

  // Function to stop manual dragging
  const handleMouseUp = () => {
    setIsDragging(false);
    // Resume auto-increment after 2 seconds
    setTimeout(() => setIsPaused(false), 2000);
  };

  // Function to move the indicator
  const handleMouseMove = (event) => {
    if (!isDragging || !timelineRef.current) return;

    const timeline = timelineRef.current;
    const rect = timeline.getBoundingClientRect(); // Position and size of the timeline
    const x = event.clientX - rect.left; // X position relative to the timeline
    const newTime = Math.max(-3100, Math.min(2024, (x / rect.width) * (2024 - (-3100)) + (-3100))); // Limit between -3100 and 2024
    dispatch(setTime(newTime)); // Update the global Redux state
  };

  // Display the date with "BC" for before Christ, "AD" for after Christ
  const formatTime = (time) => {
    if (time < 0) {
      return `${Math.abs(Math.round(time))} BC`; // Before Christ
    } else {
      return `${Math.round(time)} AD`; // After Christ
    }
  };

  return (
    <div
      className="timeline-container"
      onMouseMove={handleMouseMove} // Track mouse movement
      onMouseUp={handleMouseUp} // Stop dragging
      onWheel={handleScroll} // Handle horizontal scrolling
    >
      {/* Display the timeline */}
      <div
        ref={timelineRef} // Reference for the timeline
        className="timeline"
      >
        {/* Time indicator */}
        <div
          onMouseDown={handleMouseDown} // Start dragging
          className="timeline-indicator"
          style={{
            left: `${((time - (-3100)) / (2024 - (-3100))) * 100}%`,
          }}
        ></div>
      </div>
      <p className="time-display">
        Year : {formatTime(time)}
      </p>
    </div>
  );
};

export default Time;
