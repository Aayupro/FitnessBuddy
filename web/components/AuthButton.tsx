'use client';

import { useState, useEffect } from 'react';
import * as fcl from '@onflow/fcl';

export default function AuthButton() {
  const [user, setUser] = useState({ loggedIn: false });

  useEffect(() => {
    fcl.currentUser.subscribe(setUser);
  }, []);

  const login = () => fcl.authenticate();
  const logout = () => fcl.unauthenticate();

  return (
    <div className="flex items-center space-x-4">
      {user.loggedIn ? (
        <>
          <span className="text-sm text-gray-600">{user.addr.slice(0, 6)}...{user.addr.slice(-4)}</span>
          <button 
            onClick={logout}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded transition"
          >
            Logout
          </button>
        </>
      ) : (
        <button
          onClick={login}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded transition"
        >
          Connect Wallet
        </button>
      )}
    </div>
  );
}
