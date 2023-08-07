import {BrowserRouter, Routes, Route} from 'react-router-dom';
import HomePage from './pages/HomePage';
import CustomerPage from './pages/CustomerPage';
import PropertyPage from './pages/PropertyPage';
import BookingPage from './pages/BookingPage';
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import './App.css';

function App() {
  return (
    <div className='app'>
      <BrowserRouter>
      <NavBar />
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/cust" element={<CustomerPage />} />
            <Route path="/prop" element={<PropertyPage/>} />
            <Route path="/booking"element={<BookingPage/>} />
          </Routes>
          <link
            rel="stylesheet"
            href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css"
            integrity="sha384-rbsA2VBKQhggwzxH7pPCaAqO46MgnOM80zW1RWuH61DGLwZJEdK2Kadq2F9CUG65"
            crossorigin="anonymous"
          />
          <Footer />
        </main>
      </BrowserRouter>
    </div>
  );
}

export default App;
