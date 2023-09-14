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
} from "firebase/firestore";
import { db } from "../firebaseConfig/firebase";

const useGastosLogic = () => {
  const [gastos, setGastos] = useState([]);
  const [isLoadingGasto, setIsLoading] = useState(true);

  const [ultimoDoc, setUltimoDoc] = useState(null);
  const [primerDocVisible, setPrimerDocVisible] = useState([0]);

  const gastosCollection = collection(db, "gastos");

  const getGastos = async () => {
    const gastosDataArreglo = [];
    const primeraConsulta = query(
      collection(db, "gastos"),
      orderBy("nombreTipoDeGasto"),
      limit(4)
    );

    const documentSnapshots = await getDocs(primeraConsulta);

    const ultimoVisible =
      documentSnapshots.docs[documentSnapshots.docs.length - 1];

    const primerVisible = documentSnapshots.docs[0];

    for (const doc of documentSnapshots.docs) {
      const gastoData = doc.data();

      const gastoRef = gastoData.nombreTipoDeGasto;
      const gastoSnapshot = await getDoc(gastoRef);
      const gastoDataRef = gastoSnapshot.data();

      const gasto = {
        ...gastoData,
        id: doc.id,
        nombreTipoDeGasto: gastoDataRef.nombreTipoDeGasto,
        descripcionGasto: doc.data().descripcionGasto,
        precioGasto: doc.data().precioGasto,
      };

      gastosDataArreglo.push(gasto);
    }
    setUltimoDoc(ultimoVisible);
    setPrimerDocVisible(primerVisible);
    setGastos(gastosDataArreglo);
    setIsLoading(false);
  };

  const paginaSiguiente = async () => {
    const paginacionSiguiente = query(
      collection(db, "gastos"),
      orderBy("nombreTipoDeGasto"),
      startAfter(ultimoDoc),
      limit(4)
    );

    const documentSnapshots = await getDocs(paginacionSiguiente);

    if (documentSnapshots.docs.length > 0) {
      const ultimoVisible =
        documentSnapshots.docs[documentSnapshots.docs.length - 1];

      const gastosData = documentSnapshots.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));

      setUltimoDoc(ultimoVisible);
      setGastos(gastosData);
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
        limit(4)
      );

      const documentSnapshots = await getDocs(paginacionAnterior);

      if (documentSnapshots.docs.length > 0) {
        const primerVisible = documentSnapshots.docs[0];
        const ultimoVisible =
          documentSnapshots.docs[documentSnapshots.docs.length - 1];

        const gastosData = documentSnapshots.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));

        setUltimoDoc(ultimoVisible);
        setPrimerDocVisible(primerVisible);
        setGastos(gastosData);
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
  };
};

export default useGastosLogic;
