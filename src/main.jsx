import React from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './components/App.jsx';
import { trackAllMedia } from './traffic-tracker';

createRoot(document.getElementById('app')).render(<App />);

trackAllMedia();
