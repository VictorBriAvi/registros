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

const useTiposDeServiciosLogic = () => {
  const [tiposServicios, setTiposServicios] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const tiposServiciosCollection = collection(db, "tiposDeServicios");

  const getTiposDeServicios = useCallback(async () => {
    setIsLoading(true);
    const data = await getDocs(tiposServiciosCollection);
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
  };
};

export default useTiposDeServiciosLogic;
