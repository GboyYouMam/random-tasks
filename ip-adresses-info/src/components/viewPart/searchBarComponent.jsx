'use client';

import { useState, useEffect } from 'react';
import { useIPGetter } from '../ApiWorkplace/IPGetterContext.jsx';
import limiter from '../ApiWorkplace/rateLimiter.js';

export default function SearchBarComponent() {
    const [input, setInput] = useState('');
    const [remainingTokens, setRemainingTokens] = useState(5);
    const { lookupIP, loading, error } = useIPGetter();

    // updating remaining tokens every second
    useEffect(() => {
        const interval = setInterval(() => {
            setRemainingTokens(limiter.getRemaining());
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    async function handleSubmit(e) {
        e.preventDefault();
        const value = (input || '').trim();
        if (!value) return;

        try {
            await lookupIP(value);
            setInput('');
            setRemainingTokens(limiter.getRemaining()); // updating rn after successful lookup
        } catch (err) {
            console.error('lookupIP error:', err);
            setRemainingTokens(limiter.getRemaining()); // even if error, update rn
        }
    }

    return (
        <form onSubmit={handleSubmit} className="w-full max-w-lg mx-auto flex flex-col gap-3">
            <div className="flex gap-2">
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Enter IP or domain"
                    aria-label="IP or domain"
                    className="flex-1 p-2 border rounded-md shadow-sm"
                />
                <button
                    type="submit"
                    disabled={loading || !input.trim()}
                    className="px-4 py-2 bg-blue-600 text-white rounded-md disabled:opacity-50"
                >
                    {loading ? 'Loading...' : 'Lookup'}
                </button>
            </div>


            <div className="text-center text-sm text-gray-600">
                <h4>Token counter</h4>
                <div className="text-sm text-gray-600">
                    Requests available: <span className="font-bold">{remainingTokens}/5</span>
                </div>

                {error && (
                    <div className="text-red-500 text-sm font-semibold">{error}</div>
                )}
            </div>
        </form>
    );
}