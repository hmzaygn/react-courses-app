import { Provider } from "react-redux";
import store, { persistor } from "./app/store";
import { PersistGate } from "redux-persist/integration/react";
import { green, indigo } from "@mui/material/colors";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import AppRouter from "./router/AppRouter";

function App() {
  const theme = createTheme({
    palette: {
      primary: {
        main: green["800"],
      },
      secondary: {
        main: indigo["900"],
      },
    },
  });

  return (
    <>
      <ThemeProvider theme={theme}>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <AppRouter />
          </PersistGate>
        </Provider>
      </ThemeProvider>
    </>
  );
}

export default App;
