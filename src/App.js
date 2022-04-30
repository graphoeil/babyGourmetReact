// Imports
import React from 'react';
import { usePanierContext } from './contexts/panierContext';
import './css/displayMain.css';
import Header from './components/Header';
import TitreSection from './components/TitreSection';
import Produits from './components/Produits';
import Panier from './components/Panier';
import BabyBox from './components/BabyBox';
import Footer from './components/Footer';

// Component
function App(){

	// Context
	const { babyBoxOuverte } = usePanierContext();

	// Return
	return(
		<React.Fragment>

			{/* BabyBox */}
			{
				babyBoxOuverte && <BabyBox/>
			}
			{/* BabyBox */}

			{/* Panier */}
			<Panier/>
			{/* Panier */}

			{/* Header */}
			<Header/>
			{/* Header */}

			{/* Section */}
			<section>

				{/* Titre */}
				<TitreSection titre="Le catalogue bio"/>
				{/* Titre */}

				{/* Produits */}
				<Produits/>
				{/* Produits */}

			</section>
			{/* Section */}

			{/* Footer */}
			<Footer/>
			{/* Footer */}
			
		</React.Fragment>
	);

};

// Export
export default App;