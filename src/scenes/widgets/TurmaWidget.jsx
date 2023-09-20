import { FaTheaterMasks } from 'react-icons/fa'
import { FcInfo } from 'react-icons/fc'
import FlexBetween from "components/FlexBetween";
  
import WidgetWrapper from "components/WidgetWrapper";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, Divider, IconButton, Typography, useTheme } from "@mui/material";
import UserImage from "components/UserImage";
import FriendListWidget from "./FriendListWidget";
import AtoresWidget from "./AtoresWidget";
import PersonagensWidget from "./PersonagensWidget";
import TaskSWidget from "./TasksWidget";
import { useNavigate, createSearchParams } from "react-router-dom";
  
  
  const TurmaWidget = ({
    id,
    turmaId,
    atores,
    espetaculo,
    __v,
    createdAt,
    updatedAt
  }) => {

  const { palette } = useTheme();
  const main = palette.neutral.main;
  const primary = palette.primary.main;
  const dark = palette.neutral.dark;
  const medium = palette.neutral.medium;
  const turmas = useSelector((state) => state.turmas);
  const navigate = useNavigate();
  const [espetaculoInfo, setEstaculo] = useState();
  const { _id, picturePath } = useSelector((state) => state.user);
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
      <WidgetWrapper m="0 0">
        <FlexBetween
        gap="0.5rem"
        pb="1.1rem"
        onClick={() => { 
          console.log("click")
          navigate({
            pathname:`/spectacle/`, search: createSearchParams({'turmaId': turmaId, 'userId': _id, 'picturePath': picturePath}).toString()
          })
        }}
      >
        <FlexBetween gap="1rem">
        <FaTheaterMasks size={36} />   
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
              {turmaId}
            </Typography>
            {espetaculoInfo && <Typography color={medium}>Espetáculo: {espetaculoInfo.espetaculo.titulo}</Typography>}
          </Box>
        </FlexBetween>
         
        <FcInfo size={24} />   
       </FlexBetween>

      <Divider />
      {/* {espetaculoInfo && <PersonagensWidget listaPersonagens={espetaculoInfo.espetaculo.personagens} /> }
      
      <Divider />
      {espetaculoInfo && <AtoresWidget listaAtores={espetaculoInfo.atores} />} 
      
      <TaskSWidget /> */}
      <img
          width="100%"
          height="auto"
          alt="post"
          style={{ borderRadius: "0.75rem", marginTop: "0.75rem" }}
          src={`https://res.cloudinary.com/dosghtja7/image/upload/v1695165233/assets/ebzamu1mpuurfoohbekt.jpg`}
        />
      </WidgetWrapper>
    );
  };
  
  export default TurmaWidget;
  