// Imports
import React, { useContext, useReducer, useEffect } from 'react';
import {
	OUVRE_LE_PANIER,
	FERME_LE_PANIER,
	AJOUTE_UN_ARTICLE_DANS_LE_PANIER,
	RETIRE_UN_ARTICLE_DU_PANIER,
	CHANGE_LA_QUANTITE_D_UN_ARTICLE,
	VIDE_LE_PANIER,
	CALCULE_LE_TOTAL_DU_PANIER,
	OUVRE_LA_BABYBOX,
	FERME_LA_BABYBOX
} from '../reducers/actions';
import panierReducer from '../reducers/panierReducer';

// Panier sauvegardé en local
const getLocalStorage = () => {
	if (localStorage.getItem('babyGourmetReact')){
		return JSON.parse(localStorage.getItem('babyGourmetReact'));
	}
	return [];
};

// State
const stateInitial = {
	panierOuvert:false,
	panier:getLocalStorage(),
	nombreDeProduits:0,
	montantTotal:0,
	babyBoxOuverte:false,
	produitBabyBox:{}
};

// Context
const PanierContext = React.createContext();

// Provider
export const PanierProvider = ({ children }) => {

	////////////////////////////////////////////// Reducer
	const [state, dispatch] = useReducer(panierReducer, stateInitial);

	// Variables globales
	const URL_MINIATURES = 'http://www.graphoeilmultimedia.com/reactDev/babyGourmet/imagesWWW/miniatures/';
	const URL_GRANDES = 'http://www.graphoeilmultimedia.com/reactDev/babyGourmet/imagesWWW/grandes/';

	////////////////////////////////////////////// Methods
	
	// Sauvegarde du panier en local et calcul du total
	useEffect(() => {
		dispatch({ type:CALCULE_LE_TOTAL_DU_PANIER });
		localStorage.setItem('babyGourmetReact', JSON.stringify(state.panier));
	},[state.panier]);

	// Ajoute un article dans le panier
	const ajoutePanier = (id, produit) => {
		dispatch({ type:AJOUTE_UN_ARTICLE_DANS_LE_PANIER, payload:{ id, produit } });
	};

	// Panier, ouverture & fermeture
	const ouvreLePanier = () => {
		dispatch({ type:OUVRE_LE_PANIER });
	};
	const fermeLePanier = () => {
		dispatch({ type:FERME_LE_PANIER });
	};

	// Change la quantité d'un article
	const changeQuantite = (id, type) => {
		dispatch({ type:CHANGE_LA_QUANTITE_D_UN_ARTICLE, payload:{ id, type } });
	};

	// Retire un article du panier
	const retirePanier = (id) => {
		dispatch({ type:RETIRE_UN_ARTICLE_DU_PANIER, payload:id });
	};

	// Vide le panier
	const videPanier = () => {
		dispatch({ type:VIDE_LE_PANIER });
	};

	// Ouvre la babyBox
	const ouvreBabyBox = (id) => {
		dispatch({ type:OUVRE_LA_BABYBOX, payload:id });
	};

	// Ferme la babyBox
	const fermeBabyBox = () => {
		dispatch({ type:FERME_LA_BABYBOX });
	};

	////////////////////////////////////////////// Return
	return(
		<PanierContext.Provider value={ {
			// State
			...state,
			// Variables
			URL_GRANDES, URL_MINIATURES,
			// Méthodes
			ajoutePanier, ouvreLePanier, fermeLePanier, 
			changeQuantite, retirePanier, videPanier,
			ouvreBabyBox, fermeBabyBox
		} }>{ children }</PanierContext.Provider>
	);

};

// Global context
export const usePanierContext = () => {
	return useContext(PanierContext);
};