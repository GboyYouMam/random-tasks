'use client';
//hooks etc lol
import { useState, useEffect } from 'react';
import { useIPGetter } from '../ApiWorkplace/IPGetterContext.jsx';
import limiter from '../ApiWorkplace/rateLimiter.js';

//search bar component with rate limiter
export default function SearchBarComponent() {
    const [input, setInput] = useState('');
    const [remainingTokens, setRemainingTokens] = useState(5);
    const { lookupIP, loading, error } = useIPGetter();

    //update remaining tokens every second
    useEffect(() => {
        const interval = setInterval(() => {
            setRemainingTokens(limiter.getRemaining());
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    //handle submit
    async function handleSubmit(e) {
        e.preventDefault();
        const value = (input || '').trim();
        if (!value) return;

        try {
            await lookupIP(value);
            setInput('');
            setRemainingTokens(limiter.getRemaining());
        } catch (err) {
            console.error('lookupIP error:', err);
            setRemainingTokens(limiter.getRemaining());
        }
    }
    //our ui
    return (
        <form onSubmit={handleSubmit} className="w-full max-w-lg mx-auto space-y-4 relative z-10">
            <div className="flex gap-3">
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="> Enter IP or domain"
                />
                <button
                    type="submit"
                    disabled={loading || !input.trim()}
                >
                    {loading ? 'Tracing...' : 'Lookup'}
                </button>
            </div>

            <div className="text-sm text-green-500">
                Tokens: {remainingTokens}/5
            </div>

            {error && (
                <div className="text-red-500 text-sm font-semibold">{error}</div>
            )}
        </form>
    );
}
