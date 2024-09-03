// TwitterHomepage.js

import React from 'react';
import './App.css'

const App = () => {
  return (
    <div className="twitter-homepage">
      {/* Header */}
      <header>
        {/* Twitter logo and navigation */}
        <div className="logo">Twitter</div>
        <nav>
          {/* Navigation links */}
          <a href="#">Home</a>
          <a href="#">Explore</a>
          <a href="#">Notifications</a>
          <a href="#">Messages</a>
        </nav>
        {/* Search bar */}
        <div className="search-bar">
          <input type="text" placeholder="Search Twitter" />
        </div>
        {/* User profile section */}
        <div className="user-profile">
          {/* User profile image and username */}
          <img src="https://placekitten.com/40/40" alt="User profile" />
          <span>John Doe</span>
        </div>
      </header>

      {/* Main content */}
      <main>
        {/* Tweet input */}
        <div className="tweet-input">
          <textarea placeholder="What's happening?" />
          <button>Tweet</button>
        </div>
        {/* Timeline */}
        <div className="timeline">
          {/* Tweet components will go here */}
          <div className="tweet">
            <img src="https://placekitten.com/40/40" alt="User profile" />
            <div>
              <span>John Doe</span>
              <p>This is a tweet!</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default App

