
import { Box, Typography, useTheme } from "@mui/material";
import FlexBetween from "components/FlexBetween";
import UserImage from "components/UserImage";

const AtorWidget = ({
    _id,
    turmaId,
    nome,
    sobrenome,
    personagens,
    __v,
    userPicturePath,
    createdAt,
    updatedAt
  }) => {


  const { palette } = useTheme();

  const main = palette.neutral.main;
  const medium = palette.neutral.medium;

  return (<FlexBetween>
  <FlexBetween gap="1rem">
    <UserImage image={userPicturePath} size="55px" />
    <Box
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
        {nome} {sobrenome}
      </Typography>
      {personagens && personagens.map((personagem) => {
        return  <Typography color={medium} fontSize="0.75rem">
                  {personagem.nome}
                </Typography>
        }
      )
      }
    </Box>
  </FlexBetween>
</FlexBetween>);
}

export default AtorWidget;
