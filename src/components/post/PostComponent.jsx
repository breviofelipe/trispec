
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import WidgetWrapper from "../WidgetWrapper";
import FlexBetween from 'components/FlexBetween';
import { Box, Divider, Typography, useMediaQuery, useTheme } from '@mui/material';

function PostComponent({ titulo, subtitulo, icon, content, msg, center=true, resumo }) {

    const { palette } = useTheme();
    const dark = palette.neutral.dark;
    const medium = palette.neutral.medium;
    const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
    

    const showContent = () => {
        if(center){
            return <Box mb={"1rem"} mt={"1rem"} width={"100%"} height={"auto"} minHeight={"80px"} display={"flex"} justifyContent={"center"} alignItems={"center"} textAlign={"center"} >
            {content}
         </Box>
        } else {
           return <Box mb={"1rem"} mt={"1rem"} width={"100%"} height={"auto"} minHeight={"80px"} display={"flex"} >
                {content}
            </Box>
        }
    }

    return <div>
        {!isNonMobileScreens && <Divider />}
        <WidgetWrapper isMobile={!isNonMobileScreens}>
       {titulo && <FlexBetween>
       <FlexBetween gap="1rem">
            {icon ? icon : <SportsEsportsIcon fontSize="large" /> }
            <Box mb={"0.5rem"}>
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
                    {titulo}
                </Typography>
                <Typography color={medium}>{subtitulo}</Typography>
            </Box>
        </FlexBetween>
        {isNonMobileScreens ? <Box m={"2rem"} /> : <Divider />}
       </FlexBetween>}
       {content && <div>{titulo && <Divider />}
        {showContent()}
       </div>
       }
       <FlexBetween>
        <Box></Box><Box>{msg}</Box>
       </FlexBetween>
        {resumo}
    </WidgetWrapper>
    {isNonMobileScreens ? <Box m={"2rem"} /> : <Divider/>}
    </div>;
}

export default PostComponent;