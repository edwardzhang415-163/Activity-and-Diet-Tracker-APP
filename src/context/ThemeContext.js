import React, { createContext, useState, useContext } from 'react';
import { styles } from '../styles';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const theme = {
    backgroundColor: isDarkMode ? styles.colors.darkBackground : styles.colors.lightBackground,
    textColor: isDarkMode ? styles.colors.lightText : styles.colors.darkText,
    isDarkMode,
    toggleTheme: () => setIsDarkMode(prev => !prev)
  };

  return (
    <ThemeContext.Provider value={theme}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);