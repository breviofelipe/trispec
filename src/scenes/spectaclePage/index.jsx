import { Box, Divider, useMediaQuery } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import Navbar from "scenes/navbar";
import AdvertWidget from "scenes/widgets/AdvertWidget";
import AtoresWidget from "scenes/widgets/AtoresWidget";
import PersonagensWidget from "scenes/widgets/PersonagensWidget";
import TurmaPostWidget from "scenes/widgets/PostarTurmaWidget";
import TurmaWidget from "scenes/widgets/TurmaWidget";
import UserWidget from "scenes/widgets/UserWidget";
import TurmaPostsWidget from "scenes/widgets/posts/TurmaPostsWidget";
import { setTurma } from "state";


const SpectaclePage = () => {
  
  const [ searchparams ] = useSearchParams();
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
  const turmas = useSelector((state) => state.turmas);
  const role = useSelector((state) => state.user.role);
  const user = useSelector((state) => state.user);
  const [turmaInfo, setTurmaInfo] = useState();
  const turmaId = searchparams.get("turmaId");
  const userId = useSelector((state) => state.user.id);
  const picturePath = useSelector((state) => state.user.picturePath);
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
          {turmaInfo && role === 'ADMIN' && <div><TurmaPostWidget picturePath={picturePath} /><Box m="2rem 0" /></div>}
          {turmaInfo && <TurmaPostsWidget picturePath={picturePath} turmaId={turmaInfo.id}/>}
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
      </Box>
      <Divider />
      <Box>
          {turmaInfo && <PersonagensWidget listaPersonagens={turmaInfo.espetaculo.personagens} /> }
          <Divider />
          {turmaInfo && <TurmaPostsWidget picturePath={picturePath} turmaId={turmaInfo.id}/>}
          <TurmaWidget turmaId={turmaId} />
          <Divider />
          <TurmaPostsWidget picturePath={picturePath} />
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
