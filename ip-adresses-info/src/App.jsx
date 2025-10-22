import './App.css'

import { IPGetterProvider } from './components/ApiWorkplace/IPGetterContext.jsx';
import SearchBarComponent from './components/viewPart/SearchBarComponent.jsx';
import IPInfoCardComponent from './components/viewPart/IPInfoCardComponent.jsx';

function App() {
    return (
        <IPGetterProvider>
            <div className="min-h-screen bg-black text-green-400 p-6 font-mono">
                <header className="max-w-3xl mx-auto mb-6 text-center">
                    <h1 className="text-4xl mb-2 text-green-400"> IP LOOKUP <span className="cursor"></span></h1>
                    <p className="text-green-500">Enter IP or domain to trace network info...</p>
                </header>

                <main className="max-w-3xl mx-auto space-y-6">
                    <SearchBarComponent />
                    <IPInfoCardComponent />
                </main>
            </div>
        </IPGetterProvider>
    );
}


export default App
