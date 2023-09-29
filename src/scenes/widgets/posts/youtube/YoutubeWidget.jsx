import WidgetWrapper from "components/WidgetWrapper";
import "./YoutubeWidget.css";
import YoutubeEmbed from "components/youtube/YoutubeEmbed";
import { Box, IconButton, Typography, useMediaQuery, useTheme } from "@mui/material";
import UserImage from "components/UserImage";
import FlexBetween from "components/FlexBetween";
import DeleteIcon from '@mui/icons-material/Delete';
import {
    FavoriteBorderOutlined,
    FavoriteOutlined,
  } from "@mui/icons-material";
import StarIcon from '@mui/icons-material/Star';
import { useState } from "react";

const YoutubeWidget = ({ embedId, picturePath, description, subtitle, likes = false }) => {
    const { palette } = useTheme();
    const main = palette.neutral.main;
    const medium = palette.neutral.medium;
    const primary = palette.primary.main;
    const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
    //  const isLiked = likes ? Boolean(likes[loggedInUserId]) : false;
    const [isLiked, setIsLiked] = useState(false);
    const likeCount = Object.keys(likes ? likes : []).length;

    const mobile = () => {
        return <WidgetWrapper isMobile={true}>
        <FlexBetween mb={"1rem"}>
            <FlexBetween gap="1rem">
                <UserImage image={picturePath} size="50px" />
                <Box>
                    <Typography color={main} sx={{ mt: "1rem" }}>
                        {description}
                    </Typography>
                    <Typography color={medium} fontSize="0.75rem">
                        {subtitle}
                    </Typography>
                </Box>
            </FlexBetween>
            <DeleteIcon />
        </FlexBetween>
        <YoutubeEmbed embedId={embedId} />

        
        <FlexBetween mt="0.25rem">
            <FlexBetween gap="1rem">
                <FlexBetween gap="0.3rem">
                    <IconButton onClick={() => {setIsLiked(!isLiked)}}>
                    {isLiked ? (
                        <FavoriteOutlined sx={{ color: primary }} />
                    ) : (
                        <FavoriteBorderOutlined />
                    )}
                    </IconButton>
                    <Typography>{likeCount}</Typography>
                </FlexBetween>
            </FlexBetween>
            <IconButton>
                <StarIcon sx={{ color: primary }} />
            </IconButton>
      </FlexBetween>
    </WidgetWrapper>
    };

    const nonMobile = () => {
        return <WidgetWrapper mb={"2rem"}>
        <FlexBetween mb={"1rem"}>
            <FlexBetween>
                <UserImage image={picturePath} size="50px" />
                <Box>
                    <Typography color={main} sx={{ mt: "1rem" }}>
                        {description}
                    </Typography>
                    <Typography color={medium} fontSize="0.75rem">
                        {subtitle}
                    </Typography>
                </Box>
            </FlexBetween>
            <DeleteIcon />
        </FlexBetween>
        <YoutubeEmbed embedId={embedId} />     
        <FlexBetween mt="0.25rem">
            <FlexBetween gap="1rem">
                <FlexBetween gap="0.3rem">
                    <IconButton onClick={() => {setIsLiked(!isLiked)}}>
                    {isLiked ? (
                        <FavoriteOutlined sx={{ color: primary }} />
                    ) : (
                        <FavoriteBorderOutlined />
                    )}
                    </IconButton>
                    <Typography>{likeCount}</Typography>
                </FlexBetween>
            </FlexBetween>
            <IconButton>
                <StarIcon sx={{ color: primary }} />
            </IconButton>
      </FlexBetween>
    </WidgetWrapper>
    };

    return <> { isNonMobileScreens ? nonMobile() : mobile()}</>
}

export default YoutubeWidget;