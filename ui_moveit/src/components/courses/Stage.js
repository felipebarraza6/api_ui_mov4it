import React, { useContext, useEffect, useState } from "react";
import {  useParams, useNavigate } from "react-router-dom";
import api from "../../api/endpoints";
import { Modal, Row, Col, Typography, Button, Tag, Card } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { AppContext } from '../../App'
import { backgrounds } from "../../assets/js/backgrounds";

const { Title, Paragraph } = Typography;

const Stage = () => {
  
  const { state } = useContext(AppContext)
  const approved_courses = state.profile.course_approved
 
  let navigate = useNavigate();
  let params = useParams();

  const [data, setData] = useState(null);
  const [courses, setCourses] = useState(null)
  const [approvedStage, setApprovedStage] = useState(false)

  const getData = async (id) => {

    const rq = await api.courses.stages.retrieve(id).then((r)=> {
      
        setData(r)
    })
    const rq2 = await api.courses.list(id).then((r)=> {
      let count = r.length
          let count_local= 0
      r.map((x)=>{
          
          
          approved_courses.map((a)=> {
            if(x.id==a.course.id){
              count_local = count_local +1
            }
          })
          
          if(count_local >= count){
            setApprovedStage(true)
          }
      })
      setCourses(r)
    })

    return {rq, rq2}
  };

  const goHomeCourses = () => {
    navigate("/");
  };

  const goCourseRetrieve = (courseId) => {
    navigate(`/courses/${courseId}/lesson/index`)
  }

  useEffect(() => {
    getData(params.id);
  }, []);

  return (
    <Row>
      <Col xs={24} xl={4} style={{ marginTop: "0px" }}>
        {data && (<>
          <center><img
            src={data.principal_image}
            width={window.innerWidth > 900 ? "100%":"30%"}
            style={{ marginTop: "-20px", marginBottom: "-20px" }}
          /></center>

          {approvedStage && <center><Button onClick={()=> {
            Modal.info({
              title:'',
              icon:<></>,
              width:window.innerWidth >900?'600px':'100%',
              content:<center>
                <Title level={4}>{state.user.first_name.toUpperCase()} {state.user.last_name.toUpperCase()}</Title>
                <Paragraph style={{marginBottom:'-30px', marginTop:'40px'}}>A aprobado corrrectamente la etapa:</Paragraph>              
                <Title> ETAPA {data.prefix}: {data.name}</Title>
                <img width={'50%'} src={data.principal_image} />
              </center>,
              footer:[<Button style={{float:'right', backgroundColor:'#5711a5', borderColor:'#5711a5'}} type='primary' onClick={()=>Modal.destroyAll()}>Volver</Button>]
            })
          }} style={{marginBottom:'10px'}} size={'small'} type='primary'>
            Ver certificado</Button></center>}
          {approvedStage && <center><Tag color='purple' style={{marginBottom:'10px'}}>ETAPA APROBADA</Tag></center>}
          </>
        )}
        
        {data && (<>
          <Paragraph
            style={styles.paragraphDescription} >{data.description}</Paragraph>
            <center>
            <Button
                onClick={goHomeCourses}
                icon={<ArrowLeftOutlined />}
                type='primary'
                style={styles.btnBack}>
                Programa formativo
            </Button>
            </center>
        </>)}
      </Col>
      <Col xs={24} xl={20} style={styles.containerTitle}>  
        {data && <> <Row justify={"space-between"} >
            <Col>
                <Title style={styles.colTitle.title} level={3}>
                   CURSOS ETAPA {data.prefix}: {data.name} 
                </Title>
            </Col>
            </Row>                
                <Row
                  style={{ minHeight: window.innerWidth>900?"85vh": params.idLesson=== "index" ? "100vh" : "180vh" }}
                  justify={"center"}
                  align={window.innerWidth>900?"middle":"top"}
                >
                  {courses && 
                      <>{courses.map((e)=> {
                        let approved = false

                        approved_courses.map((x)=> {
                          if(x.course.id==e.id){
                            approved = true
                          }
                        })
                        return(<Col xs={12} xl={6} style={{padding:'10px'}}><Card title={approved && <center><Tag color='purple-inverse'>APROBADO</Tag></center>} hoverable onClick={()=>goCourseRetrieve(e.id)}>
                          <img alt={e.name} style={styles.imgCourse} src={e.principal_image} width={'100%'} />
                          <Paragraph style={styles.titleCourse}>{e.name}</Paragraph>
                          
                          </Card></Col>)
                      })}</>
                     }
                  
                </Row></>}            
      </Col>
    </Row>
  );
};

const styles = {
  imgCourse: {
    borderRadius:'10px',
    border: '2px solid #5711a5',
  },
  titleCourse: {
    textAlign:'center',
    fontWeight:'500',
    paddingTop:'20px',
    
  },  
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
    marginBottom:'10px'  
  },
  colTitle: {
    title: {
      marginLeft: "10px",
      color: "white",
      textAlign: "center",
      padding: "3px",
    },
  },
  paragraphDescription: {
    marginLeft:'5px',
    marginRight: '5px',
    padding: '5px',
    border: '1px solid #5711a5',
    borderRadius:'5px',
    textAlign: 'justify'
  }
};

export default Stage;
