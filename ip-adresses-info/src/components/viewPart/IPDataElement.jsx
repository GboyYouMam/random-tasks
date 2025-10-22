export default function IPDataElement({ data }) {
    const {
        ip,
        type,
        continent_name,
        country_name,
        country_code,
        region_name,
        region_code,
        city,
        zip,
        latitude,
        longitude,
        connection_type,
        ip_routing_type,
        location
    } = data || {};

    return (
        <div>
            <div className="flex flex-col items-center justify-center gap-4 p-4 border rounded shadow-lg bg-black text-white rounded-2xl">
                <h2 className="text-xl font-bold">IP Address Information</h2>

                <div className="w-full space-y-2">
                    <p><strong>IP:</strong> {ip} ({type})</p>

                    {location?.country_flag && (
                        <div className="flex items-center gap-2">
                            <strong>Flag:</strong>
                            <img
                                src={location.country_flag}
                                alt={`${country_name} flag`}
                                className="w-8 h-6 object-cover rounded"
                            />
                            <span>{location.country_flag_emoji}</span>
                        </div>
                    )}

                    <p><strong>Continent:</strong> {continent_name}</p>
                    <p><strong>Country:</strong> {country_name} ({country_code})</p>

                    {location?.capital && (
                        <p><strong>Capital:</strong> {location.capital}</p>
                    )}

                    <p><strong>Region:</strong> {region_name} ({region_code})</p>
                    <p><strong>City:</strong> {city}</p>
                    <p><strong>ZIP:</strong> {zip}</p>

                    <p><strong>Coordinates:</strong> {latitude?.toFixed(4)}, {longitude?.toFixed(4)}</p>

                    <p><strong>Connection Type:</strong> {connection_type}</p>
                    <p><strong>Routing Type:</strong> {ip_routing_type}</p>

                    {location?.calling_code && (
                        <p><strong>Calling Code:</strong> +{location.calling_code}</p>
                    )}

                    {location?.languages && location.languages.length > 0 && (
                        <p><strong>Languages:</strong> {location.languages.map(lang => lang.name).join(', ')}</p>
                    )}

                    {location?.is_eu !== undefined && (
                        <p><strong>EU Member:</strong> {location.is_eu ? 'Yes' : 'No'}</p>
                    )}
                </div>
            </div>
        </div>
    );
}