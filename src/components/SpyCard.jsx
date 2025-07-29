import { Link } from 'react-router-dom';

export default function SpyCard({ spy }) {
  return (
    <div className="spy-card">
      <h2 className="text-xl font-bold text-slate-100 mb-3">🕵️ {spy.name}</h2>
      <div className="space-y-2 mb-4">
        <p className="text-slate-300">
          <span className="text-blue-400 font-medium">Specialty:</span> {spy.specialty || 'Unknown'}
        </p>
        <p className="text-slate-300">
          <span className="text-green-400 font-medium">Status:</span> 
          <span className={`ml-2 px-2 py-1 rounded text-sm font-medium ${
            spy.status === 'Active' ? 'bg-green-600 text-white' : 
            spy.status === 'Undercover' ? 'bg-yellow-500 text-slate-900' : 
            'bg-slate-600 text-slate-300'
          }`}>
            {spy.status}
          </span>
        </p>
      </div>

      <Link
        to={`/detail/${spy.id}`}
        className="inline-block bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded transition duration-200 hover:shadow-lg"
      >
        View Details →
      </Link>
    </div>
  );
}
