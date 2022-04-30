// Imports
import React from 'react';
import styled from 'styled-components';
import { usePanierContext } from '../contexts/panierContext';
import formatPrice from '../utils/formatPrice';
import PanierDeco from './PanierDeco';

// Composant
const PanierArticle = ({ id, nom, quantite, photo, prix, remise, stock }) => {

	// Context
	const { URL_MINIATURES, changeQuantite, retirePanier } = usePanierContext();

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
				<div className="totalArticle">
					x { quantite } soit { formatPrice((prixRemise * quantite), false) }<span>€</span>
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
				<div className="totalArticle">
					x { quantite } soit { formatPrice((prix * quantite), false) }<span>€</span>
				</div>
			</div>
		);
	};

	// Return
	return(
		<Wrapper>

			{/* Deco */}
			<PanierDeco/>
			{/* Deco */}

			{/* Inner */}
			<div className="innerArticle">

				{/* Photo */}
				<div className="photo">
					<img src={ `${ URL_MINIATURES }${ photo }` } alt={ nom } />
				</div>
				{/* Photo */}

				{/* Infos */}
				<div className="infos">
					<h4>{ nom }</h4>
					{/* Prix */}
					{
						remise > 0 ? affichePrixBarre() : affichePrixStandard()
					}
					{/* Prix */}
				</div>
				{/* Infos */}

				{/* Quantite */}
				<div className="quantite">
					<button type="button" onClick={ () => { changeQuantite(id, 'augmente'); } }>
						<i className="fal fa-plus"></i>
					</button>
					<p>{ quantite }</p>
					<button type="button" onClick={ () => { changeQuantite(id, 'diminue'); } }>
						<i className="fal fa-minus"></i>
					</button>
				</div>
				{/* Quantite */}

				{/* Retirer */}
				<div className="retirePanier">
					<button type="button" onClick={ () => { retirePanier(id); } }>
						<i className="fal fa-trash"></i>
					</button>
				</div>
				{/* Retirer */}

			</div>
			{/* Inner */}

		</Wrapper>
	);

};

// Styled
const Wrapper = styled.div`
	.innerArticle{
		display: flex;
		flex-direction: row;
		flex-wrap: nowrap;
		justify-content: space-between;
		align-items: center;
		align-content: flex-start;
		margin: 0 0 20px 0;
		.photo{
			width: 75px;
			height: 75px;
			overflow: hidden;
			img{
				display: block;
				width: 100%;
				height: 100%;
				object-fit: contain;
			}
		}
		.infos{
			width: 150px;
			padding: 0 10px 0 0;
			text-align: left;
			line-height: 1rem;
			h4{
				font-size: 14px;
				white-space: nowrap;
				overflow: hidden;
				text-overflow: ellipsis;
			}
			.zonePrix{
				.prix{
					display: inline-block;
					font-weight: 700;
					font-size: 15px;
					color: var(--vert);
					span{
						vertical-align: super;
						font-size: 10px;
					}
				}
				.prixBarre{
					position: relative;
					display: inline-block;
					margin: 0 5px 0 0;
					font-size: 12px;
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
						top: 11px;
						left: -1px;
						border-bottom: 1px solid var(--rouge);
						transform: rotate(45deg);
					}
				}
				.totalArticle{
					font-size: 13px;
					span{
						vertical-align: super;
						font-size: 10px;
					}
				}
			}
		}
		.quantite{
			width: 50px;
			button{
				width: 30px;
				height: 30px;
				border: none;
				border-radius: 50%;
				background-color: white;
				color: black;
				box-shadow: 0 0 10px rgba(0,0,0,0.3);
			}
			p{
				margin: 7px 0;
				font-size: 14px;
			}
		}
		.retirePanier{
			width: 40px;
			button{
				width: 30px;
				height: 30px;
				border: none;
				border-radius: 50%;
				background-color: var(--rouge);
				color: white;
			}
		}
	}
`;

// Export
export default PanierArticle;