import { Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import BuyCredit from "./Pages/BuyCredit";
import NotFound from "./Pages/NotFound";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import Result from "./Pages/Result";

const App = () => {
  return (
    <div className='min-h-screen bg-slate-50'>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/result' element={<Result />} />
        <Route path='/buy-credit' element={<BuyCredit />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
