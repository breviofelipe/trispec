import { EditOutlined } from "@mui/icons-material"
import { Button, InputBase, useTheme } from "@mui/material";



const inputLink = (holder, value, setOnChange) => {
  const { palette } = useTheme();
  
    return <InputBase
    placeholder={holder}
    onChange={(e) => setOnChange(e.target.value)}
    value={value}
    sx={{
      width: "100%",
      backgroundColor: palette.neutral.light,
      borderRadius: "3rem",
      padding: "0.5rem 1rem",
    }}
  />
}

const editSave = (edit, setEdit, type, userId, link, token, setUser) => {
  const { palette } = useTheme();
  const main = palette.neutral.main;
    if(edit){
      return <Button
      disabled={!edit}
      onClick={() => {
        setEdit(false);
        handlePatchLink(link, type, userId, token, setUser);
      }}
      sx={{
        color: palette.background.alt,
        backgroundColor: palette.primary.main,
        borderRadius: "3rem",
      }}
    >
      Salvar
    </Button>
    } else {
      return <EditOutlined onClick={() => { setEdit(true) }} sx={{ color: main }} />
    }
  }


  const handlePatchLink = async (link, type, userId, token, setUser) => {
    setUser(null);
    const url = 'https://arcane-thicket-81092-1ac7cecea9b8.herokuapp.com';
    const body = {
      link: link,
      userId: userId,
      type: type
    }
    const response = await fetch(url+`/actors/link`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify(body),
    });
    const data = await response.json();
    setUser(await data);
  }




export { editSave, inputLink };