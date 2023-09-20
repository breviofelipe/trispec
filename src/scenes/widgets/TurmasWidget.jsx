import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setTurmas } from "state";
import PostWidget from "./PostWidget";
import TurmaWidget from "./TurmaWidget";

const TurmasWidget = () => {
  const dispatch = useDispatch();
  const turmas = useSelector((state) => state.turmas);
  const token = useSelector((state) => state.token);


  const getTurmas = async () => {
    const url = "https://arcane-thicket-81092-1ac7cecea9b8.herokuapp.com/turmas";
    const response = await fetch(url, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    dispatch(setTurmas({ turmas: data }));
  };

  useEffect(() => {
    getTurmas();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <> { turmas.map(
        ({
            id,
            turmaId,
            atores,
            espetaculo,
            __v,
            createdAt,
            updatedAt
          }) => (
          <TurmaWidget
            key={id}
            id={id}
            turmaId={turmaId}
            atores={atores}
            espetaculo={espetaculo}
            __v={__v}
            createdAt={createdAt}
            updatedAt={updatedAt}
          />
        )
      )
      }
    </>
  );
};

export default TurmasWidget;
