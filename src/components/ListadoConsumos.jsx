import Consumo from "./Consumo";

const ListadoConsumos = ({
  consumos,
  setConsumoEditar,
  eliminarConsumo,
  filtro,
  consumosFiltrados,
}) => {
  return (
    <div className="listado-gastos contenedor">
      {filtro ? (
        <>
          <h2>
            {consumosFiltrados.length
              ? "Consumos"
              : "No Hay Consumos en esta Categoria"}
          </h2>
          {consumosFiltrados.map((consumo) => (
            <Consumo
              consumo={consumo}
              key={consumo.id}
              setConsumoEditar={setConsumoEditar}
              eliminarConsumo={eliminarConsumo}
            />
          ))}
        </>
      ) : (
        <>
          <h2>
            {consumos.length ? "Consumos" : "Agrega tu Primer Consumo con +"}
          </h2>
          {consumos.map((consumo) => (
            <Consumo
              consumo={consumo}
              key={consumo.id}
              setConsumoEditar={setConsumoEditar}
              eliminarConsumo={eliminarConsumo}
            />
          ))}
        </>
      )}
    </div>
  );
};

export default ListadoConsumos;
