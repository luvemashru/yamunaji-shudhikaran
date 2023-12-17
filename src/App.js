
import './App.css';
import "primeflex/primeflex.css"
import "primeicons/primeicons.css"

import AppRoutes from './routes';

import AppHeader from './components/AppHeader';

function App() {
  return (
    <div className="App">
      <AppHeader />
      <AppRoutes />
    </div>
  );
}

export default App;
