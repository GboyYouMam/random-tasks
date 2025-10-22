//hooks etc
import { useIPGetter } from '../ApiWorkplace/IPGetterContext.jsx';
import IPDataElement from './IPDataElement.jsx';

//main ui component for displaying data
export default function IPInfoCardComponent() {
    const { ipData, loading, error } = useIPGetter();

    if (loading) {
        return (
            <div className="p-4 text-center relative z-10">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-green-400 mx-auto"></div>
                <p className="mt-2 text-green-500">Tracing...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="p-4 text-center text-red-500 relative z-10">
                <p>Error: {error}</p>
            </div>
        );
    }

    if (!ipData) {
        return (
            <div className="p-4 text-center text-green-600 relative z-10">
                <p>There is nothing right now, enter an IP and press "Lookup"</p>
            </div>
        );
    }

    return (
        <div className="relative z-10">
            <IPDataElement data={ipData} />
        </div>
    );
}
