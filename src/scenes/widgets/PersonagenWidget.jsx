
import { Box, Typography, useTheme } from "@mui/material";
import FlexBetween from "components/FlexBetween";
import { FaTheaterMasks } from 'react-icons/fa'
const PersonagemWidget = ({
    _id,
    nome,
    espetaculoId,
    __v,
    createdAt,
    updatedAt
  }) => {


  const { palette } = useTheme();

  const main = palette.neutral.main;
  const medium = palette.neutral.medium;

  return (<FlexBetween>
    <FlexBetween gap="1rem">
    <Box width="50px" height="50px"> 
      <FaTheaterMasks size={36} />
    </Box>

    <Box minWidth="10rem"
      onClick={() => {
      }}
    >
      <Typography
        color={main}
        variant="h5"
        fontWeight="500"
        sx={{
          "&:hover": {
            color: palette.primary.light,
            cursor: "pointer",
          },
        }}
      >
        {nome}
      </Typography>
        <Typography color={medium} fontSize="0.75rem">
                    {nome}
        </Typography>
    </Box>
    </FlexBetween>
    </FlexBetween>
    );
}

export default PersonagemWidget;
