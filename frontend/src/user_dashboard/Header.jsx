import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import {
  BsFillBellFill,
  BsFillEnvelopeFill,
  BsSearch,
  BsJustify,
  BsBarChartFill,
  BsClockHistory,
  BsFillGearFill,
  BsGrid1X2Fill
} from 'react-icons/bs';
import { motion, AnimatePresence } from 'framer-motion';
import './App.css';

const allSections = [
  { name: 'Dashboard', path: '/dashboard', icon: <BsGrid1X2Fill /> },
  { name: 'Reports', path: '/dashboard/reports/0', icon: <BsBarChartFill /> },
  { name: 'History', path: '/dashboard/history', icon: <BsClockHistory /> },
  { name: 'Settings', path: '/dashboard/settings', icon: <BsFillGearFill /> },
];

function Header({ OpenSidebar }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const searchContainerRef = useRef(null);

  useEffect(() => {
    if (searchQuery.trim() !== '') {
      const filtered = allSections.filter((section) =>
        section.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setSearchResults(filtered);
      setIsSearchOpen(true);
    } else {
      setSearchResults([]);
      setIsSearchOpen(false);
    }
  }, [searchQuery]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(event.target)) {
        setIsSearchOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <header className='header'>
      <div className='menu-icon'>
        <BsJustify className='icon' onClick={OpenSidebar} />
      </div>

      <div className='header-left' ref={searchContainerRef}>
        <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
          <BsSearch style={{ position: 'absolute', left: '15px', color: 'var(--text-secondary)' }} />
          <input
            type='text'
            placeholder='Search...'
            className='search-input'
            style={{ paddingLeft: '40px' }}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={() => { if(searchQuery) setIsSearchOpen(true) }}
          />
        </div>
        
        <AnimatePresence>
          {isSearchOpen && (
            <motion.div
              className="search-results-dropdown"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              {searchResults.length > 0 ? (
                searchResults.map(item => (
                  <Link to={item.path} key={item.name} className="search-result-item" onClick={() => setIsSearchOpen(false)}>
                     <span className="search-item-icon">{item.icon}</span>
                     <span>{item.name}</span>
                  </Link>
                ))
              ) : (
                <div className="search-no-results">No results found for "{searchQuery}"</div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className='header-right'>
        <motion.div whileHover={{ scale: 1.2 }}>
          <BsFillBellFill className='icon' />
        </motion.div>
        <motion.div whileHover={{ scale: 1.2 }}>
          <BsFillEnvelopeFill className='icon' />
        </motion.div>
      </div>
    </header>
  );
}

export default Header;