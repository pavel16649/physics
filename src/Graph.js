import React, { useState } from 'react';
import Plot from 'react-plotly.js';
import './main.css'

const QGraph = () => {
    const [L, setL] = useState(1);
    const [C, setC] = useState(1);
    const [R, setR] = useState(1);
    const [q_max , setQ] = useState(1);
    const [layout] = useState({
        width: 800,
        height: 400,
        xaxis: { title: 't' },
        yaxis: { title: 'q' },
        title: "Зависимость заряда q от времени t",
    });
    const [secondLayout] = useState({
        width: 800,
        height: 400,
        xaxis: { title: 't' },
        yaxis: { title: 'U' },
        title: "Зависимость напряжения U от времени t",
    });
    const [thirdLayout] = useState({
        width: 800,
        height: 400,
        xaxis: { title: 't' },
        yaxis: { title: 'I' },
        title: "Зависимость силы тока I от времени t",
    });

    const [showModal, setShowModal] = useState(false);

    const handleShowModal = () => {
        setShowModal(true);
    }

    const handleCloseModal = () => {
        setShowModal(false);
    }


    // Функция для обновления параметра k и масштаба графика

    const updateR = (newR) => {
        if (newR > 2 * Math.sqrt(L / C)) {
            handleShowModal();
        } else {
            setR(newR);
        }
    }
    const updateL = (newL) => {
        if (R > 2 * Math.sqrt(newL / C)) {
            handleShowModal();
        } else {
            setL(newL);
        }
    }
    const updateC = (newC) => {
        if (R > 2 * Math.sqrt(L / newC)) {
            handleShowModal();
        } else {
            setC(newC);
        }
    }

    const beta = R / (2*L);
    const w0 = 1 / Math.sqrt(L * C);
    const I_max = w0 * q_max;
    const xValuesQ = Array.from({ length: 500 }, (_, i) => i);
    const yValuesQ = xValuesQ.map((x) => q_max * Math.exp(-x * beta) * Math.cos(x * Math.sqrt(1/(L*C) - beta**2)));
    const xValuesU = Array.from({ length: 500 }, (_, i) => i);
    const yValuesU = xValuesU.map((x) => q_max / C * Math.exp(-x * beta) * Math.cos(x * Math.sqrt(1/(L*C) - beta**2)));
    const xValuesI = Array.from({ length: 500 }, (_, i) => i);
    const yValuesI = xValuesU.map((x) => I_max * Math.exp(-x * beta) * Math.sin(x * Math.sqrt(1/(L*C) - beta**2)));


    return (
        <div className='body' style={{ position: 'relative' }}>
            <div>
                <h1>Построение графиков некоторых функций для затухающих колебаний</h1>
                <div className='inputs'>
                    <div className='input'>
                        Введите индуктивность катушки L (Гн): <input type="number" min='0' value={L} onChange={(e) => updateL(parseInt(e.target.value))}/>
                    </div>
                    <div className='input'>
                        Введите сопротивление R (Ом): <input type="number" min='0' value={R} onChange={(e) => updateR(parseInt(e.target.value))}/>
                    </div>
                    <div className='input'>
                        Введите емкость конденсатора С (Ф): <input type="number" min='0' value={C} onChange={(e) => updateC(parseInt(e.target.value))}/>
                    </div>
                    <div className='input'>
                        Введите заряд конденсатора q (Кл): <input type="number" value={q_max} onChange={(e) => setQ(parseInt(e.target.value))}/>
                    </div>
                </div>
            </div>
            <Plot
                data={[
                    {
                        x: xValuesQ,
                        y: yValuesQ,
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
                        x: xValuesU,
                        y: yValuesU,
                        type: 'scatter',
                        mode: 'lines',
                        marker: {color: 'blue'},
                    },
                ]}
                layout={secondLayout}
            />
            <Plot
                data={[
                    {
                        x: xValuesI,
                        y: yValuesI,
                        type: 'scatter',
                        mode: 'lines',
                        marker: {color: 'blue'},
                    },
                ]}
                layout={thirdLayout}
            />
            {showModal && (
                <div className="popup">
                    <div className="popup-content">
                        <h2>Предупреждение</h2>
                        <p>При выбранных значениях не будут происходить затухающие колебания, будет апериодичная разрядка</p>
                        <button onClick={handleCloseModal}>Попробую другие</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default QGraph;
