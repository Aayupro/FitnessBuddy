'use client';

import { useState } from 'react';
import * as fcl from '@onflow/fcl';
import { createProfile, updateGoals } from '../lib/flow';

export default function ProfileForm({ address, profile }) {
  const [goals, setGoals] = useState(profile?.goals || '');
  const [loading, setLoading] = useState(false);

  const handleCreateProfile = async () => {
    setLoading(true);
    try {
      await createProfile();
      alert('Profile created successfully!');
    } catch (err) {
      console.error(err);
      alert('Error creating profile');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateGoals = async () => {
    setLoading(true);
    try {
      await updateGoals(goals);
      alert('Goals updated successfully!');
    } catch (err) {
      console.error(err);
      alert('Error updating goals');
    } finally {
      setLoading(false);
    }
  };

  if (!profile) {
    return (
      <div className="mt-4">
        <button
          onClick={handleCreateProfile}
          disabled={loading}
          className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded disabled:opacity-50 transition"
        >
          {loading ? 'Creating...' : 'Create Profile'}
        </button>
      </div>
    );
  }

  return (
    <div className="mt-4 space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">Fitness Goals</label>
        <textarea
          value={goals}
          onChange={(e) => setGoals(e.target.value)}
          className="mt-1 p-2 w-full border rounded focus:ring-blue-500 focus:border-blue-500"
          rows={3}
          placeholder="Enter your fitness goals..."
        />
      </div>
      <button
        onClick={handleUpdateGoals}
        disabled={loading}
        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50 transition"
      >
        {loading ? 'Updating...' : 'Update Goals'}
      </button>
    </div>
  );
}
