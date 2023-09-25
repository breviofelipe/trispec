import { EditOutlined } from "@mui/icons-material";
import WidgetWrapper from "components/WidgetWrapper";

const { Box, Typography, useTheme, Divider, Button } = require("@mui/material")
const { default: FlexBetween } = require("components/FlexBetween")
const { default: Masks } = require("components/masks/Masks");
const { useState } = require("react");
const FormMasks = () => {
    const { palette } = useTheme();
    const medium = palette.neutral.medium;
    const main = palette.neutral.main;
    const [grande, setGrande] = useState(false);
    const [quantidade, setQuantidade] = useState(5);
    return <WidgetWrapper>
    <Typography fontSize="1rem" color={main} fontWeight="500" mb="1rem">
        Deixe sua opnião!
    </Typography>
        <Divider />
    <Box p="1rem 0">
      <Box display="flex" justifyContent="space-between" >
      <Typography color={medium}>Criatividade </Typography>
        <FlexBetween>
            <Masks quantidade={quantidade} editavel={grande ? true : false} grande={grande}/>
        </FlexBetween>
      </Box>
      <Box display="flex" justifyContent="space-between" >
        <Typography color={medium}>Pontualidade</Typography>
        <FlexBetween>
            <Masks quantidade={quantidade} editavel={grande ? true : false} grande={grande}/>
        </FlexBetween>
      </Box>
      <Box display="flex" justifyContent="space-between" >
        <Typography color={medium}>Trabalho em equipe </Typography>
        <FlexBetween>
            <Masks quantidade={quantidade} editavel={grande ? true : false} grande={grande}/>
        </FlexBetween>
      </Box>
    </Box>
    <Divider />
    <Box display="flex" justifyContent="space-between" >
    <FlexBetween />
    <FlexBetween gap="1rem" mb="0.5rem" mt="0.5rem">        
        {grande ? <Button
          onClick={() => {setGrande(false)}}
          sx={{
            color: palette.background.alt,
            backgroundColor: palette.primary.main,
            borderRadius: "3rem",
          }}
        >
          Salvar
        </Button> : <EditOutlined onClick={() => setGrande(!grande)} sx={{ color: main }} />}
    </FlexBetween>
    </Box>
    </WidgetWrapper>
}
export default FormMasks;