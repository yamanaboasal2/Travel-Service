import { RouterProvider } from 'react-router-dom';
import { router } from './routes';
import { SearchProvider } from './contexts/SearchContext';
import { LanguageProvider } from './contexts/LanguageContext';

export default function App() {
  return (
    <LanguageProvider>
      <SearchProvider>
        <RouterProvider router={router} />
      </SearchProvider>
    </LanguageProvider>
  );
}
