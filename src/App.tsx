import { BrowserRouter } from 'react-router-dom';
import {Router} from './routes/Router'
import './styles/global.css';

export function App() {
  return (
    <BrowserRouter>
      <Router />
    </BrowserRouter>
  );
}