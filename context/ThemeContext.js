import React, { createContext, useContext, useState } from 'react';
import { styles } from '../constants/styles';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const theme = {
    backgroundColor: isDarkMode ? styles.darkMode.backgroundColor : styles.lightMode.backgroundColor,
    textColor: isDarkMode ? styles.darkMode.textColor : styles.lightMode.textColor,
    toggleTheme: () => setIsDarkMode(prev => !prev),
    isDarkMode
  };

  return (
    <ThemeContext.Provider value={theme}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);