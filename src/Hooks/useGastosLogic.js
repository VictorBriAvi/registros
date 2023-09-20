import { useState, useEffect } from "react";
import {
  getDocs,
  collection,
  getDoc,
  addDoc,
  doc,
  updateDoc,
  deleteDoc,
  query,
  orderBy,
  limit,
  startAfter,
  endBefore,
  where,
} from "firebase/firestore";
import { db } from "../firebaseConfig/firebase";
import moment from "moment";

const useGastosLogic = () => {
  const [gastos, setGastos] = useState([]);
  const [isLoadingGasto, setIsLoading] = useState(true);

  const [gastosRangoFecha, setGastosRangoFecha] = useState([]);

  const [ultimoDoc, setUltimoDoc] = useState(null);
  const [primerDocVisible, setPrimerDocVisible] = useState([0]);

  const gastosCollection = collection(db, "gastos");
  const pageSize = 10;

  const getGastos = async (fecha) => {
    const fechaHoy = moment().format("YYYY-MM-DD");

    const fechaConsulta = fecha ? fecha : fechaHoy;

    try {
      const primeraConsulta = query(
        collection(db, "gastos"),
        where("fechaGasto", "==", fechaConsulta),
        orderBy("fechaGasto"),
        limit(pageSize)
      );

      const documentSnapshots = await getDocs(primeraConsulta);

      const ultimoVisible =
        documentSnapshots.docs[documentSnapshots.docs.length - 1];

      const primerVisible = documentSnapshots.docs[0];

      const promises = documentSnapshots.docs.map(async (doc) => {
        const gastoData = doc.data();

        const tipoDeGastoRef = gastoData.nombreTipoDeGasto;

        const [tipoDeGastoSnapshot] = await Promise.all([
          getDoc(tipoDeGastoRef),
        ]);

        const tipoDeGastoData = tipoDeGastoSnapshot.data() || {};

        const gasto = {
          ...gastoData,
          id: doc.id,
          nombreTipoDeGasto: tipoDeGastoData.nombreTipoDeGasto,
          descripcionGasto: doc.data().descripcionGasto,
          precioGasto: doc.data().precioGasto,
          fechaGasto: doc.data().fechaGasto,
        };

        return gasto;
      });

      // Esperar a que se resuelvan todas las promesas y obtener los servicios completos
      const tiposDeGastosCompletos = await Promise.all(promises);

      // Actualizar la caché con los nuevos datos
      localStorage.setItem(
        "cachedServicios",
        JSON.stringify(tiposDeGastosCompletos)
      );

      setUltimoDoc(ultimoVisible);
      setPrimerDocVisible(primerVisible);
      setGastos(tiposDeGastosCompletos);
      setIsLoading(false);
    } catch (error) {
      console.log("Error al obtener servicios:", error);
      setIsLoading(false);
    }
  };

  const getGastosPorRangoDeFecha = async (fechaInicio, fechaFin) => {
    try {
      const primeraConsulta = query(
        collection(db, "gastos"),
        where("fechaGasto", ">=", fechaInicio),
        where("fechaGasto", "<=", fechaFin),
        orderBy("fechaGasto"),
        limit(pageSize)
      );

      const documentSnapshots = await getDocs(primeraConsulta);

      const ultimoVisible =
        documentSnapshots.docs[documentSnapshots.docs.length - 1];

      const primerVisible = documentSnapshots.docs[0];

      const promises = documentSnapshots.docs.map(async (doc) => {
        const gastoData = doc.data();

        const tipoDeGastoRef = gastoData.nombreTipoDeGasto;

        const [tipoDeGastoSnapshot] = await Promise.all([
          getDoc(tipoDeGastoRef),
        ]);

        const tipoDeGastoData = tipoDeGastoSnapshot.data() || {};

        const gasto = {
          ...gastoData,
          id: doc.id,
          nombreTipoDeGasto: tipoDeGastoData.nombreTipoDeGasto,
          descripcionGasto: doc.data().descripcionGasto,
          precioGasto: doc.data().precioGasto,
          fechaGasto: doc.data().fechaGasto,
        };

        return gasto;
      });

      // Esperar a que se resuelvan todas las promesas y obtener los servicios completos
      const tiposDeGastosCompletos = await Promise.all(promises);

      // Actualizar la caché con los nuevos datos
      localStorage.setItem(
        "cachedServicios",
        JSON.stringify(tiposDeGastosCompletos)
      );

      setUltimoDoc(ultimoVisible);
      setPrimerDocVisible(primerVisible);
      setGastosRangoFecha(tiposDeGastosCompletos);
      setIsLoading(false);
    } catch (error) {
      console.log("Error al obtener servicios:", error);
      setIsLoading(false);
    }
  };

  const paginaSiguiente = async () => {
    const paginacionSiguiente = query(
      collection(db, "gastos"),
      orderBy("nombreTipoDeGasto"),
      startAfter(ultimoDoc),
      limit(pageSize)
    );

    const documentSnapshots = await getDocs(paginacionSiguiente);

    if (documentSnapshots.docs.length > 0) {
      const primerVisible = documentSnapshots.docs[0];
      const ultimoVisible =
        documentSnapshots.docs[documentSnapshots.docs.length - 1];

      const promises = documentSnapshots.docs.map(async (doc) => {
        const gastoData = doc.data();

        const tipoDeGastoRef = gastoData.nombreTipoDeGasto;

        const [tipoDeGastoSnapshot] = await Promise.all([
          getDoc(tipoDeGastoRef),
        ]);

        const tipoDeGastoData = tipoDeGastoSnapshot.data() || {};

        const gasto = {
          ...gastoData,
          id: doc.id,
          nombreTipoDeGasto: tipoDeGastoData.nombreTipoDeGasto,
          descripcionGasto: doc.data().descripcionGasto,
          precioGasto: doc.data().precioGasto,
          fechaGasto: doc.data().fechaGasto,
        };

        return gasto;
      });

      // Esperar a que se resuelvan todas las promesas y obtener los servicios completos
      const tiposDeGastosCompletos = await Promise.all(promises);

      // Actualizar la caché con los nuevos datos
      localStorage.setItem(
        "cachedServicios",
        JSON.stringify(tiposDeGastosCompletos)
      );

      setUltimoDoc(ultimoVisible);
      setPrimerDocVisible(primerVisible);
      setGastos(tiposDeGastosCompletos);
      setIsLoading(false);
    } else {
      console.log("no existen mas datos");
    }
  };

  const paginaAnterior = async () => {
    console.log(primerDocVisible);
    if (primerDocVisible) {
      const paginacionAnterior = query(
        collection(db, "gastos"),
        orderBy("nombreTipoDeGasto"),
        endBefore(primerDocVisible),
        limit(pageSize)
      );

      const documentSnapshots = await getDocs(paginacionAnterior);

      if (documentSnapshots.docs.length > 0) {
        const primerVisible = documentSnapshots.docs[0];
        const ultimoVisible =
          documentSnapshots.docs[documentSnapshots.docs.length - 1];

        const promises = documentSnapshots.docs.map(async (doc) => {
          const gastoData = doc.data();

          const tipoDeGastoRef = gastoData.nombreTipoDeGasto;

          const [tipoDeGastoSnapshot] = await Promise.all([
            getDoc(tipoDeGastoRef),
          ]);

          const tipoDeGastoData = tipoDeGastoSnapshot.data() || {};

          const gasto = {
            ...gastoData,
            id: doc.id,
            nombreTipoDeGasto: tipoDeGastoData.nombreTipoDeGasto,
            descripcionGasto: doc.data().descripcionGasto,
            precioGasto: doc.data().precioGasto,
            fechaGasto: doc.data().fechaGasto,
          };

          return gasto;
        });
        // Esperar a que se resuelvan todas las promesas y obtener los servicios completos
        const tiposDeGastosCompletos = await Promise.all(promises);

        // Actualizar la caché con los nuevos datos
        localStorage.setItem(
          "cachedServicios",
          JSON.stringify(tiposDeGastosCompletos)
        );

        setUltimoDoc(ultimoVisible);
        setPrimerDocVisible(primerVisible);
        setGastos(tiposDeGastosCompletos);
        setIsLoading(false);
      }
    } else {
      console.log("no existen mas datos");
    }
  };

  const getGastoById = async (id) => {
    const gastoDoc = doc(db, "gastos", id);
    const gastoEncontrado = await getDoc(gastoDoc);
    if (gastoEncontrado.exists()) {
      const gastoData = gastoEncontrado.data();

      const tipoDeGastoRef = gastoData.nombreTipoDeGasto;
      const tipoDeGastoSnapshot = await getDoc(tipoDeGastoRef);
      const tipoDeGatosData = tipoDeGastoSnapshot.data();

      return {
        id: gastoEncontrado.id,
        nombreTipoDeGasto: tipoDeGatosData.nombreTipoDeGasto,
        descripcionGasto: gastoData.descripcionGasto,
        precioGasto: gastoData.precioGasto,
      };
    } else {
      return null;
    }
  };

  const updateGasto = async (id, gastoActualizado) => {
    try {
      if (gastoActualizado.nombreTipoDeGasto) {
        const gastoRef = doc(db, gastoActualizado.nombreTipoDeGasto);
        gastoActualizado.nombreTipoDeGasto = gastoRef;
      }

      const gastoDoc = doc(db, "gastos", id);
      await updateDoc(gastoDoc, gastoActualizado);
      getGastos();
    } catch (error) {
      console.log(error);
    }
  };

  const addGasto = async (nuevoGasto) => {
    try {
      console.log(nuevoGasto);
      const gastoRef = doc(db, nuevoGasto.nombreTipoDeGasto);

      // Crear el objeto de servicio con las referencias
      const gasto = {
        nombreTipoDeGasto: gastoRef,
        descripcionGasto: nuevoGasto.descripcionGasto,
        precioGasto: nuevoGasto.precioGasto,
        fechaGasto: nuevoGasto.fechaGasto,
      };

      await addDoc(gastosCollection, gasto);
      console.log(gasto);
      getGastos();
    } catch (error) {
      console.log(error);
    }
  };

  const deleteGasto = async (id) => {
    const gastosDoc = doc(db, "gastos", id);
    await deleteDoc(gastosDoc);
    getGastos();
  };

  useEffect(() => {
    getGastos();
  }, []);

  return {
    gastos,
    isLoadingGasto,
    addGasto,
    deleteGasto,
    getGastoById,
    updateGasto,
    paginaAnterior,
    paginaSiguiente,
    getGastos,
    getGastosPorRangoDeFecha,
    gastosRangoFecha,
  };
};

export default useGastosLogic;
