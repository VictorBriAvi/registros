import useGastosLogic from "../../Hooks/useGastosLogic";
import useServicioLogic from "../../Hooks/useServiciosLogic";
import { VictoryPie } from "victory";

const ArqueoDeCaja = () => {
  const { servicios, isLoading } = useServicioLogic();
  const { gastos, isLoadingGasto } = useGastosLogic();
  let totalIngresos = 0;
  let totalGastos = 0;

  // Suma de precios de productos

  servicios.forEach((servicio) => {
    totalIngresos += parseFloat(servicio.precioProducto);
  });

  gastos.forEach((gasto) => {
    totalGastos += parseFloat(gasto.precioGasto);
  });
  const gananciaPerdida = totalIngresos - totalGastos;
  const total = totalIngresos + totalGastos;
  const porcentajeIngresos = Math.round((totalIngresos / total) * 100);
  const porcentajeGastos = Math.round((totalGastos / total) * 100);

  console.log(porcentajeIngresos);
  console.log(porcentajeGastos);
  const data = [
    { x: "Ingresos", y: porcentajeIngresos },
    { x: "Gastos", y: porcentajeGastos },
  ];

  if (isLoading && isLoadingGasto) {
    return <p>Cargando...</p>;
  }

  return (
    <div className="container">
      <div className="row ">
        <div className="col-md-6 bg-warning">
          <div className="row">
            <div className="col-12">
              <div className="text-center">
                <p>Total ingreso : {`${totalIngresos}`}</p>
              </div>
            </div>
          </div>
          <div className="col-12">
            <div className="text-center">
              <p>Total gastos : {`${totalGastos}`}</p>
            </div>
          </div>
          <div className="col-12">
            <div className="text-center">
              <p>
                {gananciaPerdida >= 0
                  ? `Ganancia con ${gananciaPerdida}`
                  : `Pérdida con ${gananciaPerdida}`}
              </p>
            </div>
          </div>
        </div>

        <div className="col-md-6  ">
          <div style={{ width: "100%", maxWidth: "5000px", margin: "auto" }}>
            <VictoryPie
              data={data}
              colorScale={["#66BB6A", "#EF5350"]} // Colores para Ingresos y Gastos
              animate={{ duration: 2000 }}
              responsive={true}
              width={400} // Ajusta el ancho según tus necesidades
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArqueoDeCaja;
