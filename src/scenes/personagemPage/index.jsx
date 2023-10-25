import PageSchemaComponent from "../../components/page/PageSchemaComponent";
import PersonagensWidget from "scenes/widgets/PersonagensWidget";
import { useSelector } from "react-redux";
import PostComponent from "components/post/PostComponent";
import { FaTheaterMasks } from 'react-icons/fa';
import { useSearchParams } from "react-router-dom";
import UserWidget from "scenes/widgets/user/UserWidget";
import { Box, Divider, useMediaQuery } from "@mui/material";


const PersonagemPage = () => {
    const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
    const turma = useSelector((state) => state.turma);
    const [ searchparams ] = useSearchParams();
    const personagemId = searchparams.get("personagemId");
    const personagem = turma.espetaculo.personagens.filter(personagem => personagem.id === personagemId);
    const atores = turma.atores.filter((actor) => actor.personagens.filter((personagem => personagem.id === personagemId))[0]);
    const mainContent = () => {
        return <div>
            {content()}
            {isNonMobileScreens ? <Box m={"2rem"} /> : <Divider />}
            <PersonagensWidget listaPersonagens={turma.espetaculo.personagens} />

        </div>
    }
    const content = () => {
        return <Box>
             { atores.map(ator => {
            return <div><UserWidget actorProfile userId={ator.id} key={ator.id} />{isNonMobileScreens ? <Box m={"2rem"} /> : <Divider />}</div>
        })
        }
        </Box>
    }
    const topContent = () => {
        return <PostComponent titulo={personagem[0].nome} subtitulo={"Conteúdo do personagem"} icon={<FaTheaterMasks size={36}/>} content={"⛏️ Em construção..."} />
    }
    return <PageSchemaComponent topContent={topContent()} main={mainContent()}/>
}

export default PersonagemPage;