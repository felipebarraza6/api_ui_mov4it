import React, { useContext } from 'react'
import { Row, Col, Typography, 
        theme, Tag, Segmented, Button } from 'antd' 
import { AppContext } from '../App'

import FormUpdateData from '../components/profile/FormUpdateData'

const { Title, Paragraph } = Typography
const { useToken } = theme

const Profile = () => {
  const { state } = useContext(AppContext)
  const { token } = useToken()

  return(<Row style={styles.container} justify='center'>
      <Col style={styles.colTitle}  offset={2} xs={20} sm={24} md={24} lg={24} xl={19}>
        <Title style={styles.title} level={window.innerWidth > 900 ? 2:4}>
          {state.user.first_name.toUpperCase()} {state.user.last_name.toUpperCase()}
        </Title>
        <Tag style={styles.tag}>@{state.user.username}</Tag>
        <Tag style={styles.tag}>ID SOPORTE: ELV00{state.user.id}CR</Tag>
      </Col>
      <Col xs={24} sm={24} md={24} lg={24} xl={24}>
        <FormUpdateData />
      </Col>
    </Row>)
}

const styles = {
  tag: {
    color: 'white',
    backgroundColor:'#5711a5',
    paddingLeft: window.innerWidth > 900 ? '10px':'5px',
    paddingRight: window.innerWidth > 900 ? '10px':'5px',
    paddingBottom: window.innerWidth > 900 ? '5px':'0px',
    paddingTop: window.innerWidth > 900 ? '5px':'0px',
    fontSize: window.innerWidth > 900 ? '16px':'12px'
  },
  paragraph: {
    color:'black'
  },
  colTitle: {
    paddingTop: window.innerWidth > 900 ? '40px':'20px',
    paddingBottom: window.innerWidth > 900 ? '40px':'20px',
    textAlign: 'end',
    
  },
  container: {
    backgroundSize:'cover',
    minHeight: '90vh'
  },
  title: {
    color: '#c'
  },
  title2: {
    color: '#5711a5',
    marginTop: '-10px'
  }

}


export default Profile 
