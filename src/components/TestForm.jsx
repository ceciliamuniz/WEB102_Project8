import { useState } from 'react';

export default function TestForm() {
  const [testValue, setTestValue] = useState('');

  console.log('TestForm render - testValue:', testValue);

  return (
    <div style={{ padding: '20px', border: '1px solid red' }}>
      <h2>Test Form</h2>
      <input
        type="text"
        value={testValue}
        onChange={(e) => {
          console.log('Input changed to:', e.target.value);
          setTestValue(e.target.value);
        }}
        style={{ padding: '8px', border: '1px solid black' }}
        placeholder="Type here..."
      />
      <p>Current value: {testValue}</p>
    </div>
  );
}
