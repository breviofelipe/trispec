
import PostComponent from "components/post/PostComponent";
import SchoolIcon from '@mui/icons-material/School';
import VideoPlayer from "components/cloudinaryVideo/VideoPlayer";
import VideoCameraFrontIcon from '@mui/icons-material/VideoCameraFront';

const PlayList = () => { 
    return <>
    <PostComponent titulo={"Módulo 1"} icon={<SchoolIcon fontSize="large" />} />
    <PostComponent titulo={"Aula 1 - O Trabalho do ator"} subtitulo={"teste de stream..."} content={<VideoPlayer />} icon={<VideoCameraFrontIcon fontSize="large" />} />
    <PostComponent titulo={"Aula 2 - O Trabalho do ator"} subtitulo={"teste de stream..."} content={<VideoPlayer />} icon={<VideoCameraFrontIcon fontSize="large" />} />
    <PostComponent titulo={"Aula 3 - O Trabalho do ator"} subtitulo={"teste de stream..."} content={<VideoPlayer />} icon={<VideoCameraFrontIcon fontSize="large" />} />
    </>


}

export default PlayList;