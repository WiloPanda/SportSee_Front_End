import React from "react";
import {
    ResponsiveContainer, BarChart, Bar, XAxis, YAxis,
    CartesianGrid, Tooltip, Legend, Rectangle, ReferenceLine
} from "recharts";

const ActivityTooltip = ({ active, payload }) => {
    if (!active || !payload || payload.length === 0) return null;
    const kg = payload.find(p => p.dataKey === "kilogram")?.value;
    const cal = payload.find(p => p.dataKey === "calories")?.value;
    return (
        <div className="activity-tooltip">
            <div>{kg}kg</div>
            <div>{cal}kCal</div>
        </div>
    );
}

const ActivityCursor = ({ x, y, width, height }) => {
    return <Rectangle x={x} y={y} width={width} height={height} fill="#C4C4C4" opacity={0.3} />;
}

const ActivityChart = ({ sessions = [], title = "Activité quotidienne" }) => {
    if (!sessions.length) return null;

    const data = sessions.map((s, i) => ({
        ...s,
        dayIdx: i + 1,
    }));

    const renderLegend = ({ payload }) => {
        // on force l'ordre : d'abord kilogram, puis calories
        const order = ['kilogram', 'calories'];
        const byKey = Object.fromEntries(payload.map(p => [p.dataKey, p]));
        const items = order.map(k => byKey[k]).filter(Boolean);

        return (
            <ul className="activity-legend">
                {items.map(item => (
                    <li key={item.dataKey} className="activity-legend__item">
                        <span className="activity-legend__dot" style={{ background: item.color }} />
                        {item.dataKey === 'kilogram' ? 'Poids (kg)' : 'Calories brûlées (kCal)'}
                    </li>
                ))}
            </ul>
        );
    };

    const kgVals = sessions.map(s => s.kilogram);
    const minKg = Math.min(...kgVals);
    const maxKg = Math.max(...kgVals);

    // on ajoute 1kg de marge puis on arrondit aux nombres pairs
    const pad = 1;
    const minTick = Math.floor((minKg - pad) / 2) * 2; // ex: 76 -> 74
    const maxTick = Math.ceil((maxKg + pad) / 2) * 2;  // ex: 81 -> 82
    const step = Math.max(2, (maxTick - minTick) / 2); // 3 ticks => 2 intervalles
    const kgTicks = [minTick, minTick + step, maxTick];

    return (
        <div className={`activityChart`}>
            <h3 className="activity__title">{title}</h3>
            <ResponsiveContainer width="100%" height={320}>
                <BarChart data={data} barGap={8} margin={{ top: 90, right: 30, left: 50, bottom: 40 }}>
                    <CartesianGrid vertical={false} horizontal={false} />
                    <XAxis dataKey="dayIdx" tickLine={false} axisLine={{ stroke: '#DEDEDE', strokeWidth: 1 }} tickMargin={20} />
                    <YAxis yAxisId="kg" orientation="right" axisLine={false} tickLine={false} tickMargin={16}
                        allowDecimals={false} ticks={kgTicks} domain={[kgTicks[0], kgTicks[2]]} />
                    <ReferenceLine yAxisId="kg" y={kgTicks[1]} stroke="#CFCFCF" strokeDasharray="3 3" />
                    <ReferenceLine yAxisId="kg" y={kgTicks[2]} stroke="#CFCFCF" strokeDasharray="3 3" />

                    <YAxis yAxisId="cal" hide domain={['dataMin - 150', 'dataMax + 10']} />
                    <Tooltip content={<ActivityTooltip />} cursor={<ActivityCursor />} />
                    <Legend verticalAlign="top" align="right" content={renderLegend} />
                    <Bar yAxisId="kg" dataKey="kilogram" fill="#282D30" barSize={7} radius={[3, 3, 0, 0]} name="kilogram" />
                    <Bar yAxisId="cal" dataKey="calories" fill="#E60000" barSize={7} radius={[3, 3, 0, 0]} name="calories" />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
}

export default ActivityChart;
