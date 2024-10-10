const GameBoard = ({ snake, food, model }) => (
  <div 
    className="relative bg-white border-2 border-gray-300 rounded-lg shadow-lg"
    style={{
      width: model.GRID_SIZE * model.CELL_SIZE,
      height: model.GRID_SIZE * model.CELL_SIZE,
    }}
  >
    {snake.map((segment, index) => (
      <div
        key={`${segment.x}-${segment.y}-${index}`}
        className="absolute bg-green-500 rounded-sm"
        style={{
          left: segment.x * model.CELL_SIZE,
          top: segment.y * model.CELL_SIZE,
          width: model.CELL_SIZE,
          height: model.CELL_SIZE,
        }}
      />
    ))}
    <div
      className="absolute bg-red-500 rounded-full"
      style={{
        left: food.x * model.CELL_SIZE,
        top: food.y * model.CELL_SIZE,
        width: model.CELL_SIZE,
        height: model.CELL_SIZE,
      }}
    />
  </div>
);

const Controls = ({ isPaused, setIsPaused, resetGame }) => (
  <div className="mt-4 space-x-4">
    <Button
      onClick={() => setIsPaused(!isPaused)}
      variant="default"
    >
      {isPaused ? 'Resume' : 'Pause'}
    </Button>
    <Button
      onClick={resetGame}
      variant="default"
    >
      New Game
    </Button>
  </div>
);

const GameOverDialog = ({ showDialog, score, resetGame }) => (
  <AlertDialog open={showDialog}>
    <AlertDialogContent>
      <AlertDialogTitle>Game Over!</AlertDialogTitle>
      <AlertDialogDescription>
        Your score: {score}
      </AlertDialogDescription>
      <AlertDialogAction onClick={resetGame}>
        Play Again
      </AlertDialogAction>
    </AlertDialogContent>
  </AlertDialog>
);

// Main component - App.js
import React, { useState, useEffect, useCallback } from 'react';
import { AlertDialog, AlertDialogContent, AlertDialogTitle, AlertDialogDescription, AlertDialogAction } from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';

export default function SnakeGame() {
  const model = createGameModel();
  const {
    snake,
    food,
    score,
    isPaused,
    showDialog,
    resetGame,
    setIsPaused
  } = useGameController(model);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <div className="mb-4 text-2xl font-bold">Score: {score}</div>
      
      <GameBoard 
        snake={snake}
        food={food}
        model={model}
      />
      
      <Controls 
        isPaused={isPaused}
        setIsPaused={setIsPaused}
        resetGame={resetGame}
      />

      <GameOverDialog 
        showDialog={showDialog}
        score={score}
        resetGame={resetGame}
      />
    </div>
  );
}