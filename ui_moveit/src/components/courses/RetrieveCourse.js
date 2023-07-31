import React, { useContext, useEffect, useState } from "react";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import api from "../../api/endpoints";
import { Row, Col, Typography, Button, Tag } from "antd";
import { ArrowLeftOutlined, DownloadOutlined } from "@ant-design/icons";
import MenuCourse from "./MenuCourse";
import { BASE_URL } from "../../api/config";
import PlayerLesson from "./PlayerLesson";
import Test from "./Test";
import { AppContext } from '../../App'
import { backgrounds } from "../../assets/js/backgrounds";

const { Title, Paragraph } = Typography;

const RetrieveCourse = () => {
  const [isTest, setIsTest] = useState(false);
  const { state } = useContext(AppContext)
  const approved_courses = state.profile.course_approved
 
  const [isViewLesson, setIsViewLesson] = useState(false);

  let navigate = useNavigate();
  let params = useParams();

  const [data, setData] = useState(null);
  const [lesson, setLesson] = useState(null);

  const getData = async (id, idLesson) => {
    let approved_x = false
    approved_courses.map((course)=> {
      if(course.course.id.toString()===id){
        approved_x = true
      }
    })
    const rq = await api.courses.retrieve(id).then((r) => {
      setData({...r, 'approved': approved_x});
    });
    if (Number(params.idLesson)) {
      setIsTest(false);
      const rq2 = await api.courses.lessons.retrieve(idLesson).then((r) => {
        setLesson(r);
      });
    } else if (params.idLesson === "test") {
      setLesson(null);
      setIsTest(true);
    } else {
      setLesson(null);
      setIsTest(false);
    }
  };

  const goHomeCourses = () => {
    navigate(`/stages/${data.id}` );
  };


  useEffect(() => {
    getData(params.id, params.idLesson);
  }, [params.idLesson]);

  return (
    <Row >
      <Col xs={24} xl={4} >
        {data && (<>
          {window.innerWidth > 900 &&
          <img
            src={data.stage.principal_image}
            width="100%"
            style={{ marginTop: "0px", marginBottom: "10px" }}
          />}
          {data.approved && <center><Tag color='purple' style={{marginBottom:'10px'}}>CURSO APROBADO</Tag></center>}
          </>
        )}
        
        {data && (
          <MenuCourse
            lessons={data.groups}
            setIsViewLesson={setIsViewLesson}
            course = {data}
          />
        )}
      </Col>
      <Col xs={24} xl={20} style={styles.containerTitle}>
        {isTest ? (
          <Row style={{ minHeight: "100vh" }} justify={"center"}>
            <Test course={data} />
          </Row>
        ) : (
          <>
            {data && (
              <>
                {!lesson && (
                  <Row justify={"space-between"} >
                    <Col>
                      <Title  style={styles.colTitle.title} level={3}>
                        {data.name} - ETAPA: {data.stage.prefix}
                      </Title>
                    </Col>
                    {window.innerWidth > 900 &&
                    <Col>
                      <Button
                        onClick={goHomeCourses}
                        icon={<ArrowLeftOutlined />}
                        style={styles.btnBack}
                      >
                        Volver a la etapa "{data.stage.prefix}"
                      </Button>
                    </Col>}
                  </Row>
                )}
                <Row
                  style={{ minHeight: window.innerWidth>900?"85vh": params.idLesson=== "index" ? "100vh" : "180vh" }}
                  justify={"center"}
                  align={window.innerWidth>900?"middle":"top"}
                >
                  {!lesson ? (
                    <>
                      <Col xs={24} xl={12}>
                        <center>
                        <img
                          style={{ borderRadius: "30px", marginLeft: window.innerWidth>900?"10px":'0px' }}
                          src={data.principal_image}
                          width={window.innerWidth  >900?'400px': '100%'}
                        />
                        </center>
                      </Col>
                      <Col xs={24} xl={12} style={{ padding: "20px" }}>
                        <Title level={3} style={styles.colTitle.title}>
                          {data.title}
                        </Title>
                        <Paragraph style={styles.paragraph}>
                          {data.description}
                        </Paragraph>
                        <Paragraph style={styles.paragraph}>
                          {data.resources.map((resource, index) => (
                            <a
                              key={index}
                              href={`${BASE_URL.slice(0, 21)}${resource.file}`}
                              target="__blank"
                            >
                              <Button
                                style={{
                                  marginTop: "20px",
                                  marginRight: "10px",
                                }}
                                icon={<DownloadOutlined />}
                              >
                                {resource.name}
                              </Button>
                            </a>
                          ))}
                        </Paragraph>
                        <Paragraph style={styles.paragraphExpose}>
                          Expositor@: <b>{data.expose}</b>
                        </Paragraph>
                      </Col>
                    </>
                  ) : (
                    <Col span={24}>
                      {lesson && (
                        <PlayerLesson
                          course={data}
                          lesson={lesson}
                          is_view_lesson={isViewLesson}
                        />
                      )}
                    </Col>
                  )}
                </Row>
              </>
            )}
          </>
        )}
      </Col>
    </Row>
  );
};

const styles = {
  countdown: {
    color: "white",
    fontSize: "17px",
    fontWeight: "450",
    title: {
      color: "white",
    },
  },
  containerTitle: {
    background: backgrounds.courses.retrieve,
    padding: "5px",
    backgroundSize: "cover",
  },
  paragraph: {
    textAlign: "justify",
    paddingLeft: "20px",
    color: "white",
  },
  paragraphExpose: {
    textAlign: "right",
    color: "white",
  },
  btnBack: {
    marginRight: "20px",
    marginTop:'10px'
  },
  colTitle: {
    title: {
      marginLeft: "10px",
      color: "white",
      textAlign: "center",
      padding: "3px",
      
    },
  },
};

export default RetrieveCourse;
