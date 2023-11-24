import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';

function App() {
 
  return (
    <Routes>
      <Route path='/home' exact element={<Home />} />
      <Route path='/' element={<SignIn />}/>
      <Route path='/SignUp' element={<SignUp />}/>
      <Route path='*' element={<SignIn />}/>
    </Routes>
  )
}

export default App;
