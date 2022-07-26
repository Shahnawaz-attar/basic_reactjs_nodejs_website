import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import About from './components/About';
import { Home } from './components/Home';
import Myblogs from './components/Myblogs';
import Contact from './components/Contact';
import Createpost from './components/Crud/Createpost';
import Listpost from './components/Crud/Listpost';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="about" element={<About />} />
        <Route path="myblogs" element={<Myblogs />} />
        <Route path="contact" element={<Contact />} />
        <Route path="crud" element={<Createpost />} />
        <Route path="crud/list" element={<Listpost />} />
        <Route path="crud/edit/:id" element={<Createpost />} />
      </Routes>
    </Router>
  );
}

export default App;
