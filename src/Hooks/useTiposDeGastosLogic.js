import { useState, useEffect, useCallback } from "react";
import {
  getDocs,
  collection,
  addDoc,
  doc,
  getDoc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import { db } from "../firebaseConfig/firebase";

const useTiposDeGastosLogic = () => {
  const [tiposDeGastos, setTiposDeGastos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const tiposDeGastosCollection = collection(db, "tiposDeGastos");

  const getTiposDeGasto = useCallback(async () => {
    setIsLoading(true);
    const data = await getDocs(tiposDeGastosCollection);
    const tipoDeGastoData = data.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));
    const tipoDeGastosOrdenados = tipoDeGastoData.sort((a, b) =>
      a.id.localeCompare(b.id)
    );
    setTiposDeGastos(tipoDeGastosOrdenados);
    setIsLoading(false);
  }, [tiposDeGastosCollection]);

  const addTipoDeGasto = async (nuevoTipoDeGasto) => {
    try {
      await addDoc(tiposDeGastosCollection, nuevoTipoDeGasto);
      getTiposDeGasto();
    } catch (error) {
      console.log(error);
    }
  };
  const getTipoDeGastoById = async (id) => {
    const tipoDeGastoDoc = doc(db, "tiposDeGastos", id);
    const tipoDeGastoEncontrado = await getDoc(tipoDeGastoDoc);
    if (tipoDeGastoEncontrado.exists()) {
      return {
        id: tipoDeGastoEncontrado.id,
        ...tipoDeGastoEncontrado.data(),
      };
    } else {
      return null;
    }
  };

  const updateTipoDeGasto = async (id, tipoDeGastoActualizado) => {
    try {
      const tipoDePagoDoc = doc(db, "tiposDeGastos", id);
      await updateDoc(tipoDePagoDoc, tipoDeGastoActualizado);
      getTiposDeGasto();
    } catch (error) {
      console.log(error);
    }
  };

  const deleteTipoDeGasto = async (id) => {
    const tipoDeGastoDoc = doc(db, "tiposDeGastos", id);
    await deleteDoc(tipoDeGastoDoc);
    getTiposDeGasto();
  };

  useEffect(() => {
    getTiposDeGasto();
  }, []);

  return {
    tiposDeGastos,
    isLoading,
    addTipoDeGasto,
    getTipoDeGastoById,
    updateTipoDeGasto,
    deleteTipoDeGasto,
  };
};

export default useTiposDeGastosLogic;
