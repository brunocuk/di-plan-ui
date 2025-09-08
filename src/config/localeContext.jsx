// src/context/LocaleContext.js
import { createContext, useState, useContext, useEffect } from "react";

const LocaleContext = createContext();

export const LocaleProvider = ({ children }) => {
  // Try to get the locale from localStorage first, fallback to default
  const [locale, setLocale] = useState(() => {
    return localStorage.getItem("locale") || "hr-HR";
  });

  // Update localStorage whenever the locale changes
  useEffect(() => {
    localStorage.setItem("locale", locale);
  }, [locale]);

  return (
    <LocaleContext.Provider value={{ locale, setLocale }}>
      {children}
    </LocaleContext.Provider>
  );
};

export const useLocale = () => useContext(LocaleContext);
