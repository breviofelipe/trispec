import { EditOutlined } from "@mui/icons-material";
import WidgetWrapper from "components/WidgetWrapper";
import { useSelector } from "react-redux";

const { Box, Typography, useTheme, Divider, Button } = require("@mui/material")
const { default: FlexBetween } = require("components/FlexBetween")
const { default: Masks } = require("components/masks/Masks");
const { useState } = require("react");
const FormMasks = ({ actorId }) => {
    const { palette } = useTheme();
    const medium = palette.neutral.medium;
    const main = palette.neutral.main;
    const [grande, setGrande] = useState(false);
    const [quantidadeCriatividade, setQuantidadeCriatividade] = useState(5);
    const [quantidadePontualidade, setQuantidadePontualidade] = useState(5);
    const [quantidadeEquipe, setQuantidadeEquipe] = useState(5);
    const userId = useSelector((state) => state.user.id);
    const token = useSelector((state) => state.token);
    const postOpnion = async () =>{
      {      
        let body = {
          'userId' : userId,
          'actorId' : actorId,
          'trabalhoEquipe' : quantidadeEquipe,
          'pontualidade' : quantidadePontualidade,
          'criatividade' : quantidadeCriatividade
        };
        const response = await fetch("https://arcane-thicket-81092-1ac7cecea9b8.herokuapp.com/actors/opinion", {
          method: "POST",
          headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
          body: JSON.stringify(body),
        });
        const res = response.json();
        console.log(res);
        setGrande(false)
      }
    }
    return <WidgetWrapper>
    <Typography fontSize="1rem" color={main} fontWeight="500" mb="1rem">
        Deixe sua opnião!
    </Typography>
        <Divider />
    <Box p="1rem 0">
      <Box display="flex" justifyContent="space-between" >
      <Typography color={medium}>Criatividade </Typography>
        <FlexBetween>
            <Masks quantidade={quantidadeCriatividade} setNovaQuantidade={setQuantidadeCriatividade} editavel={grande ? true : false} grande={grande}/>
        </FlexBetween>
      </Box>
      <Box display="flex" justifyContent="space-between" >
        <Typography color={medium}>Pontualidade</Typography>
        <FlexBetween>
            <Masks quantidade={quantidadePontualidade} setNovaQuantidade={setQuantidadePontualidade} editavel={grande ? true : false} grande={grande}/>
        </FlexBetween>
      </Box>
      <Box display="flex" justifyContent="space-between" >
        <Typography color={medium}>Trabalho em equipe </Typography>
        <FlexBetween>
            <Masks quantidade={quantidadeEquipe} setNovaQuantidade={setQuantidadeEquipe} editavel={grande ? true : false} grande={grande}/>
        </FlexBetween>
      </Box>
    </Box>
    <Divider />
    <Box display="flex" justifyContent="space-between" >
    <FlexBetween />
    <FlexBetween gap="1rem" mb="0.5rem" mt="0.5rem">        
        {grande ? <Button
          onClick={() => postOpnion()}
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