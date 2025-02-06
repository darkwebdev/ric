import React from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './components/App.jsx';
import './dust.js';

createRoot(document.getElementById('app')).render(<App />);
