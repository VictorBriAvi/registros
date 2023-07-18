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

const useClienteLogic = () => {
  const [clientes, setClientes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const clientesCollection = collection(db, "clientes");
  const getClientes = useCallback(async () => {
    setIsLoading(true);
    const data = await getDocs(clientesCollection);
    const clientesData = data.docs.map((doc) => {
      const cliente = doc.data();
      let fechaNacimiento;

      if (cliente.fechaNacimiento instanceof Date) {
        fechaNacimiento = cliente.fechaNacimiento;
      } else {
        fechaNacimiento = new Date(cliente.fechaNacimiento);
      }
      const fechaNacimientoFormatted =
        moment(fechaNacimiento).format("YYYY-MM-DD");

      return {
        ...cliente,
        id: doc.id,
        fechaNacimiento: fechaNacimientoFormatted,
      };
    });
    setClientes(clientesData);
    setIsLoading(false);
  }, [clientesCollection]);

  const addCliente = async (nuevoCliente) => {
    try {
      const { fechaNacimiento, ...restosDatos } = nuevoCliente;
      const fechaNacimientoMoment = moment(fechaNacimiento, "YYYY-MM-DD");

      const fechaNacimientoFormateada =
        fechaNacimientoMoment.format(fechaNacimiento);

      const cliente = {
        ...restosDatos,
        fechaNacimiento: fechaNacimientoFormateada,
      };
      cliente;
      await addDoc(clientesCollection, cliente);
      getClientes();
    } catch (error) {
      console.log(error);
    }
  };
  const getClienteById = async (id) => {
    const clienteDoc = doc(db, "clientes", id);
    const clienteEncontrado = await getDoc(clienteDoc);
    if (clienteEncontrado.exists()) {
      return { id: clienteEncontrado.id, ...clienteEncontrado.data() };
    } else {
      return null;
    }
  };

  const updateCliente = async (id, clienteActualizado) => {
    try {
      const clienteDoc = doc(db, "clientes", id);
      await updateDoc(clienteDoc, clienteActualizado);
      getClientes();
    } catch (error) {
      console.log(error);
    }
  };

  const deleteCliente = async (id) => {
    const clienteDoc = doc(db, "clientes", id);
    await deleteDoc(clienteDoc);
    getClientes();
  };

  useEffect(() => {
    getClientes();
  }, []);

  return {
    clientes,
    isLoading,
    addCliente,
    getClienteById,
    updateCliente,
    deleteCliente,
  };
};

export default useClienteLogic;
