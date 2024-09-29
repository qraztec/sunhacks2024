"use client";
import { useState } from 'react';
import Footer from './components/Footer.js';
import Calendar from './components/Calendar.js'; 
import TaskPopup from './components/TaskPopUp.js'; 
import Register from './components/Register.js'; 
import Login from './components/Login.js'; 
import HobbyPopup from './components/HobbyPopUp.js'; 

export default function Home() {
  const [year, setYear] = useState(new Date().getFullYear());
  const [month, setMonth] = useState(new Date().getMonth());
  const [isTaskPopupOpen, setIsTaskPopupOpen] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [taskToEditIndex, setTaskToEditIndex] = useState(null); 
  const [isLoggedIn, setIsLoggedIn] = useState(false); 

  // Hobby state
  const [isHobbyPopupOpen, setIsHobbyPopupOpen] = useState(false); 
  const [hobbies, setHobbies] = useState([]); 

  // Handle Profile Click
  const handleProfileClick = () => {
    console.log("Profile clicked");
  };

  const [isLoginOpen, setIsLoginOpen] = useState(false); 
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);

  // Handle login
  const handleLogin = (userData) => {
    localStorage.setItem('user', JSON.stringify(userData)); 
    setIsLoggedIn(true); 
    setIsLoginOpen(false); 
  };

  // Handle register
  const handleRegister = (userData) => {
    localStorage.setItem('user', JSON.stringify(userData)); 
    setIsLoggedIn(true);
    setIsRegisterOpen(false); 
  };

  // Handle logging out
  const handleLogoutOrSignIn = () => {
    if (isLoggedIn) {
      localStorage.removeItem('user'); 
      setIsLoggedIn(false); 
    } else {
      setIsLoginOpen(true); 
    }
  };

  // Handle Year Change
  const handleYearChange = (e) => {
    let value = parseInt(e.target.value);
    if (value > 2025) value = 2024;
    if (value < 2000) value = 2000;
    setYear(value);
  };

  // Handle Month Change
  const handleMonthChange = (e) => {
    let value = parseInt(e.target.value);
    if (value > 12) value = 12;
    if (value < 1) value = 1;
    setMonth(value - 1);
  };

  // Open the popup for a new task
  const openTaskPopup = () => {
    setTaskToEditIndex(null); 
    setIsTaskPopupOpen(true);
  };

  // Close the task popup
  const closeTaskPopup = () => {
    setIsTaskPopupOpen(false);
  };

  // Save a new task or update an existing one
  const handleSaveTask = (taskData) => {
    if (taskToEditIndex !== null) {
      const updatedTasks = tasks.map((task, index) =>
        index === taskToEditIndex ? taskData : task
      );
      setTasks(updatedTasks);
    } else {
      setTasks([...tasks, taskData]);
    }
    setIsTaskPopupOpen(false); 
  };

  // Open the popup to edit a task
  const handleEditTask = (index) => {
    setTaskToEditIndex(index);
    setIsTaskPopupOpen(true); 
  };

  // Helper function to truncate the task name
  const truncateTaskName = (name) => {
    return name.length > 6 ? `${name.substring(0, 6)}...` : name;
  };

  // Open the hobby popup
  const openHobbyPopup = () => {
    setIsHobbyPopupOpen(true);
  };

  // Close the hobby popup
  const closeHobbyPopup = () => {
    setIsHobbyPopupOpen(false);
  };

  // Save a new hobby
  const handleSaveHobby = (newHobby) => {
    setHobbies([...hobbies, newHobby]);
    setIsHobbyPopupOpen(false); 
  };

  return (
    <div className="flex flex-col min-h-screen">
      <header className="header">
        <div className="left-section">
          <a href="https://imgbb.com/">
            <img 
              src="https://i.ibb.co/X5849y8/hbslogo.png" 
              alt="Hobbies Sync Logo" 
              className="logo" 
              style={{ height: '40px', width: 'auto' }} 
            />
          </a>
          <div className="menu-section">
            <div className="dropdown menu-dropdown">
              <button className="dropbtn">
                Menu <i className="arrow down"></i>
              </button>
              <div className="dropdown-content">
                <a href="#home">Home</a>
                <a href="#about">About</a>
                <a href="#contact">Contact</a>
              </div>
            </div>
          </div>
        </div>
        <div className="dropdown profile-dropdown">
          <button className="dropbtnp">
            <img src="https://via.placeholder.com/40" alt="Profile Icon" className="profile-icon" />
          </button>
          <div className="dropdown-contentp">
            <a href="#profile" onClick={handleProfileClick}>Profile</a>
            <a href="#settings">Settings</a>
            <a href="#login-logout" onClick={handleLogoutOrSignIn}>
              {isLoggedIn ? 'Logout' : 'Sign In'}
            </a>
            {!isLoggedIn && (
              <a href="#register" onClick={() => setIsRegisterOpen(true)}>Register</a>
            )}
          </div>
        </div>
      </header>

      <main className="flex-grow">
        <div className="container mx-auto px-4 pb-4">

          <button onClick={openTaskPopup} className="px-4 py-2 bg-green-500 text-white rounded absolute right-4">
            Add Task
          </button>

          <button onClick={openHobbyPopup} className="px-4 py-2 bg-blue-500 text-white rounded absolute right-28">
            Add Hobby
          </button>

          {/* Task Popup */}
          {isTaskPopupOpen && (
            <TaskPopup
              onClose={closeTaskPopup}
              onSave={handleSaveTask}
              taskData={taskToEditIndex !== null ? tasks[taskToEditIndex] : {}}
            />
          )}

          {/* Hobby Popup */}
          {isHobbyPopupOpen && (
            <HobbyPopup onClose={closeHobbyPopup} onSave={handleSaveHobby} />
          )}

          <div className="container mx-auto px-4 pb-4"> 
            <div className="flex gap-4 mb-4">
              {/* Year Dropdown */}
              <div>
                <label htmlFor="year" className="block text-lg font-medium">
                  Year:
                </label>
                <select
                  id="year"
                  value={year}
                  onChange={handleYearChange}
                  className="border border-gray-300 p-2 rounded"
                >
                  {Array.from({ length: 31 }, (_, i) => i + 2000).map((yr) => (
                    <option key={yr} value={yr}>
                      {yr}
                    </option>
                  ))}
                </select>
              </div>

              {/* Month Dropdown */}
              <div>
                <label htmlFor="month" className="block text-lg font-medium">
                  Month:
                </label>
                <select
                  id="month"
                  value={month}
                  onChange={handleMonthChange}
                  className="border border-gray-300 p-2 rounded"
                >
                  {["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"].map(
                    (monthName, index) => (
                      <option key={index} value={index}>
                        {monthName}
                      </option>
                    )
                  )}
                </select>
              </div>
            </div>
          </div>

          {/* Render Calendar component with tasks */}
          <Calendar year={year} month={month} tasks={tasks} onEditTask={handleEditTask} />

          {/* List of hobbies */}
          <ul className="mt-4">
            {hobbies.map((hobby, index) => (
              <li key={index} className="py-1">
                {hobby.hobbyName} (Difficulty: {hobby.difficulty}) - {hobby.description}
              </li>
            ))}
          </ul>
        </div>
      </main>

      <Footer />

      {/* Login Modal */}
      {isLoginOpen && (
        <Login
          onClose={() => setIsLoginOpen(false)} 
          onLogin={handleLogin} 
        />
      )}

      {/* Register Modal */}
      {isRegisterOpen && (
        <Register
          onClose={() => setIsRegisterOpen(false)}
          onRegister={handleRegister}
        />
      )}
    </div>
  );
}
