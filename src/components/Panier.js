// Imports
import React from 'react';
import styled from 'styled-components';
import { usePanierContext } from '../contexts/panierContext';
import formatPrice from "../utils/formatPrice";
import PanierArticle from './PanierArticle';
import PanierDeco from './PanierDeco';

// Composant
const Panier = () => {
	
	// Context
	const { panier, nombreDeProduits, montantTotal, panierOuvert, 
		fermeLePanier, videPanier } = usePanierContext();

	// Return
	return(
		<Wrapper className={ `${ panierOuvert ? 'visible' : '' }` }>

			{/* Inner panier */}
			<div className="innerPanier">

				{/* Ferme panier */}
				<div className="boutonFerme" onClick={ fermeLePanier }>
					<i className="fal fa-times"></i>
				</div>
				{/* Ferme panier */}

				{/* Titre */}
				<div className="titre">
					<span>Mon</span>
					<span>panier</span>
				</div>
				{/* Titre */}

				{/* Pas d'article */}
				{
					panier.length < 1 && <div className="panierVide">
						<PanierDeco/>
						<p>Votre panier est vide.</p>
						<PanierDeco/>
					</div>
				}
				{/* Pas d'article */}

				{/* Articles */}
				{
					panier.map((article) => {
						return <PanierArticle key={ article.id } { ...article }/>
					})
				}
				{/* Articles */}

				{/* Total */}
				{
					panier.length >= 1 && <React.Fragment>
						<PanierDeco/>
						<div className="totalPanier">
							<p className="total">
								Total de votre panier : <b>{ formatPrice(montantTotal) }<span>€</span></b>
							</p>
							<p className="totalArticle">Votre panier contient {
								nombreDeProduits > 1 ? `${ nombreDeProduits } articles.` : `${ nombreDeProduits } article.`
							}</p>
						</div>
					</React.Fragment>
				}
				{/* Total */}

				{/* Vider le panier */}
				{
					panier.length >= 1 && <div className="videPanier">
						<button type="button" onClick={ videPanier }>
							Vider le panier
						</button>
					</div>
				}
				{/* Vider le panier */}

			</div>
			{/* Inner panier */}

		</Wrapper>
	);

};

// Styled
const Wrapper = styled.div`
	position: fixed;
	top: 0;
	right: -370px;
	width: 350px;
	min-height: 100%;
	background-color: white;
	box-shadow: 0 0 10px rgba(0,0,0,0.3);
	transition: 0.5s right ease-in-out;
	z-index: 90;
	&.visible{
		right: 0;
	}
	.innerPanier{
		position: absolute;
		width: 100%;
		height: 100%;
		overflow-y: scroll;
		padding: 60px 10px 30px 10px;
		text-align: center;
		.boutonFerme{
			position: absolute;
			top: 48px;
			left: 0;
			width: 40px;
			height: 40px;
			line-height: 40px;
			font-size: 24px;
			color: var(--vert);
			cursor: pointer;
		}
		.titre{
			font-size: 16px;
			text-transform: uppercase;
			span{
				margin: 0 5px 0 0;
			}
			span:first-of-type{
				font-weight: 700;
				color: var(--vert);
			}
		}
		.panierVide{
			margin: 30px 0 0 0;
			p{
				margin: 0 0 20px 0;
				font-size: 14px;
			}
		}
		.totalPanier{
			font-size: 14px;
			line-height: 1.2rem;
			.total{
				b{
					font-weight: 700;
					color: var(--vert);
				}
				span{
					vertical-align: super;
					font-size: 11px;
				}
			}
			.totalArticle{
				font-size: 12px;
			}
		}
		.videPanier{
			margin: 20px 0 0 0;
			button{
				width: 200px;
				padding: 10px;
				border: none;
				border-radius: 5px;
				text-transform: uppercase;
				background-color: var(--vert);
				color: white;
				transition: 0.35s background ease-in-out;
			}
		}
	}
	html.no-touchevents & .innerPanier .videPanier button:hover{
		background-color: var(--rouge);
	}
`;

// Export
export default Panier;