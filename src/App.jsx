//App.jsx
import { BrowserRouter } from 'react-router-dom';
import { AuthWrapper } from './middlewares/AuthWrapper';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <AuthWrapper />
      </BrowserRouter>
    </div>
  );
}


export default App;
