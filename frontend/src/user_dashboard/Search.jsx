import React from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { BsSearch, BsBarChartFill, BsClockHistory, BsFillGearFill, BsGrid1X2Fill } from 'react-icons/bs';

// Define all searchable sections of the dashboard
const allSections = [
  { name: 'Dashboard', path: '/dashboard', icon: <BsGrid1X2Fill />, description: 'Overview of all your analytics.' },
  { name: 'Reports', path: '/dashboard/reports/0', icon: <BsBarChartFill />, description: 'View detailed data reports.' },
  { name: 'History', path: '/dashboard/history', icon: <BsClockHistory />, description: 'Check your file upload history.' },
  { name: 'Settings', path: '/dashboard/settings', icon: <BsFillGearFill />, description: 'Customize your account and theme.' },
];

const Search = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q')?.toLowerCase() || '';

  // Filter sections based on the search query
  const filteredSections = query
    ? allSections.filter(
        (section) =>
          section.name.toLowerCase().includes(query) ||
          section.description.toLowerCase().includes(query)
      )
    : [];

  return (
    <main className='main-container'>
      <div className='main-title'>
        <h3>SEARCH RESULTS</h3>
      </div>

      {query ? (
        <div className="search-results-list">
          {filteredSections.length > 0 ? (
            filteredSections.map((section) => (
              <Link to={section.path} key={section.name} className="search-result-card">
                <div className="search-card-icon">{section.icon}</div>
                <div className="search-card-content">
                  <h4>{section.name}</h4>
                  <p>{section.description}</p>
                </div>
              </Link>
            ))
          ) : (
            <div className="no-results-card">
              <BsSearch style={{ fontSize: '50px', marginBottom: '20px' }} />
              <h2>No results found for "{query}"</h2>
              <p style={{ color: 'var(--text-secondary)' }}>
                Try searching for "Reports", "History", or "Settings".
              </p>
            </div>
          )}
        </div>
      ) : (
        <div className="no-results-card">
           <BsSearch style={{ fontSize: '50px', marginBottom: '20px' }} />
           <h2>Please enter a search term in the header.</h2>
        </div>
      )}
    </main>
  );
};

export default Search;
