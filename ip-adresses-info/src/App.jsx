import './App.css'

import { IPGetterProvider } from './components/ApiWorkplace/IPGetterContext.jsx';
import SearchBarComponent from './components/viewPart/searchBarComponent.jsx';
import IPInfoCard from './components/viewPart/IPInfoCard.jsx';

function App() {
  return (
    <IPGetterProvider>
      <div className="min-h-screen bg-gray-50 p-6">
        <header className="max-w-3xl mx-auto mb-6">
          <h1 className="text-2xl font-semibold">IP Lookup</h1>
          <p className="text-sm text-gray-600">Enter an IP or domain to fetch information.</p>
        </header>

        <main className="max-w-3xl mx-auto space-y-6">
          <SearchBarComponent />
          <IPInfoCard />
        </main>
      </div>
    </IPGetterProvider>
  )
}

export default App
