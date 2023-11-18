import CountdownTimer from "components/countdownTimer/CountdownTimer";
import PostComponent from "../../../components/post/PostComponent";

const EstreiaWidget = () => {

        return <PostComponent titulo={"Contagem regressiva..."} subtitulo={"Faltam poucos dias para grande estreia"} content={<CountdownTimer targetDate={"2023-11-27T19:00:00.000+00:00"} />} />
}

export default EstreiaWidget;