import React from "react";
import { Typography, Row, Col, Button, Modal } from "antd";
import {
  UserOutlined,
  ArrowRightOutlined,
  ArrowUpOutlined,
} from "@ant-design/icons";
const { Paragraph } = Typography;

const getModalAnswer = (answer, course) => {
  Modal.info({
    footer: [
      <Button
        size="small"
        icon={<ArrowRightOutlined />}
        style={styles.btnAnswerFooter}
        onClick={() => Modal.destroyAll()}
      >
        Volver
      </Button>,
    ],
    content: answer,
    title: `Respuesta de ${course.expose}`,
    icon: <UserOutlined style={styles.iconModal} />,
  });
};

export const columns = (course) => {
  const list = [
    {
      render: (obj) => (
        <Row>
          <Col span={24}>
            <b>@{obj.user.username}</b> / {obj.created.slice(0, 10)}{" "}
            {obj.created.slice(11, 16)}
          </Col>
          <Col span={24}>
            <Paragraph ellipsis={{ rows: 2, tooltip: obj.comment }}>
              {obj.comment}
            </Paragraph>
          </Col>
          <Col>
            {console.log(obj)}
            {obj.answer_comment.answer && (
              <Button
                icon={<ArrowUpOutlined />}
                onClick={() =>
                  getModalAnswer(obj.answer_comment.answer, course)
                }
                size="small"
                type="primary"
                style={styles.btnAnswer}
              >
                ver respuesta
              </Button>
            )}
          </Col>
        </Row>
      ),
    },
  ];

  return list;
};

const styles = {
  btnAnswer: {
    backgroundColor: "#5711a5",
    borderColor: "#5711a5",
    color: "white",
  },
  btnAnswerFooter: {
    color: "white",
    backgroundColor: "#5711a5",
    borderColor: "#5711a5",
    marginLeft: "80%",
  },
  iconModal: {
    color: "white",
    backgroundColor: "#5711a5",
    borderRadius: "20px",
    padding: "5px",
  },
};
