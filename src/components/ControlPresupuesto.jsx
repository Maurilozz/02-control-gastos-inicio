import { useEffect, useState } from "react";

import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

import { currencyFormat, percentageMeter } from "../helpers";

const ControlPresupuesto = ({
  presupuesto,
  setPresupuesto,
  consumos,
  setConsumos,
  setIsValidPresupuesto,
}) => {
  const [disponible, setDisponible] = useState(0);
  const [consumido, setConsumido] = useState(0);
  const [porcentaje, setPorcentaje] = useState(0);
  const [saldoNegativo, setSaldoNegativo] = useState(false);

  useEffect(() => {
    const totalConsumido = consumos.reduce(
      (acumulador, consumo) => consumo.cantidad + acumulador,
      0
    );
    const totalDisponible = presupuesto - totalConsumido;

    // CONSULTAR EL PORCENTAJE GASTADO
    const nuevoPorcentaje = (
      ((presupuesto - totalDisponible) / presupuesto) *
      100
    ).toFixed(2);

    setDisponible(totalDisponible);
    setConsumido(totalConsumido);
    setTimeout(() => {
      setPorcentaje(nuevoPorcentaje);
    }, 500);

    if (presupuesto < totalConsumido) {
      setSaldoNegativo(true);
    } else {
      setSaldoNegativo(false);
    }
  }, [consumos]);

  const handleResetearApp = () => {
    const resultado = confirm("¿Desea Reiniciar Consumos y Presupuesto?");

    if (resultado) {
      setPresupuesto(0);
      setConsumos([]);
      setIsValidPresupuesto(false);
    }
  };

  return (
    <div className="contenedor contenedor-presupuesto sombra dos-columnas">
      <div>
        <CircularProgressbar
          styles={buildStyles({
            pathColor: percentageMeter(porcentaje),
            trailColor: "#f5f5f5",
            textColor: percentageMeter(porcentaje),
          })}
          value={porcentaje}
          text={`${porcentaje}% Gastado`}
        />
      </div>

      <div className="contenido-presupuesto">
        <button className="reset-app" type="button" onClick={handleResetearApp}>
          Resetear App
        </button>

        <p>
          <span>Presupuesto: </span> {currencyFormat(presupuesto)}
        </p>

        <p>
          <span>Disponible: </span> {currencyFormat(disponible)}
        </p>

        <p className={saldoNegativo ? "negativo" : ""}>
          <span>Usado: </span> {currencyFormat(consumido)}
        </p>
      </div>
    </div>
  );
};

export default ControlPresupuesto;
