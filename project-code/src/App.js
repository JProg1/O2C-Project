import {BrowserRouter, Routes, Route} from 'react-router-dom';
import HomePage from './pages/HomePage';
import NavBar from './components/NavBar';
import './App.css';

function App() {
  return (
    <BrowserRouter>
    <NavBar />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
        </Routes>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css"
          integrity="sha384-rbsA2VBKQhggwzxH7pPCaAqO46MgnOM80zW1RWuH61DGLwZJEdK2Kadq2F9CUG65"
          crossorigin="anonymous"
        />
      </main>
    </BrowserRouter>
  );
}

export default App;
