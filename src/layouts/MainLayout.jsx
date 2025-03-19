import { Outlet } from 'react-router-dom';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';

const MainLayout = ({ isMusicOn, toggleMusic, handleSearch }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar isMusicOn={isMusicOn} toggleMusic={toggleMusic} handleSearch={handleSearch} />
      <main className="flex-grow">
        <Outlet /> {/* This will render child routes correctly */}
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;
