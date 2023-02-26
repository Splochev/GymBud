import React from "react";
import Loader from 'react-loader-spinner';

export function UGBLoaderDots(params) {
    return (
        <UGBLoader
            type='ThreeDots'
            height={14}
            width={70}
        />
    );
}

export function UGBLoaderSpinner(params) {
    return (
        <UGBLoader {...params} />
    );
}

function UGBLoader({ type = 'TailSpin', color = '#D7CDE5', height = 80, width = 80 }) {
    return (
        <Loader
            type={type}
            color={color}
            height={height}
            width={width}
        />
    );
}