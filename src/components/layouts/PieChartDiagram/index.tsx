import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

interface IPieChartProps {
    width: number;
    height: number;
    data: { name: string; value: number }[] | [];
}

const PieChartDiagram = (props: IPieChartProps) => {
    const { width, height, data } = props;

    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

    return (
        <ResponsiveContainer width='100%' height='100%'>
            <PieChart width={width} height={height}>
                <Pie
                    label
                    data={data}
                    cx='50%'
                    cy='50%'
                    labelLine={false}
                    outerRadius={80}
                    fill='#8884d8'
                    dataKey='value'
                >
                    {data.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                </Pie>
                <Tooltip />
            </PieChart>
        </ResponsiveContainer>
    );
};

export default PieChartDiagram;
