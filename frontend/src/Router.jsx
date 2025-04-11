import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Portfolio from './pages/Portfolio';
import Wallet from './pages/Wallet';
import Chart from './pages/Chart';
import Features from './pages/Features';

export default function Router() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/portfolio" element={<Portfolio />} />
      <Route path="/wallet" element={<Wallet />} />
      <Route path="/chart" element={<Chart />} />
      <Route path="/features" element={<Features />} />
    </Routes>
  );
}
