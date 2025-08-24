import './App.css';
import HomePage from './pages/homepage';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from './router/Layout';
import AboutPage from './pages/AboutPageModule/AboutPage';
import WorkingExpPage from './pages/AboutPageModule/WorkingExpPage';
import SkillandexpertisePage from './pages/AboutPageModule/SkillAndExpertisePage';
import EducationPage from './pages/AboutPageModule/EducationBgPage';
import RegisterPage from './pages/LoginModule/RegisterPage';

function App() {
  return (
    <BrowserRouter className="App">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="/about" element={<AboutPage />}></Route>
          <Route path="/Educationbg" element={<EducationPage />}></Route>
          <Route path="/Experiences" element={<WorkingExpPage />}></Route>
          <Route path="/Skillandexpertise" element={<SkillandexpertisePage />}></Route>
          <Route path="/NewRoom" element={<RegisterPage/>}></Route>
        </Route> 
      </Routes>
    </BrowserRouter>
  );
}

export default App;
