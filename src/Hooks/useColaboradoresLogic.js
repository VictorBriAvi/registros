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
import moment from "moment";

const useColaboradoresLogic = () => {
  const [colaboradores, setColaboradores] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const colaboradoresCollection = collection(db, "colaboradores");
  const getColaboradores = useCallback(async () => {
    setIsLoading(true);
    const data = await getDocs(colaboradoresCollection);
    const colaboradoresData = data.docs.map((doc) => {
      const colaborador = doc.data();
      let fechaNacimiento;

      if (colaborador.fechaNacimiento instanceof Date) {
        fechaNacimiento = colaborador.fechaNacimiento;
      } else {
        fechaNacimiento = new Date(colaborador.fechaNacimiento);
      }
      const fechaNacimientoFormatted =
        moment(fechaNacimiento).format("YYYY-MM-DD");

      return {
        ...colaborador,
        id: doc.id,
        fechaNacimiento: fechaNacimientoFormatted,
      };
    });
    setColaboradores(colaboradoresData);
    setIsLoading(false);
  }, [colaboradoresCollection]);

  const getColaboradorById = async (id) => {
    const colaboradorDoc = doc(db, "colaboradores", id);
    const colaboradorEncontrado = await getDoc(colaboradorDoc);
    if (colaboradorEncontrado.exists()) {
      return { id: colaboradorEncontrado.id, ...colaboradorEncontrado.data() };
    } else {
      return null;
    }
  };

  const addColaborador = async (nuevoColaborador) => {
    try {
      const { fechaNacimiento, ...restosDatos } = nuevoColaborador;
      const fechaNacimientoMoment = moment(fechaNacimiento, "YYYY-MM-DD");

      const fechaNacimientoFormateada =
        fechaNacimientoMoment.format(fechaNacimiento);

      const colaborador = {
        ...restosDatos,
        fechaNacimiento: fechaNacimientoFormateada,
      };
      console.log(colaborador);
      await addDoc(colaboradoresCollection, colaborador);
      getColaboradores();
    } catch (error) {
      console.log(error);
    }
  };

  const updateColaborador = async (id, colaboradorActualizado) => {
    try {
      const colaboradorDoc = doc(db, "colaboradores", id);
      await updateDoc(colaboradorDoc, colaboradorActualizado);
      getColaboradores();
    } catch (error) {
      console.log(error);
    }
  };

  const deleteColaborador = async (id) => {
    const productoDoc = doc(db, "colaboradores", id);
    await deleteDoc(productoDoc);
    getColaboradores();
  };

  useEffect(() => {
    getColaboradores();
  }, []);

  return {
    colaboradores,
    isLoading,
    addColaborador,
    getColaboradorById,
    updateColaborador,
    deleteColaborador,
  };
};

export default useColaboradoresLogic;
