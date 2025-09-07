let totalTraffic = 0;
const countedUrls = new Set();

const originalFetch = window.fetch;
window.fetch = async (...args) => {
    const url = args[0];

    const response = await originalFetch(...args);
    // Check if response is from cache
    const fromCache = response.headers.get('x-cache') === 'HIT' ||
                      response.headers.get('cf-cache-status') === 'HIT' ||
                      response.type === 'opaqueredirect' ||
                      response.type === 'opaque';

    if (!fromCache && !countedUrls.has(url)) {
        // Clone response to read body
        const clone = response.clone();
        const buffer = await clone.arrayBuffer();
        totalTraffic += buffer.byteLength;
        countedUrls.add(url);
        console.log('Tracking fetch', url?.split('/')?.slice(-1)[0]);
    }
    return response;
};

export const getTotalTraffic = () => totalTraffic; // in bytes

const trackMediaElement = el => {
    const url = el.currentSrc || el.src;
    if (!url || countedUrls.has(url)) return;
    const handler = async () => {
        try {
            if (countedUrls.has(url)) return;
            const res = await fetch(url);
            if (res.ok) {
                const buffer = await res.arrayBuffer();
                totalTraffic += buffer.byteLength;
                countedUrls.add(url);
                console.log('Tracking media element', url?.split('/')?.slice(-1)[0]);
            }
        } catch {}
    };
    el.addEventListener('loadedmetadata', handler, { once: true });
    el.addEventListener('load', handler, { once: true });
};

export const trackAllMedia = () => {
    document.querySelectorAll('audio,img').forEach(trackMediaElement);
    const observer = new MutationObserver(() => {
        document.querySelectorAll('audio,img').forEach(trackMediaElement);
    });
    observer.observe(document.body, { childList: true, subtree: true });
};
