import React, { useState } from "react";
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip } from "recharts";

const AverageSessionsChart = ({ sessions = [], title = "Durée moyenne des sessions" }) => {
    const [cursorPosition, setCursorPosition] = useState(null);

    const SessionToolTip = ({ active, payload, coordinate }) => {
        if (active && payload && payload.length && coordinate) {
            const bleedOffset = -15.5;
            setCursorPosition(coordinate.x + bleedOffset);
            return (
                <div className="avgTooltip">
                    <div>{payload[0].value} min</div>
                </div>
            );
        }
        return null;
    };

    const base = sessions.map((s) => ({ 
        x: s.day, 
        y: s.sessionLength 
    }));

    // Ajout des points fantômes (pour effet du trait blanc qui rentre et sort du graphique)
    const data = [
        { x: 0, y: base[0]?.y || 0 },
        ...base,
        { x: 8, y: base[base.length - 1]?.y || 0 },
    ];

    const handleMouseLeave = () => {
        setCursorPosition(null);
    };

    return (
        <div className="averageSessionsChart">
            <h3 className="averageSessionsChart__title">{title}</h3>

            {cursorPosition !== null && (
                <div
                    className="averageSessionsChart__overlay"
                    style={{ left: `${cursorPosition}px` }}
                />
            )}

            <div className="averageSessionsChart__bleed">
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                        data={data}
                        margin={{ top: 28, right: 0, left: 0, bottom: 18 }}
                        onMouseLeave={handleMouseLeave}
                    >
                        <defs>
                            <linearGradient id="sessionsStroke" x1="0" y1="0" x2="1" y2="0">
                                <stop offset="0%" stopColor="#fff" stopOpacity={0.35} />
                                <stop offset="50%" stopColor="#fff" stopOpacity={0.70} />
                                <stop offset="100%" stopColor="#fff" stopOpacity={1} />
                            </linearGradient>
                        </defs>

                        <XAxis
                            type="number"
                            dataKey="x"
                            domain={[0, 8]}
                            ticks={[1, 2, 3, 4, 5, 6, 7]}
                            tickFormatter={(v) => {
                                const session = sessions.find(s => s.day === v);
                                return session?.dayLabel || '';
                            }}
                            tickLine={false}
                            axisLine={false}
                            interval={0}
                            tick={{ fill: "rgba(255,255,255,0.7)" }}
                            padding={{ left: 0, right: 0 }}
                            fontSize={12}
                        />
                        <YAxis hide domain={["dataMin-20", "dataMax+20"]} />
                        <Tooltip content={<SessionToolTip />} cursor={false} />
                        <Line
                            type="natural"
                            dataKey="y"
                            stroke="url(#sessionsStroke)"
                            strokeWidth={2}
                            dot={false}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default AverageSessionsChart;