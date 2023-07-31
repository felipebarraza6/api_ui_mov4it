import React, { useState, useContext } from "react";
import wallpaper1 from "../assets/images/wallpaper1.jpg";
import astro from "../assets/images/astronauta.png";
import logo from "../assets/images/logo.png";

import logo1 from "../assets/images/logos/logos_emp-04.png";
import logo2 from "../assets/images/logos/logos_emp-0223.png";
import logo3 from "../assets/images/logos/logos_emp-03.png";
import logo4 from "../assets/images/logos/logo-cidere.png";
import logo5 from "../assets/images/logos/logo-cowork-chillan.png";
import logo6 from "../assets/images/logos/LogoMentorINN_Circulo-al-lado_full-color.png";
import logo7 from "../assets/images/logos/cdn-logo-2020.png";
import logo8 from "../assets/images/logos/LogoDADNEO.png";
import { login, signUp } from "../actions/loginSignUp";

import { AppContext } from "../App";
import {
  LeftOutlined,
  RocketOutlined,
  RightOutlined,
  UpOutlined,
  FacebookOutlined,
  InstagramOutlined,
  LoadingOutlined,
} from "@ant-design/icons";
import {
  Layout,
  Row,
  Col,
  Statistic,
  Form,
  Input,
  Button,
  Typography,
  Collapse,
  Modal,
  Checkbox,
  theme,
  notification,
  Card,
  Spin,
} from "antd";
import {
  BrowserRouter,
  Routes,
  Route,
  useParams,
  useNavigate,
} from "react-router-dom";

import { validate } from "rut.js";
import api from "../api/endpoints";

const { Header, Footer, Content } = Layout;
const { Title, Paragraph } = Typography;
const { useToken } = theme;
const { Panel } = Collapse;

export const ElementResetPassword = () => {
  const params = useParams();
  const navigate = useNavigate();
  const resetPassword = async (data) => {
    if (data.password === data.passwordc) {
      data = {
        token: params.token,
        password: data.password,
      };
      const rq = api.authentication
        .recovery_password(data)
        .then((r) => {
          notification.success({ message: "CONTRASEÑA REESTABLECIDA" });
          navigate("/");
        })
        .catch((err) => {
          if (err.response.data) {
            Object.keys(err.response.data).map((key) => {
              let field = key;
              let message = err.response.data[key];

              notification.error({
                message: `${field.toUpperCase()}: ${message}`,
              });
            });
          }
        });
    } else {
      notification.error({ message: "LAS CONTRASEÑAS NO COINCIDEN!" });
    }
  };
  return (
    <Row justify={"center"} align="middle" style={{ height: "76vh" }}>
      <Col
        span={24}
        style={{ marginBottom: window.innerWidth < 900 ? "-100px" : "-200px" }}
      >
        <Title style={{ textAlign: "center" }}>Reestablece tu contraseña</Title>
        <Title style={{ textAlign: "center" }} level={3}>
          {params.email}
        </Title>
        <Paragraph style={{ textAlign: "center" }}>
          La nueva contraseña ingresada es la que deberas utilizar en tu
          siguiente inicio de sesión...
        </Paragraph>
      </Col>
      <Col xl={6} xs={20}>
        <Form onFinish={resetPassword}>
          <Form.Item
            name="password"
            rules={[{ required: true, message: "Ingresa tu nueva contraseña" }]}
          >
            <Input type="password" placeholder="Ingresa tu nueva contraseña" />
          </Form.Item>
          <Form.Item
            name="passwordc"
            rules={[{ required: true, message: "Repite tu contraseña" }]}
          >
            <Input type="password" placeholder="Confirma tu nueva contraseña" />
          </Form.Item>
          <Form.Item>
            <center>
              <Button
                style={{ margin: "5px" }}
                htmlType="submit"
                type="primary"
              >
                ACTUALIZAR CONTRASEÑA
              </Button>

              <Button
                style={{ margin: "5px" }}
                type="primary"
                onClick={() => navigate("/")}
              >
                Volver al inicio
              </Button>
            </center>
          </Form.Item>
        </Form>
      </Col>
    </Row>
  );
};

const Login = () => {
  const { token } = useToken();

  const { dispatch } = useContext(AppContext);

  const [info, setInfo] = useState(0);

  const [visibleMAbout, setVisibleMAbout] = useState(false);
  const [visible, setVisible] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const [IsPassport, setIsPassport] = useState(false);

  const Element = () => {
    const [recoveryMail, setRecoveryMail] = useState(null);
    const [open, setOpen] = useState(false);
    const [loadingMail, setLoadingMail] = useState(false);
    return (
      <>
        <Row justify="space-around" align="middle" style={styles.content}>
          <Col xs={24} sm={24} md={12} lg={8} xl={8}>
            <Form
              layout="vertical"
              onFinish={(values) =>
                isSignUp
                  ? signUp(values, dispatch, "STU")
                  : login(values, dispatch)
              }
            >
              <Title
                style={styles.title}
                level={window.innerWidth > 900 ? 1 : 3}
              >
                EMPRENDE EL VIAJE
              </Title>
              {!isSignUp ? (
                <>
                  <Form.Item
                    name="email"
                    rules={[
                      {
                        type: "email",
                        required: true,
                        message: "Ingresa tu email",
                      },
                    ]}
                  >
                    <Input style={{ color: "black" }} placeholder="Email" />
                  </Form.Item>

                  <Form.Item
                    name="password"
                    rules={[
                      { required: true, message: "Ingresa tu contraseña" },
                      {
                        min: 8,
                        message:
                          "Este campo debe tener al menos 8 caracteres...",
                      },
                    ]}
                  >
                    <Input type="password" placeholder="Contraseña" />
                  </Form.Item>
                  <Modal
                    title="RESTABLECER CONTRASEÑA"
                    cancelText={""}
                    onCancel={() => setOpen(false)}
                    open={open}
                    okText="ENVIAR CORREO"
                    onOk={async () => {
                      setLoadingMail(true);
                      const rq = await api.authentication
                        .request_recovery(recoveryMail)
                        .then((r) => {
                          notification.success({
                            message:
                              "SE HA ENVIADO UN CORREO A SU BANDEJA DE ENTRADA PARA REESTABLECER SU CONTRASEÑA",
                          });
                          setOpen(false);
                          setLoadingMail(false);
                        })
                        .catch((err) => {
                          if (err.response.data) {
                            setLoadingMail(false);
                            Object.keys(err.response.data).map((key) => {
                              let field = key;
                              let message = err.response.data[key];
                              if (
                                message ==
                                "We couldn't find an account associated with that email. Please try a different e-mail address."
                              ) {
                                message =
                                  "No pudimos encontrar una cuenta asociada con ese correo electrónico. Intente con otra dirección de correo electrónico.";
                              }

                              notification.error({
                                message: `${field.toUpperCase()}: ${message}`,
                              });
                            });
                          }
                        });
                    }}
                  >
                    {loadingMail ? (
                      <Paragraph
                        style={{
                          textAlign: loadingMail ? "center" : "left",
                          marginLeft: "3px",
                          marginTop: "20px",
                        }}
                      >
                        Enviando correo... <Spin />
                      </Paragraph>
                    ) : (
                      <></>
                    )}
                    <Paragraph
                      style={{ marginTop: loadingMail ? "20px" : "0px" }}
                    >
                      Ingresa un correo electronico valido.
                    </Paragraph>
                    <Input
                      type="email"
                      style={{ marginTop: "0px" }}
                      onChange={(e) => setRecoveryMail(e.target.value)}
                      placeholder="Ingresa tu correo electronico"
                    />
                  </Modal>
                  <Button
                    onClick={() => {
                      setOpen(true);
                    }}
                    type="link"
                    style={{ color: "white", marginLeft: "-10px" }}
                  >
                    ¿Olvidaste tu contraseña?
                  </Button>
                </>
              ) : (
                <Row>
                  <Col span={12}>
                    <Form.Item
                      rules={[
                        {
                          required: true,
                          message: "Ingresa tu Nombre",
                        },
                        {
                          min: 3,
                          message: "Debes ingresa 3 caracteres como  minimo...",
                        },
                      ]}
                      name="first_name"
                      style={styles.formInput}
                    >
                      <Input placeholder="Nombre" />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item
                      name="last_name"
                      rules={[
                        {
                          required: true,
                          message: "Ingresa tu Apellido",
                        },
                        {
                          min: 3,
                          message: "Debes ingresa 3 caracteres como  minimo...",
                        },
                      ]}
                    >
                      <Input placeholder="Apellido" />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item
                      name="phone_number"
                      rules={[
                        {
                          required: true,
                          message: "Ingresa tu Teléfono",
                        },
                        {
                          min: 8,
                          message:
                            "Ingresa 8 caracteres como minimo ej:(33933393)",
                        },
                      ]}
                      style={styles.formInput}
                    >
                      <Input prefix="+56 9" placeholder="Teléfono" />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item
                      rules={[
                        {
                          type: "email",
                          required: true,
                          message: "Ingresa tu Email",
                        },
                      ]}
                      name="email"
                    >
                      <Input placeholder="Email" />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item
                      name="identification_number"
                      rules={[
                        {
                          required: true,
                          message:
                            "Ingresa tu identificacion sin puntos ni guión",
                        },
                      ]}
                      style={styles.formInput}
                    >
                      <Input
                        onBlur={(e) => {
                          if (
                            e.target.value.length > 7 &&
                            IsPassport === false
                          ) {
                            if (validate(e.target.value)) {
                              notification.success({ message: "Rut correcto" });
                            } else {
                              notification.error({ message: "Rut incorrecto" });
                            }
                          }
                        }}
                        placeholder={IsPassport ? "Número de pasaporte" : "Rut"}
                      />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Checkbox
                      checked={IsPassport}
                      style={{
                        color: "white",
                        marginTop: "-0px",
                        marginBottom: "10px",
                        marginLeft: "3px",
                      }}
                      onChange={(e) => setIsPassport(e.target.checked)}
                    >
                      ¿Utilizaras pasaporte?
                    </Checkbox>

                  </Col>
                  <Col span={12}>
                    <Form.Item
                      name="password"
                      rules={[
                        {
                          required: true,
                          message: "Ingresa tu contraseña",
                        },
                        {
                          min: 8,
                          message:
                            "Asegurese de al menos ingresar 8 caracteres...",
                        },
                      ]}
                      style={styles.formInput}
                    >
                      <Input type="password" placeholder="Contraseña" />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item
                      rules={[
                        {
                          required: true,
                          message: "Ingresa tu confirmacion de contraseña...",
                        },
                        {
                          min: 8,
                          message:
                            "Asegurese de al menos ingresar 8 caracteres",
                        },
                      ]}
                      name="password_confirmation"
                    >
                      <Input type="password" placeholder="Repetir contraseña" />
                    </Form.Item>
                  </Col>
                </Row>
              )}
              <Form.Item>
                <Row justify="center">
                  <Col>
                    {!isSignUp ? (
                      <>
                        <Button
                          htmlType="submit"
                          type="primary"
                          style={styles.btnAccess}
                          size="large"
                          icon={<UpOutlined />}
                        >
                          Ingresar
                        </Button>
                        <Button
                          type="primary"
                          size="large"
                          onClick={() => setIsSignUp(true)}
                          icon={<RightOutlined />}
                        >
                          Registrarse Aquí
                        </Button>
                      </>
                    ) : (
                      <>
                        <Button
                          htmlType="submit"
                          type="primary"
                          style={styles.btnAccess}
                          size="large"
                          icon={<RocketOutlined />}
                        >
                          Crear
                        </Button>
                        <Button
                          type="primary"
                          style={styles.btnAccess}
                          size="large"
                          icon={<LeftOutlined />}
                          onClick={() => setIsSignUp(false)}
                        >
                          Volver
                        </Button>
                      </>
                    )}
                    <Paragraph style={styles.paragraph}>
                      Programa formativo y de entrenamiento en emprendimiento e
                      innovación, que ofrece becas a líderes de Startups, para
                      fortalecer los conocimientos de sus equipos y ampliar las
                      oportunidades de sus negocio en contacto con su propósito.
                    </Paragraph>
                  </Col>
                </Row>
              </Form.Item>
            </Form>
          </Col>
          <Col span={6}>
            {info === 0 && (
              <>
                {window.innerWidth > 900 && (
                  <img src={astro} alt="astro" width="420px" />
                )}
              </>
            )}
            {info === 1 && (
              <>
                <Paragraph style={styles.paragraphInfo}>
                  La plataforma Emprende el Viaje es un programa formativo
                  liderado por la Unidad de Apoyo a la Innovación UAINN de la
                  Dirección de Innovación de la Universidad Católica de la
                  Santísima Concepción que consiste en ofertar talleres en
                  formato asincrónico basados en la metodología del Viaje del
                  Emprendedor de Corfo desde la Etapa 0 a la 5 para todo público
                  que desee formarse en materias de emprendimiento e innovación
                  a lo largo del país. <br />
                  <br />
                  <Button
                    onClick={() => setInfo(0)}
                    type="ghost"
                    icon={<LeftOutlined />}
                    style={styles.btnBack}
                  >
                    Voler
                  </Button>
                </Paragraph>
              </>
            )}
            <Modal
              open={visibleMAbout}
              onCancel={() => setVisibleMAbout(false)}
              footer={[
                <Button type="primary" onClick={() => setVisibleMAbout(false)}>
                  Cerrar
                </Button>,
              ]}
            >
              <Paragraph>
                La plataforma Emprende el Viaje es un programa formativo
                liderado por la Unidad de Apoyo a la Innovación UAINN de la
                Dirección de Innovación de la Universidad Católica de la
                Santísima Concepción que consiste en ofertar talleres en formato
                asincrónico basados en la metodología del Viaje del Emprendedor
                de Corfo desde la Etapa 0 a la 5 para todo público que desee
                formarse en materias de emprendimiento e innovación a lo largo
                del país.
              </Paragraph>
            </Modal>
            <Modal
              open={visible}
              onCancel={() => setVisible(false)}
              footer={[
                <Button type="primary" onClick={() => setVisible(false)}>
                  Cerrar
                </Button>,
              ]}
            >
              <Collapse style={styles.collapse}>
                <Panel
                  key="1"
                  style={styles.collapse.panel}
                  header="¿Qué es el Viaje del Emprendedor?"
                >
                  <Paragraph style={styles.collapse.panel.paragraph}>
                    Es una metodología de capacitación y certificación para
                    emprendimientos dinámicos que maximiza la probabilidad de
                    éxito del proyecto a través de la relación con el
                    ecosistema. Para lograrlo, su foco está en mostrar las
                    mejores prácticas e hitos que deben desarrollar tanto el
                    equipo emprendedor, como el emprendimiento en sí.
                  </Paragraph>
                </Panel>
                <Panel
                  key="2"
                  style={styles.collapse.panel}
                  header="¿Qué es Emprende el Viaje?"
                >
                  <Paragraph style={styles.collapse.panel.paragraph}>
                    Emprende el Viaje es un espacio de aprendizaje y
                    acompañamiento digital mediante la ejecución de un programa
                    formativo liderado por la Dirección de Innovación de la
                    Universidad Católica de la Santísima Concepción que da
                    respuesta a los principales desafíos en materia de
                    emprendimiento e innovación a través de la formación y
                    capacitación a la comunidad mediante la metodología del
                    Viaje del Emprendedor.
                  </Paragraph>
                </Panel>
                <Panel
                  key="3"
                  style={styles.collapse.panel}
                  header="¿Cuántas plataformas son las que debo utilizar en este Viaje del Emprendedor?"
                >
                  <Paragraph style={styles.collapse.panel.paragraph}>
                    Emprende el Viaje es un espacio de aprendizaje y
                    acompañamiento digital mediante la ejecución de un programa
                    formativo liderado por la Dirección de Innovación de la
                    Universidad Católica de la Santísima Concepción que da
                    respuesta a los principales desafíos en materia de
                    emprendimiento e innovación a través de la formación y
                    capacitación a la comunidad mediante la metodología del
                    Viaje del Emprendedor.
                  </Paragraph>
                </Panel>
                <Panel
                  key="4"
                  style={styles.collapse.panel}
                  header="¿Cuántas plataformas son las que debo utilizar en este Viaje del Emprendedor?"
                >
                  <Paragraph style={styles.collapse.panel.paragraph}>
                    Emprende el Viaje es un espacio de aprendizaje y
                    acompañamiento digital mediante la ejecución de un programa
                    formativo liderado por la Dirección de Innovación de la
                    Universidad Católica de la Santísima Concepción que da
                    respuesta a los principales desafíos en materia de
                    emprendimiento e innovación a través de la formación y
                    capacitación a la comunidad mediante la metodología del
                    Viaje del Emprendedor.
                  </Paragraph>
                </Panel>
                <Panel
                  key="5"
                  style={styles.collapse.panel}
                  header="¿Qué es el Viaje del Emprendedor?"
                >
                  <Paragraph style={styles.collapse.panel.paragraph}>
                    Es una metodología de capacitación y certificación para
                    emprendimientos dinámicos que maximiza la probabilidad de
                    éxito del proyecto a través de la relación con el
                    ecosistema. Para lograrlo, su foco está en mostrar las
                    mejores prácticas e hitos que deben desarrollar tanto el
                    equipo emprendedor, como el emprendimiento en sí.
                  </Paragraph>
                </Panel>
                <Panel
                  key="6"
                  style={styles.collapse.panel}
                  header="¿Qué es Emprende el Viaje?"
                >
                  <Paragraph style={styles.collapse.panel.paragraph}>
                    Emprende el Viaje es un espacio de aprendizaje y
                    acompañamiento digital mediante la ejecución de un programa
                    formativo liderado por la Dirección de Innovación de la
                    Universidad Católica de la Santísima Concepción que da
                    respuesta a los principales desafíos en materia de
                    emprendimiento e innovación a través de la formación y
                    capacitación a la comunidad mediante la metodología del
                    Viaje del Emprendedor.
                  </Paragraph>
                </Panel>
              </Collapse>
            </Modal>
          </Col>
        </Row>
        <Row style={styles.rowLogos} align="middle" justify={'center'}>
          <Col xs={24} sm={24} md={3} lg={3} xl={6} style={styles.colLogos}>
            <img src={logo1} alt="logo1" width={"100%"} />
          </Col>
          <Col
            xs={24}
            sm={24}
            md={3}
            lg={3}
            xl={6}            
          >
            
            <img src={logo2} alt="logo2" width={"70%"} />
          </Col>
          <Col xs={24} sm={24} md={3} lg={3} xl={6} style={styles.colLogos}>
            <img src={logo3} alt="logo3" width={"70%"} />
          </Col>
                  </Row>
          <Row justify={'space-around'} align={'middle'} style={{padding:'10px', margin:'10px'}}>
          <Col xs={24} xl={3} >
            <Card style={{backgroundColor:'rgb(87, 17, 165)'}}><center>
              <Title style={{color:'white'}}>+500</Title>            
              <Paragraph style={{color:'white'}} level={5} >INSCRITOS EN LA PRIMERA FASE</Paragraph>
              </center>
            </Card>
          </Col>
          <Col xs={24} xl={3} >
            <Card style={{backgroundColor:'rgb(87, 17, 165)'}}><center>
              <Title style={{color:'white'}}>97%</Title>            
              <Paragraph style={{color:'white'}} level={5} >EN ÍNDICE DE SATISFACCIÓN DE USUARIOS</Paragraph>
              </center>
            </Card>
          </Col>
          <Col xs={24} xl={3} >
            <Card style={{backgroundColor:'rgb(87, 17, 165)'}}><center>
              <Title style={{color:'white'}}>+300</Title>            
              <Paragraph style={{color:'white'}} level={5} >VALIDACIONES EXITOSAS EN LA PLATAFORMA DE CORFO</Paragraph>
              </center>
            </Card>
          </Col>
          <Col xs={24} xl={3} >
            <Card style={{backgroundColor:'rgb(87, 17, 165)'}}><center>
              <Title style={{color:'white'}}>96%</Title>            
              <Paragraph style={{color:'white'}} level={5} >AGREGACIÓN DE VALOR AL EMPRENDIMIENTO</Paragraph>
              </center>
            </Card>
          </Col>
          
          
          </Row>
      </>
    );
  };

  return (
    <Layout>
      <Header style={styles.header}>
        <Row>
          <Col xs={24} sm={24} md={3} lg={3} xl={3}>
            <div>
              <center>
                <img
                  src={logo}
                  alt="logo"
                  width={window.innerWidth > 900 ? "100%" : "70%"}
                />
              </center>
            </div>
          </Col>
          <Col
            xs={24}
            sm={24}
            md={21}
            lg={21}
            xl={21}
            style={styles.colHeaderButtons}
          >
            <Button
              type="primary"
              onClick={() => {
                if (window.innerWidth > 900) {
                  setInfo(1);
                } else {
                  setVisibleMAbout(true);
                }
              }}
              style={styles.button}
            >
              ¿Quienes somos?
            </Button>
            <Button
              type="primary"
              onClick={() => setVisible(true)}
              style={styles.button}
            >
              Preguntas frecuentes
            </Button>
            {window.innerWidth > 900 && (
              <>
                <a
                  href="https://facebook.com/"
                  style={styles.iconSocial}
                  target="__blank"
                >
                  <FacebookOutlined />
                </a>
                <a
                  href="https://instagram.com/"
                  style={styles.iconSocial}
                  target="__blank"
                >
                  <InstagramOutlined />
                </a>
              </>
            )}
          </Col>
          {window.innerWidth < 900 && (
            <Col style={styles.colHeaderButtonsMSocial} span={24}>
              <a
                href="https://facebook.com/"
                style={styles.iconSocial}
                target="__blank"
              >
                <FacebookOutlined />
              </a>
              <a
                href="https://instagram.com/"
                style={styles.iconSocial}
                target="__blank"
              >
                <InstagramOutlined />
              </a>
            </Col>
          )}
        </Row>
      </Header>
      <Content>
        <BrowserRouter>
          <Routes>
            <Route exact path="/" element={<Element />} />
            <Route
              exact
              path="reset_password/:token/:email"
              element={<ElementResetPassword />}
            />
          </Routes>
        </BrowserRouter>
      </Content>
      <Footer style={{ ...styles.footer, backgroundColor: token.colorPrimary }}>
        <Paragraph style={styles.footer.paragraph}>
          UCSC Elearning - Plataforma Emprende el Viaje 2023
        </Paragraph>
      </Footer>
    </Layout>
  );
};

const styles = {
  iconSocial: {
    fontSize: "25px",
    marginRight: "10px",
    color: "#5711a5",
  },
  formInput: {
    marginRight: "10px",
  },
  formInputDni: {
    marginRight: "10px",
    marginBottom: "10px",
  },
  rowLogos: {
    padding: "70px",
  },
  btnBack: {
    border: "solid 1px white",
    color: "white",
    marginLeft: "225px",
  },
  collapse: {
    marginTop: "30px",
    padding: "1px",
    panel: {
      paragraph: {
        textAlign: "justify",
      },
    },
  },
  header: {
    backgroundColor: "white",
    paddingBottom: window.innerWidth > 900 ? "80px" : "165px",
    paddingTop: "10px",
  },
  colHeaderMovil: {
    marginTop: "-20px",
    paddingLeft: "20px",
  },
  paragraphInfo: {
    color: "white",
    textAlign: "justify",
    padding: "13px",
    borderRadius: "12px",
    border: "solid 2px white",
  },
  content: {
    backgroundImage: `url(${wallpaper1})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    padding: "20px",
    height: "600px",
  },
  btnAccess: {
    marginRight: "10px",
  },
  title: {
    color: "white",
    textAlign: "center",
    marginBottom: "50px",
  },
  colHeader: {
    marginRight: "20px",
  },
  paragraph: {
    color: "white",
    marginTop: "20px",
    textAlign: "justify",
  },
  paragraphHelp: {
    marginTop: "-20px",
  },
  btnHelp: {
    marginTop: "-20px",
    marginLeft: "-15px",
    color: "white",
  },
  footer: {
    textAlign: "end",
    paragraph: {
      fontSize: "14px",
      fontWeight: "bold",
      color: "white",
    },
  },
  colLogos: {
    padding: "10px",
  },
  colNotLogos: {
    paddingTop: "37px",
  },
  colHeaderButtons: {
    display: "flex",
    justifyContent: window.innerWidth > 900 ? "flex-end" : "center",
    alignItems: "center",
  },
  colHeaderButtonsMSocial: {
    display: "flex",
    justifyContent: "end",
    marginTop: "-15px",
    marginLeft: "40px",
  },
  button: {
    margin: "10px",
  },
};

export default Login;
