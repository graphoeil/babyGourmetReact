// Imports
import React from 'react';
import styled from 'styled-components';

// Composant
const Footer = () => {

	// Return
	return(
		<Wrapper>
			<b>Frédéric Hoyez</b> | 2022
		</Wrapper>
	);

};

// Styled
const Wrapper = styled.footer`
	font-size: 12px;
	text-transform: uppercase;
	text-align: center;
	padding: 10px 0 30px 0;
	margin: 20px 0;
	b{
		color: var(--vert);
		font-weight: 700;
	}
	@media only screen and (min-width: 768px){
		font-size: 13px;
	}
`;

// Export
export default Footer;