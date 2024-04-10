import React from "react";
import MainScreen from "./components/MainScreen/MainScreen";
import { primary } from "./theme/colors";
import { ThemeProvider, createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: primary,
  },
})

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <MainScreen />
    </ThemeProvider>
  );
};

export default App;
