import { useEffect, useState } from "react";
import cerrarBTN from "../img/cerrar.svg";
import Mensaje from "./Mensaje";
import { generateId } from "../helpers";

const Modal = ({
  setModal,
  animarModal,
  setAnimarModal,
  agregarConsumo,
  consumoEditar,
  setConsumoEditar,
}) => {
  const [formulario, setFormulario] = useState({
    nombre: "",
    cantidad: "",
    categoria: "",
    id: generateId(),
    fecha: Date.now(), // RETORNA LA FECHA EN LA QUE SE CREO EL OBJETO
  });
  const { nombre, cantidad, categoria } = formulario;
  const [mensaje, setMensaje] = useState("");

  useEffect(() => {
    if (Object.keys(consumoEditar).length > 0) {
      setFormulario({
        nombre: consumoEditar.nombre,
        cantidad: consumoEditar.cantidad,
        categoria: consumoEditar.categoria,
        id: consumoEditar.id,
        fecha: consumoEditar.fecha,
      });
    }
  }, []);

  const handleForm = ({ target }) => {
    const { name, value } = target;
    if (name === "cantidad") {
      setFormulario({
        ...formulario,
        cantidad: Number(value),
      });

      return;
    }

    setFormulario({
      ...formulario,
      [name]: value,
    });
  };

  const handleCerrar = () => {
    setAnimarModal(false);
    setConsumoEditar({});

    setTimeout(() => {
      setModal(false);
    }, 500);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (nombre === "") {
      setMensaje("Introduzca un Nombre para su Nuevo Consumo");
      resetMensaje();
      return;
    }

    if (cantidad <= 0) {
      setMensaje("Introduzca una Cantidad Valida");
      resetMensaje();
      return;
    }

    if (categoria === "") {
      setMensaje("Seleccione una Categoria");
      resetMensaje();
      return;
    }

    agregarConsumo(formulario);
  };

  const resetMensaje = () => {
    setTimeout(() => {
      setMensaje("");
    }, 3000);
  };

  return (
    <div className="modal">
      <div className="cerrar-modal">
        <img src={cerrarBTN} alt="Cerrar Modal" onClick={handleCerrar} />
      </div>

      <form
        className={`formulario ${animarModal ? "animar" : "cerrar"}`}
        onSubmit={handleSubmit}
      >
        {mensaje && <Mensaje>{mensaje}</Mensaje>}

        <legend>
          {consumoEditar.nombre ? "Editar Consumo" : "Nuevo Consumo"}
        </legend>

        <div className="campo">
          <label htmlFor="nombre">Nombre de Consumo</label>

          <input
            type="text"
            placeholder="Añade Nombre de tu Consumo"
            id="nombre"
            name="nombre"
            value={nombre}
            onChange={handleForm}
          />
        </div>

        <div className="campo">
          <label htmlFor="cantidad">Cantidad</label>

          <input
            type="number"
            placeholder="Añade una Cantidad de tu Consumo: ej. 300"
            id="cantidad"
            name="cantidad"
            value={cantidad}
            onChange={handleForm}
          />
        </div>

        <div className="campo">
          <label htmlFor="categoria">Categoria</label>

          <select
            name="categoria"
            id="categoria"
            onChange={handleForm}
            value={categoria}
          >
            <option value="" disabled>
              -- Seleccione --
            </option>

            <option value="ahorro">Ahorro</option>
            <option value="comida">Comida</option>
            <option value="casa">Casa</option>
            <option value="gastos">Gastos Varios</option>
            <option value="ocio">Ocio</option>
            <option value="salud">Salud</option>
            <option value="suscripciones">Suscripciones</option>
          </select>
        </div>

        <input
          type="submit"
          value={consumoEditar.nombre ? "Guardar Cambios" : "Añadir Consumo"}
        />
      </form>
    </div>
  );
};

export default Modal;
