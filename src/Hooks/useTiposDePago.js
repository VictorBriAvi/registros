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

const useTiposDePagoLogic = () => {
  const [tiposDePago, setTiposDePago] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const tiposDePagoCollection = collection(db, "tiposDePago");

  const getTiposDePago = useCallback(async () => {
    setIsLoading(true);
    const data = await getDocs(tiposDePagoCollection);
    const tipoPagoData = data.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));
    const tipoDePagoOrdenados = tipoPagoData.sort((a, b) =>
      a.id.localeCompare(b.id)
    );
    setTiposDePago(tipoDePagoOrdenados);
    setIsLoading(false);
  }, [tiposDePagoCollection]);

  const addTipoDePago = async (nuevoTipoDePago) => {
    try {
      await addDoc(tiposDePagoCollection, nuevoTipoDePago);
      getTiposDePago();
    } catch (error) {
      console.log(error);
    }
  };
  const getTipoDePagoById = async (id) => {
    const tipoDePagoDoc = doc(db, "tiposDePago", id);
    const tipoDePagoEncontrado = await getDoc(tipoDePagoDoc);
    if (tipoDePagoEncontrado.exists()) {
      return {
        id: tipoDePagoEncontrado.id,
        ...tipoDePagoEncontrado.data(),
      };
    } else {
      return null;
    }
  };

  const updateTipoDePago = async (id, tipoDePagoActualizado) => {
    try {
      const tipoDePagoDoc = doc(db, "tiposDePago", id);
      await updateDoc(tipoDePagoDoc, tipoDePagoActualizado);
      getTiposDePago();
    } catch (error) {
      console.log(error);
    }
  };

  const deleteTipoDePago = async (id) => {
    const tipoDePagoDoc = doc(db, "tiposDePago", id);
    await deleteDoc(tipoDePagoDoc);
    getTiposDePago();
  };

  useEffect(() => {
    getTiposDePago();
  }, []);

  return {
    tiposDePago,
    isLoading,
    addTipoDePago,
    getTipoDePagoById,
    updateTipoDePago,
    deleteTipoDePago,
  };
};

export default useTiposDePagoLogic;
