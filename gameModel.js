const createGameModel = () => {
  const GRID_SIZE = 20;
  const CELL_SIZE = 20;
  const INITIAL_SNAKE = [{ x: 10, y: 10 }];
  const INITIAL_DIRECTION = { x: 1, y: 0 };
  const GAME_SPEED = 100;

  return {
    GRID_SIZE,
    CELL_SIZE,
    INITIAL_SNAKE,
    INITIAL_DIRECTION,
    GAME_SPEED,
    
    generateFood: (gridSize) => ({
      x: Math.floor(Math.random() * gridSize),
      y: Math.floor(Math.random() * gridSize),
    }),

    checkCollision: (head, snake, gridSize) => {
      if (
        head.x < 0 ||
        head.x >= gridSize ||
        head.y < 0 ||
        head.y >= gridSize
      ) {
        return true;
      }
      return snake.some((segment, index) => 
        index !== 0 && segment.x === head.x && segment.y === head.y
      );
    },

    getNextSnakePosition: (snake, direction, food) => {
      const newSnake = [...snake];
      const head = {
        x: newSnake[0].x + direction.x,
        y: newSnake[0].y + direction.y,
      };
      
      newSnake.unshift(head);
      
      const ateFood = head.x === food.x && head.y === food.y;
      if (!ateFood) {
        newSnake.pop();
      }
      
      return {
        newSnake,
        ateFood,
        head
      };
    },

    getNewDirection: (key, currentDirection) => {
      const keyDirections = {
        ArrowUp: { x: 0, y: -1 },
        ArrowDown: { x: 0, y: 1 },
        ArrowLeft: { x: -1, y: 0 },
        ArrowRight: { x: 1, y: 0 },
      };

      const newDirection = keyDirections[key];
      if (!newDirection) return null;

      const isOppositeDirection =
        newDirection.x === -currentDirection.x && 
        newDirection.y === -currentDirection.y;
      
      return isOppositeDirection ? null : newDirection;
    }
  };
};