const useGameController = (model) => {
  const [snake, setSnake] = useState(model.INITIAL_SNAKE);
  const [direction, setDirection] = useState(model.INITIAL_DIRECTION);
  const [food, setFood] = useState(model.generateFood(model.GRID_SIZE));
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [showDialog, setShowDialog] = useState(false);

  const moveSnake = useCallback(() => {
    if (isPaused || gameOver) return;

    setSnake(prevSnake => {
      const { newSnake, ateFood, head } = model.getNextSnakePosition(prevSnake, direction, food);
      
      if (model.checkCollision(head, prevSnake, model.GRID_SIZE)) {
        setGameOver(true);
        setShowDialog(true);
        return prevSnake;
      }

      if (ateFood) {
        setScore(prevScore => prevScore + 1);
        setFood(model.generateFood(model.GRID_SIZE));
      }

      return newSnake;
    });
  }, [direction, food, isPaused, gameOver, model]);

  const handleKeyPress = useCallback((event) => {
    const newDirection = model.getNewDirection(event.key, direction);
    if (newDirection) {
      setDirection(newDirection);
    }

    if (event.key === ' ') {
      setIsPaused(prev => !prev);
    }
  }, [direction, model]);

  const resetGame = useCallback(() => {
    setSnake(model.INITIAL_SNAKE);
    setDirection(model.INITIAL_DIRECTION);
    setGameOver(false);
    setScore(0);
    setIsPaused(false);
    setFood(model.generateFood(model.GRID_SIZE));
    setShowDialog(false);
  }, [model]);

  useEffect(() => {
    const gameInterval = setInterval(moveSnake, model.GAME_SPEED);
    return () => clearInterval(gameInterval);
  }, [moveSnake, model.GAME_SPEED]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [handleKeyPress]);

  return {
    snake,
    food,
    score,
    isPaused,
    showDialog,
    resetGame,
    setIsPaused,
    model
  };
};