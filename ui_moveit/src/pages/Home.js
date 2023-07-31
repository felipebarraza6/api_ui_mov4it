import React, { useContext } from 'react';

import { Breadcrumb, Layout, theme, Row, Col } from 'antd'
import HeaderApp from '../components/home/HeaderApp'

import logo from "../assets/images/logo.png"
import { BrowserRouter, Routes, Route,  } from "react-router-dom"

import Courses from '../pages/Courses'
import Profile from '../pages/Profile'
import RetrieveCourse from '../components/courses/RetrieveCourse';
import Stage from '../components/courses/Stage';
import Blog from './Blog'
import DetailBlog from '../components/blogs/DetailBlog';
import { ElementResetPassword } from './Login';

const { Header, Content } = Layout

const { useToken } = theme

const Home = () => {

  const { token } = useToken() 
  
  return (
    <Layout>
      <BrowserRouter>
        <Header style={styles.header}>
          <Row >
            <Col style={styles.colImg} xs={24} sm={24} md={3} lg={3} xl={3}>
              <img src={logo} alt='logo' style={{marginTop:window.innerWidth>900&&'-10px'}} width={window.innerWidth > 800 ? '90%':'30%' } />
            </Col> 
            <Col xs={24} sm={24} md={3} lg={3} xl={21}>
              <HeaderApp />
            </Col>
          </Row>
        </Header>
        <Content style={styles.content}>
          <Routes>
            <Route path='/' element={<Courses />} />
            <Route path='/profile' element={<Profile />} />
            <Route path='/blog' element={<Blog />} />
            <Route exact path='/courses/:id/lesson/:idLesson' element={<RetrieveCourse />} />
            <Route exact path='/stages/:id' element={<Stage />} />
            <Route exact path='/blog/:id' element={<DetailBlog />} />
            <Route exact path="reset_password/:token/:email" element={<ElementResetPassword />} />
          </Routes>
        </Content>
      </BrowserRouter>
    </Layout>
  )
}

const styles = {
  content: {
    backgroundColor: 'white',
  },
  header: {
    backgroundColor: 'white',
    paddingBottom:window.innerWidth > 900 ?'0px':'120px',
  },
  colImg: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: '10px'
  },
  
}


export default Home
