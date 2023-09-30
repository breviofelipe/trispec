    import { Box, Divider, useMediaQuery } from "@mui/material";
import DocumentoWidget from "./drive/DocumentoWidget";
import YoutubeWidget from "./youtube/YoutubeWidget";
import TaskSWidget from "../TasksWidget";

const TurmaPostsWidget = ({picturePath}) => {

    const isNonMobileScreens = useMediaQuery("(min-width:1000px)");

    const nonMobile = () => {
        return <>
            <DocumentoWidget embedId={'1JoynXWutF9sHkfN5YHbeGKQNKHpP2fQ6='} picturePath={picturePath} description={'Texto Hamlet completo'} subtitle={'29/09/2023'} />
            <DocumentoWidget embedId={'19CJ-A3QyLHQNZlFZEdKYgrEN_ZnoqEBT'} picturePath={picturePath} description={'O Herói de mil faces'} subtitle={'29/09/2023'} />
            <YoutubeWidget embedId={'s6F8UTHAtSw'} picturePath={picturePath} description={'Teste post youtube'} subtitle={'28/09/2023'} />
            <Box m="2rem 0" />
            <TaskSWidget />    
        </>
    }

    const mobile = () => {
        return <>
            <DocumentoWidget embedId={'1JoynXWutF9sHkfN5YHbeGKQNKHpP2fQ6='} picturePath={picturePath} description={'Texto Hamlet completo'} subtitle={'29/09/2023'} />
            <Divider />
            <DocumentoWidget embedId={'19CJ-A3QyLHQNZlFZEdKYgrEN_ZnoqEBT'} picturePath={picturePath} description={'O Herói de mil faces'} subtitle={'29/09/2023'} />
            <Divider />
            <YoutubeWidget embedId={'s6F8UTHAtSw'} picturePath={picturePath} description={'Teste post youtube'} subtitle={'28/09/2023'} />
            <Divider />
            <TaskSWidget />
            <Divider />
          </>
    }

    return (<>{isNonMobileScreens ? nonMobile() : mobile()}</>)

}

export default TurmaPostsWidget;