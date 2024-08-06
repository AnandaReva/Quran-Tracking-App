// src/pages/ReadPage.jsx
import React, { useState, useEffect } from "react";
import Drawer from "../components/Drawer";
import Header from "../components/Header";
import "typeface-fira-sans";
import { Button } from "@mui/material";

// Ensure that the `window` object is available
const ReadPage = ({ signOut }) => {
  const [open, setOpen] = useState(false);
  const [userLoginData, setUserLoginData] = useState(null);
  const [darkMode, setDarkMode] = useState(
    () => window.localStorage.getItem("dark-mode") === "true"
  );

  useEffect(() => {
    const storedUser = localStorage.getItem("userLoginData");
    if (storedUser) {
      setUserLoginData(JSON.parse(storedUser));
    }
    document.documentElement.classList.toggle("dark", darkMode);
    window.localStorage.setItem("dark-mode", darkMode);

    // Initialize Selectize after the component mounts
    if (window.$) {
      // Initialize Selectize for Surah
      window.$("#select-surah").selectize({
        sortField: "text",
      });

      // Initialize Selectize for Ayah
      window.$("#select-ayah").selectize({
        sortField: "text",
      });
    }

    // Clean up the Selectize instances on component unmount
    return () => {
      if (window.$) {
        // Clean up Selectize for Surah
        const selectSurah = window.$("#select-surah")[0]?.selectize;
        if (selectSurah) {
          selectSurah.destroy();
        }

        // Clean up Selectize for Ayah
        const selectAyah = window.$("#select-ayah")[0]?.selectize;
        if (selectAyah) {
          selectAyah.destroy();
        }
      }
    };
  }, [darkMode]);

  const toggleDrawer = () => {
    setOpen(!open);
  };

  const toggleDarkMode = () => {
    setDarkMode((prevMode) => !prevMode);
  };

  const onSubmitSearch = (e) => {
    e.preventDefault();
    // Handle form submission
  };

  return (
    <div
      className={`flex flex-col min-h-screen font-fira-sans ${
        darkMode
          ? "bg-darkBackground text-darkText"
          : "bg-gray-100 text-gray-800"
      }`}
    >
      {/* Header */}
      <Header
        darkMode={darkMode}
        toggleDarkMode={toggleDarkMode}
        toggleDrawer={toggleDrawer}
      />

      <Drawer open={open} toggleDrawer={toggleDrawer} darkMode={darkMode} />

      {/* Main Content */}
      <div className="flex flex-1">
        <main
          className={`flex-1 p-8 shadow-md m-4 rounded-lg ${
            darkMode ? "bg-gray-800" : "bg-white"
          }`}
        >
          <h2
            className={`text-3xl font-semibold mb-6 text-center ${
              darkMode ? "text-white" : "text-gray-800"
            }`}
          >
            Read Quran
          </h2>

          <div
            className={`bg-gray-800 text-center py-4 rounded-lg shadow-md mb-6 ${
              darkMode ? "bg-white" : "bg-gray-800"
            }`}
          >
            <form onSubmit={onSubmitSearch}>
              <label
                className={` ${darkMode ? "text-gray-800" : "text-white"} mb-2`}
              >
                Surah
              </label>
              <br />
              <select
                id="select-surah"
                className={` ${
                  darkMode ? "text-white bg-gray-800" : "text-gray-800 bg-white"
                } mb-2`}
              >
                <option value="">Select Surah</option>
                <option value="AL">Alabama</option>
                <option value="AK">Alaska</option>
                <option value="AZ">Arizona</option>
                <option value="AR">Arkansas</option>
                <option value="CA">California</option>
                <option value="CO">Colorado</option>
                <option value="CT">Connecticut</option>
                <option value="DE">Delaware</option>
                <option value="DC">District of Columbia</option>
                <option value="FL">Florida</option>
                <option value="GA">Georgia</option>
                <option value="HI">Hawaii</option>
                <option value="ID">Idaho</option>
                <option value="IL">Illinois</option>
                <option value="IN">Indiana</option>
              </select>

              <label
                className={` ${darkMode ? "text-gray-800" : "text-white"} mb-2`}
              >
                Ayah
              </label>
              <br />
              <select
                id="select-ayah"
                className={` ${
                  darkMode ? "text-white bg-gray-800" : "text-gray-800 bg-white"
                } mb-2`}
              >
                <option value="">Select Ayah</option>
                <option value="AL">Alabama</option>
                <option value="AK">Alaska</option>
                <option value="AZ">Arizona</option>
                <option value="AR">Arkansas</option>
                <option value="CA">California</option>
                <option value="CO">Colorado</option>
                <option value="CT">Connecticut</option>
                <option value="DE">Delaware</option>
                <option value="DC">District of Columbia</option>
                <option value="FL">Florida</option>
                <option value="GA">Georgia</option>
                <option value="HI">Hawaii</option>
                <option value="ID">Idaho</option>
                <option value="IL">Illinois</option>
                <option value="IN">Indiana</option>
              </select>

              <button
                type="submit"
                className="bg-blue-500 text-white py-2 px-4 rounded"
              >
                Submit
              </button>
            </form>
          </div>
        </main>
      </div>

      {/* Footer */}
      <footer
        className={`text-center p-4 shadow-md ${
          darkMode ? "bg-gray-800 text-white" : "bg-gray-800 text-white"
        }`}
      >
        <p>
          &copy; {new Date().getFullYear()} Quran Tracker. All rights reserved.
        </p>
      </footer>
    </div>
  );
};

export default ReadPage;
