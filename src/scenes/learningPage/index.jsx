
import PageSchemaComponent from "components/page/PageSchemaComponent";
import HorizontalLinearStepperComponent from "components/stepper";
import PlayList from "./components/PlayList";
import PostComponent from "components/post/PostComponent";
import VideoPlayer from "components/cloudinaryVideo/VideoPlayer";
import VideoCameraFrontIcon from '@mui/icons-material/VideoCameraFront';
import TextSnippetIcon from '@mui/icons-material/TextSnippet';
import InputComponent from "components/InputComponent";
import { useState } from "react";
import PostButton from "components/PostButton";
import CommentIcon from '@mui/icons-material/Comment';
import { Divider, useMediaQuery } from "@mui/material";
const LearningPage = () => {

    const steps = ['Módulo 1', 'Módulo 2', 'Módulo 3', 'Módulo 4'];
    const text = "⛏️ Em construção...";
    const [value, setValue] = useState();
    const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
    const mainContent = () => {
        return <>{!isNonMobileScreens && <Divider />}
        <HorizontalLinearStepperComponent steps={steps}  />
        {isNonMobileScreens && <PostComponent titulo={"Aula 1 - O Trabalho do ator"} subtitulo={"teste de stream..."} content={<VideoPlayer />} icon={<VideoCameraFrontIcon fontSize="large" />} resumo={<PostComponent titulo={"Resumo"} icon={<TextSnippetIcon fontSize="large" />} content={"Texto de resumo do video"} center={false}/>} />}
        
        </>
    }

    const topContent = () => {
        return <>
        {!isNonMobileScreens && <PostComponent titulo={"Aula 1 - O Trabalho do ator"} subtitulo={"teste de stream..."} content={<VideoPlayer />} icon={<VideoCameraFrontIcon fontSize="large" />} resumo={<PostComponent titulo={"Resumo"} icon={<TextSnippetIcon fontSize="large" />} content={"Texto de resumo do video"} center={false}/>} />}
        <PlayList />
        </>
    }

    const lastContent = () => {
        
        return <>
                 <PostComponent titulo={"Deixe seu ponto"} icon={<CommentIcon fontSize="large" />} content={<InputComponent placeholder={"Duvidas, comentários, elogios..."} value={value} setValue={setValue} />} msg={<PostButton text={"Enviar"} />}/>   
        </>
    }

    return <PageSchemaComponent topContent={isNonMobileScreens ? topContent() : mainContent()} main={isNonMobileScreens ? mainContent() : topContent()} lastContent={lastContent()} />

}

export default LearningPage;