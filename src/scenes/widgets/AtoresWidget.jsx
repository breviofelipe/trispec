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
      Atores
    </Typography>
    <Box display="flex" flexDirection="column" gap="1.5rem"> 
    { atores && atores.map(
        ({
            _id,
            turmaId,
            nome,
            sobrenome,
            personagens,
            __v,
            userPicturePath,
            createdAt,
            updatedAt
          }) => (
          <AtorWidget
            id={_id}
            turmaId={turmaId}
            nome={nome}
            sobrenome={sobrenome}
            personagens={personagens}
            __v={__v}
            userPicturePath={userPicturePath}
            createdAt={createdAt}
            updatedAt={updatedAt}
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
