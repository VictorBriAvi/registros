import { useState, useEffect } from "react";
import {
  getDocs,
  collection,
  deleteDoc,
  doc,
  addDoc,
  getDoc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../firebaseConfig/firebase";

const useProductoLogic = () => {
  const [productos, setProductos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const productosColletion = collection(db, "productos");

  const getProductos = async () => {
    setIsLoading(true);
    const data = await getDocs(productosColletion);
    const productoData = data.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));
    const productosOrdenados = productoData.sort((a, b) =>
      a.id.localeCompare(b.id)
    );
    setProductos(productosOrdenados);
    setIsLoading(false);
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
  };
};

export default useProductoLogic;
