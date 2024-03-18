import { useEffect, useState, createContext, useContext } from 'react';

export enum AppTheme {
  dark = 'dark',
  light = 'light'
}

const LSKey = 'portfolio_app_theme_v1'

const getInitialAppTheme = () => {
  try {
    const data = localStorage.getItem(LSKey)
    if(data && Object.keys(AppTheme).includes(data)) {
      return data as AppTheme
    }
  } catch (e) {}
  return AppTheme.dark
}

const initialTheme = getInitialAppTheme()

const AppThemeContext = createContext(initialTheme);
const AppThemeDispatchContext = createContext((theme: AppTheme) => {});

export const AppThemeProvider = ({ children }: any) => {
  const [theme, setTheme] = useState(initialTheme);

  useEffect(() => {
    console.log('update theme', theme)
    localStorage.setItem(LSKey, theme)
  }, [theme]);

  return <AppThemeContext.Provider value={theme}>
    <AppThemeDispatchContext.Provider value={setTheme}>
      {children}
    </AppThemeDispatchContext.Provider>
  </AppThemeContext.Provider>
}

export const useAppTheme = () => {
  return useContext(AppThemeContext)
}

export const useDispatchAppTheme = () => {
  return useContext(AppThemeDispatchContext)
}
