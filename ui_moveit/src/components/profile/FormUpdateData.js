import React, { useContext } from 'react'
import { AppContext } from '../../App'
import { Form, Input, Button, Row, Col, Typography, Table, notification } from 'antd'
import api from '../../api/endpoints'
import { LockFilled } from '@ant-design/icons'

const { Title } = Typography

const FormUpdateData = () => {
  
  const { state, dispatch } = useContext(AppContext) 
  
  const onFinishUpdateUser = async(values) => {
    const rq = await api.authentication.update(state.user.username, values).then(async(res)=>{
      notification.success({message:'Usuario actualizado correctamente'})
      const rq2 = await api.authentication.retrieve(state.user.username).then((res)=>{
        dispatch({
          type: 'UPDATE_COUNT',
        })
      })
    })
    
  }

  const onFinishResetPassword = async(values) => {
    values = {
      ...values,
      user: state.user.email,
      new_password: values.password_confirmation

    }
    if(values.new_password === values.password){
      const rq = await api.authentication.reset_password(values).then((res)=> {
      notification.success({message:'Contraseña modificada correctamente.'})
    })
    } else {
      notification.error({message:'LAS CONTRASEÑAS NO COINCIDEN!'})
    }
    }

  return(
      <Row justify={'space-around'}>
        <Col style={{marginTop:window.innerWidth > 900&&'-140px'}} xs={24} sm={24} md={3} lg={3} xl={5}>
          <Title style={styles.titleProfile} level={window.innerWidth > 900 ? 1:4}>Tus datos</Title>
          <Form onFinish={onFinishUpdateUser} style={styles.form} initialValues={state.user}>
            <Form.Item label={window.innerWidth > 900 &&<LockFilled style={{color:'black'}} />} name='username'>
              <Input style={styles.inputYourData} disabled />
            </Form.Item>
            <Form.Item label={window.innerWidth > 900 && <LockFilled style={{color:'black'}} />} name='identification_number' >
              <Input style={styles.inputYourData} disabled />
            </Form.Item>
            <Form.Item name='first_name'>
              <Input style={styles.inputYourData}/>
            </Form.Item>
            <Form.Item name='last_name'>
              <Input style={styles.inputYourData}/>
            </Form.Item>
            <Form.Item name='phone_number' >
              <Input style={styles.inputYourData}  />
            </Form.Item>
            <Form.Item name='email' >
              <Input style={styles.inputYourData}/>
            </Form.Item>
          <Form.Item>
            <Button htmlType='submit' block={window.innerWidth<900&true} style={{backgroundColor: 'white', color:'#5711a5', borderColor:'#5711a5'}} >Actualizar datos personales</Button>
          </Form.Item>
        </Form>
<Title style={styles.titleProfile} level={4}>Actualiza tu contraseña</Title>
        <Form onFinish={onFinishResetPassword} style={styles.form}>
          <Form.Item name='password' rules={[{'required': true, message:''}]}>
            <Input type='password' placeholder='Nueva contraseña' />
          </Form.Item>
          <Form.Item name='password_confirmation' rules={[{'required': true, message:''}]} >
            <Input type='password' placeholder='Repetir nueva contraseña'/>
          </Form.Item>
          <Form.Item>
            <Button htmlType='submit' block={window.innerWidth<900&true} style={{backgroundColor: 'white', color:'#5711a5', borderColor:'#5711a5'}}>Actualizar contraseña</Button>
          </Form.Item>
        </Form>

      </Col>
      <Col xs={24} sm={24} md={3} lg={3} xl={10}>
        <Table bordered dataSource={state.profile.course_approved} columns = {[
          {title:'Codigo verificación', dataIndex:'code_generated_travelcorfo'},
          {title:'Nombre', render: (c)=>`${c.course.name} `},
          {title:'Nota', dataIndex:'calification' }
        ]} style={styles.table} title={()=><>Cursos aprobados(viaje del emprendedor)</>}  />
      </Col>
    </Row>)
}


const styles = {
  inputYourData: 
{backgroundColor:'#5711a5', color:'white', borderColor: '#5711a5'}

  ,
  table:{
    padding:window.innerWidth < 900 &&'20px',
    border:'1px solid #5711a5',
    borderRadius: '3px'
    
  },
  form: {
    paddingRight:'20px', 
    paddingLeft:'20px' 
  },
  titleProfile: {
    color: '#5711a5',
    marginLeft: window.innerWidth < 900 && '20px'
  }
}


export default FormUpdateData
