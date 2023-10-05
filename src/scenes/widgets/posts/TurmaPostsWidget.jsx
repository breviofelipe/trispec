import { Box, Divider, useMediaQuery } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { setLogout, setPosts } from "state";
import TurmaPostWidget from "./TurmaPostWidget";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const TurmaPostsWidget = ({ turmaId }) => {
    // const url = "http://localhost:5000";
    const url = 'https://arcane-thicket-81092-1ac7cecea9b8.herokuapp.com';
    const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
    const dispatch = useDispatch();
    const posts = useSelector((state) => state.posts);
    const token = useSelector((state) => state.token);
    const navigate = useNavigate();
    const getPosts = async () => {
        try {
          const response = await fetch(url+`/turmas/${turmaId}/posts`, {
            method: "GET",
            headers: { Authorization: `Bearer ${token}` },
          });
          const data = await response.json();
          dispatch(setPosts({ posts: data }));
        } catch (err) {
          console.log(err);
          dispatch(setLogout());
          navigate('/');
        }
      };

    useEffect(() => {        
        getPosts();       
      }, [turmaId]); // eslint-disable-line react-hooks/exhaustive-deps

    const nonMobile = () => {
        return Array.isArray(posts) && posts.map(({
            id,
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
            return <><TurmaPostWidget
                        key={turmaId}
                        id={id}
                        turmaId={turmaId}
                        userId={userId}
                        description={description}
                        picturePath={picturePath}
                        createdAt={createdAt}
                        driveEmbedId={driveEmbedId}
                        likes={likes}
                        userPicturePath={userPicturePath}
                        youtubeEmbedId={youtubeEmbedId} />
                    <Box m={"2rem"} /></>
            
        })
             
    }

    const mobile = () => {
      return Array.isArray(posts) && posts.map(({
        id,
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
        return <><TurmaPostWidget
                    id={id}
                    key={id}
                    turmaId={turmaId}
                    userId={userId}
                    description={description}
                    picturePath={picturePath}
                    createdAt={createdAt}
                    driveEmbedId={driveEmbedId}
                    likes={likes}
                    userPicturePath={userPicturePath}
                    youtubeEmbedId={youtubeEmbedId} />
                <Divider /></>
        
    })
    }

    return (<>{isNonMobileScreens ? nonMobile() : mobile()}</>)

}

export default TurmaPostsWidget;