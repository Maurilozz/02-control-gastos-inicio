import { useRef, useState } from "react";
import Mensaje from "./Mensaje";

const NuevoPresupuesto = ({
  presupuesto,
  setPresupuesto,
  setIsValidPresupuesto,
}) => {
  const [mensaje, setMensaje] = useState("");
  const inputPresupuesto = useRef();

  const handleInputPresupuesto = (e) => {
    e.preventDefault();

    if (!Number(presupuesto) || Number(presupuesto) <= 0) {
      setMensaje("Presupuesto No Valido");

      return;
    }

    setMensaje("");
    setIsValidPresupuesto(true);
  };

  const handlePresupuesto = ({ target: { value } }) => {
    setPresupuesto(Number(value) ? Number(value) : value);

    if (!Number(value) || Number(value) <= 0) {
      inputPresupuesto.current.classList.add("error");
      return;
    }

    inputPresupuesto.current.classList.remove("error");
  };
  return (
    <div className="contenedor-presupuesto contenedor sombra">
      <form className="formulario" onSubmit={handleInputPresupuesto}>
        <div className="campo">
          <label htmlFor="">Definir Presupuesto</label>

          <input
            type="text"
            className="nuevo-presupuesto"
            placeholder="Nuevo Presupuesto"
            value={presupuesto}
            onChange={handlePresupuesto}
            ref={inputPresupuesto}
          />
        </div>

        <input type="submit" value="Añadir" />

        {mensaje && <Mensaje tipo="error">{mensaje}</Mensaje>}
      </form>
    </div>
  );
};

export default NuevoPresupuesto;
