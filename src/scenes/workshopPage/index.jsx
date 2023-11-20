import PageSchemaComponent from "components/page/PageSchemaComponent";
import PostComponent from "components/post/PostComponent";
import SchoolIcon from '@mui/icons-material/School';
import { useMediaQuery } from "@mui/material";


const WorkshopPage = () => {
    const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
    const text = "⛏️ Em construção...";
    

    const image = (picturePath) => {
        return <img
              width="100%"
              height="auto"
              alt="post"
              style={{ borderRadius: "0.75rem", marginTop: "0.75rem" }}
              src={ picturePath }
            />
        }

    const topContent = () => {
        return <PostComponent titulo={"Minhas Inscrições"} subtitulo={"Oficinas que estou participando"} content={text} icon={<SchoolIcon fontSize="large" />}  />
    }

    const mainContent = () => {
        const picturePath = "https://res.cloudinary.com/dosghtja7/image/upload/v1700360507/assets/cursos/lolcwrhiqqqfgblxywrv.png";
        
        return <>
            <PostComponent titulo={"Oficina de teatro"} subtitulo={"Ministrada por Lúcia e Carol"} content={image(picturePath)} icon={<SchoolIcon fontSize="large" />}  />
        </>
    }

    const lastContent = () => {
        const picturePath = "https://res.cloudinary.com/dosghtja7/image/upload/v1700360507/assets/cursos/lolcwrhiqqqfgblxywrv.png";
        return <PostComponent titulo={"Novidades"} subtitulo={"Próximas oficinas"} content={text} icon={<SchoolIcon fontSize="large" />}  />
    }

    return <PageSchemaComponent topContent={isNonMobileScreens ? topContent() : mainContent()} main={isNonMobileScreens ? mainContent() : topContent()} lastContent={lastContent()}  />
}

export default WorkshopPage;