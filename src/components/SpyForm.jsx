import { useState } from 'react';

export default function SpyForm({ initialData = {}, onSubmit }) {
  const [name, setName] = useState(initialData.name || '');
  const [specialty, setSpecialty] = useState(initialData.specialty || '');
  const [status, setStatus] = useState(initialData.status || 'Active');

  function handleNameChange(e) {
    setName(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    onSubmit({
      name,
      specialty,
      status,
    });
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-md mx-auto">
      <div>
        <label htmlFor="spy-name" className="block text-sm font-medium">
          Spy Name
        </label>
        <input
          id="spy-name"
          name="name"
          type="text"
          autoComplete="name"
          className="w-full border p-2 rounded"
          value={name}
          onChange={handleNameChange}
          required
        />
      </div>

      <div>
        <label htmlFor="spy-specialty" className="block text-sm font-medium">
          Specialty
        </label>
        <select
          id="spy-specialty"
          name="specialty"
          autoComplete="off"
          className="w-full border p-2 rounded"
          value={specialty}
          onChange={(e) => setSpecialty(e.target.value)}
          required
        >
          <option value="">Select one</option>
          <option value="Infiltration">Infiltration</option>
          <option value="Hacking">Hacking</option>
          <option value="Surveillance">Surveillance</option>
          <option value="Combat">Combat</option>
        </select>
      </div>

      <div>
        <label htmlFor="spy-status" className="block text-sm font-medium">
          Status
        </label>
        <select
          id="spy-status"
          name="status"
          autoComplete="off"
          className="w-full border p-2 rounded"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value="Active">Active</option>
          <option value="Undercover">Undercover</option>
          <option value="Retired">Retired</option>
        </select>
      </div>

      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Submit
      </button>
    </form>
  );
}
