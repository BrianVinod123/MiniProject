import './App.css';
import {Routes,Route, BrowserRouter} from 'react-router-dom'
import LoginPage from './Pages/Login';
import PredictPage from './Pages/Predict';
import HomePage from './Pages/Home';
import RegistrationPage from './Pages/Registration';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage></HomePage>}>
        </Route>
        <Route path="/Register" element={<RegistrationPage></RegistrationPage>}>
        </Route>
        <Route path="/Login" element={<LoginPage></LoginPage>}>
        </Route>
        <Route path='/Predict' element={<PredictPage></PredictPage>}>
        </Route> 
      </Routes>
      </BrowserRouter>
      
    </div>
  );
}

export default App;
