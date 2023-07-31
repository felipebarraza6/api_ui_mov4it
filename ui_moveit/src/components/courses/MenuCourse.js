import React, { useContext } from 'react'
import { Menu } from 'antd'
import { MinusCircleOutlined, CheckCircleOutlined, 
        ArrowLeftOutlined, InfoCircleFilled, EditFilled,
        SafetyCertificateFilled, 
        CheckCircleFilled} from '@ant-design/icons'
import { useNavigate, useParams } from 'react-router-dom'
import { AppContext } from '../../App'

const MenuCourse = ({lessons, setIsViewLesson, course}) => {
  
  const { state } = useContext(AppContext)
  const navigate = useNavigate()
  const params = useParams()
  
  function getItem(label, key, icon, children, type, disabled) {
    return {
      key,
      icon,
      children,
      label,
      type,
      disabled
    };
  }


    const getItems = () => {
      const list =[]
      let allViews = 0 
      list.push(getItem('Descripción del curso', `${0}`, <InfoCircleFilled style={styles.iconInfo} />))
      lessons.map((lesson)=> {
          var is_view = false
          if(state.profile.lessons_view.length > 0){
            for (let j = 0; j < state.profile.lessons_view.length; j++) {
              if (state.profile.lessons_view[j].lesson_id === lesson.id) {
                is_view = true
                allViews = allViews + 1
                setIsViewLesson(true)
              } else {
                is_view = false
                setIsViewLesson(false)
              }
            }
          }          
          list.push(getItem(lesson.title, '', <></>,                         
            lesson.lessons.map((x)=> {
              
              return(getItem(x.name, `${x.id}`, is_view ?<CheckCircleFilled style={styles.iconInfo} />:<MinusCircleOutlined />, ''))
            })),)          
      })      
      if(allViews===lessons.length){
        if(course.approved){
          list.push(getItem('Ver certificado', `test`, <SafetyCertificateFilled style={styles.iconInfo} />))
        } else {

        list.push(getItem('Realizar Test', `test`, <EditFilled style={styles.iconInfo} />))
        }
      } else {
        list.push(getItem('Realizar Test', `test`, <EditFilled style={styles.iconInfo} />, '', '', true))
      }
        list.push(getItem(`Voler a la Etapa ${course.stage.prefix}`, `courses`, <ArrowLeftOutlined style={styles.iconInfo} />))
      return(list)
  }

  const onClick= (e) => {
    if(e.key==='0'){
      navigate(`/courses/${params.id}/lesson/index`)
    } else if(e.key==='test'){
      navigate(`/courses/${params.id}/lesson/test`)
    } else if(e.key==='courses'){
      navigate(`/stages/${course.stage.id}`)
    } else {
      navigate(`/courses/${params.id}/lesson/${e.key}`)
    }
  }

  return(<>{lessons && <Menu mode='inline' selectedKeys={[params.idLesson === 'index'?'0':params.idLesson]} onClick={onClick} items={getItems()} />}</>)
}

const styles = {
  iconInfo : {
    color: '#5711a5'
  }
}

export default MenuCourse
