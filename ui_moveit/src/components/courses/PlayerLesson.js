import React, { useEffect, useState, useContext } from "react";
import YouTube from "react-youtube";
import { Row, Col, Typography, 
        Button, Segmented, notification,
        Tag } from "antd";
import {
  DownloadOutlined,
  CheckOutlined,
  PlayCircleOutlined,
  PauseCircleOutlined,
  ArrowLeftOutlined,
  CheckCircleFilled,
} from "@ant-design/icons";
import { BASE_URL } from "../../api/config";
import Comments from "../comments/Comments";
import { useTimer } from "react-timer-hook";
import { useNavigate } from "react-router-dom";
import api from "../../api/endpoints";
import { AppContext } from "../../App";

const { Title, Paragraph } = Typography;

const PlayerLesson = ({ lesson, is_view_lesson }) => {
  const navigate = useNavigate();
  const { state, dispatch } = useContext(AppContext)
  const [course, setCourse] = useState(null)

  const [playTimmer, setPlayTimmer] = useState(false);
  const [isViewLesson, setIsViewLesson] = useState(is_view_lesson);
  const [optSegment, setOptSegment] = useState('Preguntas')
  const time = new Date();

  function convertToSeconds(timeString) {
    const time = timeString.split(":").map(Number);
    const hoursInSeconds = time[0] * 3600;
    const minutesInSeconds = time[1] * 60;
    const seconds = time[2];
    return hoursInSeconds + minutesInSeconds + seconds;
  }

  const { seconds, minutes, hours, isRunning, start, pause } = useTimer({
    expiryTimestamp: time.setSeconds(
      time.getSeconds() + convertToSeconds(lesson.minimum_time)
    ),
    autoStart: false,
    onExpire: () => setPlayTimmer(true),
  });

  const opts = {
    height: "500px",
    width: "100%",
    playerVars: {
      autoplay: 0,
      rel: 0,
      showinfo: 0,
    },
  };


  const onPlay = () => {
    start();
  };

  const onPause = () => {
    pause();
  };

 
  const markViewLesson = async() => {
    const rq = await api.view_content.create({
      student: state.user.id,
      lesson: lesson.id,
      is_lesson: true
    }).then((r)=> {
      notification.success({message:'CLASE VISTA CORRECTAMENTE', placement:'center'})
      setIsViewLesson(true)
      dispatch({
        type: 'UPDATE_COUNT'
      })
    }) 
  }
  
  const getData=async() => {
    const rq = await api.courses.retrieve(lesson.course).then((r)=> {
      console.log(r)
      setCourse(r)
    })
  }

  useEffect(()=> {
    getData()
  },[])

  return (
    <Row justify="space-between" style={{ height:'90vh' ,paddingTop:'20px'}} >
      
      <Col xs={24} xl={15}>
        <YouTube
          onPause={onPause}
          onPlay={onPlay}
          autoplay={false}
          opts={opts}
          videoId={lesson.video_url}
        />
      </Col>
      <Col xs={24} xl={9} style={styles.cols.resources}>
        <Row>
    <Col span={24}>
<Title level={5} style={styles.titleHead}>
    {!isViewLesson && 'Tiempo minimo en está clase: '} {hours < 10 ? `0${hours}` : hours}:
              {minutes < 10 ? `0${minutes}` : minutes}:
              {seconds < 10 ? `0${seconds}` : seconds}
              {isRunning ? (
                <PlayCircleOutlined
                  style={{ color: "white", fontSize: "20px", marginLeft:'10px' }}
                />
                ) : (
                <>
                {playTimmer ? (
                  <CheckCircleFilled
                    style={{ color: "white", fontSize: "20px", marginLeft: '10px' }}
                  />
                  ) : (
                  <PauseCircleOutlined
                    style={{ color: "white", fontSize: "20px", marginLeft: '10px' }}
                  />
                )}
              </>
            )}
            </Title>
          </Col>
          <Col span={24} style={{marginBottom: '10px'}}>
            <Segmented options={['Preguntas', 'Recursos']} onChange={(e)=>setOptSegment(e)} block />
          </Col>
          <Col span={24} >
            {optSegment === 'Preguntas' ? 
            <Comments course={course} id_lesson={lesson.id} />:
<>
{lesson.resources.map((resource, index) => (
              <a
                key={index}
                href={`${BASE_URL.slice(0, 21)}${resource.file}`}
                target="__blank"
              >
                <Button
                  type="primary"
                  key={index}
                  style={styles.cols.resources.btnResource}
                  icon={<DownloadOutlined />}
                >
                  {resource.name.length < 5
                    ? resource.name
                    : `${resource.name.slice(0, 100)}`}
                </Button>
              </a>
            ))}

              </>
          }
          </Col>
        </Row>
      </Col>
      <Col xs={24} xl={15}>
      {!isViewLesson ? <>
        {playTimmer && 
          <Button
            icon={<CheckOutlined />}
            onClick={markViewLesson}
            type="primary"
            style={styles.btnCheckLesson}
          >
            Marcar clase como vista
          </Button>
        }
        </>:<Tag color='purple'>Has visto está clase</Tag>}
      </Col>
      <Col xs={24} xl={15}>

        <Paragraph style={styles.paragraph}>{lesson.description}</Paragraph>
        
              </Col>
    </Row>
  );
};

const styles = {
  btnCheckLesson: {
    backgroundColor: "#120338",
    borderColor: "#120338",
    marginRight: "10px",
  },
  containerNav: {
    marginBottom: "30px",
    marginTop: "10px",
  },
  paragraph: {
    color: "white",
    textAlign: "justify",
    marginTop: "10px",
    textIndent: "20px",
  },
  titleHead: {
    color: "white",
    textAlign:'right'
  },
  title: {
    color: "white",
    marginTop: "10px",
  },
  cols: {
    resources: {
      padding: "0px 10px 0px 10px",
      btnResource: {
        margin: "5px",
        borderColor: "#120338",
      },
    },
  },
};

export default PlayerLesson;
