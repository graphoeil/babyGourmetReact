// Imports
import React from 'react';
import styled from 'styled-components';

// Composant
const PanierDeco = () => {

	// Return
	return(
		<Wrapper>
			<span></span>
				<i className="fal fa-seedling"></i>
			<span></span>
		</Wrapper>
	);

};

// Styled
const Wrapper = styled.div`
	margin: 10px 0 20px 0;
	span{
		display: inline-block;
		width: 30px;
		border-bottom: 1px solid var(--vert);
	}
	i{
		padding: 0 5px;
		font-size: 18px;
		color: var(--vert);
		vertical-align: middle;
	}
`;

// Export
export default PanierDeco;