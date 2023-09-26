import { useEffect, useState } from "react";
import AtorWidget from "./AtorWidget";
import WidgetWrapper from "components/WidgetWrapper";
import { Box, Typography, useTheme } from "@mui/material";

const AtoresWidget = ({ listaAtores }) => {
    // console.log("AtoresWidget turmaId="+turmaId);
  const { palette } = useTheme();
//   const token = useSelector((state) => state.token);
  const [ atores, setAtores ] =  useState();

  const getAtores = () => {
     setAtores(listaAtores);
  };


  useEffect(() => {
    getAtores();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <><WidgetWrapper>
    <Typography
      color={palette.neutral.dark}
      variant="h5"
      fontWeight="500"
      sx={{ mb: "1.5rem" }}
    >
      Coletivo
    </Typography>
    <Box display="flex" flexDirection="column" gap="1.5rem"> 
    { atores && atores.map(
        ({
            id,
            turmaId,
            nome,
            sobrenome,
            personagens,
            userPicturePath,
            estrelas,
            pontualidade,
            trabalhoEquipe,
            criatividade
          }) => (
          <AtorWidget
            key={id}
            id={id}
            turmaId={turmaId}
            nome={nome}
            sobrenome={sobrenome}
            personagens={personagens}
            userPicturePath={userPicturePath}
            estrelas={estrelas}
            pontualidade={pontualidade}
            trabalhoEquipe={trabalhoEquipe}
            criatividade={criatividade}  
          />
        )
      )
      }
      </Box>
    </WidgetWrapper>
    </>
  );
};

export default AtoresWidget;
