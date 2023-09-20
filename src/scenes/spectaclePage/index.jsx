import { Box, useMediaQuery } from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import Navbar from "scenes/navbar";
import AdvertWidget from "scenes/widgets/AdvertWidget";
import AtoresWidget from "scenes/widgets/AtoresWidget";
import MyPostWidget from "scenes/widgets/MyPostWidget";
import PersonagensWidget from "scenes/widgets/PersonagensWidget";
import TaskSWidget from "scenes/widgets/TasksWidget";
import TurmaPostWidget from "scenes/widgets/TurmaPostWidget";
import TurmaWidget from "scenes/widgets/TurmaWidget";
import UserWidget from "scenes/widgets/UserWidget";


const SpectaclePage = () => {
  
  const [ searchparams ] = useSearchParams();
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
  const turmas = useSelector((state) => state.turmas);
  const [espetaculoInfo, setEstaculo] = useState();
  const turmaId = searchparams.get("turmaId");
  const userId = searchparams.get("userId");
  const picturePath = searchparams.get("picturePath");

  const getEspetaculo = () => {
    const data = turmas.filter((turma) => turma.turmaId === turmaId);
    if(data !== undefined){
      setEstaculo(data[0]);
    }
  };

  useEffect(() => {
    getEspetaculo();
  },[])

  return (
    <Box>
      <Navbar />
      <Box
        width="100%"
        padding="2rem 6%"
        display={isNonMobileScreens ? "flex" : "block"}
        gap="2rem"
        justifyContent="center"
      >
        <Box flexBasis={isNonMobileScreens ? "26%" : undefined}>
            
            <TurmaWidget turmaId={turmaId} />
            <Box m="2rem 0" />
            {isNonMobileScreens &&  <UserWidget userId={userId} picturePath={picturePath} /> }
            </Box>
        <Box
          flexBasis={isNonMobileScreens ? "42%" : undefined}
          mt={isNonMobileScreens ? undefined : "2rem"}
        >
          {/* <MyPostWidget picturePath={picturePath} /> */}
          <TurmaPostWidget picturePath={picturePath} />
          <Box m="2rem 0" />
            <TaskSWidget />
            {espetaculoInfo && <PersonagensWidget listaPersonagens={espetaculoInfo.espetaculo.personagens} /> }
            {!isNonMobileScreens && (
                <Box flexBasis="26%">
                  <Box m="2rem 0" />
                    {espetaculoInfo && <AtoresWidget listaAtores={espetaculoInfo.atores} />} 
                  
                </Box>
              )}
            
          </Box>
          
         
        {isNonMobileScreens && (
          <Box flexBasis="26%">
              {espetaculoInfo && <AtoresWidget listaAtores={espetaculoInfo.atores} />} 
            <Box m="2rem 0" />
              <AdvertWidget />
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default SpectaclePage;
