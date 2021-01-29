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
    const [refreshInterval, setrefreshInterval] = useState(10000 || 0);

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

    const tempoAtualizacao = (e) => {
        e.preventDefault();
        switch (e.target.value) {
            case '5':
                setrefreshInterval(300000);
                break;
            case '15':
                setrefreshInterval(900000);
                break;
            case '25':
                setrefreshInterval(25 * 60 * 1000);
                break;
            default:
                break;
        }
    };

    useEffect(() => {
        if (refreshInterval && refreshInterval > 0) {
            const interval = setInterval(fetchTemp, refreshInterval);
            return () => clearInterval(interval);
        }
    }, [refreshInterval]); // eslint-disable-line
    useEffect(() => {
        fetchTemp();
    }, []); // eslint-disable-line
    return (
        <div className="container">
            {temperaturaDados.length > 0 && label.length > 0 && (
                <>
                    <div className="atualizacao">
                        <span>
                            Tempo para atualizacao
                            <select
                                name="att"
                                id="att"
                                onChange={tempoAtualizacao}
                            >
                                <option value="5">5</option>
                                <option value="15">15</option>
                                <option value="25">25</option>
                            </select>
                            minutos
                        </span>
                    </div>
                    <LineChart
                        data={current}
                        labels={labelCurrent}
                        update={i}
                        set={setI}
                    />
                    <SliderChart change={onChangeSelect} />
                    {max !== null && min !== null && (
                        <>
                            <div>
                                Maxima : <span>{max.DHT11.Temperature}</span> -{' '}
                                {moment(max.Time).format('DD/MM/YYYY HH:mm')}
                            </div>

                            <div>
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
