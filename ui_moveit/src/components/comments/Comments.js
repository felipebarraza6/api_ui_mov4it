import React, { useState, useEffect, useContext } from 'react'
import { notification, Input, Form, Button, Table } from 'antd'
import api from '../../api/endpoints'
import { AppContext } from '../../App'
import { columns } from './columnsComments'

const { TextArea } = Input

const Comments = ({  course, id_course, id_lesson, id_user }) => {
  console.log(course)
  const { state } = useContext(AppContext)
  
  const [form] = Form.useForm()

  const [comments, setComments] = useState(null)
  const [countComments, setCountComments] = useState(null)

  const getComments = async({id_course, id_lesson, id_user}) => {
      const rq1 = await api.comments.list({id_course, id_lesson, id_user}).then((r)=> {
        setCountComments(r.count)
        setComments(r.results)
      }) 
  }

  useEffect(()=> {
    getComments({ id_course: id_course, id_lesson: id_lesson, id_user: id_user })
  }, [])

  const onFinish = async(values) => {

    values = {
      ...values,
      user: state.user.id,
      lesson: id_lesson,
    }

    const rq = await api.comments.create(values).then((r)=> {
      notification.success({message: 'COMENTARIO ENVIADO EXITOSAMENTE'})
      resetFields()
    })

    console.log(rq)
  }

  const resetFields = () => {
    form.resetFields()
  }

  return(<>
    <Table  pagination={{defaultPageSize:3}} title={()=><b>Preguntas de la comunidad</b>} columns={columns(course)} dataSource={comments} style={styles.table} size='small' />
    <Form form={form} onFinish={onFinish} name='form'>
      <Form.Item name='comment' rules={[{required: true, message:'Debes ingresar un comentario'}]}>
        <TextArea rows={4} placeholder='Ingresa tu pregunta...' />
      </Form.Item>
      <Button htmlType='submit' style={styles.btnForm}>Enviar pregunta</Button>
      <Button onClick={resetFields} style={styles.btnFormClear}>Limpiar</Button>
    </Form>
    </>)
}


const styles = {
  btnFormClear: {
    backgroundColor: 'rgba(18, 3, 56, 0.3)',
    borderColor: 'rgba(18, 3, 56, 0.3)',
    color: 'white',
    margin: '0px 10px 0px 0px'
  },
  btnForm: {
    backgroundColor: 'rgb(18, 3, 56)',
    borderColor: 'rgb(18, 3, 56)',
    color: 'white',
    margin: '0px 10px 0px 0px'
  },
  table: {
    backgroundColor: 'white',
    borderRadius: '10px',
    marginBottom: '10px'
  }
}


export default Comments
