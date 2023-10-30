import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import SignIn from './pages/SignIn';
function App() {
 
  return (
    <Routes>
      <Route path='/' exact element={<Home />} />
      <Route path='/sign-in' element={<SignIn />}/>
    </Routes>
  )
}

export default App;
