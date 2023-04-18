//eslint-disable-next-line
import react from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import './App.css';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Login from './pages/Login';
import GetStarted from './pages/GetStarted';
import RegisterEmployer from './pages/RegisterEmployer';
import Privacy from './pages/Privacy';
import Terms from './pages/Terms';

function App() {
  return (
    <div className='landscape:lg:mt-0 landscape:md:mt-20 landscape:sm:mt-0'>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/get-started" element={<GetStarted />} />
          <Route path="/register/employer" element={<RegisterEmployer />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms" element={<Terms />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
