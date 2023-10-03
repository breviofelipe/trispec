import {
    ChatBubbleOutlineOutlined,
    FavoriteBorderOutlined,
    FavoriteOutlined,
    ShareOutlined,
  } from "@mui/icons-material";
import { Box, Divider, IconButton, Typography, useMediaQuery, useTheme } from "@mui/material";
import FlexBetween from "components/FlexBetween";
import UserImage from "components/UserImage";
import WidgetWrapper from "components/WidgetWrapper";
import { useDispatch, useSelector } from "react-redux";
import { setPost } from "state";
import YoutubeWidget from "./youtube/YoutubeWidget";
import DocumentoWidget from "./drive/DocumentoWidget";
import DeleteIcon from '@mui/icons-material/Delete';
import { format } from 'date-fns';  
import ptBR from 'date-fns/locale/pt-BR';
import { useNavigate } from "react-router-dom";
  const TurmaPostWidget = ({
    id,
    key,
    userId,
    turmaId,
    description,
    picturePath,
    youtubeEmbedId,
    driveEmbedId,
    userPicturePath,
    createdAt,
    likes
}) => {
    
    const dispatch = useDispatch();
    const token = useSelector((state) => state.token);
    const loggedInUserId = useSelector((state) => state.user.id);
    const isLiked = likes ? Boolean(likes[loggedInUserId]) : false;
    const likeCount = Object.keys(likes ? likes : []).length;
    const turma = useSelector((state) => state.turma);
    const { palette } = useTheme();
    const main = palette.neutral.main;
    const primary = palette.primary.main;
    const medium = palette.neutral.medium;
    const role = useSelector((state) => state.user.role);
    const navigate = useNavigate();
    const isNonMobileScreens = useMediaQuery("(min-width:1000px)");


  const url = 'https://arcane-thicket-81092-1ac7cecea9b8.herokuapp.com';
    // const url = 'http://localhost:5000';
  

    const getFormatedDate = (str) => {
     try {
      let currentDate = format(new Date(str), 'dd MMMM yyyy, HH:mm',  { locale: ptBR });
      return currentDate;
     } catch ( err ){
        console.log(err);
        return '';
      }
    }

    const deletePost = async () => {
      const response = await fetch(url+`/turmas/${id}/posts`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        }
      });
      navigate(0);
    }
  
    const patchLike = async () => {
      const response = await fetch(url+`/turmas/${id}/like`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId: loggedInUserId }),
      });
      const updatedPost = await response.json();
      dispatch(setPost({ post: updatedPost }));
    };

    if( youtubeEmbedId ){
      return <>
          <YoutubeWidget id={id} loggedInUserId={loggedInUserId} embedId={youtubeEmbedId} picturePath={userPicturePath} description={description} subtitle={getFormatedDate(createdAt)} likes={likes} />
          {isNonMobileScreens ? <Box m={"2rem"} /> : <Divider/>}
      </>
  } else if ( driveEmbedId ) {
      return <>
          <DocumentoWidget id={id} loggedInUserId={loggedInUserId} embedId={driveEmbedId} picturePath={userPicturePath} description={description} subtitle={getFormatedDate(createdAt)} likes={likes}/>
          {isNonMobileScreens ? <Box m={"2rem"} /> : <Divider/>}
      </>
  }
  
    return (
      <WidgetWrapper isMobile={!isNonMobileScreens} key={key}>
        <FlexBetween mb={"1rem"}>
            <FlexBetween gap="1rem">
                <UserImage image={userPicturePath} size="48px" />
                <Box>
                    <Typography color={main} sx={{ ml: "0.5rem" }} >
                        {turma.turmaId}
                    </Typography>
                    <Typography color={medium} fontSize="0.75rem" sx={{ ml: "0.5rem" }} >
                        {getFormatedDate(createdAt)}
                    </Typography>
                </Box>
            </FlexBetween>
            {role === 'ADMIN' && <DeleteIcon onClick={deletePost} /> }
        </FlexBetween>
        {/* <UserImage image={userPicturePath} size="50px" /> */}
        <Typography color={main} sx={{ mt: "1rem" }}>
          {description}
        </Typography>
        {picturePath && (
          <img
            width="100%"
            height="auto"
            alt="post"
            style={{ borderRadius: "0.75rem", marginTop: "0.75rem" }}
            src={ picturePath }
          />
        )}
        <FlexBetween mt="0.25rem">
          <FlexBetween gap="1rem">
            <FlexBetween gap="0.3rem">
              <IconButton onClick={patchLike}>
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
            <ShareOutlined />
          </IconButton>
        </FlexBetween>
      </WidgetWrapper>
    );
  };
  
  export default TurmaPostWidget;
  