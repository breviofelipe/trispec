import {
  ManageAccountsOutlined,
  EditOutlined,
} from "@mui/icons-material";
import { FaTheaterMasks } from 'react-icons/fa'
import { HiOutlineUserGroup } from 'react-icons/hi'
import { Box, Typography, Divider, useTheme } from "@mui/material";
import UserImage from "components/UserImage";
import FlexBetween from "components/FlexBetween";
import WidgetWrapper from "components/WidgetWrapper";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PersonagemWidget from "./PersonagenWidget";
import DnaLoading from "components/dna/DnaLoading";
import Masks from "components/masks/Masks";

const UserWidget = ({ userId, picturePath, actorProfile }) => {
  const [user, setUser] = useState(null);
  const { palette } = useTheme();
  const navigate = useNavigate();
  const token = useSelector((state) => state.token);
  const myProfile = useSelector((state) => state.user.id) === userId;
  const dark = palette.neutral.dark;
  const medium = palette.neutral.medium;
  const main = palette.neutral.main;

  const url = 'https://arcane-thicket-81092-1ac7cecea9b8.herokuapp.com'

  const getUser = async () => {
    
    if(actorProfile){   
     setUser(null);
     const response = await fetch(url+`/actors/${userId}`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    }).then(async (data) => {
      const actor = await data.json();
      setUser(actor);
    });
    } else {
      setUser(null);
      const response = await fetch(url+`/users/${userId}`, {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      }).then(async (data) => {
        setUser(await data.json());
      });
    }
  };

  const profileUser = () => {
    return <WidgetWrapper>
      {/* FIRST ROW */}
      <FlexBetween
        gap="0.5rem"
        pb="1.1rem"
        onClick={() => navigate(`/profile/${userId}`)}
      >
        <FlexBetween gap="1rem">
          <UserImage image={picturePath} />
          <Box>
            <Typography
              variant="h4"
              color={dark}
              fontWeight="500"
              sx={{
                "&:hover": {
                  color: palette.primary.light,
                  cursor: "pointer",
                },
              }}
            >
              {firstName} {lastName}
            </Typography>
            <Typography color={medium}>{location}</Typography>
          </Box>
        </FlexBetween>
        {myProfile && <ManageAccountsOutlined />}
      </FlexBetween>

      <Divider />

      {/* SECOND ROW */}
      <Box p="1rem 0">
        <Box display="flex" alignItems="center" gap="1rem" mb="0.5rem">
          <HiOutlineUserGroup size={30} fontSize="large" sx={{ color: main }} />
          <Typography color={medium}>{location}</Typography>
        </Box>
        <Box display="flex" alignItems="center" gap="1rem">
          <FaTheaterMasks size={30} fontSize="large" sx={{ color: main }} />
          <Typography color={medium}>{occupation}</Typography>
        </Box>
      </Box>

      <Divider />

      {/* THIRD ROW */}
      <Box p="1rem 0">
        <FlexBetween mb="0.5rem">
          <Typography color={medium}>Visualizações</Typography>
          <Typography color={main} fontWeight="500">
            {viewedProfile}
          </Typography>
        </FlexBetween>
        <FlexBetween>
          <Typography color={medium}>Espetáculos</Typography>
          <Typography color={main} fontWeight="500">
            {impressions}
          </Typography>
        </FlexBetween>
      </Box>

      <Divider />

      {/* FOURTH ROW */}
      <Box p="1rem 0">
        <Typography fontSize="1rem" color={main} fontWeight="500" mb="1rem">
          Social Profiles
        </Typography>

        <FlexBetween gap="1rem" mb="0.5rem">
          <FlexBetween gap="1rem">
            <img src="https://res.cloudinary.com/dosghtja7/image/upload/v1695226935/assets/hqbgog5hxihchcormwcv.png" alt="twitter" />
            <Box>
              <Typography color={main} fontWeight="500">
                Twitter
              </Typography>
              <Typography color={medium}>Social Network</Typography>
            </Box>
          </FlexBetween>
          {myProfile && <EditOutlined sx={{ color: main }} /> }
        </FlexBetween>

        <FlexBetween gap="1rem">
          <FlexBetween gap="1rem">
            <img src="https://res.cloudinary.com/dosghtja7/image/upload/v1695226935/assets/xuhn8qzudys1buehzmlt.png" alt="linkedin" />
            <Box>
              <Typography color={main} fontWeight="500">
                Linkedin
              </Typography>
              <Typography color={medium}>Network Platform</Typography>
            </Box>
          </FlexBetween>
          {myProfile && <EditOutlined sx={{ color: main }} /> }
        </FlexBetween>
      </Box>
    </WidgetWrapper>
  };
  const profileActor = () => {
    return <WidgetWrapper>
      {/* FIRST ROW */}
      <FlexBetween
        gap="0.5rem"
        pb="1.1rem"
      >
        <FlexBetween gap="1rem">
          <UserImage image={picturePath} />
          <Box>
            <Typography
              variant="h4"
              color={dark}
              fontWeight="500"
              sx={{
                "&:hover": {
                  color: palette.primary.light,
                  cursor: "pointer",
                },
              }}
            >
              {user.nome} {user.sobrenome}
            </Typography>
              <FlexBetween gap="0.5rem">
                <Typography color={medium}><Masks quantidade={user.estrelas} /></Typography>
              </FlexBetween>
                <FlexBetween gap="0.5rem">
                  {user && user.opnions && <Typography color={medium}>{user.opnions.length} opniões</Typography> }
                </FlexBetween>
          </Box>
        </FlexBetween>
        {myProfile && <ManageAccountsOutlined />}
      </FlexBetween>

      <Divider />

      {/* SECOND ROW */}
      <Box p="1rem 0">
        <Box display="flex" justifyContent="space-between" >
        <Typography color={medium}>Criatividade </Typography>
          <FlexBetween>
            <Masks quantidade={user.criatividade} />
          </FlexBetween>
        </Box>
        <Box display="flex" justifyContent="space-between" >
          <Typography color={medium}>Pontualidade </Typography>
         <FlexBetween>
          <Masks quantidade={user.pontualidade} />
         </FlexBetween>
        </Box>
        <Box display="flex" justifyContent="space-between" >
          <Typography color={medium}>Trabalho em equipe </Typography>
          <FlexBetween>
            <Masks quantidade={user.trabalhoEquipe} />
          </FlexBetween>
        </Box>
      </Box>

      <Divider />

      {/* THIRD ROW */}
      <Box p="1rem 0">
        <FlexBetween mb="0.5rem">
          <PersonagemWidget nome={user.personagens[0].nome}/>
        </FlexBetween>
        <FlexBetween>

        </FlexBetween>
      </Box>

      <Divider />

      {/* FOURTH ROW */}
      <Box p="1rem 0">
        <Typography fontSize="1rem" color={main} fontWeight="500" mb="1rem">
          Social Profiles
        </Typography>

        <FlexBetween gap="1rem" mb="0.5rem">
          <FlexBetween gap="1rem">
            <img src="https://res.cloudinary.com/dosghtja7/image/upload/v1695226935/assets/hqbgog5hxihchcormwcv.png" alt="twitter" />
            <Box>
              <Typography color={main} fontWeight="500">
                Twitter
              </Typography>
              <Typography color={medium}>Social Network</Typography>
            </Box>
          </FlexBetween>
          { myProfile && <EditOutlined sx={{ color: main }} /> }
        </FlexBetween>

        <FlexBetween gap="1rem">
          <FlexBetween gap="1rem">
            <img src="https://res.cloudinary.com/dosghtja7/image/upload/v1695226935/assets/xuhn8qzudys1buehzmlt.png" alt="linkedin" />
            <Box>
              <Typography color={main} fontWeight="500">
                Linkedin
              </Typography>
              <Typography color={medium}>Network Platform</Typography>
            </Box>
          </FlexBetween>
          { myProfile && <EditOutlined sx={{ color: main }} /> }
        </FlexBetween>
      </Box>
    </WidgetWrapper>
  };

  useEffect(() => {
    getUser();  
  }, [userId]); // eslint-disable-line react-hooks/exhaustive-deps

  if (!user) {
    return <WidgetWrapper><DnaLoading /></WidgetWrapper>;
  }

  const {
    firstName,
    lastName,
    location,
    occupation,
    viewedProfile,
    impressions,
    friends,
  } = user;

  return (<div>
    { !!actorProfile ? profileActor() : profileUser() }
  </div>)
};
export default UserWidget;
