import React, { useState } from 'react';
import Plot from 'react-plotly.js';
import './main.css'

const QGraph = () => {
    const [L, setL] = useState(1);
    const [C, setC] = useState(1);
    const [R, setR] = useState(1);
    const [layout] = useState({
        width: 800,
        height: 400,
        xaxis: { title: 't' },
        yaxis: { title: 'q' },
    });
    const [secondLayout] = useState({
        width: 800,
        height: 400,
        xaxis: { title: 't' },
        yaxis: { title: 'U' },
    });

    // Функция для обновления параметра k и масштаба графика

    const xValues = Array.from({ length: 1000 }, (_, i) => i);
    const yValues = xValues.map((x) => R * C / L * Math.exp(-x * R/(2*L)) * Math.cos(x * Math.sqrt(1/(L*C) - (R/(2*L))**2)));

    return (
        <div className='body'>
            <div>
                <h1>Построение графика функции y(x) = kx</h1>
                <div className='inputs'>
                    <div className='input'>
                        Введите индуктивность катушки L (Гн): <input type="number" value={L} onChange={(e) => setL(parseInt(e.target.value))}/>
                    </div>
                    <div className='input'>
                        Введите сопротивление R (Ом): <input type="number" value={R} onChange={(e) => setR(parseInt(e.target.value))}/>
                    </div>
                    <div className='input'>
                        Введите емкость конденсатора С (Ф): <input type="number" value={C} onChange={(e) => setC(parseInt(e.target.value))}/>
                    </div>
                </div>
            </div>
            <Plot
                data={[
                    {
                        x: xValues,
                        y: yValues,
                        type: 'scatter',
                        mode: 'lines',
                        marker: {color: 'blue'},
                    },
                ]}
                layout={layout}
            />
            <Plot
                data={[
                    {
                        x: xValues,
                        y: yValues,
                        type: 'scatter',
                        mode: 'lines',
                        marker: {color: 'blue'},
                    },
                ]}
                layout={secondLayout}
            />

        </div>
    );
};

export default QGraph;
