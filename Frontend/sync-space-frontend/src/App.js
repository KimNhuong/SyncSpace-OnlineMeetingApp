import './App.css';
import HomePage from './pages/homepage';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from './router/Layout';
import AboutPage from './pages/AboutPage';

function App() {
  return (
    <BrowserRouter className="App">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="/about" element={<AboutPage />}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
