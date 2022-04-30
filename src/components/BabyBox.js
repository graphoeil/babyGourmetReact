// Imports
import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { usePanierContext } from '../contexts/panierContext';
import formatPrice from '../utils/formatPrice';
import gsap from 'gsap';

// Composant
const BabyBox = () => {

	// Context
	const { URL_GRANDES, produitBabyBox, fermeBabyBox } = usePanierContext();

	// Variables
	const { titre, ssTitre, photo, prix, remise } = produitBabyBox;
	// Animation
	const titreRef = useRef();
	const ssTitreRef = useRef();
	const prixRef = useRef();
	const photoRef = useRef();
	const tlBabyBox = useRef();

	// Calcul prix remise
	const prixBB = () => {
		let prixFinal = prix;
		if (remise > 0){
			prixFinal = (prix * (100 - remise) / 100);
		}
		return <div ref={ prixRef } className="prixBB">
			{ formatPrice(prixFinal, true) }<span>€</span>
		</div>
	};

	// Image chargée
	useEffect(() => {
		const image = new Image();
		image.src = `${ URL_GRANDES }${ photo }`;
		image.addEventListener('load', () => {
			tlBabyBox.current.play();
		});
		// Animation
		tlBabyBox.current = gsap.timeline({ onReverseComplete:() => { fermeBabyBox(); }, paused:true });
		tlBabyBox.current
		.to(titreRef.current, { duration:0.7, left:'10px', ease:'power4.out' })
		.to(ssTitreRef.current, { duration:0.7, left:'15px', ease:'power4.out' },'-=0.5')
		.to(photoRef.current, { duration:1, opacity:1, ease:'none' },'-=0.4')
		.to(prixRef.current, { duration:0.7, right:'10px', rotation:10, ease:'power4.out' },'-=0.5');
		// Nettoyage
		return() => {
			image.removeEventListener('load',() => {});
		}
	});

	// Return
	return(
		<Wrapper onClick={ () => { tlBabyBox.current.timeScale(3).reverse(); } }>
			<div ref={ titreRef } className="titreBB">{ titre }</div>
			<div ref={ ssTitreRef } className="ssTitreBB">{ ssTitre }</div>
			{ prixBB() }
			<div ref={ photoRef } className="photoBB">
				<img src={ `${ URL_GRANDES }${ photo }` } alt={ `${ titre } ${ ssTitre }` } />
			</div>
		</Wrapper>
	);

};

// Styled
const Wrapper = styled.div`
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background-color: white;
	z-index: 999;
	cursor: zoom-out;
	.titreBB{
		position: absolute;
		top: 10px;
		left: -60%;
		color: var(--vert);
		font-weight: 700;
		font-size: 30px;
		white-space: nowrap;
		text-transform: uppercase;
		z-index: 9;
	}
	.ssTitreBB{
		position: absolute;
		top: 35px;
		left: -60%;
		font-size: 14px;
		text-transform: uppercase;
		padding: 10px;
		background-color: var(--vert);
		color: white;
		z-index: 9;
	}
	.prixBB{
		position: absolute;
		bottom: 10px;
		right: -120px;
		width: 60px;
		height: 60px;
		background-color: var(--vert);
		color: white;
		font-size: 20px;
		font-weight: 700;
		border-radius: 50%;
		line-height: 53px;
		text-align: center;
		transform: rotate(180deg);
		z-index: 9;
		span{
			font-size: 14px;
			vertical-align: super;
			font-weight: 400;
		}
	}
	.photoBB{
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		padding: 10px;
		opacity: 0;
		z-index: 1;
		img{
			display: block;
			width: 100%;
			height: 100%;
			object-fit: contain;
		}
	}
	/* >= 768px */
	@media only screen and (min-width: 768px){
		.titreBB{
			font-size: 35px;
		}
		.ssTitreBB{
			top: 38px;
			font-size: 18px;
		}
		.prixBB{
			width: 70px;
			height: 70px;
			font-size: 25px;
			line-height: 63px;
		}
		.photoBB{
			padding: 15%;
		}
	}
	/* >= 1024px */
	@media only screen and (min-width: 1024px){
		.photoBB{
			padding: 8%;
		}
	}
	/* >= 1366px */
	@media only screen and (min-width: 1366px){
		.titreBB{
			font-size: 40px;
		}
		.ssTitreBB{
			top: 43px;
			font-size: 24px;
		}
		.prixBB{
			width: 80px;
			height: 80px;
			font-size: 30px;
			line-height: 73px;
		}
		.photoBB{
			padding: 10%;
		}
	}
	/* >= 1690px */
	@media only screen and (min-width: 1690px){
		.photoBB{
			padding: 6%;
		}
	}
	/* >= 2560px */
	@media only screen and (min-width: 2560px){
		.photoBB{
			padding: 8%;
		}
	}
`;

// Export
export default BabyBox;