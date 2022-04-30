// Imports
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
} from './actions';
import produits from '../data/produits';

// Fonction reducer
const panierReducer = (state, action) => {

	// Ajoute un article dans le panier
	if (action.type === AJOUTE_UN_ARTICLE_DANS_LE_PANIER){
		const {id, produit } = action.payload;
		// Déjà dans la panier ?
		const testArticle = state.panier.find((art) => {
			return art.id === id;
		});
		if (testArticle){
			// Augmentation de la quantité
			const nouveauPanier = state.panier.map((article) => {
				if (article.id === id){
					let nouvelleQuantite = article.quantite + 1;
					if (nouvelleQuantite > article.stock){
						nouvelleQuantite = article.stock;
					}
					// MAJ de la quantité
					return { ...article, quantite:nouvelleQuantite };
				} else {
					return article;
				}
			});
			return { ...state, panier:nouveauPanier };
		} else {
			// Nouvel article dans la panier
			const nouvelArticle = {
				id:id,
				nom:`${ produit.titre } ${ produit.ssTitre }`,
				quantite:1,
				photo:produit.photo,
				prix:produit.prix,
				remise:produit.remise,
				stock:produit.stock
			};
			return { ...state, panier:[ ...state.panier, nouvelArticle ] };
		}
	}

	// Total du panier et nombres d'articles
	if (action.type === CALCULE_LE_TOTAL_DU_PANIER){
		const { nombreDeProduits, montantTotal } = state.panier.reduce((acc, current) => {
			const { quantite, prix, remise } = current;
			let prixFinal = prix;
			if (remise > 0){
				prixFinal = (prix * (100 - remise) / 100);
			}
			acc.nombreDeProduits += quantite;
			acc.montantTotal += (prixFinal * quantite);
			// !!!!! Toujours retourner l'accumulation !!!!
			return acc;
		},{ nombreDeProduits:0, montantTotal:0 });
		return { ...state, nombreDeProduits, montantTotal };
	}

	// Ouvre le panier
	if (action.type === OUVRE_LE_PANIER){
		return { ...state, panierOuvert:true };
	}

	// Ferme le panier
	if (action.type === FERME_LE_PANIER){
		return { ...state, panierOuvert:false };
	}

	// Retire un article du panier
	if (action.type === RETIRE_UN_ARTICLE_DU_PANIER){
		const id = action.payload;
		const newPanier = state.panier.filter((article) => {
			return article.id !== id;
		});
		return { ...state, panier:newPanier };
	}

	// Change la quantité d'un article
	if (action.type === CHANGE_LA_QUANTITE_D_UN_ARTICLE){
		const { id, type } = action.payload;
		const nouveauPanier = state.panier.map((article) => {
			if (article.id === id){
				if (type === 'augmente'){
					let nouvelleQuantite = article.quantite + 1;
					if (nouvelleQuantite > article.stock){
						nouvelleQuantite = article.stock;
					}
					return { ...article, quantite:nouvelleQuantite };
				} else {
					let nouvelleQuantite = article.quantite - 1;
					if (nouvelleQuantite < 1){
						nouvelleQuantite = 1;
					}
					return { ...article, quantite:nouvelleQuantite };
				}
			} else {
				return article;
			}
		});
		return { ...state, panier:nouveauPanier };
	}

	// Vide le panier
	if (action.type === VIDE_LE_PANIER){
		return { ...state, panier:[] };
	}

	// Ouvre la babyBox
	if (action.type === OUVRE_LA_BABYBOX){
		const id = action.payload;
		const produitBabyBox = produits.find((produit) => {
			return produit.id === id;
		});
		return { ...state, babyBoxOuverte:true, produitBabyBox };
	}

	// Ferme la babyBox
	if (action.type === FERME_LA_BABYBOX){
		return { ...state, babyBoxOuverte:false };
	}

	// Error
	throw new Error(`Aucune action ne corresponds à "${ action.type }"`);
};

// Export
export default panierReducer;