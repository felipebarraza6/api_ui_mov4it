import React, { useContext, useEffect, useState } from "react";
import { Menu, Row, Col, Button } from 'antd'
import { BookOutlined, UserOutlined, LogoutOutlined, MessageOutlined, FolderOpenOutlined } from '@ant-design/icons'
import { AppContext } from '../../App'
import { useNavigate, useLocation } from "react-router-dom";

const HeaderApp = () => {
  let location = useLocation()

  const { state, dispatch } = useContext(AppContext)

  let navigate = useNavigate()
  const [selected, setSelected] = useState('1')

  const onSelectItem = (item) => {
    const key = item.key

    if(key === "1"){
      navigate('/')
      setSelected('1')
    } else if(key === "2"){
      navigate('/profile')
      setSelected('2')
    } else if(key === "3"){
      navigate('/blog')
      setSelected('3')
    } else if(key === "4"){
      navigate('/support')
      setSelected('4')
    } else if(item.key==="5"){
      dispatch({type:'LOGOUT'})
      navigate('/')
      setSelected('1')
    }
  }

  function getItem(label, key, icon, children, type) {
    return {
      key,
      icon,
      children,
      label,
      type,
    }
  }

  const items = [
    getItem('Programa formativo', '1', <BookOutlined />),
    getItem(`${state.user.email}`, '2', <UserOutlined />),
    //getItem('Blog', '3', <FolderOpenOutlined />),
    getItem('Salir', '5', <LogoutOutlined />),
  ]
  
  useEffect(()=>{
    if(location.pathname.slice(1)===''){
     setSelected('1')
    } else if(location.pathname.slice(1)==='profile'){
     setSelected('2')
   } else if(location.pathname.slice(1)==='blog'){
     setSelected('3')
   } else if(location.pathname.slice(1)==='support'){
     setSelected('4')
   } else if(location.pathname.slice(1)==='courses'){
     setSelected('1')
   } else if(location.pathname.slice(1,6)==='blog/')
     setSelected('3')
  },[])

  return (<>
    {window.innerWidth > 900 ?
    <Menu 
      onClick={onSelectItem}
      style={styles.menu}
      mode={'horizontal'}    
      selectedKeys={[selected]}
         items={items} />:

    <Row justify={'space-around'}>
      <Col>
          <Button onClick={()=>onSelectItem({key:'1'})} type={selected ==='1'?'primary':'ghost'} shape='circle'>
            <BookOutlined  />
        </Button>
      </Col>
      <Col>
        <Button onClick={()=>onSelectItem({key:'2'})} type={selected ==='2'?'primary':'ghost'} shape='circle'>
          <UserOutlined />      
        </Button>
        </Col>
      <Col>
        <Button onClick={()=>onSelectItem({key:'3'})} type={selected ==='3'?'primary':'ghost'} shape='circle'>
          <FolderOpenOutlined />      
        </Button>
      </Col>
      <Col>
        <Button onClick={()=>onSelectItem({key:'5'})} type={'ghost'} shape='circle'>
          <LogoutOutlined />
        </Button>
      </Col>
    </Row>}
    </>)
}

const styles = {
  menu: {
    display: 'flex',
    justifyContent: 'end',
    alignItems:'center'
  }
}


export default HeaderApp
