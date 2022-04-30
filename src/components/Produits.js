// Imports
import React from 'react';
import styled from 'styled-components';
import produits from '../data/produits';
import Produit from './Produit';

// Composant
const Produits = () => {

	// Return
	return(
		<Wrapper>
			{
				produits.map((produit) => {
					return <Produit key={ produit.id } produit={ produit }/>
				})
			}
		</Wrapper>
	);

};

// Styled
const Wrapper = styled.div`
	display: flex;
	flex-direction: row;
	flex-wrap: wrap;
	justify-content: center;
	align-items: stretch;
	align-content: stretch;
	margin: 20px 0;
`;

// Export
export default Produits;