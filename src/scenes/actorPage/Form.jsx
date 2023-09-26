import { EditOutlined } from "@mui/icons-material";
import WidgetWrapper from "components/WidgetWrapper";
import LoadingComponent from "components/loading/Loading";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

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
    const [enviando, setEnviando] = useState(false);
    const navigate = useNavigate()
    const postOpnion = async () =>{
      {      
        let body = {
          'userId' : userId,
          'actorId' : actorId,
          'trabalhoEquipe' : quantidadeEquipe,
          'pontualidade' : quantidadePontualidade,
          'criatividade' : quantidadeCriatividade
        };
        setEnviando(true)
        const response = await fetch("https://arcane-thicket-81092-1ac7cecea9b8.herokuapp.com/actors/opinion", {
          method: "POST",
          headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
          body: JSON.stringify(body),
        });
        const res = await response.json();
        console.log(res);
        if(res){
          setEnviando(false)
          navigate(0);
        }
        setGrande(false)
      }
    }

    if(!actorId){
      return null;
    }


    return <div>
      {enviando ? <WidgetWrapper><LoadingComponent /></WidgetWrapper> : <WidgetWrapper>
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
    </WidgetWrapper>}
    </div>
}
export default FormMasks;