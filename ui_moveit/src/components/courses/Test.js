import React, { useState, useEffect, useContext } from "react";
import {
  Row,
  Col,
  Typography,
  Radio,
  Button,
  Card,
  Form,
  notification,
} from "antd";
import api from "../../api/endpoints";
import { AppContext } from "../../App";
import { LikeFilled, SendOutlined, ReloadOutlined } from "@ant-design/icons";
import Certificate from "./Certificate";

const { Title, Paragraph } = Typography;

const Test = ({ course }) => {
  const { state, dispatch } = useContext(AppContext);
  const [questions, setQuestions] = useState(null);
  const [answers, setAnswers] = useState(null);
  const [countUp, setCountUp] = useState(0);
  const [approved, setApproved] = useState(course.approved);

  const onHandleCheck = (question, answer) => {
    const updateAnswers = answers.map((obj) => {
      if (obj.question === question) {
        return { ...obj, answer_user: answer };
      } else {
        return obj;
      }
    });
    setAnswers(updateAnswers);
  };

  const finallyCourse = async () => {
    notification.success({ message: "APROBASTE" });
    setCountUp(countUp + 1);
    setApproved(true);
    var data = {
      course: course.id,
      calification: "7",
      student: state.user.id,
      code_generated_travelcorfo: `${state.user.id}${state.user.username}${course.code_travelcorfo}`,
    };
    const rq = await api.courses.approved_courses.create(data).then((r) => {
      dispatch({
        type: "UPDATE_COUNT",
      });
      window.location.reload();
    });
  };

  const getData = async (id) => {
    const rq = await api.courses.questions.list(id).then((r) => {
      setQuestions(r.results);
      var list = [];
      r.results.map((question) => {
        list.push({
          question: question.id,
          answer_correct: question.alternatives.reduce((s, c) => {
            if (c.is_correct === true) {
              return c.id;
            } else {
              return s;
            }
          }),
        });
      });
      setAnswers(list);
    });
  };

  const sendQuestions = async () => {
    var allAnswers = false;
    var count = 0;
    answers.map((x) => {
      if (x.answer_user) {
        allAnswers = true;
      } else {
        allAnswers = false;
      }
    });

    if (allAnswers) {
      answers.map((x) => {
        if (x.answer_correct === x.answer_user) {
          count = count + 1;
        }
      });
      console.log(count);
      if (count >= course.correct_answers_to_pass) {
        notification.success({ message: "APROBASTE" });

        setCountUp(countUp + 1);
        setApproved(true);
        var data = {
          course: course.id,
          calification: count > 7 ? "7" : count,
          student: state.user.id,
          code_generated_travelcorfo: `${state.user.id}${state.user.username}${course.code_travelcorfo}`,
        };
        const rq = await api.courses.approved_courses.create(data).then((r) => {
          dispatch({
            type: "UPDATE_COUNT",
          });
          window.location.reload();
        });
      } else {
        notification.error({ message: "REPROBASTE, VUELVE A INTENTARLO" });
      }
    } else {
      notification.error({ message: "DEBES RESPONDER TODAS LAS PREGUNTAS" });
    }
  };

  useEffect(() => {
    getData(course.id);
  }, [countUp]);

  return (
    <Row style={styles.container} justify="center">
      {!approved ? (
        <>
          <Col>
            <Title style={styles.title} level={3}>
              Test de la etapa "{course.name}"
            </Title>
          </Col>
          <Col span={24}>
            <Form>
              {questions && (
                <>
                  {questions.length > 0 ? (
                    <>
                      <Row justify={"center"}>
                        {questions.map((x, index) => (
                          <Col xs={24} xl={8}>
                            <Card style={styles.card}>
                              <Paragraph style={styles.pquestion}>
                                {index + 1}) {x.question}
                              </Paragraph>
                              <Row justify={"center"}>
                                <Radio.Group
                                  onChange={(o) =>
                                    onHandleCheck(x.id, o.target.value)
                                  }
                                  style={styles.checkbox}
                                >
                                  {x.alternatives.map((alternative) => (
                                    <Radio value={alternative.id}>
                                      {" "}
                                      {alternative.name}
                                    </Radio>
                                  ))}
                                </Radio.Group>
                              </Row>
                            </Card>
                          </Col>
                        ))}
                      </Row>
                      <Row style={styles.containerQuestions} justify={"center"}>
                        <Col>
                          <Button
                            style={styles.btn}
                            onClick={sendQuestions}
                            icon={<SendOutlined />}
                          >
                            Procesar respuestas
                          </Button>
                          <Button
                            onClick={() => window.location.reload()}
                            style={styles.btn}
                            icon={<ReloadOutlined />}
                          >
                            Reiniciar Test
                          </Button>
                        </Col>
                      </Row>
                    </>
                  ) : (
                    <Row justify={"center"} align={"middle"}>
                      <Button
                        onClick={finallyCourse}
                        icon={<LikeFilled />}
                        size="large"
                        style={{ marginTop: "-50px" }}
                      >
                        FINALIZAR CURSO
                      </Button>
                    </Row>
                  )}
                </>
              )}
            </Form>
          </Col>
        </>
      ) : (
        <Col span={24}>
          <Title
            level={window.innerWidth > 900 ? 1 : 4}
            style={{ color: "white", textAlign: "center" }} >
            <LikeFilled /> CURSO APROBADO
          </Title>
          <Certificate course={course} state={state} />
        </Col>
      )}
    </Row>
  );
};

const styles = {
  containerQuestions: {
    marginTop: "50px",
  },
  checkbox: {
    textAlign: "center",
  },
  card: {
    margin: "3px",
  },
  btn: {
    margin: "5px",
  },
  pquestion: {},
  container: {
    margin: "20px",
  },
  title: {
    color: "white",
  },
};

export default Test;
