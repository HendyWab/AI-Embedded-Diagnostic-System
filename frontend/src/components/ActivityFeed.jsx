// =========================================================
//
// Intelligent Embedded Diagnostic System (IEDS)
// Activity Feed Component
//
// Author: HendyWab
//
// Description:
// Displays latest telemetry events.
//
// =========================================================

import React from "react";

function ActivityFeed({
    activityFeed
})
{

    return (

        <div
            style={{
                backgroundColor: "#1E293B",
                padding: "20px",
                borderRadius: "12px",
                boxShadow:
                    "0px 0px 10px rgba(0,0,0,0.4)"
            }}
        >

            <h2
                style={{
                    marginBottom: "20px"
                }}
            >
                Activity Feed
            </h2>

            {
                activityFeed.map(
                    (
                        item,
                        index
                    ) => (

                        <div
                            key={index}
                            style={{
                                padding: "10px 0",
                                borderBottom:
                                    "1px solid rgba(255,255,255,0.1)"
                            }}
                        >

                            <strong>
                                {item.device_id}
                            </strong>

                            {" • "}

                            Score:
                            {" "}
                            {item.anomaly_score}

                            {" • "}

                            Signal:
                            {" "}
                            {item.signal_quality}

                            {" • "}

                            {
                                item.emi_detected
                                ? "EMI ALERT"
                                : "NORMAL"
                            }

                        </div>
                    )
                )
            }

        </div>
    );
}

export default ActivityFeed;