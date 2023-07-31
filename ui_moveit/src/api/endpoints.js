import { POST_LOGIN, GET, POST, DELETE, PATCH } from "./config"


const loginUser = async(data) =>{
    const rq = await POST_LOGIN('auth/users/login/', {
        email: data.email,
        password: data.password
    })
    return rq.data
}

const userRetrieve = async(user) => {
  const rq = await GET(`auth/users/${user}/`)
  return rq.data
}

const userUpdate = async(user, data) => {
  const rq = await PATCH(`auth/users/${user}/`, data)
  return rq.data
}

const signUp = async(data) => {
  const rq = await POST_LOGIN('auth/users/signup/', data)
  return rq.data
}

const listCourses = async(stage) => {
  const rq = await GET(`/courses/?stage=${stage}`)
  return rq.data.results
}

const retrieveCourse = async(id) => {
  const rq = await GET(`/courses/${id}/`)
  return rq.data
}

const resetPassword = async(data) => {
  const rq = await POST('auth/users/reset_password/', data)
  return rq
}

const listBlogs = async()=> {
  const rq = await GET('/blogs/')
  return rq.data
}

const retrieveBlog = async(id) => {
  const rq = await GET(`/blogs/${id}/`)
  return rq.data
}

const retrieveLesson = async(id) => {
  const rq = await GET(`/lessons/${id}/`)
  return rq.data
}

const listComments = async({id_course, id_lesson, id_user}) => {
  const rq = await GET(`/comments/?course=${id_course ? id_course:''}&lesson=${id_lesson ? id_lesson:''}&user=${id_user ? id_user: ''}`)
  return rq.data
}

const createComment = async(values) => {
  const rq = await POST('/comments/', values)
  return rq.data
}

const markViewContent = async(values) => {
  const rq = await POST('/view_contents/', values)
  return rq.data
}

const deleteViewContent = async(id) => {
  const rq = await DELETE(`/view_contents/${id}/`)
  return rq.data
}

const listQuestions = async(courseId) => {
  const rq = await GET(`/questions/?course=${courseId}`)
  return rq.data
}

const createApprovedCourse = async(data) => {
  const rq = await POST('/approved_courses/', data)
  return rq.data
}

const resetPasswordPage = async(data)=> {
  const rq = await POST('/password_reset/confirm/', data)
  return rq.data
}

const resetPasswordLogin = async(data)=> {
  console.log(data)
  data = {
    email:data
  }
  const rq = await POST('/password_reset/', data)
  return rq.data
}

const listStages = async()=> {
  const rq = await GET('/stages/')  
  return rq.data
}

const retrieveStage = async(id) => {
  const rq = await GET(`/stages/${id}/`)
  return rq.data
}


const api = {
  authentication: {
    login: loginUser,
    signup: signUp,
    retrieve: userRetrieve,
    update: userUpdate,
    reset_password: resetPassword,
    recovery_password: resetPasswordPage,
    request_recovery: resetPasswordLogin
  },
  view_content: {
    create: markViewContent,
    delete: deleteViewContent
  },
  courses: {
    stages: {
      list: listStages,
      retrieve: retrieveStage
    },
    list: listCourses,
    retrieve: retrieveCourse,
    lessons: {
      retrieve: retrieveLesson
    },
    approved_courses: {
      create: createApprovedCourse
    },
    questions: {
      list: listQuestions
    }
  },
  blogs: {
    list: listBlogs,
    retrieve: retrieveBlog
  },
  comments: {
    create: createComment,
    list: listComments
  }
}

export default api
