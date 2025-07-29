import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { supabase } from '../services/supabaseClient';

export default function SpyDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [spy, setSpy] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSpy = async () => {
      const { data, error } = await supabase
        .from('spies')
        .select('*')
        .eq('id', id)
        .single();

      if (error) {
        setError('Could not fetch spy details.');
      } else {
        setSpy(data);
      }

      setLoading(false);
    };

    fetchSpy();
  }, [id]);

  const handleDelete = async () => {
    const confirmed = window.confirm('Are you sure you want to delete this spy?');
    if (!confirmed) return;

    const { error } = await supabase.from('spies').delete().eq('id', id);

    if (error) {
      alert('Error deleting spy: ' + error.message);
    } else {
      navigate('/');
    }
  };

  if (loading) return <p>Loading spy info...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="max-w-md mx-auto space-y-4">
      <h1 className="text-2xl font-bold">{spy.name}</h1>
      <p><strong>Specialty:</strong> {spy.specialty}</p>
      <p><strong>Status:</strong> {spy.status}</p>

      <div className="space-x-2">
        <Link
          to={`/edit/${spy.id}`}
          className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
        >
          Edit
        </Link>
        <button
          onClick={handleDelete}
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
        >
          Delete
        </button>
        <Link
          to="/"
          className="ml-2 text-blue-300 hover:text-blue-100 underline transition duration-200"
        >
          Back to List
        </Link>
      </div>
    </div>
  );
}
