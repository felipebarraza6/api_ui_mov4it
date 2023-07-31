import React, { useState, useEffect } from 'react'
import api from '../../api/endpoints'
import { Card, Col, Typography, Button } from 'antd'
import { useNavigate } from 'react-router-dom'

const { Title, Paragraph } = Typography

const List = () => {
  const navigate = useNavigate() 
  const [data, setData] = useState([])
  
  const getData = async() => {
    const rq = await api.blogs.list().then((res)=> {
      setData(res.results)
    })
  }

  useEffect(()=> {
    getData()
  }, [])

  const goDetailBlog = (id) => {
    navigate(`/blog/${id}`)
  }


  return(<>
    {data.map((blog)=> {
      return(<Col style={styles.colCard} xs={24} md={6} lg={6} xl={6}><Card bordered title={<Title level={5} style={styles.titleCard}>{blog.title}</Title>} style={styles.card} key={blog.id}>
          <Paragraph style={styles.titleCard}>
          {blog.description1 && blog.description2.slice(0,130)}...
          </Paragraph>
          <Button type='primary' style={styles.btn} onClick={()=>goDetailBlog(blog.id)}block>VER</Button>
        </Card></Col>)
    })}
    </>)
}


const styles = {
  btn: {
    backgroundColor: '#22075e'
  },
  colCard: {
    padding:'10px'
  },
  titleCard: {
    color: 'white',
    textAlign:'center'
  },
  card: {
    width: '100%',
    padding: window.innerWidth<900&&'20px',
    backgroundColor: 'rgb(87, 17, 165)',
    background:'linear-gradient(18deg, rgba(87,17,165,0.6993391106442577) 0%, rgba(87,17,165,0.9738489145658263) 44%', 
    color: 'white',
    borderColor: 'rgb(87, 17, 165)'
  }
}


export default List
