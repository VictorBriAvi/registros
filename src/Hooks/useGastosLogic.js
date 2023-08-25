import { useState, useEffect } from "react";
import {
  getDocs,
  collection,
  getDoc,
  addDoc,
  doc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import { db } from "../firebaseConfig/firebase";

const useGastosLogic = () => {
  const [gastos, setGastos] = useState([]);
  const [isLoadingGasto, setIsLoading] = useState(true);

  const gastosCollection = collection(db, "gastos");

  const getGastos = async () => {
    setIsLoading(true);
    const data = await getDocs(gastosCollection);
    const gastosData = [];

    for (const doc of data.docs) {
      const gastoData = doc.data();
      // Obtener el nombre del tipo de gasto utilizando referencia

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
      gastosData.push(gasto);
    }

    const gastosOrdenados = gastosData.sort((a, b) => a.id.localeCompare(b.id));
    setGastos(gastosOrdenados);
    setIsLoading(false);
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
  };
};

export default useGastosLogic;
