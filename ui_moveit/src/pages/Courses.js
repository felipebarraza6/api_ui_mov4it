import React, { useContext, useState, useEffect } from 'react'
import { Row, Col, Card, Typography, 
        theme, Button, Modal, Tag } from 'antd' 
import api from '../api/endpoints'
import { useNavigate } from "react-router-dom"
import { ArrowUpOutlined, InfoCircleFilled, CheckCircleFilled, ArrowLeftOutlined } from '@ant-design/icons'
import { backgrounds } from '../assets/js/backgrounds'
import { AppContext } from '../App'
const { Title, Text, Paragraph } = Typography
const { useToken } = theme
const { Meta } = Card

const Courses = () => {
  const { state } = useContext(AppContext)
  const navigate = useNavigate()
  const { token } = useToken()
  const [courses, setCourses] = useState([])

  const getData = async() => {
    const rq = await api.courses.stages.list().then((r) => {
      var list= []
      r.results.map((course)=> {
      let approved = false

      if(state.profile.course_approved.length > 0){
        state.profile.course_approved.map((course_app)=> {
        if(course_app.course.id === course.id){
          approved = true
        } 
        })
      } 
      list.push({
        ...course,
        approved: approved        
      })
    })
      setCourses(list)
    }) 
  }

  const modalInfoCourse = (img, description) => {
    Modal.info({
      content:<Paragraph style={{textAlign: 'justify'}}>{description}</Paragraph>, 
      icon:<img src={img} width={'100px'}/>, 
      footer:[<Button type='primary' size={'small'} icon={<ArrowLeftOutlined />} 
        style={{backgroundColor:'#5711a5', borderColor:'#5711a5', marginLeft:'75%', marginTop:'20px'}} 
        onClick={()=>Modal.destroyAll()}>Volver</Button>]})
  }

  useEffect(()=>{

    getData()
  }, [])

  return(<Row style={{minHeight:'90vh',background:backgrounds.courses.background1}}>
      <Col style={{...styles.colTitle}} xs={24} sm={24} md={24} lg={24} xl={24}>
        <Title style={styles.title} level={2}>Programa formativo</Title>
        <Title style={styles.title2} level={4}>El Viaje del emprendedor de Corfo</Title>
        </Col>
      <Col>
      <Col span={24}>
        <Row justify='space-around' style={styles.containerCourses} >
          {courses.map((obj, index)=>{
            return(<Col key={index} style={styles.colCard} xs={24} sm={24} md={24} lg={24} xl={4}><Card
              hoverable
              title={`ETAPA ${index}`}
              style={{...styles.card, border: `2px solid ${token.colorPrimary}`}}
              actions={[
                <Button type='primary' icon={<ArrowUpOutlined />} size='small' onClick={()=>navigate(`/stages/${obj.id}/`)}>
                  {window.innerWidth > 900 ? 'Ingresar':<></>}</Button>,
                <Button type='primary' size='small' onClick={()=>modalInfoCourse(obj.principal_image, obj.description)}>
                  {window.innerWidth > 900 ? 'Descripcion':<InfoCircleFilled />}</Button>,

              ]}
              cover={<img alt={obj.name} src={obj.principal_image} />}>
                <Meta description={<Row justify={'center'}>
                  <Col span={24}>
                    <Text style={styles.text}  ellipsis={{tooltip:true }}><b>{obj.name}</b></Text>
                  </Col>
                  <Col>
                  </Col>
                  </Row>} />
            </Card></Col>)})}
        </Row>
      </Col>
      </Col>
    </Row>)
}

const styles = {
  card: {
    width: '100%',
    textAlign: 'center',
    borderRadius: '20px 20px 8px 8px'
  },
  colCard: {
    padding:window.innerWidth<900?'2px':'10px'
  },
  colTitle: {
    paddingTop: window.innerWidth > 900? '40px':'20px',
    paddingBottom: window.innerWidth > 900? '0px':'20px',
    textAlign: 'center',
  },
  title: {
    color: 'white'
  },
  containerCourses: {
    paddingBottom: '20px'
  },
  text: {
    fontSize: window.innerWidth < 900 && '13px',
  },
  title2: {
    color: 'white',
    marginTop: '-10px'
  }

}


export default Courses
