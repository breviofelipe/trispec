import PageSchemaComponent from "../../components/page/PageSchemaComponent";
import PersonagensWidget from "scenes/widgets/PersonagensWidget";
import { useSelector } from "react-redux";
import PostComponent from "components/post/PostComponent";
import { FaTheaterMasks } from 'react-icons/fa';


const PersonagemPage = () => {
    const turma = useSelector((state) => state.turma);
    return <PageSchemaComponent topContent={<PostComponent titulo={"Página do personagem"} subtitulo={"Conteúdo do personagem"} icon={<FaTheaterMasks size={36}/>} content={"⛏️ Em construção..."} />} main={<PersonagensWidget listaPersonagens={turma.espetaculo.personagens} />}/>
}

export default PersonagemPage;