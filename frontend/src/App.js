import logo from './logo.svg';
import './App.css';
import {Routes,Route, BrowserRouter} from 'react-router-dom'
import LoginPage from './Pages/Login';
import PredictPage from './Pages/Predict';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage></LoginPage>}>
        </Route>
        <Route path='/Predict' element={<PredictPage></PredictPage>}>
        </Route> 
      </Routes>
      </BrowserRouter>
      
    </div>
  );
}

export default App;
