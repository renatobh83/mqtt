import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';

import Slider from '@material-ui/core/Slider';

function SliderChart({ change }) {
    const [value, setValue] = useState(5);
    const useStyles = makeStyles({
        root: {
            width: '100%',
            marginTop: 15,
        },
    });
    const times = [
        {
            value: 5,
            label: '5%',
        },
        {
            value: 10,
            label: '10%',
        },
        {
            value: 20,
            label: '20%',
        },
        {
            value: 30,
            label: '30%',
        },
        {
            value: 40,
            label: '40%',
        },
        {
            value: 60,
            label: '60%',
        },
        {
            value: 80,
            label: '80%',
        },
        {
            value: 100,
            label: '100%',
        },
    ];
    function valueLabelFormat(value) {
        setValue(value);
    }
    const valueChange = () => {
        change(value);
    };
    const classes = useStyles();
    return (
        <div className={classes.root}>
            {/* <Typography id="discrete-slider-restrict" gutterBottom>
                ...
            </Typography> */}
            <Slider
                defaultValue={0}
                onChangeCommitted={valueChange}
                valueLabelFormat={valueLabelFormat}
                aria-labelledby="discrete-slider-restrict"
                step={null}
                valueLabelDisplay="off"
                marks={times}
            />
        </div>
    );
}

export default SliderChart;
