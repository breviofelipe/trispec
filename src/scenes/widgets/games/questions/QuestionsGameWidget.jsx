import WidgetWrapper from "components/WidgetWrapper";
import "./QuestionsGameWidget.css";
import FlexBetween from "components/FlexBetween";
import { Box, Button, Divider, Typography, useMediaQuery, useTheme } from "@mui/material";
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import PostComponent from "components/post/PostComponent";
import PostButton from "components/PostButton";
import { useEffect, useState } from "react";
import LoadingComponent from "components/loading/Loading";
import { useSelector } from "react-redux";
import Question from "./components/Question";

const questions = [
    { pergunta: "Hamlet está satisfeito com o casamento de sua mãe com seu tio após a morte de seu pai.", resposta: "Falso" },
    { pergunta: "Horácio viu o fantasma do rei, pai de Hamlet, na plataforma e tentou falar com ele.", resposta: "Verdadeiro" }
];




const QuestionsGameWidget = () => {  
    
    const titulo = "Verdadeiro ou Falso?";
    const subtitulo ="Sabe tudo sobre nosso espetáculos?";
    const [gameState, setGame] = useState();

    

    useEffect(() => {
        setGame(start());
    }, []);
        
    const start = () => {
        const quest = () => {
            return <Question setGame={setGame} next={quest}/>
        }
       return <Box>
            <Typography mb={"2rem"} variant="h4">Teste seus conhecimentos sobre o roteiro do Alex Capelossa, com afirmações extraidas do texto.</Typography>
            <PostButton text={"INICIAR"} onClick={() => {
                setGame(quest());
            }} />
        </Box>
    };
    
   
    return <PostComponent titulo={titulo} subtitulo={subtitulo} content={gameState} />
}

export default QuestionsGameWidget;