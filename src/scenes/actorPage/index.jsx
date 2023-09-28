import { Box, useMediaQuery } from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import Navbar from "scenes/navbar";
import AdvertWidget from "scenes/widgets/AdvertWidget";
import AtoresWidget from "scenes/widgets/AtoresWidget";
import TurmaWidget from "scenes/widgets/TurmaWidget";
import UserWidget from "scenes/widgets/UserWidget";
import FormMasks from "./Form";


const ActorPage = () => {
  
  const [ searchparams ] = useSearchParams();
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
  const actorId = searchparams.get("actorId");
  const [actorUserPicturePath, setActorUserPicturePath] = useState();
  const [actorOpnions, setActorOpnions] = useState();
  const turma = useSelector((state) => state.turma);
  
    useEffect(() => {
      const ator = turma.atores.filter((ator) => ator.id === actorId)[0];
      const picture = ator.userPicturePath;
      setActorUserPicturePath(picture);
      const opnions = ator.opnions;
      setActorOpnions(opnions);
  },[searchparams, turma])

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
          <FormMasks actorId={actorId} opnions={actorOpnions}/>
          {isNonMobileScreens && <AtoresWidget listaAtores={turma.atores} />}
          <Box m="2rem 0" />
            {!isNonMobileScreens && (
                <Box flexBasis="26%">
                  <AtoresWidget listaAtores={turma.atores} />
                  <Box m="2rem 0" />             
                  <TurmaWidget turmaId={turma.turmaId} />
                </Box>
              )}
          </Box>      
        {isNonMobileScreens && (
          <Box flexBasis="26%">
            <TurmaWidget turmaId={turma.turmaId} />      
            <Box m="2rem 0" />
            <AdvertWidget />
          </Box>
        )}
      </Box>
    </Box>
  )
};

export default ActorPage;
