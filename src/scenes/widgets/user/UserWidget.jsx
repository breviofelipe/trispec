import {
  ManageAccountsOutlined,
  EditOutlined,
} from "@mui/icons-material";
import { FaTheaterMasks } from 'react-icons/fa'
import { HiOutlineUserGroup } from 'react-icons/hi'
import { Box, Typography, Divider, useTheme, useMediaQuery, Button } from "@mui/material";
import UserImage from "components/UserImage";
import FlexBetween from "components/FlexBetween";
import WidgetWrapper from "components/WidgetWrapper";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PersonagemWidget from "../PersonagenWidget";
import DnaLoading from "components/dna/DnaLoading";
import Masks from "components/masks/Masks";
import Dropzone from "react-dropzone";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import CropOriginalIcon from '@mui/icons-material/CropOriginal';
import { editSave, inputLink } from "./components/SocialProfiles";
import CancelIcon from '@mui/icons-material/Cancel';
import { setLogout } from "state";

const UserWidget = ({ userId, actorProfile }) => {
  const [user, setUser] = useState(null);
  const [edit, setEdit] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = useSelector((state) => state.token);
  const myProfile = actorProfile ? useSelector((state) => state.user.actor) === userId : useSelector((state) => state.user.id) === userId;
  const ator = useSelector((state) => state.ator);
  const { palette } = useTheme();
  const dark = palette.neutral.dark;
  const medium = palette.neutral.medium;
  const main = palette.neutral.main;
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
  const url = 'https://arcane-thicket-81092-1ac7cecea9b8.herokuapp.com';
  // const url = 'http://localhost:5000';
  const getUser = async () => {
        if(actorProfile){     
          setUser(null);
          fetch(url+`/actors/${userId}`, {
              method: "GET",
              headers: { Authorization: `Bearer ${token}` },
            }).then( async (res) => {
              if (res.status >= 400) {
                dispatch(setLogout());
                navigate('/');
              } else {
                return res;
              }
          }).then(async (data) => {
              const actor = await data.json();
              setUser(actor);
            }).catch((err) => {
              console.log(err);
              dispatch(setLogout());
              navigate('/');
            });        
        } else {
          setUser(null);
          const response = await fetch(url+`/users/${userId}`, {
            method: "GET",
            headers: { Authorization: `Bearer ${token}` },
          }).then(async (data) => {
            setUser(await data.json());
          });
        }
  };


  const openNewTab = (social) => {
    if(social === 'TIKTOK'){
      window.open(user.linkTiktok, '_blank', 'noreferrer');
    }if(social === 'INSTAGRAM'){
      window.open(user.linkInstagram, '_blank', 'noreferrer');
    }  
  }

  const handlePatchPicture = async () => {
    if (image) {
        setUser(null);
        getBase64FromUrl(image);
    }
  };
  const [image, setImage] = useState(null);

  const getBase64FromUrl = (image) => {
    var reader = new FileReader();
     reader.readAsDataURL(image);
     reader.onload = async function () {
        const body = {
          file: reader.result,
          userId: userId
        };
        const response = await fetch(url+`/actors/picture`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
          body: JSON.stringify(body),
        });
        const data = await response.json();
        setUser(await data);
        setImage(null);
        setEdit(false);
        // navigate(0);
     };
     reader.onerror = function (error) {
       console.log('Error: ', error);
      };
  }
  const drop = () => {
    return <Dropzone
    acceptedFiles=".jpg,.jpeg,.png"
    minSize={1024}
    maxSize={10072000}
    multiple={false}
    autoProcessQueue={false}
    onDrop={(acceptedFiles) => setImage(acceptedFiles[0])}
  >
    {({ getRootProps, getInputProps }) => (
      <Box
        {...getRootProps()}
        border={`2px dashed ${palette.primary.main}`}
        p="1rem"
        sx={{ "&:hover": { cursor: "pointer" } }}
      >
        <input {...getInputProps()} />
        {!image ? (  
          <CropOriginalIcon fontSize="large"/>
        ) : (
          <div>
            <FlexBetween>
            <Typography>{image.name.length > 10 ? image.name.substring(0, 10)+'...' : image.name}</Typography>
            <EditOutlinedIcon />
          </FlexBetween>
          </div>
        )}
      </Box>
    )}
    </Dropzone>
  };




  const editPic = () => {
    return <div>{!edit ? <ManageAccountsOutlined onClick={() => {
      setEdit(!edit)
    }} /> : <>
  <FlexBetween gap={"0.5rem"}>
  <Button
          onClick={() => {
            setEdit(false);
          }}>
      <CancelIcon fontSize="large" />
      </Button>
  <Button
    disabled={!image}
    onClick={handlePatchPicture}
    sx={{
      color: palette.background.alt,
      backgroundColor: palette.primary.main,
      borderRadius: "3rem",
    }}
  >
    Salvar
  </Button>
  
  </FlexBetween>
    </>}</div>
  }

  const profileUser = () => {
    return <WidgetWrapper isMobile={!isNonMobileScreens} >
      {/* FIRST ROW */}
      <FlexBetween
        gap="0.5rem"
        pb="1.1rem"
        onClick={() => navigate(`/profile/${userId}`)}
      >
        <FlexBetween gap="1rem">
          {user && <UserImage image={user.picturePath} />}
          <Box>
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
              {firstName} {lastName}
            </Typography>
            <Typography color={medium}>{location}</Typography>
          </Box>
        </FlexBetween>
        {myProfile && <ManageAccountsOutlined />}
      </FlexBetween>

      <Divider />

      {/* SECOND ROW */}
      <Box p="1rem 0">
        <Box display="flex" alignItems="center" gap="1rem" mb="0.5rem">
          <HiOutlineUserGroup size={30} fontSize="large" sx={{ color: main }} />
          <Typography color={medium}>{location}</Typography>
        </Box>
        <Box display="flex" alignItems="center" gap="1rem">
          <FaTheaterMasks size={30} fontSize="large" sx={{ color: main }} />
          <Typography color={medium}>{occupation}</Typography>
        </Box>
      </Box>

      <Divider />
    </WidgetWrapper>
  };

  const [link, setLink] = useState();
  const [linkUpdate, setLinkUpdate] = useState();

  const [linkEditInsta, setEditInsta] = useState();
  const [linkInsta, setLinkInsta] = useState();

  const profileActor = () => {
    return <div>{!isNonMobileScreens && <Divider />}<WidgetWrapper isMobile={!isNonMobileScreens} >
    {/* FIRST ROW */}
    
    <FlexBetween
      gap="0.5rem"
      pb="1.1rem"
    >
      <FlexBetween gap="1rem">
        {user && edit ?  drop() : <UserImage image={user.userPicturePath} />}
        {!edit && <Box>
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
            {user?.nome} {user?.sobrenome}
          </Typography>
            <FlexBetween gap="0.5rem">
              <Typography color={medium}><Masks quantidade={user.estrelas} /></Typography>
            </FlexBetween>
              <FlexBetween gap="0.5rem">
                {user && user.opnions && <Typography color={medium}>{user.opnions.length} opniões</Typography> }
              </FlexBetween>
        </Box>}
      </FlexBetween>
      { myProfile && editPic() }
    </FlexBetween>
    <Divider />
    {/* SECOND ROW */}
    <Box p="1rem 0">
      <Box display="flex" justifyContent="space-between" >
      <Typography color={medium}>Criatividade </Typography>
        <FlexBetween>
          <Masks quantidade={user.criatividade} />
        </FlexBetween>
      </Box>
      <Box display="flex" justifyContent="space-between" >
        <Typography color={medium}>Pontualidade </Typography>
       <FlexBetween>
        <Masks quantidade={user.pontualidade} />
       </FlexBetween>
      </Box>
      <Box display="flex" justifyContent="space-between" >
        <Typography color={medium}>Trabalho em equipe </Typography>
        <FlexBetween>
          <Masks quantidade={user.trabalhoEquipe} />
        </FlexBetween>
      </Box>
    </Box>

    <Divider />

    {/* THIRD ROW */}
    <Box p="1rem 0">
      <FlexBetween mb="0.5rem">
        {!!user && user.personagens?.map((personagem) => {
          return <PersonagemWidget key={personagem.nome} nome={personagem.nome}/>
        })}
      </FlexBetween>
      <FlexBetween>

      </FlexBetween>
    </Box>

    <Divider />

    {/* FOURTH ROW */}
    <Box p="1rem 0">
      <Typography fontSize="1rem" color={main} fontWeight="500" mb="1rem">
        Social Profiles
      </Typography>

      <FlexBetween gap="1rem" mb="0.5rem">
        <FlexBetween gap="1rem">
          <img style={{width : 25, height: 25}} src="https://res.cloudinary.com/dosghtja7/image/upload/v1696357234/instagram_dvirc4.png" alt="instagram" />
          {linkEditInsta ? inputLink('https://instagram.com/', linkInsta, setLinkInsta) : 
          <Box>
            <Typography onClick={() => {openNewTab('INSTAGRAM')}} color={main} fontWeight="500">
              Instagram
            </Typography>
            <Typography color={medium}>Network Platform</Typography>         
          </Box>
         } 
        </FlexBetween>
        { myProfile && editSave(linkEditInsta, setEditInsta, "INSTAGRAM", userId, linkInsta, token, setUser) }
      </FlexBetween>

      <FlexBetween gap="1rem">
        <FlexBetween gap="1rem">
          <img style={{width : 25, height: 25}} src="https://res.cloudinary.com/dosghtja7/image/upload/v1696357233/tik-tok_g5e5lg.png" alt="tiktok" />
          {link ? inputLink('https://tiktok.com/@...', linkUpdate, setLinkUpdate ) : 
            <Box>
              <Typography onClick={() => {openNewTab('TIKTOK')}} color={main} fontWeight="500">
                Tiktok
              </Typography>
              <Typography color={medium}>Social Network</Typography>
            </Box>
          }
        </FlexBetween>
        { myProfile && editSave(link, setLink, "TIKTOK", userId, linkUpdate, token, setUser) }
      </FlexBetween>
    </Box>  
  </WidgetWrapper></div>
  };

  useEffect(() => {
    getUser();  
  }, [userId, ator]); // eslint-disable-line react-hooks/exhaustive-deps

  if (!user) {
    return <WidgetWrapper isMobile={!isNonMobileScreens}><DnaLoading /></WidgetWrapper>;
  }

  const {
    firstName,
    lastName,
    location,
    occupation,
    viewedProfile,
    impressions,
    friends,
  } = user;

  return (<div>
    { !!actorProfile ? profileActor() : profileUser() }
  </div>)
};
export default UserWidget;
