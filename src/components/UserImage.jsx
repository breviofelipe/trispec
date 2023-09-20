import { Box } from "@mui/material";

const UserImage = ({ image, size = "60px" }) => {
  return (
    <Box width={size} height={size}>
      <img
        style={{ objectFit: "cover", borderRadius: "50%" }}
        width={size}
        height={size}
        alt="user"
        src={image}
        //  src={`https://res.cloudinary.com/dosghtja7/image/upload/v1694566797/assets/${image}`}
        //src={'https://res.cloudinary.com/dosghtja7/image/upload/v1694565702/samples/woman-on-a-football-field.jpg'}
      />
    </Box>
  );
};

export default UserImage;
