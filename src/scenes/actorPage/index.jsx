import { Box, useMediaQuery } from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import Navbar from "scenes/navbar";
import AdvertWidget from "scenes/widgets/AdvertWidget";
import AtoresWidget from "scenes/widgets/AtoresWidget";
import TaskSWidget from "scenes/widgets/TasksWidget";
import TurmaPostWidget from "scenes/widgets/TurmaPostWidget";
import TurmaWidget from "scenes/widgets/TurmaWidget";
import UserWidget from "scenes/widgets/UserWidget";
import FormMasks from "./Form";


const ActorPage = () => {
  
  const [ searchparams ] = useSearchParams();
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
  const actorId = searchparams.get("actorId");
  const actorUserPicturePath = searchparams.get("actorUserPicturePath");
  const turmaId = searchparams.get("turmaId");
  const picturePath = useSelector((state) => state.user.picturePath);
  const turmas = useSelector((state) => state.turmas);
  const [atores, setAtores] = useState();
  const getAtoresTurma = () => {
    const data = turmas.filter((turma) => turma.turmaId === turmaId);
    if(data !== undefined){
      setAtores(data[0]);
    }
  };
  useEffect(() => {
    getAtoresTurma();
  },[])

  return (<Box>
      <Navbar />
      <Box
        width="100%"
        padding="2rem 6%"
        display={isNonMobileScreens ? "flex" : "block"}
        gap="2rem"
        justifyContent="center"
      >
        <Box flexBasis={isNonMobileScreens ? "26%" : undefined}>
          <UserWidget actorProfile userId={actorId} picturePath={actorUserPicturePath} />  
        </Box>
        <Box
          flexBasis={isNonMobileScreens ? "42%" : undefined}
          mt={isNonMobileScreens ? undefined : "2rem"}
        >
          {/* <TurmaPostWidget picturePath={picturePath} />  */}
          <FormMasks />
          <Box m="2rem 0" />
            <TurmaWidget turmaId={turmaId} />      
          <Box m="2rem 0" />
            <TaskSWidget />

            {!isNonMobileScreens && (
                <Box flexBasis="26%">
                  <TaskSWidget />
                  <Box m="2rem 0" />
                  <TaskSWidget />     
                          
                </Box>
              )}
            
          </Box>
          
         
        {isNonMobileScreens && (
          <Box flexBasis="26%">
            {atores && <AtoresWidget listaAtores={atores.atores} />}
            <Box m="2rem 0" />
            <AdvertWidget />
          </Box>
        )}
      </Box>
    </Box>
  )
};

export default ActorPage;
