'use client';

import { useState } from 'react';
import { addWorkout } from '../lib/flow';

export default function WorkoutList({ profile }) {
  const [newWorkout, setNewWorkout] = useState('');
  const [loading, setLoading] = useState(false);

  const handleAddWorkout = async () => {
    if (!newWorkout.trim()) return;
    
    setLoading(true);
    try {
      await addWorkout(newWorkout);
      setNewWorkout('');
      alert('Workout added successfully!');
    } catch (err) {
      console.error(err);
      alert('Error adding workout');
    } finally {
      setLoading(false);
    }
  };

  if (!profile) {
    return <p className="text-gray-500">Create a profile to track workouts</p>;
  }

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        {profile.workouts && profile.workouts.length > 0 ? (
          profile.workouts.map((workout, index) => (
            <div key={index} className="p-3 bg-gray-100 rounded">
              {workout}
            </div>
          ))
        ) : (
          <p className="text-gray-500">No workouts recorded yet</p>
        )}
      </div>
      
      <div className="flex space-x-2">
        <input
          type="text"
          value={newWorkout}
          onChange={(e) => setNewWorkout(e.target.value)}
          className="flex-1 p-2 border rounded focus:ring-blue-500 focus:border-blue-500"
          placeholder="Enter a new workout..."
        />
        <button
          onClick={handleAddWorkout}
          disabled={loading}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50 transition"
        >
          {loading ? 'Adding...' : 'Add'}
        </button>
      </div>
    </div>
  );
}
