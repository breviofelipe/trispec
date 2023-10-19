import { Box, useMediaQuery } from "@mui/material";
import { useSelector } from "react-redux";
import Navbar from "scenes/navbar";
import UserWidget from "scenes/widgets/user/UserWidget";


const PageSchemaComponent = ({topContent,main,lastContent}) => {
    const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
    const role = useSelector((state) => state.user.role);
    const user = useSelector((state) => state.user);
    const userId = useSelector((state) => state.user.id);
    const profile = () => {
      return <div>{role === "ACTOR" ? <UserWidget actorProfile userId={user.actor} /> : <UserWidget userId={userId} />}</div>
    }
    return (<Box>
        <Navbar />
        <Box
          width="100%"
          padding={isNonMobileScreens ? "2rem 6%" : undefined}
          display={isNonMobileScreens ? "flex" : "block"}
          gap="2rem"
          justifyContent="center"
        >
          {topContent ? <Box flexBasis={isNonMobileScreens ? "26%" : undefined}>{topContent}</Box> : <Box flexBasis={isNonMobileScreens ? "26%" : undefined}>
            {profile()}  
          </Box>}
          <Box
            flexBasis={isNonMobileScreens ? "42%" : undefined}
          >
            {main}
          </Box>      
          <Box flexBasis={isNonMobileScreens ? "26%" : undefined}>
            {lastContent}
          </Box>
          
        </Box>
      </Box>
    )
}

export default PageSchemaComponent;