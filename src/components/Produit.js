// Imports
import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import gsap from 'gsap';
import { usePanierContext } from '../contexts/panierContext';
import formatPrice from '../utils/formatPrice';

// Composant
const Produit = (props) => {

	// Context
	const { URL_MINIATURES, ajoutePanier, ouvreBabyBox, panier } = usePanierContext();

	// Variables
	const produit = props.produit;
	const { id, titre, ssTitre, photo, prix, remise, visible } = produit;

	// Méthodes
	// Prix
	const affichePrixBarre = () => {
		let prixRemise = (prix * (100 - remise) / 100);
		return(
			<div className="zonePrix">
				<div className="prixBarre">
					{ formatPrice(prix, true) }<span>€</span>
				</div>
				<div className="prix">
					{ formatPrice(prixRemise, false) }<span>€</span>
				</div>
			</div>
		);
	};
	const affichePrixStandard = () => {
		return(
			<div className="zonePrix">
				<div className="prix">
					{ formatPrice(prix, false) }<span>€</span>
				</div>
			</div>
		);
	};
	// Animation du bouton panier
	const ajoutPanierRef = useRef();
	const [tweenEnCours, setTweenEnCours] = useState(false);
	const animationAjoutProduit = () => {
		const boutonAjout = ajoutPanierRef.current;
		if (!tweenEnCours){
			setTweenEnCours(true);
			gsap.to(boutonAjout, { duration:0.3, scale:2, ease:'bounce.out', repeat:1, yoyo:true, onComplete:() => {
				setTweenEnCours(false);
			} });
			// Envoi au context
			ajoutePanier(id, produit);
		}
	};
	// Article dans le panier (check)
	const dansLePanier = () => {
		let dedans = false;
		panier.forEach((article) => {
			if (article.id === id){
				dedans = true;
			}
		});
		return dedans;
	};

	// Returns
	if (visible){
		return(
			<Wrapper>

				{/* Check */}
				<div className={ `check ${ dansLePanier() ? 'visible' : '' }` }><i className="fas fa-badge-check"></i></div>
				{/* Check */}

				{/* Titre */}
				<h3>
					<span>{ titre }</span>
					<span>{ ssTitre }</span>
				</h3>
				{/* Titre */}

				{/* Photo */}
				<div className="photo">
					<img src={ `${ URL_MINIATURES }${ photo }` } alt={ `${ titre } ${ ssTitre }` } />
				</div>
				{/* Photo */}

				{/* Prix */}
				{
					remise > 0 ? affichePrixBarre() : affichePrixStandard()
				}
				{/* Prix */}

				{/* Boutons */}
				<div className="boutons">
					<button type="button" ref={ ajoutPanierRef } className="ajouter" onClick={ animationAjoutProduit }>
						<i className="fal fa-cart-plus"></i>
					</button>
					<button type="button" className="zoom" onClick={ () => { ouvreBabyBox(id); } }>
						<i className="fal fa-search-plus"></i>
					</button>
				</div>
				{/* Boutons */}

			</Wrapper>
		);
	}
	return null;

};

// Styled
const Wrapper = styled.div`
	display: inline-block;
	position: relative;
	width: calc(50% - 10px);
	padding: 10px 10px 30px 10px;
	margin: 5px 5px 40px 5px;
	
	.check{
		display: block;
		position: absolute;
		top: 10px;
		right: 10px;
		font-size: 16px;
		color: var(--rouge);
		opacity: 0;
		transform: scale(2);
		transition: 0.35s opacity ease-in-out, 0.35s transform ease-in-out;
	}
	.check.visible{
		opacity: 1;
		transform: scale(1);
	}
	h3{
		margin: 0 0 10px 0;
		text-align: center;
		text-transform: uppercase;
		line-height: 1.1rem;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
		span:first-child{
			display: block;
			font-weight: 700;
			color: var(--vert);
			font-size: 15px;
		}
		span:last-child{
			font-size: 13px;
		}
	}
	.photo{
		margin: 10px;
		height: 185px;
		img{
			display: block;
			width: 100%;
			height: 100%;
			object-fit: contain;
		}
	}
	.zonePrix{
		text-align: center;
		.prix{
			display: inline-block;
			font-weight: 700;
			font-size: 18px;
			color: var(--vert);
			span{
				vertical-align: super;
				font-size: 12px;
			}
		}
		.prixBarre{
			position: relative;
			display: inline-block;
			margin: 0 5px 0 0;
			font-size: 13px;
			color: var(--rouge);
			span{
				vertical-align: super;
				font-size: 10px;
			}
			&::before{
				content: '';
				display: block;
				position: absolute;
				width: 100%;
				top: 8px;
				left: -1px;
				border-bottom: 1px solid var(--rouge);
				transform: rotate(45deg);
			}
		}
	}
	.boutons{
		position: absolute;
		width: 120px;
		bottom: -25px;
		left: 50%;
		transform: translateX(-50%);
		text-align: center;
		button{
			position: relative;
			display: inline-block;
			width: 40px;
			height: 40px;
			font-size: 18px;
			border-radius: 50%;
			background-color: white;
			border: none;
			color: var(--vert);
			box-shadow: 0 0 10px rgba(0,0,0,0.3);
			i{
				position: absolute;
				top: 50%;
				left: 50%;
				transform: translate(-50%,-50%);
			}
		}
		button.ajouter{
			margin: 0 15px 0 0;
		}
	}
	/* >= 768px */
	@media only screen and (min-width: 768px){
		width: calc(33.33% - 10px);
		.photo{
			height: 200px;
		}
	}
	/* >= 1024px */
	@media only screen and (min-width: 1024px){
		width: calc(25% - 10px);
		.photo{
			height: 230px;
		}
		html.no-touchevents & .boutons{
			top: 40%;
			bottom: auto;
			transform: translate(-50%, -50%);
			opacity: 0;
			transition: 0.35s opacity ease-in-out, 0.35s top ease-in-out;
		}
		html.no-touchevents &:hover .boutons{
			opacity: 1;
			top: 50%;
		}
		html.no-touchevents & .ajouter, html.no-touchevents & .zoom{
			transition: 0.35s background ease-in-out, 0.35s color ease-in-out;
		}
		html.no-touchevents & .ajouter:hover, html.no-touchevents & .zoom:hover{
			background-color: var(--vert);
			color: white;
		}
	}
	/* >= 1366px */
	@media only screen and (min-width: 1366px){
		.photo{
			height: 250px;
		}
	}
`;

// Export
export default Produit;