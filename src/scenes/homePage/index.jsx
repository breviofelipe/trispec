import { Box, Divider, useMediaQuery } from "@mui/material";
import { useSelector } from "react-redux";
import Navbar from "scenes/navbar";
import UserWidget from "scenes/widgets/UserWidget";

import FriendListWidget from "scenes/widgets/FriendListWidget";
import TurmasWidget from "scenes/widgets/TurmasWidget";
import AdvertWidget from "scenes/widgets/AdvertWidget";
import { createSearchParams, useNavigate } from "react-router-dom";
// import MyPostWidget from "scenes/widgets/MyPostWidget";
// import PostsWidget from "scenes/widgets/PostsWidget";

const HomePage = () => {
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
  const { id, picturePath } = useSelector((state) => state.user);
  const role = useSelector((state) => state.user.role);
  const turmas = useSelector((state) => state.turmas);
  const navigete = useNavigate();

  if(role === "ACTOR"){
    const turmaId = turmas.filter(turma => turma.atores.filter(ator => ator.userId === id)).map(turma => turma.turmaId)[0];
    navigete({
      pathname:`/spectacle/`, search: createSearchParams({'turmaId': turmaId, 'userId': id, 'picturePath': picturePath}).toString()
    });

  }
  const nonMobile = ()  => {
    return <Box>
      <Navbar />
      <Box
        width="100%"
        padding="2rem 6%"
        display="flex"
        gap="0.5rem"
        justifyContent="space-between"
      >
        <Box flexBasis={"26%"}>
          <UserWidget userId={id} picturePath={picturePath} />
          <Box m="2rem 0" />
          <AdvertWidget />
        </Box>
        <Box
          flexBasis={"42%"} >
          {/* <MyPostWidget picturePath={picturePath} /> */}
          <TurmasWidget />
          <Box m="2rem 0" />
          {/* <PostsWidget userId={id} /> */}
        </Box>
        <Box flexBasis="26%">
          <FriendListWidget userId={id} />
          <Box m="2rem 0" />
        </Box>
      </Box>
  </Box>
  }

  const mobile = () => {
    return <Box>
    <Navbar />
    <Box
      width="100%"
      display={"block"}
      gap="0.5rem"
      justifyContent="space-between"
    >
      <Box>
        <Divider />
        <UserWidget userId={id} picturePath={picturePath} />
        <Divider />
        <TurmasWidget />
      </Box>
      <Box>
        <Divider />
        <AdvertWidget />
        <Divider />
      </Box>
    </Box>
  </Box>
  }

  return (<div>{isNonMobileScreens ? nonMobile() : mobile()}</div>);
};

export default HomePage;
