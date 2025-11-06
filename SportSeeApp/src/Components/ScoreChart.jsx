import React from "react";
import {
    ResponsiveContainer,
    RadialBarChart,
    RadialBar,
    PolarAngleAxis,
} from "recharts";

const ScoreChart = ({ score = 0, title = "Score" }) => {

    const percent = Math.round((score || 0) * 100);
    const data = [{ name: "score", value: percent }];

    return (
        <div className="scoreCard">
            <h3 className="scoreCard__title">{title}</h3>

            <div className="scoreCard__chart">
                <ResponsiveContainer width="100%" height="100%">
                    <RadialBarChart
                        data={data}
                        innerRadius="94%"
                        outerRadius="80%"
                        startAngle={90}
                        endAngle={450}
                    >
                        <PolarAngleAxis
                            type="number"
                            domain={[0, 100]}
                            tick={false}
                        />
                        <RadialBar
                            dataKey="value"
                            cornerRadius={999}
                            clockWise
                            fill="#FF0000"
                        />
                    </RadialBarChart>
                </ResponsiveContainer>

                <div className="scoreCard__center">
                    <div className="scoreCard__percent">{percent}%</div>
                    <div className="scoreCard__sub">de votre<br />objectif</div>
                </div>
            </div>
        </div>
    );
}

export default ScoreChart;