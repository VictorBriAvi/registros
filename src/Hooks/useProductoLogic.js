import { useState, useEffect } from "react";
import {
  getDocs,
  collection,
  deleteDoc,
  doc,
  addDoc,
  getDoc,
  updateDoc,
  query,
  orderBy,
  limit,
  startAfter,
  endBefore,
} from "firebase/firestore";
import { db } from "../firebaseConfig/firebase";

const useProductoLogic = () => {
  const [productos, setProductos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [ultimoDoc, setUltimoDoc] = useState(null);
  const [primerDocVisible, setPrimerDocVisible] = useState([0]);

  const productosColletion = collection(db, "productos");

  const getProductos = async () => {
    /** ACA ESOTOY HACIENDO CONSULTA DE LA COLECCION tiposDeServicios (DATABASE) */

    const primeraConsulta = query(
      collection(db, "productos"),
      orderBy("nombreProducto"),
      limit(4)
    );
    const documentSnapshots = await getDocs(primeraConsulta);

    const ultimoVisible =
      documentSnapshots.docs[documentSnapshots.docs.length - 1];

    const primerVisible = documentSnapshots.docs[0];

    const productosData = documentSnapshots.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));

    setUltimoDoc(ultimoVisible);
    setPrimerDocVisible(primerVisible);
    setProductos(productosData);
    setIsLoading(false);
  };

  /** paginaSiguiente : Esta funcion cuando le dan al boton Siguiente y avanzo a los 4 valores siguientes */

  const paginaSiguiente = async () => {
    const paginacionSiguiente = query(
      collection(db, "productos"),
      orderBy("nombreProducto"),
      startAfter(ultimoDoc),
      limit(4)
    );

    const documentSnapshots = await getDocs(paginacionSiguiente);

    if (documentSnapshots.docs.length > 0) {
      const ultimoVisible =
        documentSnapshots.docs[documentSnapshots.docs.length - 1];

      const productosData = documentSnapshots.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));

      setUltimoDoc(ultimoVisible);
      setProductos(productosData);
    } else {
      console.log("no existen mas datos");
    }
  };

  /** paginaAnterior : Esta funcion cuando le dan al boton Anterior retorna a los 4 valores anteriores */

  const paginaAnterior = async () => {
    console.log(primerDocVisible);
    if (primerDocVisible) {
      const paginacionAnterior = query(
        collection(db, "productos"),
        orderBy("nombreProducto"),
        endBefore(primerDocVisible),
        limit(4)
      );

      const documentSnapshots = await getDocs(paginacionAnterior);

      if (documentSnapshots.docs.length > 0) {
        const primerVisible = documentSnapshots.docs[0];
        const ultimoVisible =
          documentSnapshots.docs[documentSnapshots.docs.length - 1];

        const productosData = documentSnapshots.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));

        setUltimoDoc(ultimoVisible);
        setPrimerDocVisible(primerVisible);
        setProductos(productosData);
      }
    } else {
      console.log("no existen mas datos");
    }
  };

  const getProductoById = async (id) => {
    const productoDoc = doc(db, "productos", id);
    const productoEncontrado = await getDoc(productoDoc);
    if (productoEncontrado.exists()) {
      return { id: productoEncontrado.id, ...productoEncontrado.data() };
    } else {
      return null;
    }
  };

  const addProducto = async (nuevoProducto) => {
    try {
      await addDoc(productosColletion, nuevoProducto);
      getProductos();
    } catch (error) {
      console.log(error);
    }
  };

  const updateProducto = async (id, productoActualizado) => {
    try {
      const productoDoc = doc(db, "productos", id);
      await updateDoc(productoDoc, productoActualizado);
      getProductos();
    } catch (error) {
      console.log(error);
    }
  };

  const deleteProducto = async (id) => {
    const productoDoc = doc(db, "productos", id);
    await deleteDoc(productoDoc);
    getProductos();
  };

  useEffect(() => {
    getProductos();
  }, []);

  return {
    productos,
    deleteProducto,
    isLoading,
    addProducto,
    getProductoById,
    updateProducto,
    paginaSiguiente,
    paginaAnterior,
  };
};

export default useProductoLogic;
