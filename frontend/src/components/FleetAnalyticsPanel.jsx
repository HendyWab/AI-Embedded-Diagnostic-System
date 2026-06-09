import React from "react";

function FleetAnalyticsPanel({
    analytics
})
{
    return (

        <div
            style={{
                backgroundColor:
                    "#1E293B",

                padding:
                    "20px",

                borderRadius:
                    "12px"
            }}
        >

            <h3>
                Fleet Analytics
            </h3>

            <p>
                Average Signal:
                {" "}
                {analytics.average_signal}
            </p>

            <p>
                Average Anomaly:
                {" "}
                {analytics.average_anomaly}
            </p>

            <p>
                Active Alerts:
                {" "}
                {analytics.active_alerts}
            </p>

            <p>
                Fleet Health:
                {" "}
                {analytics.fleet_health}%
            </p>

            <p>
                Records:
                {" "}
                {analytics.total_records}
            </p>

        </div>
    );
}

export default FleetAnalyticsPanel;