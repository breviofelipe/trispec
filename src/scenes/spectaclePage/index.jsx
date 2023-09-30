import { Box, Divider, useMediaQuery } from "@mui/material";
import DriverEmbed from "components/google/DriverEmbed";
import YoutubeEmbed from "components/youtube/YoutubeEmbed";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import Navbar from "scenes/navbar";
import AdvertWidget from "scenes/widgets/AdvertWidget";
import AtoresWidget from "scenes/widgets/AtoresWidget";
import PersonagensWidget from "scenes/widgets/PersonagensWidget";
import TaskSWidget from "scenes/widgets/TasksWidget";
import TurmaPostWidget from "scenes/widgets/TurmaPostWidget";
import TurmaWidget from "scenes/widgets/TurmaWidget";
import UserWidget from "scenes/widgets/UserWidget";
import TurmaPostsWidget from "scenes/widgets/posts/TurmaPostsWidget";
import DocumentoWidget from "scenes/widgets/posts/drive/DocumentoWidget";
import YoutubeWidget from "scenes/widgets/posts/youtube/YoutubeWidget";
import { setTurma } from "state";


const SpectaclePage = () => {
  
  const [ searchparams ] = useSearchParams();
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
  const turmas = useSelector((state) => state.turmas);
  const role = useSelector((state) => state.user.role);
  const [turmaInfo, setTurmaInfo] = useState();
  const turmaId = searchparams.get("turmaId");
  const userId = searchparams.get("userId");
  const picturePath = searchparams.get("picturePath");
  const dispatch = useDispatch();

  const getEspetaculo = () => {
    window.scrollTo(0,0);
    const data = turmas.filter((turma) => turma.turmaId === turmaId);
    if(data !== undefined){
      setTurmaInfo(data[0]);
      dispatch(setTurma({ turma: data[0] }));
    }
  };

  useEffect(() => {
    getEspetaculo();
  },[turmaId])

  const nonMobile = () => {
    return <Box>
    <Navbar />
    <Box
      width="100%"
      padding="2rem 6%"
      display={"flex"}
      gap="2rem"
      justifyContent="center"
    >
      <Box flexBasis={"26%"}>
          <UserWidget userId={userId} picturePath={picturePath} />
          <Box m="2rem 0" />
          <TurmaWidget turmaId={turmaId} />
      </Box>
      <Box
        flexBasis={"42%"}
      >
          {role === 'ADMIN' && <div><TurmaPostWidget picturePath={picturePath} /><Box m="2rem 0" /></div>}
          <TurmaPostsWidget picturePath={picturePath} />
          {turmaInfo && <PersonagensWidget listaPersonagens={turmaInfo.espetaculo.personagens} /> }
        </Box>      
        <Box flexBasis="26%">
            {turmaInfo && <AtoresWidget listaAtores={turmaInfo.atores} />} 
          <Box m="2rem 0" />
          <AdvertWidget />
        </Box>
    </Box>
  </Box>
  }

  const mobile = () => {
    return <Box>
    <Navbar />
    <Box
      width="100%"
      display={ "block" }
      gap="2rem"
      justifyContent="center"
    >
      <Box>
          { role === 'ADMIN' && <div><Divider /><TurmaPostWidget picturePath={picturePath} /><Divider /></div>}
          <TurmaWidget turmaId={turmaId} />
      </Box>
      <Divider />
      <Box>
          <TurmaPostsWidget picturePath={picturePath} />
          {turmaInfo && <PersonagensWidget listaPersonagens={turmaInfo.espetaculo.personagens} /> }
          
              <Box flexBasis="26%">
                <Divider />
                  {turmaInfo && <AtoresWidget listaAtores={turmaInfo.atores} />} 
                  <Divider />
                  <AdvertWidget />
              </Box>         
        </Box>
      </Box>
  </Box>
  }
  

  return (<>{isNonMobileScreens ? nonMobile() : mobile()}</>
    
  );
};

export default SpectaclePage;
