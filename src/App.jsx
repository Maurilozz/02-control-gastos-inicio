import { useEffect, useState } from "react";
import Filtros from "./components/Filtros";
import Header from "./components/Header";
import ListadoConsumos from "./components/ListadoConsumos";
import Modal from "./components/Modal";
import imagenNuevoGasto from "./img/nuevo-gasto.svg";

function App() {
  const [consumos, setConsumos] = useState(
    localStorage.getItem("consumos")
      ? JSON.parse(localStorage.getItem("consumos"))
      : []
  );
  const [presupuesto, setPresupuesto] = useState(
    Number(localStorage.getItem("presupuesto")) ?? 0
  );
  const [isValidPresupuesto, setIsValidPresupuesto] = useState(false);

  const [modal, setModal] = useState(false);
  const [animarModal, setAnimarModal] = useState(false);

  const [consumoEditar, setConsumoEditar] = useState({});

  const [filtro, setFiltro] = useState("");
  const [consumosFiltrados, setConsumosFiltrados] = useState([]);

  useEffect(() => {
    if (Object.keys(consumoEditar).length > 0) {
      setModal(true);

      setTimeout(() => {
        setAnimarModal(true);
      }, 500);
    }
  }, [consumoEditar]);

  useEffect(() => {
    localStorage.setItem("presupuesto", presupuesto);
  }, [presupuesto]);

  useEffect(() => {
    localStorage.setItem("consumos", JSON.stringify(consumos));
  }, [consumos]);

  useEffect(() => {
    const presupuestoLs = Number(localStorage.getItem("presupuesto")) ?? 0;

    if (presupuestoLs > 0) {
      setIsValidPresupuesto(true);
    }
  }, []);

  useEffect(() => {
    // FILTRAR DATOS
    if (filtro) {
      const consumosFiltrados = consumos.filter(
        (consumo) => consumo.categoria === filtro
      );

      setConsumosFiltrados(consumosFiltrados);
    }
  }, [filtro]);

  const handleModal = () => {
    setModal(true);
    setConsumoEditar({});

    setTimeout(() => {
      setAnimarModal(true);
    }, 500);
  };

  const agregarConsumo = (consumo) => {
    if (Object.keys(consumoEditar).length > 0) {
      // ACTUALIZAR
      const consumosActualizados = consumos.map((consumoState) => {
        if (consumo.id === consumoState.id) {
          return consumo;
        } else {
          return consumoState;
        }
      });

      setConsumos(consumosActualizados);
      setConsumoEditar({});
    } else {
      // AGREGAR
      setConsumos([...consumos, consumo]);
    }

    setAnimarModal(false);

    setTimeout(() => {
      setModal(false);
    }, 500);
  };

  const eliminarConsumo = (id) => {
    const consumosActualizados = consumos.filter(
      (consumo) => consumo.id !== id
    );
    setConsumos(consumosActualizados);
  };

  return (
    <div className={modal ? "fijar" : ""}>
      <Header
        consumos={consumos}
        setConsumos={setConsumos}
        presupuesto={presupuesto}
        setPresupuesto={setPresupuesto}
        isValidPresupuesto={isValidPresupuesto}
        setIsValidPresupuesto={setIsValidPresupuesto}
      />

      {isValidPresupuesto && (
        <>
          <main>
            <Filtros filtro={filtro} setFiltro={setFiltro} />

            <ListadoConsumos
              consumos={consumos}
              eliminarConsumo={eliminarConsumo}
              setConsumoEditar={setConsumoEditar}
              filtro={filtro}
              consumosFiltrados={consumosFiltrados}
            />
          </main>
          <div className="nuevo-gasto">
            <img
              src={imagenNuevoGasto}
              alt="Nuevo Consumo"
              onClick={handleModal}
            />
          </div>
        </>
      )}
      {modal && (
        <Modal
          setModal={setModal}
          animarModal={animarModal}
          setAnimarModal={setAnimarModal}
          agregarConsumo={agregarConsumo}
          consumoEditar={consumoEditar}
          setConsumoEditar={setConsumoEditar}
        />
      )}
    </div>
  );
}

export default App;
