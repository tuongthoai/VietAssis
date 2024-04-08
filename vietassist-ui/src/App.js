import React from "react";
import MainScreen from "./components/MainScreen/MainScreen";
import { primary } from "./theme/colors";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Box } from '@mui/material'
import { blue } from '@mui/material/colors'

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
