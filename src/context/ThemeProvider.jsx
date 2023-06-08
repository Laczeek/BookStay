import { useState, createContext, useEffect, useMemo } from 'react';
import { ThemeProvider, CssBaseline, createTheme } from '@mui/material';

export const ColorModeContext = createContext({ toggleColorMode: () => {} });

const ThemeProviderComponent = props => {
	const [mode, setMode] = useState(localStorage.getItem('theme-mode') || 'light');

	const toggleModeHandler = () => {
		setMode(prevState => (prevState === 'light' ? 'dark' : 'light'));
	};

	useEffect(() => {
		localStorage.setItem('theme-mode', mode);
	}, [mode]);

    const theme = useMemo(
        () =>
          createTheme({
            palette: {
              mode,
            },
          }),
        [mode],
      );
    

	return (
		<ColorModeContext.Provider value={{ toggleColorMode: toggleModeHandler }}>
			<ThemeProvider theme={theme}>
				<CssBaseline />
				{props.children}
			</ThemeProvider>
		</ColorModeContext.Provider>
	);
};

export default ThemeProviderComponent;
