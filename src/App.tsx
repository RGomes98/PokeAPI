import { BrowserRouter as Router } from 'react-router-dom';

import './stylesheets/global.scss';
import { PokeRoutes } from './routes/PokeRoutes';
import { PokeAPIContextProvider } from './context/PokeAPIContext';

export const App: React.FC = () => {
  return (
    <PokeAPIContextProvider>
      <Router>
        <PokeRoutes />
      </Router>
    </PokeAPIContextProvider>
  );
};
