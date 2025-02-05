import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loginUser } from "actions/authActions";
import classnames from "classnames";
import { Card, Button, Container, Row, Col, Form } from "react-bootstrap";

class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      errors: {},
    };
  }
  componentDidMount() {
    // If logged in and user navigates to Login page, should redirect them to dashboard
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push("/dashboard"); // push user to dashboard when they login
    }
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors,
      });
    }
  }
  onChange = (e) => {
    this.setState({ [e.target.id]: e.target.value });
  };
  onSubmit = (e) => {
    e.preventDefault();
    const userData = {
      email: this.state.email,
      password: this.state.password,
    };
    this.props.loginUser(userData); // since we handle the redirect within our component, we don't need to pass in this.props.history as a parameter
  };
  render() {
    const { errors } = this.state;
    return (
      <div>
        <Container>
          <Row>
            <Col md={6}>
              <Card as={Col} md={8} className="d-flex justify-content-center ">
                <Card.Body>
                  <Col md={12} className="text-center mb-4">
                    <a href="/#" className="mx-1">
                      <div className="logo">
                        <img
                          src={require("../../assets/img/finanzapp.png").default}
                          alt="..."
                          style={{ width: "80px", padding: "0" }}
                        />
                      </div>
                    </a>
                    <Card.Title as="h4" className="mb-4">
                      <b>Bienvenido a FinanzApp</b>
                    </Card.Title>
                    <spam className="card-category">
                      ----------- Inicio de sesion -----------
                    </spam>
                  </Col>
                  <Col md={12} className=" text-center mt-3">
                    <Form noValidate onSubmit={this.onSubmit}>
                      <Form.Group className="mb-3" controlId="formGroupEmail">
                        <Form.Control
                          onChange={this.onChange}
                          //value={this.state.email}
                          error={errors.email}
                          type="email"
                          placeholder="Usuario"
                          className={classnames("", {
                            invalid: errors.email || errors.emailnotfound,
                          })}
                          required
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.email}
                          {errors.emailnotfound}
                        </Form.Control.Feedback>
                      </Form.Group>

                      <Form.Group className="mb-3" controlId="formGroupPassword">
                        <Form.Control type="password" placeholder="Contraseña" />
                        <Form.Control.Feedback type="invalid">
                          Por favor, proporcione una contraseña
                        </Form.Control.Feedback>
                      </Form.Group>

                      <Button
                        type="submit"
                        className="m-4 btn-fill text-center"
                        variant="info"
                        style={{ borderRadius: "20px" }}>
                        Entrar
                      </Button>
                      <p className="text-muted card-category">
                        Tienes una cuenta? <Link to="/register">Registrate ahora</Link>
                      </p>
                    </Form>
                  </Col>
                </Card.Body>
              </Card>
            </Col>

            <Col md={6}></Col>
          </Row>
        </Container>
      </div>
    );
  }
}
Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
});
export default connect(mapStateToProps, { loginUser })(Login);
