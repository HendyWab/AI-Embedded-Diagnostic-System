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
// Features:
// - Real-time telemetry events
// - EMI alert visualization
// - Signal monitoring
// - Timestamp rendering
// - Scrollable observability feed
//
// =========================================================


// =========================================================
// IMPORTS
// =========================================================

import React from "react";


// =========================================================
// COMPONENT
// =========================================================

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
                    "0px 0px 10px rgba(0,0,0,0.4)",

                maxHeight: "400px",

                overflowY: "auto"
            }}
        >

            {/* ========================================= */}
            {/* TITLE */}
            {/* ========================================= */}

            <h2
                style={{
                    marginBottom: "20px"
                }}
            >
                Activity Feed
            </h2>


            {/* ========================================= */}
            {/* EMPTY STATE */}
            {/* ========================================= */}

            {
                activityFeed.length === 0 &&

                (
                    <p>
                        No telemetry activity yet.
                    </p>
                )
            }


            {/* ========================================= */}
            {/* ACTIVITY EVENTS */}
            {/* ========================================= */}

            {
                activityFeed.map(
                    (
                        item,
                        index
                    ) => (

                        <div
                            key={index}

                            style={{
                                padding: "12px 0",

                                borderBottom:
                                    "1px solid rgba(255,255,255,0.1)"
                            }}
                        >

                            {/* ================================= */}
                            {/* EVENT STATUS */}
                            {/* ================================= */}

                            <div>

                                <strong>
                                    {item.device_id}
                                </strong>

                                {" • "}

                                {
                                    item.emi_detected
                                    ? "EMI ALERT"
                                    : "NORMAL"
                                }

                            </div>


                            {/* ================================= */}
                            {/* TELEMETRY DETAILS */}
                            {/* ================================= */}

                            <div
                                style={{
                                    opacity: 0.75,

                                    marginTop: "4px",

                                    fontSize: "14px"
                                }}
                            >

                                Signal:
                                {" "}
                                {item.signal_quality}

                                {" • "}

                                Score:
                                {" "}
                                {item.anomaly_score}

                            </div>


                            {/* ================================= */}
                            {/* TIMESTAMP */}
                            {/* ================================= */}

                            <div
                                style={{
                                    opacity: 0.5,

                                    marginTop: "4px",

                                    fontSize: "12px"
                                }}
                            >

                                {
                                    item.timestamp
                                    ?
                                    (
                                        new Date(
                                            item.timestamp
                                        ).toLocaleTimeString()
                                    )
                                    :
                                    "Live telemetry"
                                }

                            </div>

                        </div>
                    )
                )
            }

        </div>
    );
}


// =========================================================
// EXPORT
// =========================================================

export default ActivityFeed;