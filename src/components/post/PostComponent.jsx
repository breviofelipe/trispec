
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import WidgetWrapper from "../WidgetWrapper";
import FlexBetween from 'components/FlexBetween';
import { Box, Button, Divider, Typography, useMediaQuery, useTheme } from '@mui/material';

function PostComponent({ titulo, subtitulo, content }) {

    const { palette } = useTheme();
    const dark = palette.neutral.dark;
    const medium = palette.neutral.medium;
    const main = palette.neutral.main;

    const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
    
    return <div>
        <WidgetWrapper isMobile={!isNonMobileScreens}>
       <FlexBetween>
       <FlexBetween gap="1rem">
            <SportsEsportsIcon fontSize="large" />
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
       </FlexBetween>
       <Divider />
       <Box mt={"2rem"} width={"100%"} height={"auto"} minHeight={"200px"} display={"flex"} justifyContent={"center"} alignItems={"center"} textAlign={"center"} >
          {content}
       </Box>
    </WidgetWrapper>
    {isNonMobileScreens ? <Box m={"2rem"} /> : <Divider/>}
    </div>;
}

export default PostComponent;