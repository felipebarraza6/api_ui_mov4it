import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import api from '../../api/endpoints'
import {Row, Col, Typography, Button, Divider} from 'antd'
import { ArrowLeftOutlined } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'

const { Title, Paragraph } = Typography


const DetailBlog = () => {
  const location  = useLocation()
  const navigate = useNavigate()
  const [id, setId] = useState(location.pathname.slice(6))
  const [blog, setBlog] = useState(null)

  
  const getData = async() => {
    const rq = await api.blogs.retrieve(id).then((res)=> {
      setBlog(res)
    })
  }

  const goBlogPage = () => {
    navigate('/blog')
  }

  useEffect(()=> {
    getData() 
  }, [])
  return(<>{blog && <><Row justify={window.innerWidth<900?'center':'space-between'} align={'middle'} style={{backgroundImage:`url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' version='1.1' xmlns:xlink='http://www.w3.org/1999/xlink' xmlns:svgjs='http://svgjs.com/svgjs' width='1440' height='400' preserveAspectRatio='none' viewBox='0 0 1440 400'%3e%3cg mask='url(%26quot%3b%23SvgjsMask1588%26quot%3b)' fill='none'%3e%3crect width='1440' height='400' x='0' y='0' fill='url(%23SvgjsLinearGradient1589)'%3e%3c/rect%3e%3cpath d='M42.63 -57.6L104.99 -21.6L104.99 50.4L42.63 86.4L-19.73 50.4L-19.73 -21.6zM229.7 50.4L292.05 86.4L292.05 158.4L229.7 194.4L167.34 158.4L167.34 86.4zM229.7 266.4L292.05 302.4L292.05 374.4L229.7 410.4L167.34 374.4L167.34 302.4zM167.34 374.4L229.7 410.4L229.7 482.4L167.34 518.4L104.99 482.4L104.99 410.4zM292.05 -57.6L354.41 -21.6L354.41 50.4L292.05 86.4L229.7 50.4L229.7 -21.6zM354.41 266.4L416.76 302.4L416.76 374.4L354.41 410.4L292.05 374.4L292.05 302.4zM416.76 -57.6L479.12 -21.6L479.12 50.4L416.76 86.4L354.41 50.4L354.41 -21.6zM479.12 50.4L541.47 86.4L541.47 158.4L479.12 194.4L416.76 158.4L416.76 86.4zM541.47 -57.6L603.83 -21.6L603.83 50.4L541.47 86.4L479.12 50.4L479.12 -21.6zM853.25 50.4L915.61 86.4L915.61 158.4L853.25 194.4L790.9 158.4L790.9 86.4zM915.61 374.4L977.96 410.4L977.96 482.4L915.61 518.4L853.25 482.4L853.25 410.4zM1040.32 -57.6L1102.68 -21.6L1102.68 50.4L1040.32 86.4L977.96 50.4L977.96 -21.6zM1040.32 158.4L1102.68 194.4L1102.68 266.4L1040.32 302.4L977.96 266.4L977.96 194.4zM1040.32 374.4L1102.68 410.4L1102.68 482.4L1040.32 518.4L977.96 482.4L977.96 410.4zM1227.39 50.4L1289.74 86.4L1289.74 158.4L1227.39 194.4L1165.03 158.4L1165.03 86.4zM1227.39 266.4L1289.74 302.4L1289.74 374.4L1227.39 410.4L1165.03 374.4L1165.03 302.4zM1165.03 374.4L1227.39 410.4L1227.39 482.4L1165.03 518.4L1102.68 482.4L1102.68 410.4zM1352.1 266.4L1414.45 302.4L1414.45 374.4L1352.1 410.4L1289.74 374.4L1289.74 302.4zM1289.74 374.4L1352.1 410.4L1352.1 482.4L1289.74 518.4L1227.39 482.4L1227.39 410.4zM1414.45 158.4L1476.81 194.4L1476.81 266.4L1414.45 302.4L1352.1 266.4L1352.1 194.4zM1414.45 374.4L1476.81 410.4L1476.81 482.4L1414.45 518.4L1352.1 482.4L1352.1 410.4z' stroke='rgba(132%2c 102%2c 157%2c 1)' stroke-width='2'%3e%3c/path%3e%3c/g%3e%3cdefs%3e%3cmask id='SvgjsMask1588'%3e%3crect width='1440' height='400' fill='white'%3e%3c/rect%3e%3c/mask%3e%3clinearGradient x1='18.06%25' y1='-65%25' x2='81.94%25' y2='165%25' gradientUnits='userSpaceOnUse' id='SvgjsLinearGradient1589'%3e%3cstop stop-color='%230e2a47' offset='0'%3e%3c/stop%3e%3cstop stop-color='rgba(87%2c 17%2c 165%2c 1)' offset='1'%3e%3c/stop%3e%3c/linearGradient%3e%3c/defs%3e%3c/svg%3e")`, backgroundSize:'cover'}} >
      <Col xs={24} xl={22} style={{padding:'35px'}}>
        <Title style={{color:'white', textAlign: window.innerWidth<900&&'center'}} level={window.innerWidth<900&&3}>{blog.title}</Title>
        <Title style={{color:'white', textAlign: window.innerWidth<900&&'center'}} level={window.innerWidth<900?5:4}>{blog.created.slice(0,10)}</Title>
      </Col>
      <Col xs={24} xl={2} style={{textAlign:'center'}}>
        <Button block={window.innerWidth<900&&true} style={styles.backBtn} onClick={goBlogPage} icon={<ArrowLeftOutlined />} size='large'>Volver</Button>
      </Col>
    </Row>
    <Row justify={'center'} align={'middle'}>
      {blog.principal_img ? <><Col style={{padding:window.innerWidth>900&&'30px', marginBottom: window.innerWidth<900&&'-30px'}} xs={24} xl={12}>
        <img width={'100%'} style={{paddingTop:window.innerWidth<900&&'20px',padding:'10px', borderRadius:'50px'}} src={blog.principal_img} /> 
        <Paragraph style={{...styles.paragraph, textAlign:'center' }}>
          <b>{blog.description1}</b>
        </Paragraph>

      </Col><Col style={{paddingRight:'15px', paddingTop: '15px'}} xs={24} xl={12}>
        <Paragraph style={styles.paragraph}>
          {blog.description2}
        </Paragraph>
        {blog.description2 && <Divider />}
        <Paragraph style={styles.paragraph}>
          {blog.description3}
        </Paragraph>
        {blog.description3 && <Divider />}
        <Paragraph style={styles.paragraph}>
          {blog.description4}
        </Paragraph>

        {blog.description4 && <Divider />}
        <Paragraph style={styles.paragraph}>
          {blog.description5}
        </Paragraph>
      </Col>
</>:<> <Col style={{paddingRight:'15px', paddingTop: '45px'}} xs={24} xl={12}>
        <Paragraph style={{...styles.paragraph, textAlign:'center' }}>
          {blog.description1}
        </Paragraph>
        {blog.description1 && <Divider />}
        <Paragraph style={styles.paragraph}>
          {blog.description2}
        </Paragraph>
        {blog.description2 && <Divider />}
        <Paragraph style={styles.paragraph}>
          {blog.description3}
        </Paragraph>
        {blog.description3 && <Divider />}
        <Paragraph style={styles.paragraph}>
          {blog.description4}
        </Paragraph>

        {blog.description4 && <Divider />}
        <Paragraph style={styles.paragraph}>
          {blog.description5}
        </Paragraph>
      </Col>
</>}
                </Row>
    </>}</>)
}

const styles = {
  backBtn: {
    marginRight: '20px',
    marginBottom: window.innerWidth<900&&'20px',
    marginTop: window.innerWidth<900&&'-20px'
  },
  paragraph: {
    paddingTop:'5px',
    paddingBottom: '5px',
    paddingLeft: window.innerWidth<900&&'10px',
    paddingRight: window.innerWidth<900&&'10px',
    textAlign:'justify'
  }
}


export default DetailBlog
