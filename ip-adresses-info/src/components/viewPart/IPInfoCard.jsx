// javascript
import { useIPGetter } from '../ApiWorkplace/IPGetterContext.jsx';
import IPDataElement from './IPDataElement.jsx';

export default function IPInfoCard() {
    const { ipData, loading, error } = useIPGetter();

    if (loading) {
        return (
            <div className="p-4 text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
                <p className="mt-2">Loading...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="p-4 text-center text-red-500">
                <p>Error: {error}</p>
            </div>
        );
    }

    if (!ipData) {
        return (
            <div className="p-4 text-center text-gray-600">
                <p>There is nothing right now, enter an IP and press "Look Up!"</p>
            </div>
        );
    }

    return (
        <div>
            <IPDataElement data={ipData} />
        </div>
    );
}
