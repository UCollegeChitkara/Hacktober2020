import React from "react";

// to maintain theme state 
const [isLightTheme, setIsLightTheme] = React.useState(false);

// to toggle theme
const toggleTheme = setIsLightTheme(!isLightTheme);


const themes = {
  light: {
    foreground: "#222831",
    background: "#eeeeee"
  },
  dark: {
    foreground: "#eeeeee",
    background: "#222831"
  }
};

const defaultContextData = {
  theme: themes.dark,
  toggle: toggleTheme
}

const themeContext = React.createContext(defaultContextData);

export const themeContextProvider = children => {
  <ThemeContext.Provider value={{ isLightTheme, toggleTheme }}>
    {children}
  </ThemeContext.Provider>;
};