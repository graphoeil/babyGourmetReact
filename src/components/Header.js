// Imports
import React from 'react';
import styled from 'styled-components';
import { usePanierContext } from '../contexts/panierContext';

// Composant
const Header = () => {

	// Context
	const { nombreDeProduits, ouvreLePanier } = usePanierContext();

	// Return
	return(
		<Wrapper>
			<h1><b>Baby</b> Gourmet<i className="fal fa-seedling"></i></h1>
			<div onClick={ ouvreLePanier }>
				<i className="fas fa-shopping-cart"></i>
				<span>{ nombreDeProduits }</span>
			</div>
		</Wrapper>
	);

};

// Styled
const Wrapper = styled.header`
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	padding: 10px;
	background-color: white;
	box-shadow: 0 3px 3px rgba(0,0,0,0.3);
	text-transform: uppercase;
	text-align: center;
	z-index: 99;
	h1{
		font-size: 18px;
		b{
			font-weight: 700;
			color: var(--vert);
		}
		i{
			padding: 0 0 0 5px;
			color: var(--vert);
		}
	}
	div{
		position: absolute;
		top: 0;
		right: 0;
		width: 50px;
		height: 38px;
		line-height: 40px;
		font-size: 12px;
		cursor: pointer;
		i{
			padding: 0 5px 0 0;
			color: var(--vert);
			font-size: 16px;
		}
	}
`;

// Export
export default Header;