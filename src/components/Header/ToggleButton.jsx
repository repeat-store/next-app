"use client";
import React from 'react';
import './ToggleButton.css';
import { useTheme } from './ThemeContext';

const Switch = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="theme-toggle-wrapper">
      <label className="toggle-switch">
        <input
          type="checkbox"
          checked={theme === 'dark'}
          onChange={toggleTheme}
        />
        <span className="slider">
          <div className="clouds">
            <svg viewBox="0 0 100 100" className="cloud cloud1">
              <path d="M30,45 Q35,25 50,25 Q65,25 70,45 Q80,45 85,50 Q90,55 85,60 Q80,65 75,60 Q65,60 60,65 Q55,70 50,65 Q45,70 40,65 Q35,60 25,60 Q20,65 15,60 Q10,55 15,50 Q20,45 30,45" />
            </svg>
            <svg viewBox="0 0 100 100" className="cloud cloud2">
              <path d="M30,45 Q35,25 50,25 Q65,25 70,45 Q80,45 85,50 Q90,55 85,60 Q80,65 75,60 Q65,60 60,65 Q55,70 50,65 Q45,70 40,65 Q35,60 25,60 Q20,65 15,60 Q10,55 15,50 Q20,45 30,45" />
            </svg>
          </div>
        </span>
      </label>
    </div>
  );
};

export default Switch;
