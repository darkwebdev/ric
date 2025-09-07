import { useEffect, useState } from 'react';
import { getTotalTraffic } from '../traffic-tracker';

export const useTraffic = () => {
    const [traffic, setTraffic] = useState(0);

    useEffect(() => {
        setTraffic(getTotalTraffic());
    });

    return traffic;
}
