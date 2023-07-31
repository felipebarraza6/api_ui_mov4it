import React, { useEffect, useState } from 'react'
import { Row, Col, Typography, Button } from 'antd'
import { DownloadOutlined } from '@ant-design/icons'
import html2canvas from 'html2canvas'
import { saveAs } from 'file-saver'

const { Title, Paragraph } = Typography

const Certificate = ({ state, course }) => {

  const [courseInfo, setCourseInfo] = useState(null)
  const [uuid, setUuid] = useState(null)

  const downloadCertificate = () => {
    const divToDownload = document.getElementById('certificate')
    html2canvas(divToDownload).then(canvas => {
      canvas.toBlob(blob => {
        saveAs(blob, 'certificate.png')
      })
    })
  }

  const validateData = () => {
    const course_id = course.id
    const approved_courses = state.profile.course_approved

    approved_courses.map((approved)=> {
      if(approved.course.id === course_id ){
        setUuid(approved.uuid)
        setCourseInfo(approved)
      }
    })
  }

  useEffect(()=> {
    validateData()
  }, [])

  return(<>
          <Row justify={'center'}>
          <Col>
              <Button icon={<DownloadOutlined />} style={styles.downloadCertificate} onClick={downloadCertificate}>Descargar certificado</Button>
          </Col>
          </Row>
          <Row id='certificate' style={styles.container} justify='center'>
            <Col span={24}>
              <Title level={window.innerWidth>900?1:4} style={styles.titleName}>{state.user.first_name.toUpperCase()} {state.user.last_name.toUpperCase()}</Title>
            </Col>
            <Col span={24}>
              <Paragraph style={styles.pCongratulations}>  A aprobado correctamente el curso; </Paragraph>
            </Col>
            <Col span={24}>
              <Title level={window.innerwidth>900?1:3} style={styles.titleName}>{course.name}</Title>
            </Col>
            <Col span={24}>
              <Title style={styles.titleName} level={window.innerwidth>900?1:5}>CODIGO VERIFICACIÓN</Title>
              <Paragraph style={styles.pCongratulations}>
                {uuid && uuid}
              </Paragraph>
            </Col>
            <Col span={24}>
              <Paragraph style={styles.titleName2} level={5}>Fecha</Paragraph>
              <Paragraph style={styles.pCongratulationsD}>
                {courseInfo && (<>{courseInfo.created.slice(0,10)} / {courseInfo.created.slice(11,19)}</>)}
              </Paragraph>

            </Col>

          </Row>
    </>)
}

const styles = {
  downloadCertificate: {
    margin: '5px'
  },
pCongratulationsD: {
    textAlign: 'center',
    color: 'white',
    fontSize: '15px',
  marginTop:'5px',
    fontWeight: '400'
  },

  pCongratulations: {
    textAlign: 'center',
    color: 'white',
    fontSize: '20px',
    fontWeight: '400'
  },
  titleName: {
    color: 'white',
    textAlign: 'center'
  },
titleName2: {
    color: 'white',
    textAlign: 'center',
  marginBottom: '-10px',
    fontSize:'18px'
  },

  container: {
    backgroundColor: 'rgba(87, 17, 165, 0.8)',
    padding: '8%',
    marginTop:'10px',
    border: '1px solid white'
  }
}


export default Certificate
