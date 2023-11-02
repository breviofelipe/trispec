import { Box, Divider, useMediaQuery } from "@mui/material";
import { useSelector } from "react-redux";
import Navbar from "scenes/navbar";
import UserWidget from "scenes/widgets/user/UserWidget";

import FriendListWidget from "scenes/widgets/FriendListWidget";
import TurmasWidget from "scenes/widgets/turmas/TurmasWidget";
import { createSearchParams, useNavigate } from "react-router-dom";
import PageSchemaComponent from "components/page/PageSchemaComponent";
import PostComponent from "components/post/PostComponent";
import InsightsIcon from '@mui/icons-material/Insights';

const HomePage = () => {
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
  const { id, picturePath } = useSelector((state) => state.user);
  const role = useSelector((state) => state.user.role);
  const turmas = useSelector((state) => state.turmas);
  const navigete = useNavigate();

  if(role === "ACTOR"){
    const turmaId = turmas.filter(turma => turma.atores.filter(ator => ator.userId === id)).map(turma => turma.turmaId)[0];
    navigete({
      pathname:`/spectacle/`, search: createSearchParams({'turmaId': turmaId }).toString()
    });

  }

  const home = () => {

    const top = () => {
      return <><UserWidget userId={id} picturePath={picturePath} />
        {isNonMobileScreens ? <><Box m="2rem 0" /></> : <><Divider /></>}
      </>
    };

    const main = () => {
      return <><TurmasWidget />
      {isNonMobileScreens ? <><Box m="2rem 0" /></> : <><Divider /></>}</>
    }

    const lastContent = () => {
      return <>
          <PostComponent titulo={"Insights"} subtitulo={"Como os atores estão se comportando."} content={"⛏️ Em construção..."} icon={<InsightsIcon fontSize="large" />} />
          {isNonMobileScreens ? <><Box m="2rem 0" /></> : <><Divider /></>}
          <FriendListWidget userId={id} />
          {isNonMobileScreens ? <><Box m="2rem 0" /></> : <><Divider /></>}
      </>
    }
    return <PageSchemaComponent topContent={top()} main={main()} lastContent={lastContent()}/>
  }

  return (home());
};

export default HomePage;
