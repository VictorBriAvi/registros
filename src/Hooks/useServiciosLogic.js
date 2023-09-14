import { useState, useEffect } from "react";
import {
  getDocs,
  collection,
  getDoc,
  addDoc,
  doc,
  updateDoc,
  deleteDoc,
  orderBy,
  limit,
  query,
  startAfter,
  endBefore,
} from "firebase/firestore";
import { db } from "../firebaseConfig/firebase";
import moment from "moment";

const useServicioLogic = () => {
  const [servicios, setServicios] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [ultimoDoc, setUltimoDoc] = useState(null);
  const [primerDocVisible, setPrimerDocVisible] = useState([0]);

  const serviciosColletion = collection(db, "servicios");

  const getServicios = async () => {
    const serviciosDataArray = [];
    const primeraConsulta = query(
      collection(db, "servicios"),
      orderBy("nombreCompletoCliente"),
      limit(4)
    );

    const documentSnapshots = await getDocs(primeraConsulta);

    const ultimoVisible =
      documentSnapshots.docs[documentSnapshots.docs.length - 1];

    const primerVisible = documentSnapshots.docs[0];

    for (const doc of documentSnapshots.docs) {
      const servicioData = doc.data();

      // Obtener el nombre del colaborador utilizando la referencia
      const colaboradorRef = servicioData.nombreCompletoEmpleado;
      const colaboradorSnapshot = await getDoc(colaboradorRef);
      const colaboradorData = colaboradorSnapshot.data();

      // Obtener el nombre del cliente utilizando la referencia
      const clienteRef = servicioData.nombreCompletoCliente;
      const clienteSnapshot = await getDoc(clienteRef);
      const clienteData = clienteSnapshot.data();

      // Obtener el nombre del tipo de pago utilizando la referencia
      const tipoDePagoRef = servicioData.nombreTipoDePago;
      const tipoDePagoSnapshot = await getDoc(tipoDePagoRef);
      const tipoDePagoData = tipoDePagoSnapshot.data();

      // Obtener el nombre del tipo de servicio utilizando la referencia
      const tipoDeServicioRef = servicioData.nombreServicio;
      const tipoDeServicioSnapshot = await getDoc(tipoDeServicioRef);
      const tipoDeServicioData = tipoDeServicioSnapshot.data();

      // Agregar el nombre del colaborador al objeto del servicio
      const servicio = {
        ...servicioData,
        id: doc.id,
        nombreCompletoEmpleado: colaboradorData.nombreCompletoEmpleado, // Nombre del colaborador
        nombreCompletoCliente: clienteData.nombreCompletoCliente,
        nombreServicio: tipoDeServicioData.nombreServicio,
        nombreTipoDePago: tipoDePagoData.nombreTipoDePago,
        precioProducto: doc.data().precioProducto,
      };

      serviciosDataArray.push(servicio);
    }
    setUltimoDoc(ultimoVisible);
    setPrimerDocVisible(primerVisible);
    setServicios(serviciosDataArray);
    setIsLoading(false);
  };

  const paginaSiguiente = async () => {
    const paginacionSiguiente = query(
      collection(db, "servicios"),
      orderBy("nombreCompletoCliente"),
      startAfter(ultimoDoc),
      limit(4)
    );

    const documentSnapshots = await getDocs(paginacionSiguiente);

    if (documentSnapshots.docs.length > 0) {
      const ultimoVisible =
        documentSnapshots.docs[documentSnapshots.docs.length - 1];

      const servicioData = documentSnapshots.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));

      setUltimoDoc(ultimoVisible);
      setServicios(servicioData);
    } else {
      console.log("no existen mas datos");
    }
  };

  const paginaAnterior = async () => {
    console.log(primerDocVisible);
    if (primerDocVisible) {
      const paginacionAnterior = query(
        collection(db, "servicios"),
        orderBy("nombreCompletoCliente"),
        endBefore(primerDocVisible),
        limit(4)
      );

      const documentSnapshots = await getDocs(paginacionAnterior);

      if (documentSnapshots.docs.length > 0) {
        const primerVisible = documentSnapshots.docs[0];
        const ultimoVisible =
          documentSnapshots.docs[documentSnapshots.docs.length - 1];

        const servicioData = documentSnapshots.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        setPrimerDocVisible(primerVisible);
        setUltimoDoc(ultimoVisible);
        setServicios(servicioData);
      }
    } else {
      console.log("no existen mas datos");
    }
  };

  const getServicioById = async (id) => {
    const servicioDoc = doc(db, "servicios", id);
    const servicioEncontrado = await getDoc(servicioDoc);
    if (servicioEncontrado.exists()) {
      const servicioData = servicioEncontrado.data();

      const clienteRef = servicioData.nombreCompletoCliente;
      const clienteSnapshot = await getDoc(clienteRef);
      const clienteData = clienteSnapshot.data();

      const colaboradorRef = servicioData.nombreCompletoEmpleado;
      const colaboradorSnapshot = await getDoc(colaboradorRef);
      const colaboradorData = colaboradorSnapshot.data();

      const servicioRef = servicioData.nombreServicio;
      const servicioSnapshot = await getDoc(servicioRef);
      const tipoDeServicioData = servicioSnapshot.data();

      const tipoDePagoRef = servicioData.nombreTipoDePago;
      const tipoDePagoSnapshot = await getDoc(tipoDePagoRef);
      const tipoDeDatoData = tipoDePagoSnapshot.data();

      return {
        id: servicioEncontrado.id,
        nombreCompletoCliente: clienteData.nombreCompletoCliente,
        nombreCompletoEmpleado: colaboradorData.nombreCompletoEmpleado,
        nombreServicio: tipoDeServicioData.nombreServicio,
        nombreTipoDepago: tipoDeDatoData.nombreTipoDePago,
        precioProducto: servicioData.precioProducto,
      };
    } else {
      return null;
    }
  };

  const addServicio = async (nuevoServicio) => {
    try {
      console.log(nuevoServicio);

      // Obtener las referencias de los documentos utilizando los ID proporcionados en nuevoServicio
      const clienteRef = doc(db, nuevoServicio.nombreCompletoCliente);
      const colaboradorRef = doc(db, nuevoServicio.nombreCompletoEmpleado);
      const tipoDeServicioRef = doc(db, nuevoServicio.nombreServicio);
      const tipoDePagoRef = doc(db, nuevoServicio.nombreTipoDePago);

      // Generar y formatear la fecha actual con moment
      const fechaActual = moment().format("YYYY-MM-DD");

      // Crear el objeto de servicio con las referencias
      const servicio = {
        nombreCompletoCliente: clienteRef,
        nombreCompletoEmpleado: colaboradorRef,
        nombreServicio: tipoDeServicioRef,
        nombreTipoDePago: tipoDePagoRef,
        fechaServicio: fechaActual,
        precioProducto: nuevoServicio.precioProducto,
      };

      // Agregar el nuevo servicio a Firestore
      await addDoc(serviciosColletion, servicio);
      console.log(servicio);

      // Volver a cargar los servicios actualizados
      getServicios();
    } catch (error) {
      console.log(error);
    }
  };

  const updateServicio = async (id, servicioActualizado) => {
    try {
      if (servicioActualizado.nombreTipoDePago) {
        const tipoDePagoRef = doc(db, servicioActualizado.nombreTipoDePago);
        servicioActualizado.nombreTipoDePago = tipoDePagoRef;
      }
      if (servicioActualizado.nombreCompletoEmpleado) {
        const empleadoRef = doc(db, servicioActualizado.nombreCompletoEmpleado);
        servicioActualizado.nombreCompletoEmpleado = empleadoRef;
      }
      if (servicioActualizado.nombreCompletoCliente) {
        const clienteRef = doc(db, servicioActualizado.nombreCompletoCliente);
        servicioActualizado.nombreCompletoCliente = clienteRef;
      }
      if (servicioActualizado.nombreServicio) {
        const servicioRef = doc(db, servicioActualizado.nombreServicio);
        servicioActualizado.nombreServicio = servicioRef;
      }

      const servicioDoc = doc(db, "servicios", id);
      console.log(servicioDoc);
      await updateDoc(servicioDoc, servicioActualizado);
      getServicios();
    } catch (error) {
      console.log(error);
    }
  };

  const deleteServicio = async (id) => {
    const servicioDoc = doc(db, "servicios", id);
    await deleteDoc(servicioDoc);
    getServicios();
  };

  useEffect(() => {
    getServicios();
  }, []);

  return {
    servicios,
    isLoading,
    addServicio,
    getServicioById,
    updateServicio,
    deleteServicio,
    paginaSiguiente,
    paginaAnterior,
  };
};

export default useServicioLogic;
