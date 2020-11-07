import './App.css';
import ShopTable from './shared/ShopTable/ShopTable'
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  typography: {
    fontFamily: [
      'Montserrat',
    ].join(','),
  },});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <h1>Hello World</h1>
        <ShopTable />
      </div>
    </ThemeProvider>
  );
}

export default App;
