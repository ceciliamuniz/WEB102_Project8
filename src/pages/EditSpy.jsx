import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '../services/supabaseClient';
import SpyForm from '../components/SpyForm';

export default function EditSpy() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [spy, setSpy] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSpy = async () => {
      const { data, error } = await supabase
        .from('spies')
        .select('*')
        .eq('id', id)
        .single();

      if (error) {
        setError('Failed to fetch spy');
      } else {
        setSpy(data);
      }

      setLoading(false);
    };

    fetchSpy();
  }, [id]);

  const handleUpdate = async (updatedSpy) => {
    const { error } = await supabase
      .from('spies')
      .update(updatedSpy)
      .eq('id', id);

    if (error) {
      setError('Failed to update spy');
    } else {
      navigate('/');
    }
  };

  if (loading) return <p>Loading spy data...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h1 className="text-xl font-bold mb-4">Edit Spy</h1>
      <SpyForm initialData={spy} onSubmit={handleUpdate} />
    </div>
  );
}
