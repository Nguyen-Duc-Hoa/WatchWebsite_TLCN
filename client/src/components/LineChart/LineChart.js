import React from 'react'
import { Line } from '@ant-design/charts';

function LineChart({ data, xField, yField, size }) {
    const config = {
        data,
        xField: xField,
        yField: yField,
        point: {
            size: size,
            shape: 'diamond',
        },
    };
    return (
        <Line {...config} />
    )
}

export default LineChart
