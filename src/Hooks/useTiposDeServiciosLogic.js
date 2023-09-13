import {
  collection,
  doc,
  endBefore,
  getDoc,
  getDocs,
  limit,
  orderBy,
  query,
  startAfter,
} from "firebase/firestore";
import { useState } from "react";
import { db } from "../firebaseConfig/firebase";
import { useCallback } from "react";
import { useEffect } from "react";

const useTiposDeServiciosLogic = () => {
  const [tiposServicios, setTiposServicios] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [ultimoDoc, setUltimoDoc] = useState([]);
  const [primerDocVisible, setPrimerDocVisible] = useState([null]);

  const tiposServiciosCollection = collection(db, "tiposDeServicios");

  const getTiposDeServicios = async () => {
    const primeraPaginacion = query(
      collection(db, "tiposDeServicios"),
      orderBy("tipoDeTrabajo"),
      limit(4)
    );
    const documentSnapshots = await getDocs(primeraPaginacion);

    const ultimoVisible =
      documentSnapshots.docs[documentSnapshots.docs.length - 1];

    const primerVisible = documentSnapshots.docs[0];

    const tiposDeServiciosData = documentSnapshots.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));

    setUltimoDoc(ultimoVisible);
    setPrimerDocVisible(primerVisible);
    setTiposServicios(tiposDeServiciosData);
    setIsLoading(false);
  };

  const paginaSiguiente = async () => {
    const paginacionSiguiente = query(
      collection(db, "tiposDeServicios"),
      orderBy("tipoDeTrabajo"),
      startAfter(ultimoDoc),
      limit(4)
    );

    const documentSnapshots = await getDocs(paginacionSiguiente);

    if (documentSnapshots.docs.length > 0) {
      const ultimoVisible =
        documentSnapshots.docs[documentSnapshots.docs.length - 1];

      const tipoDeServiciosData = documentSnapshots.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));

      console.log(tipoDeServiciosData);
      setUltimoDoc(ultimoVisible);
      setTiposServicios(tipoDeServiciosData);
    } else {
      console.log("no existen mas datos");
    }
  };

  const paginaAnterior = async () => {
    console.log(primerDocVisible);
    if (primerDocVisible) {
      const paginacionAnterior = query(
        collection(db, "tiposDeServicios"),
        orderBy("tipoDeTrabajo"),
        endBefore(ultimoDoc),
        limit(4)
      );

      const documentSnapshots = await getDocs(paginacionAnterior);

      if (documentSnapshots.docs.length > 0) {
        const primerVisible = documentSnapshots.docs[0];
        const ultimoVisible =
          documentSnapshots.docs[documentSnapshots.docs.length - 1];

        const tipoDeServiciosData = documentSnapshots.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));

        console.log(tipoDeServiciosData);
        setUltimoDoc(ultimoVisible);
        setPrimerDocVisible(primerVisible);
        setTiposServicios(tipoDeServiciosData);
      }
    } else {
      console.log("no existen mas datos");
    }
  };

  const addTipoDeServicio = async (nuevoServicio) => {
    try {
      await addDoc(tiposServiciosCollection, nuevoServicio);
      getTiposDeServicios();
    } catch (error) {
      console.log(error);
    }
  };
  const getTipoDeServicioById = async (id) => {
    const tipoDeServicioDoc = doc(db, "tiposDeServicios", id);
    const tipoDeServicioEncontrado = await getDoc(tipoDeServicioDoc);
    if (tipoDeServicioEncontrado.exists()) {
      return {
        id: tipoDeServicioEncontrado.id,
        ...tipoDeServicioEncontrado.data(),
      };
    } else {
      return null;
    }
  };

  const subirServiciosPorCategoria = async (servicio, porcentaje) => {
    setIsLoading(true);

    const data = await getDocs(tiposServiciosCollection);
    const tipoServicioData = data.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));

    const tiposFiltrados = tipoServicioData.filter((tipo) => {
      return tipo.tipoDeTrabajo === servicio;
    });
    console.log(tiposFiltrados);

    // Iniciar un bote de escritura
    const batch = writeBatch(db);

    tiposFiltrados.forEach((tipo) => {
      const tipoServicioDoc = doc(db, "tiposDeServicios", tipo.id);

      // Obtener el valor actual de precioServicio de este documento específico
      const precioActual = tipo.precioServicio;
      console.log(precioActual);
      console.log(tipo);

      // Calcular el nuevo valor con el porcentaje
      const nuevoPrecio = precioActual + (precioActual * porcentaje) / 100;

      console.log(nuevoPrecio);

      // Actualizar el valor en el bote de escritura
      batch.update(tipoServicioDoc, { precioServicio: nuevoPrecio });
    });

    try {
      // Ejecutar el bote de escritura
      await batch.commit();
      console.log("Precios actualizados en la base de datos");
    } catch (error) {
      console.error(
        "Error al actualizar los precios en la base de datos:",
        error
      );
    }

    setIsLoading(false);
  };

  const updateTipoDeServicio = async (id, tipoDeServicioActualizado) => {
    try {
      const tipoDeServicioDoc = doc(db, "tiposDeServicios", id);
      await updateDoc(tipoDeServicioDoc, tipoDeServicioActualizado);
      getTiposDeServicios();
    } catch (error) {
      console.log(error);
    }
  };

  const deleteTipoDeServicio = async (id) => {
    const clienteDoc = doc(db, "tiposDeServicios", id);
    await deleteDoc(clienteDoc);
    getTiposDeServicios();
  };

  useEffect(() => {
    getTiposDeServicios();
  }, []);

  return {
    tiposServicios,
    isLoading,
    addTipoDeServicio,
    getTipoDeServicioById,
    updateTipoDeServicio,
    deleteTipoDeServicio,
    subirServiciosPorCategoria,
    getTiposDeServicios,
    paginaSiguiente,
    paginaAnterior,
  };
};

export default useTiposDeServiciosLogic;

/*

const getTiposDeServicios = useCallback(async () => {
  setIsLoading(true);
  const data = await getDocs(query(tiposServiciosCollection));
  const tipoServicioData = data.docs.map((doc) => ({
    ...doc.data(),
    id: doc.id,
  }));
  const tipoDeServiciosOrdenados = tipoServicioData.sort((a, b) =>
    a.id.localeCompare(b.id)
  );
  setTiposServicios(tipoDeServiciosOrdenados);
  setIsLoading(false);
}, [tiposServiciosCollection]);

*/
