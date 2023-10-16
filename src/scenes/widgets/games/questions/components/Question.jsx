import { Box, Typography } from "@mui/material";
import FlexBetween from "components/FlexBetween";
import PostButton from "components/PostButton";
import LoadingComponent from "components/loading/Loading";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const Question = ({ setGame, next }) => {

    const [pergunta, setPergunta] = useState();
    const token = useSelector((state) => state.token);
    const url = "https://arcane-thicket-81092-1ac7cecea9b8.herokuapp.com/turmas/perguntas";      
    // const url = "http://localhost:5000/turmas/perguntas";
    const getQuestion = async () => {
        
        const response = await fetch(url, {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
        });
        const data = await response.json();
        setPergunta(data[0]);
    }
    useEffect(() => {
        getQuestion();
    }, []);




    const resposta = (nextQuestionResposta, resposta) => {
        if(nextQuestionResposta === resposta){
            return <Box>
                <Typography mb={"2rem"} variant="h4">Uhuu...</Typography>
                <Typography mb={"2rem"} variant="h4">Acertou</Typography>
                <PostButton text={"Proxima"} onClick={() => {setGame(next())}} />
                </Box>
        } else {
            return <Box>
            <Typography mb={"2rem"} variant="h4">Que pena...</Typography>
            <Typography mb={"2rem"} color={"red"} variant="h4">Errou</Typography>
            <PostButton text={"Proxima"} onClick={() => {setGame(next())}} />
            </Box>
        }
            
        
    }

    if(pergunta === undefined) return <LoadingComponent />;
    
    return <Box><Typography mb={"2rem"} variant="h4">{pergunta.pergunta}</Typography>
    <FlexBetween>
        <PostButton text={"Verdadeiro"} onClick={() => {setGame(resposta(pergunta.resposta, "Verdadeiro"));}} />
        <PostButton text={"Falso"} onClick={() => {setGame(resposta(pergunta.resposta, "Falso"))}} />
    </FlexBetween></Box>
}

export default Question;