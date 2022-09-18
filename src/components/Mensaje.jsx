const Mensaje = ({ children, tipo = "error" }) => {
  return <div className={`alerta ${tipo}`}>{children}</div>;
};

export default Mensaje;
