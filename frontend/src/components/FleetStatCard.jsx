// =========================================================
//
// Intelligent Embedded Diagnostic System (IEDS)
// Fleet Statistic Card Component
//
// Author: HendyWab
//
// Description:
// Reusable dashboard statistic card.
//
// =========================================================

import React from "react";

function FleetStatCard({
    title,
    value
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

            <h3
                style={{
                    marginBottom: "10px"
                }}
            >
                {title}
            </h3>

            <h1>
                {value}
            </h1>

        </div>
    );
}

export default FleetStatCard;