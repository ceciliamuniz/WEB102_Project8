import React, { useEffect, useState } from 'react';
import { supabase } from '../services/supabaseClient';
import { Link, useLocation } from 'react-router-dom';
import SpyCard from '../components/SpyCard';

export default function Home() {
  const [spies, setSpies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const location = useLocation();

  const fetchSpies = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('spies')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      setError(error.message);
      setSpies([]);
    } else {
      setSpies(data || []);
      setError(null);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchSpies();
  }, [location.pathname]); // Refetch when location changes

  useEffect(() => {
    // Also refetch when window regains focus
    const handleFocus = () => {
      fetchSpies();
    };

    window.addEventListener('focus', handleFocus);
    
    return () => {
      window.removeEventListener('focus', handleFocus);
    };
  }, []);

  if (loading) return <p className="text-center">Loading spies...</p>;
  if (error) return <p className="text-center text-red-600">Error: {error}</p>;
  if (spies.length === 0) return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="spy-container text-center">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-slate-100 mb-4">
            🕵️ Spy Agency Team
          </h1>
          <div className="text-6xl mb-6">🔍</div>
          <h2 className="text-2xl font-bold text-slate-100 mb-4">
            No Spies Found
          </h2>
          <p className="text-slate-300 mb-8 text-lg">
            Your spy agency is currently empty. Time to recruit your first secret agent!
          </p>
        </div>
        
        <Link 
          to="/create" 
          className="bg-blue-600 hover:bg-blue-500 text-white px-8 py-4 rounded-xl transition duration-200 hover:shadow-lg hover:scale-105 font-medium text-lg inline-block"
        >
          🎯 Recruit Your First Spy
        </Link>
      </div>
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="spy-container">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-slate-100">
            🕵️ Spy Agency Team
          </h1>
          <Link
            to="/create"
            className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-3 rounded-xl transition duration-200 hover:shadow-lg hover:scale-105 font-medium"
          >
            + Recruit New Spy
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {spies.map((spy) => (
            <SpyCard key={spy.id} spy={spy} />
          ))}
        </div>
      </div>
    </div>
  );
}
