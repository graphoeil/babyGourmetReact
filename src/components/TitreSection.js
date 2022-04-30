// Imports
import React from 'react';
import styled from 'styled-components';

// Composant
const TitreSection = ({ titre }) => {

	// Return
	return(
		<Wrapper>
			<h2>{ titre }</h2>
			<div className="ligneDeco">
				<span></span>
				<i className="fal fa-seedling"></i>
				<span></span>
			</div>
		</Wrapper>
	);

};

// Styled
const Wrapper = styled.div`
	width: 100%;
	text-align: center;
	font-size: 16px;
	h2{
		text-transform: uppercase;
	}
	.ligneDeco{
		margin: 10px 0 0 0;
		span{
			display: inline-block;
			width: 50px;
			border-bottom: 1px solid var(--vert);
		}
		i{
			padding: 0 5px;
			font-size: 18px;
			color: var(--vert);
			vertical-align: middle;
		}
	}
`;

// Export
export default TitreSection;