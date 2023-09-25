import { Typography, useTheme } from "@mui/material";
import FlexBetween from "components/FlexBetween";
import WidgetWrapper from "components/WidgetWrapper";
import { useEffect } from "react";

const AdvertWidget = () => {
  const { palette } = useTheme();
  const dark = palette.neutral.dark;

  const medium = palette.neutral.medium;


  useEffect(() => {
    const scriptElement = document.querySelector('script[src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4527229097839562"]')
    const handleScriptLoad = () => {
      try{
        if(window.adsbygoogle){
          
          if(window.adsbygoogle.length < 1){
            window.adsbygoogle.push({});
            console.log("Ads push");
            console.log(window.adsbygoogle);
          } else {
            console.log("pushed before");
            console.log(window.adsbygoogle);
          }
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

  
  return (<WidgetWrapper>
      <FlexBetween>
        <Typography color={dark} variant="h5" fontWeight="500">
          Publicidade
        </Typography>
        <Typography color={medium}>Google Ad</Typography>
      </FlexBetween>
      <FlexBetween>
      <ins className="adsbygoogle"
          data-full-width-responsive="true"
          style={{ width: "100%", height: "auto", display: "block" }}
          data-ad-client="ca-pub-4527229097839562"
          data-ad-slot="3059510317"
          data-ad-format="auto"
          ></ins>     
      </FlexBetween>
    </WidgetWrapper>
  );
};

export default AdvertWidget;
