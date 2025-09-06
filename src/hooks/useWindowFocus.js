import { useEffect, useState } from 'react';

export const useWindowFocus = () => {
    const [focused, setFocus] = useState(false);
    const handleFocus = () => setFocus(true);
    const handleBlur = () => setFocus(false);

    useEffect(() => {
        window.addEventListener("focus", handleFocus);
        window.addEventListener("blur", handleBlur);
        return () => {
            window.removeEventListener("focus", handleFocus);
            window.removeEventListener("blur", handleBlur);
        };
    });

    return focused;
}
