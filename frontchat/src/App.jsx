import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import SignIn from './pages/SignIn';
function App() {
 
  return (
    <Routes>
      <Route path='/home' exact element={<Home />} />
      <Route path='/' element={<SignIn />}/>
      <Route path='*' element={<SignIn />}/>
    </Routes>
  )
}

export default App;
