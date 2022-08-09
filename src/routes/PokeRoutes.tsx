import { Route, Routes } from 'react-router-dom';

import { HomePage } from '../pages/HomePage';
import { PokePage } from '../pages/PokePage';
import { NotFoundPage } from '../pages/NotFoundPage';

export const PokeRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path='/' element={<HomePage />} />
      <Route path='/pokemon/:pokeName' element={<PokePage />} />
      <Route path='*' element={<NotFoundPage />} />
    </Routes>
  );
};
