import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "./components/context/authContext";
import { Button, Card, Container, Form } from "react-bootstrap";
import { FcGoogle } from "react-icons/fc";
import { AlertaInputs } from "./Alert/Aler";

const Login = () => {
  const navigate = useNavigate();
  const [error, setError] = useState();
  const { login, loginWithGoogle } = useAuth();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const handleChange = ({ target: { name, value } }) => {
    setUser({ ...user, [name]: value });
  };

  const handleGoogleSignIn = async () => {
    try {
      await loginWithGoogle();
      navigate("/registros/");
    } catch (error) {
      console.log(error);
    }
  };

  console.log(error);

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log(user);

    try {
      console.log("estamos en el try");
      await login(user.email, user.password);
      navigate("/registros/");
      console.log("arriba del navigate");
    } catch (error) {
      setError("hola");
    }
  };

  return (
    <Container
      fluid
      className=" d-flex justify-content-center align-items-center vh-100 w-75  "
    >
      <h1>{error}</h1>
      <Container className=" py-5 ">
        <h2 className="my-4  text-center">Iniciar sesion</h2>
        {error && <AlertaInputs message={error} />}
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
          <div className="d-flex justify-content-between text-center my-3">
            <p className="text-center ">
              No tienes cuenta ?
              <Link to="/registros/registrar">Registrate</Link>
            </p>

            <p>
              Se te olvido la contraseña ?
              <Link to={"/registros/reset-password"}>Recuperala</Link>
            </p>
          </div>
        </Form>

        <Button
          onClick={handleGoogleSignIn}
          variant="outline-dark"
          className="w-100 "
        >
          <FcGoogle className="h5 mx-1" />
          <strong> Iniciar sesion</strong>
        </Button>
      </Container>
    </Container>
  );
};

export default Login;
