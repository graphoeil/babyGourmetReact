// Imports
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { PanierProvider } from './contexts/panierContext';

// ReactDOM
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<React.StrictMode>
		<PanierProvider>
			<App />
		</PanierProvider>
	</React.StrictMode>
);