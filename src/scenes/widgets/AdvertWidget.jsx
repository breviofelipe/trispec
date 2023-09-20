import { Typography, useTheme } from "@mui/material";
import FlexBetween from "components/FlexBetween";
import WidgetWrapper from "components/WidgetWrapper";
import { useEffect } from "react";

const AdvertWidget = () => {
  const { palette } = useTheme();
  const dark = palette.neutral.dark;
  const main = palette.neutral.main;
  const medium = palette.neutral.medium;


  useEffect(() => {

    // (window.adsbygoogle = window.adsbygoogle || []).push({});
    const scriptElement = document.querySelector('script[src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4527229097839562"]')
    const handleScriptLoad = () => {
      try{
        if(window.adsbygoogle){
          console.log("Ads push");
          window.adsbygoogle.push({});
          console.log(window.adsbygoogle);
        } else {
          scriptElement.addEventListener("load", handleScriptLoad);
          console.log("waiting until adsense lib loaded")
        }
      } catch (err) {
        console.log("error in adsense", err);
      }
    }
    handleScriptLoad();
},[]);

  

  // return () => {
  //   if (scriptElement) {
  //     scriptElement.removeEventListener("load", handleScriptLoad);
  //   }
  // }
  // 
  return (<WidgetWrapper>
      <FlexBetween>
        <Typography color={dark} variant="h5" fontWeight="500">
          Publicidade
        </Typography>
        <Typography color={medium}>Google Ad</Typography>
      </FlexBetween>
      {/* <img
        width="100%"
        height="auto"
        alt="advert"
        src="http://192.168.0.6:3001/assets/info4.jpeg"
        style={{ borderRadius: "0.75rem", margin: "0.75rem 0" }}
      /> */}
      <FlexBetween>
      <ins className="adsbygoogle"
          data-full-width-responsive="true"
          style={{ width: "7rem" }}
          // data-ad-format="auto"
          data-ad-layout-key="-fb+5w+4e-db+86"
          data-ad-client="ca-pub-4527229097839562"
          data-ad-slot="2797702158"
          data-adtest="on"></ins>     
      </FlexBetween>
     {/* <FlexBetween>
        <Typography color={main}>Clash Royal</Typography>
        <Typography color={medium}>supercell.com</Typography> */}
      {/* </FlexBetween> */}
      {/* <Typography color={medium} m="0.5rem 0">
        Your pathway to stunning and immaculate beauty and made sure your skin
        is exfoliating skin and shining like light.
      </Typography> */}
    </WidgetWrapper>
  );
};

export default AdvertWidget;
