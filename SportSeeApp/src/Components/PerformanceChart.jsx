// src/Components/PerformanceChart.jsx
import React from "react";
import {
    ResponsiveContainer,
    RadarChart,
    PolarGrid,
    PolarAngleAxis,
    PolarRadiusAxis,
    Radar,
    Tooltip
} from "recharts";

const PerformanceChart = ({ performance = [] }) => {

    const PerfToolTip = ({ active, payload }) => {
        if (active && payload) {
            return (
                <div className="perfTooltip">
                    <p>{`${payload[0].value}%`}</p>
                </div>
            );
        }
        return null;
    };

    return (
        <div className="perfCard">
            <ResponsiveContainer width="100%" height="100%">
                <RadarChart data={performance} outerRadius="75%">
                    <PolarGrid stroke="#ffffff" strokeOpacity={1} gridType="polygon"
                        radialLines={false} />
                    <PolarAngleAxis
                        dataKey="label"
                        tick={{ fill: "#ffffff", fontSize: 12, opacity: 1 }}
                        tickLine={false}
                    />
                    <PolarRadiusAxis
                        tick={false}
                        axisLine={false}
                        stroke="#ffffff"
                        domain={[0, "auto"]}
                    />
                    <Radar
                        name="Performance"
                        dataKey="value"
                        stroke="#FF0101"
                        strokeOpacity={0.50}
                        fill="#FF0101"
                        fillOpacity={0.7}
                    />
                    <Tooltip cursor={false} content={<PerfToolTip />} />
                </RadarChart>
            </ResponsiveContainer>
        </div>
    );
}

export default PerformanceChart