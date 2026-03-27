import { createContext, useContext, useState, useEffect } from "react";

const ThemeContext = createContext();

/**
 * Provider del tema Rick & Morty.
 *
 * SRP: Solo maneja el estado del tema (dark/light) y aplica el atributo
 *      data-theme al <html>. Los componentes solo consumen el tema.
 *
 * Persiste la preferencia en localStorage.
 */
export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("theme") || "dark";
  });

  // Aplicamos el atributo data-theme al <html> cada vez que cambia
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

/**
 * Hook para acceder al tema.
 * @returns {{ theme: "dark" | "light", toggleTheme: () => void }}
 */
export function useTheme() {
  return useContext(ThemeContext);
}
