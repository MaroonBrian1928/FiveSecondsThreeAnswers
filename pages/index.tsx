import * as React from 'react';
import { Button, Box, Typography, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Stepper, Step, StepLabel } from '@mui/material';

type GameState = "start" | "inProgress" | "done";

const topicsArray = ["countries in Africa",
  "fruits that are red",
  "countries in Asia",
  "items you find in a kitchen",
  "types of flowers",
  "animals that can fly",
  "brands of cars",
  "sports played with a ball",
  "musical instruments",
  "colors of the rainbow",
  "famous scientists",
  "modes of transportation",
  "currencies around the world",
  "types of shoes",
  "languages spoken in Europe",
  "tools found in a toolbox",
  "books by George RR Martin",
  "capital cities",
  "breeds of dogs",
  "movie genres",
  "planets in the solar system",
  "things you can find at the beach",
  "famous painters",
  "types of sports",
  "animals that hibernate",
  "vegetables that are green",
  "items in a school bag",
  "modes of communication",
  "types of desserts",
  "things you can do on a rainy day",
  "famous landmarks",
  "types of birds",
  "items found in a supermarket",
  "Things you can see in the night sky",
  "types of music genres",
  "insects that can't fly",
  "types of trees",
  "items in a first aid kit",
  "famous inventors",
  "types of sports cars",
  "animals that live in the jungle",
  "items you would take on a camping trip",
  "famous actors",
  "types of vegetables",
  "things you find in a toolbox",
  "modes of transportation",
  "famous musicians",
  "types of beverages",
  "famous landmarks",
  "things you wear on your head",
  "types of birds",
  "items found in a kitchen",
  "famous authors",
  "types of flowers",
  "things you find in a park",
  "famous athletes",
  "types of trees",
  "items in a grocery store"
];

const shuffleArray = (array: Array<string>) => {
  const shuffledArray = [...array];
  shuffledArray.sort(() => Math.random() - 0.5);
  return shuffledArray;
}

const shuffledArray = shuffleArray(topicsArray);

const FiveSecondRule: React.FC = () => {
  const [gameState, setGameState] = React.useState<GameState>("start");
  const [counter, setCounter] = React.useState<number>(5);
  const [open, setOpen] = React.useState<boolean>(false);
  const [currentRound, setCurrentRound] = React.useState<number>(0);
  const [topic, setTopic] = React.useState<string>(shuffledArray[currentRound]);
  const [score, setScore] = React.useState<number>(0);
  const intervalRef = React.useRef<NodeJS.Timeout>();

  const handleStart = () => {
    setGameState("inProgress");
    intervalRef.current = setInterval(() => {
      setCounter((prevCounter) => prevCounter - 1);
    }, 1000);
  };

  const handleClose = (success: boolean) => {
    setOpen(false);
    if (success) {
      setScore(score + 1);
    }
    if (currentRound < shuffledArray.length - 1) {
      setCurrentRound(currentRound + 1);
      setTopic(shuffledArray[currentRound + 1]);
      setCounter(5);
      setGameState("start");
    }
  };

  React.useEffect(() => {
    if (counter === 0) {
      clearInterval(intervalRef.current as NodeJS.Timeout);
      setGameState("done");
      setOpen(true);
    }
  }, [counter]);

  return (
    <Box>
      <Typography variant="h4">Score: {score}</Typography>
      <Typography variant="body1">Name three {topic}</Typography>
      <Button variant="contained" onClick={handleStart} disabled={gameState !== "start"}>
        Start
      </Button>
      {gameState === "inProgress" && (
        <Box>
          <Typography variant="body1">Time remaining: {counter}s</Typography>
        </Box>
      )}
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Time's Up!"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Were you successful in responding within the 5 second time limit?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleClose(true)} color="primary">
            Yes
          </Button>
          <Button onClick={() => handleClose(false)} color="primary" autoFocus>
            No
          </Button>
        </DialogActions>
      </Dialog>
      <Stepper activeStep={currentRound} alternativeLabel>
        {topicsArray.map((_topic, index) => (
          <Step key={index}>
            <StepLabel>Round {index + 1}</StepLabel>
          </Step>
        ))}
      </Stepper>
    </Box>
  );
};

export default FiveSecondRule;
