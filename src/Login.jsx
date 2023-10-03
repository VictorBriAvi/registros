import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "./components/context/authContext";
import { Button, Card, Container, Form } from "react-bootstrap";
import { FcGoogle } from "react-icons/fc";

const Login = () => {
  const navigate = useNavigate();
  const [error, setError] = useState();
  const { login } = useAuth();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const handleChange = ({ target: { name, value } }) => {
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log(user);

    try {
      console.log("estamos en el try");
      await login(user.email, user.password);
      navigate("/registros/");
      console.log("arriba del navigate");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container
      fluid
      className=" d-flex justify-content-center align-items-center vh-100 w-50 bg-light"
    >
      <Container className=" py-5 ">
        <h2 className="my-4  text-center">Iniciar sesion</h2>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label htmlFor="email">Correo Electronico</Form.Label>
            <Form.Control
              type="email"
              name="email"
              placeholder="ejemplo@gmail.com"
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label htmlFor="password">Password</Form.Label>
            <Form.Control
              type="password"
              name="password"
              id="password"
              placeholder="*******"
              onChange={handleChange}
            />
          </Form.Group>

          <Button variant="primary" type="submit" className="w-100">
            Login
          </Button>
        </Form>
        <p className="text-center mt-3">
          No tienes cuenta ? <Link to="/registros/registrar">Registrate</Link>
        </p>

        <Button variant="outline-dark" className="w-100 ">
          <FcGoogle className="h5 mx-1" />
          <strong> Iniciar sesion</strong>
        </Button>
      </Container>
    </Container>
  );
};

export default Login;
