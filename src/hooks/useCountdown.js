import { useEffect, useState } from 'react';
export const useCountdown = ({ countStart, interval }) => {
    const [count, setCount] = useState();

    useEffect(() => {
        if (count > 0) {
            const timeout = setTimeout(() => {
                setCount(count - interval);
            }, interval);
            return () => {
                clearTimeout(timeout);
            }
        }
    }, [count]);

    useEffect(() => {
        setCount(countStart);
    }, [countStart]);

    return count;
};
