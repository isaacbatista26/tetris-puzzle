// Grid.js
import React from 'react';
import styled from 'styled-components';
import Cell from './Cell';

const StyledGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(10, 20px);
  grid-template-rows: repeat(20, 20px);
  grid-gap: 3px;
  margin: 0px 20px;
`;

const Grid = ({ grid }) => {

  return (
    <StyledGrid>
      {grid.map((row, rowIndex) => (
        row.map((type, colIndex) => (
          <Cell type={type} id={`${rowIndex}-${colIndex}`} />
        ))
      ))}
      

    </StyledGrid>
  );
};

export default Grid;