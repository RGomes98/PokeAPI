import { BrowserRouter as Router } from 'react-router-dom';

import { PokeRoutes } from './routes/PokeRoutes';
import { PokeAPIContextProvider } from './context/PokeAPIContext';

import './stylesheets/global.scss';

export const App: React.FC = () => {
  return (
    <PokeAPIContextProvider>
      <Router>
        <PokeRoutes />
      </Router>
    </PokeAPIContextProvider>
  );
};
