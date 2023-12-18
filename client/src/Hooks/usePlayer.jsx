import { useState, useCallback } from 'react';

import { TETROMINOS, randomTetromino } from '../Pages/tetrominos';
import { STAGE_WIDTH, checkCollision } from '../Pages/gameHelpers';

export const usePlayer = () => {

  const [rightStage,setRightStage ] = useState([ randomTetromino() , randomTetromino(), randomTetromino()]);

  const [player, setPlayer] = useState({
    pos: { x: 0, y: 0 },
    tetromino: TETROMINOS[0].shape,
    next: rightStage,
    collided: false,
  });

  function resetRightStage() {
    setRightStage([ randomTetromino() , randomTetromino(), randomTetromino(), ]);
  }

  function rotate(matrix, dir) {
    // Make the rows to become cols (transpose)
    const mtrx = matrix.map((_, index) => matrix.map(column => column[index]));
    // Reverse each row to get a rotaded matrix
    if (dir > 0) return mtrx.map(row => row.reverse());
    return mtrx.reverse();
  }

  function playerRotate(stage, dir) {
    const clonedPlayer = JSON.parse(JSON.stringify(player));
    clonedPlayer.tetromino = rotate(clonedPlayer.tetromino, dir);

    const pos = clonedPlayer.pos.x;
    let offset = 1;
    while (checkCollision(clonedPlayer, stage, { x: 0, y: 0 })) {
      clonedPlayer.pos.x += offset;
      offset = -(offset + (offset > 0 ? 1 : -1));
      if (offset > clonedPlayer.tetromino[0].length) {
        rotate(clonedPlayer.tetromino, -dir);
        clonedPlayer.pos.x = pos;
        return;
      }
    }
    setPlayer(clonedPlayer);
  }

  const updatePlayerPos = ({ x, y, collided }) => {
    setPlayer(prev => ({
      ...prev,
      pos: { x: (prev.pos.x += x), y: (prev.pos.y += y) },
      collided,
    }));
  };

  const resetPlayer = useCallback(() => {
    setPlayer({
      pos: { x: STAGE_WIDTH / 2 - 2, y: 0 },
      tetromino: randomTetromino( rightStage ).shape,
      next: rightStage(),
      collided: false,
    });
  }, []);

  return [player, rightStage, setRightStage, resetRightStage,updatePlayerPos, resetPlayer, playerRotate];
};
