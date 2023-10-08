import "./MemoryGameWidget.css";
import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    Button,
    DialogTitle,
    useTheme,
    Box,
    Typography,
    Divider,
    useMediaQuery
  } from "@mui/material";

import Card from "./components/Card";
import { useEffect, useState, useRef } from "react";
import WidgetWrapper from "components/WidgetWrapper";
import FlexBetween from "components/FlexBetween";
import { FaTheaterMasks } from "react-icons/fa";
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
const uniqueElementsArray = [
    {
      type: "Ophelia",
      image: "https://res.cloudinary.com/dosghtja7/image/upload/v1696729879/assets/games/memory_hamlet/i7yrbql89kdkpi1oexvc.jpg"
    },
    {
      type: "Claudio",
      image: 'https://res.cloudinary.com/dosghtja7/image/upload/v1696729957/assets/games/memory_hamlet/np33enatloufmyhdlf5d.jpg'
    },
    {
      type: "Hamlet",
      image: 'https://res.cloudinary.com/dosghtja7/image/upload/v1696730329/assets/games/memory_hamlet/jhsebbneaulte7xjundj.jpg'
    },
    {
      type: "Rainha",
      image: 'https://res.cloudinary.com/dosghtja7/image/upload/v1696730541/assets/games/memory_hamlet/a7dic5ruwagtzljjwvtm.jpg'
    },
    {
      type: "Laerte",
      image: 'https://res.cloudinary.com/dosghtja7/image/upload/v1696730626/assets/games/memory_hamlet/cak0nclt0zrdhmjtwhsp.jpg'
    },
    {
      type: "Polônio",
      image: 'https://res.cloudinary.com/dosghtja7/image/upload/v1696730728/assets/games/memory_hamlet/oyqxujvc5rddn3jqce9d.jpg'
    }
  ];

  function shuffleCards(array) {
    const length = array.length;
    for (let i = length; i > 0; i--) {
      const randomIndex = Math.floor(Math.random() * i);
      const currentIndex = i - 1;
      const temp = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temp;
    }
    return array;
  }
  
  

const MemoryGameWidget = () => {
    const { palette } = useTheme();
    const dark = palette.neutral.dark;
    const medium = palette.neutral.medium;
    const main = palette.neutral.main;
    const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
    const [cards, setCards] = useState(
        shuffleCards.bind(null, uniqueElementsArray.concat(uniqueElementsArray))
      );
      const [openCards, setOpenCards] = useState([]);
      const [clearedCards, setClearedCards] = useState({});
      const [shouldDisableAllCards, setShouldDisableAllCards] = useState(false);
      const [moves, setMoves] = useState(0);
      const [showModal, setShowModal] = useState(false);
      const [bestScore, setBestScore] = useState(
        JSON.parse(localStorage.getItem("bestScore")) || Number.POSITIVE_INFINITY
      );
      const timeout = useRef(null);
    
      const disable = () => {
        setShouldDisableAllCards(true);
      };
      const enable = () => {
        setShouldDisableAllCards(false);
      };
    
      const checkCompletion = () => {
        if (Object.keys(clearedCards).length === uniqueElementsArray.length) {
          setShowModal(true);
          const highScore = Math.min(moves, bestScore);
          setBestScore(highScore);
          localStorage.setItem("bestScore", highScore);
        }
      };
      const evaluate = () => {
        const [first, second] = openCards;
        enable();
        if (cards[first].type === cards[second].type) {
          setClearedCards((prev) => ({ ...prev, [cards[first].type]: true }));
          setOpenCards([]);
          return;
        }
        // This is to flip the cards back after 500ms duration
        timeout.current = setTimeout(() => {
          setOpenCards([]);
        }, 500);
      };
      const handleCardClick = (index) => {
        if (openCards.length === 1) {
          setOpenCards((prev) => [...prev, index]);
          setMoves((moves) => moves + 1);
          disable();
        } else {
          clearTimeout(timeout.current);
          setOpenCards([index]);
        }
      };
    
      useEffect(() => {
        let timeout = null;
        if (openCards.length === 2) {
          timeout = setTimeout(evaluate, 300);
        }
        return () => {
          clearTimeout(timeout);
        };
      }, [openCards]);
    
      useEffect(() => {
        checkCompletion();
      }, [clearedCards]);
      const checkIsFlipped = (index) => {
        return openCards.includes(index);
      };
    
      const checkIsInactive = (card) => {
        return Boolean(clearedCards[card.type]);
      };
    
      const handleRestart = () => {
        setClearedCards({});
        setOpenCards([]);
        setShowModal(false);
        setMoves(0);
        setShouldDisableAllCards(false);
        // set a shuffled deck of cards
        setCards(shuffleCards(uniqueElementsArray.concat(uniqueElementsArray)));
      };
    
      return (
        <WidgetWrapper isMobile={!isNonMobileScreens} className="memory-game">
            <FlexBetween gap="1rem" mb={"0.5rem"}>
                <FlexBetween gap="1rem">
                    <SportsEsportsIcon fontSize="large" />
                    <Box>
                        <Typography
                        variant="h4"
                        color={dark}
                        fontWeight="500"
                        sx={{
                            "&:hover": {
                            color: palette.primary.light,
                            cursor: "pointer",
                            },
                        }}
                        >
                        Cade meu personagem?
                        </Typography>
                        <Typography color={medium}>Teste sua memória, encontre os personagens com o menor número de movimentos.</Typography>
                    </Box>
                </FlexBetween>
            </FlexBetween>
          <Divider />
          <div className="container">
            {cards.map((card, index) => {
              return (
                <Card
                  key={index}
                  card={card}
                  index={index}
                  isDisabled={shouldDisableAllCards}
                  isInactive={checkIsInactive(card)}
                  isFlipped={checkIsFlipped(index)}
                  onClick={handleCardClick}
                />
              );
            })}
          </div>
          <footer>
            <div className="score">
              <div className="moves">
                <span className="bold">Movimentos:</span> {moves}
              </div>
              {localStorage.getItem("bestScore") && (
                <div className="high-score">
                  <span className="bold">Melhor pontuação:</span> {bestScore}
                </div>
              )}
            </div>
            <div className="restart">
              <Button onClick={handleRestart} color="primary" variant="contained">
                Restart
              </Button>
            </div>
          </footer>
          <Dialog
            open={showModal}
            disableBackdropClick
            disableEscapeKeyDown
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">
              Uhuuuuu!!! Você completou o desafio....
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                Você completou o desafio {moves} movimentos. Sua melhor pontuação{" "}
                {bestScore} movimentos.
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleRestart} color="primary">
                Restart
              </Button>
            </DialogActions>
          </Dialog>
        </WidgetWrapper>);
};



export default MemoryGameWidget;