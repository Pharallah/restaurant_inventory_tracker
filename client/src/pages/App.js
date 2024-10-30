import React, { useState, useEffect } from 'react';
import NavBar from '../components/NavBar';
import { Outlet, useLocation } from 'react-router-dom';

function App() {
  const [showItemForm, setShowItemForm] = useState(false);
  const [pageTitle, setPageTitle] = useState('');
  const location = useLocation();

  // Programatically change the header
  useEffect(() => {
    // Determine the active page based on the current path
    switch (location.pathname) {
      case '/':
        setPageTitle('Dashboard');
        break;
      case '/suppliers':
        setPageTitle('Supplier List');
        break;
      case '/restockorders':
        setPageTitle('Restock Orders');
        break;
      default:
        setPageTitle('Restaurant Inventory Dashboard');
    }
  }, [location]);

  return (
    <>
  <NavBar />
  <div className="min-h-full">
    <header className="bg-white shadow">
      <div className="mx-auto max-w-xl mx-auto px-5 py-6 sm:px-6 lg:px-8 flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">{pageTitle}</h1>
        <button 
          className='bg-black text-white px-4 py-2 rounded'
          onClick={() => setShowItemForm(true)}
        >
          Add Item
        </button>
      </div>
    </header>
    <main>
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <Outlet context={{ showItemForm, setShowItemForm }} />
      </div>
    </main>
  </div>
</>
  );
}

export default App;