import { SnackbarProvider } from 'notistack';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import './App.css';
import Home from './Components/Home/Home';
import Lobby from './Components/Lobby/Lobby';


const MAX_SNACKBARS = 3;

const App = () => {

  return (
    <SnackbarProvider maxSnack={MAX_SNACKBARS}>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/:lobbyCode" element={<Lobby />} />
        </Routes>
      </Router>
    </SnackbarProvider>
  )
}

export default App
