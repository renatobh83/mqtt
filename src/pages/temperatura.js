import React, { useEffect, useState } from 'react';
import LineChart from '../components/LineChart';
import { getTemperatura } from '../services/API';
import SliderChart from '../components/slider';
import moment from 'moment';

function Temperatura() {
    const [temperaturaDados, setTemperaturaDados] = useState([]);
    const [label, setLabel] = useState([]);
    const [i, setI] = useState(false);
    const [limitTemperatura, setLimit] = useState(5);
    const [max, setMax] = useState(null);
    const [min, setMin] = useState(null);
    const [refreshInterval, setRefreshInterval] = useState(300000 || 0);

    const fetchTemp = async () => {
        const res = await getTemperatura();
        if (res.status === 200) {
            setTemperaturaDados(res.data.temperatura);
            setLabel(res.data.periodo);
            setMax(res.data.max);
            setMin(res.data.min);
            setI(true);
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
        if (refreshInterval && refreshInterval > 0) {
            const interval = setInterval(fetchTemp, refreshInterval);
            return () => clearInterval(interval);
        } else {
        }
    }, [refreshInterval]);
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
                                {moment(max.Time).format('DD/MM/YYYY HH:mm')}
                            </div>

                            <div class="flex">
                                Minima : <span>{min.DHT11.Temperature}</span> -{' '}
                                {moment(min.Time).format('DD/MM/YYYY HH:mm')}
                            </div>
                        </>
                    )}
                </>
            )}
        </div>
    );
}

export default Temperatura;
