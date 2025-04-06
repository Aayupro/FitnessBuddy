'use client';

import { useState, useEffect } from 'react';
import * as fcl from '@onflow/fcl';
import AuthButton from '../components/AuthButton';
import ProfileForm from '../components/ProfileForm';
import WorkoutList from '../components/WorkoutList';
import { initFlow, getProfile } from '../lib/flow';

export default function Home() {
  const [user, setUser] = useState({ loggedIn: false });
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    initFlow();
    fcl.currentUser.subscribe(setUser);
  }, []);

  useEffect(() => {
    if (user.loggedIn) {
      fetchProfile();
    }
  }, [user.loggedIn]);

  const fetchProfile = async () => {
    setLoading(true);
    try {
      const profile = await getProfile(user.addr);
      setProfile(profile);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen p-8 bg-gray-50">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-blue-600">Fitness Buddy</h1>
          <AuthButton />
        </div>
        
        {loading ? (
          <div className="text-center py-8">Loading...</div>
        ) : (
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-xl font-semibold mb-4">Your Profile</h2>
              <ProfileForm address={user.addr} profile={profile} />
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-xl font-semibold mb-4">Your Workouts</h2>
              <WorkoutList profile={profile} />
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
