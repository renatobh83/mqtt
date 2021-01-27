import React, { useEffect, useState } from 'react';
import LineChart from '../components/LineChart';
import { getTemperatura } from '../services/API';
import SliderChart from './slider';

function Temperatura() {
    const [temperaturaDados, setTemperaturaDados] = useState([]);
    const [label, setLabel] = useState([]);
    const [i, setI] = useState(false);
    const [limitTemperatura, setLimit] = useState(5);
    const [max, setMax] = useState(null);
    const [min, setMin] = useState(null);

    const fetchTemp = async () => {
        const res = await getTemperatura();

        if (res.status === 200) {
            setTemperaturaDados(res.data.temperatura);
            setLabel(res.data.periodo);
            setMax(res.data.max);
            setMin(res.data.min);
        }
    };

    const current = temperaturaDados.slice(0, limitTemperatura);
    const labelCurrent = label.slice(0, limitTemperatura);

    const onChangeSelect = (e) => {
        const newLimit = Math.ceil(temperaturaDados.length * (e / 100));
        setLimit(newLimit);
        setI(true);
    };

    useEffect(() => {
        fetchTemp();
    }, []);
    return (
        <div className="container">
            {temperaturaDados.length > 0 && label.length > 0 && (
                <>
                    <LineChart
                        data={current}
                        labels={labelCurrent}
                        update={i}
                        set={setI}
                    />
                    <SliderChart change={onChangeSelect} />
                    {max !== null && min !== null && (
                        <>
                            <div class="flex">
                                Maxima : <span>{max.DHT11.Temperature}</span> -{' '}
                                {max.Time}
                            </div>

                            <div class="flex">
                                Minima : <span>{min.DHT11.Temperature}</span> -{' '}
                                {min.Time}
                            </div>
                        </>
                    )}
                </>
            )}
        </div>
    );
}

export default Temperatura;
