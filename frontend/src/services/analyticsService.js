export async function fetchFleetAnalytics()
{
    const response =
        await fetch(
            "http://127.0.0.1:8000/analytics/fleet"
        );

    return await response.json();
}