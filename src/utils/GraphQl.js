import { request, gql } from "graphql-request"
import { GRAPGQL } from "@env"

const MASTER_URL = GRAPGQL

export const getCourseList = async (level) => {
  const query = gql`query CourseList {
  courses(where: {level: `+ level + `}) {
    id
    name
    price
    tags
    time
    author
    level
    chapters {
      id
      title
      content {
        heading
        description {
          markdown
          html
        }
        output {
          markdown
          html
        }
      }
    }
    description {
      markdown
    }
    banner{
      url
    }
  }
}`

  const result = await request(MASTER_URL, query)
  return result
}


export const getEnrolledCourse = async (courseId, userEmail) => {
  const query = gql`query MyQuery {
  userEnrolledCourses(
    where: {courseId: "`+ courseId + `", userEmail: "` + userEmail + `"}
  ) {
    id
    courseId
    completedChapter {
      chapterId
    }
  }
}`

  const result = await request(MASTER_URL, query)
  return result
}

export const enrollCourses = async (courseId, userEmail) => {
  const mutationQuery = gql`mutation myMutation {
  createUserEnrolledCourse(
    data: {courseId: "`+ courseId + `", course: {connect: {id: "` + courseId + `"}}, userEmail: "` + userEmail + `"}
  ) {
    id
  }
  publishManyUserEnrolledCoursesConnection {
    edges {
      node {
        id
      }
    }
  }
}
    `
  const result = await request(MASTER_URL, mutationQuery)
  return result
}

export const markChapterCompleted = async (chpaterId, enrolledCourseId, email, points) => {
  const mutationQuery = gql`mutation markChapterCompleting {
  updateUserEnrolledCourse(
    data: {completedChapter: {create: {data: {chapterId: "`+ chpaterId + `"}}}}
    where: {id: "`+ enrolledCourseId + `"}
  ) {
    id
  }
  publishManyUserEnrolledCoursesConnection {
    edges {
      node {
        id
      }
    }
  } 
  
  updateUserDetail(data: {point: ` + points + `}, where: {email: "` + email + `"}) {
    id
    point
  }
  publishUserDetail(where: {email: "`+ email + `"}) {
    id
  }
}`
  const result = await request(MASTER_URL, mutationQuery)
  return result
}

export const isChapterCompleted = async (enrolledCourseId) => {
  const mutationQuery = gql`query getCompleteChapterList {
  userEnrolledCourse(where: {id: "`+ enrolledCourseId + `"}) {
    completedChapter {
      id
    }
  }
}`
  const result = await request(MASTER_URL, mutationQuery)
  return result
}

export const createNewUser = async (userName, email, profileImage, points) => {
  const mutationQuery = gql`mutation CreateNewUser {
  upsertUserDetail(
    upsert: {create: {email: "`+ email + `", point: ` + Number(points) + `, profileImage: "` + profileImage + `", userName: "` + userName + `"}, update: {email: "` + email + `",profileImage: "` + profileImage + `", userName: "` + userName + `"}}
    where: {email: "`+ email + `"}
  ) {
    id
    point
  }
  publishUserDetail(where: {email: "`+ email + `"}) {
    id
  }
}`
  const result = await request(MASTER_URL, mutationQuery)
  return result
}

export const getUserPoints = async (email) => {
  const requestQuery = gql`query getPoints {
  userDetails(where: {email: "`+ email + `"}) {
    point
  }
}`
  const result = await request(MASTER_URL, requestQuery)
  return result
}

export const updateUserPoints = async (email, points) => {
  const requestQuery = gql`mutation updateUser {
  updateUserDetail(data: {point: `+ points + `}, where: {email: "` + email + `"}) {
    id
    point
  }
  publishUserDetail(where: {email: "`+ email + `"}) {
    id
  }
}`
  const result = await request(MASTER_URL, requestQuery)
  return result
}

export const getAllUserDetails = async () => {
  const requestQuery = gql`query getAllUser {
  userDetails(orderBy: point_DESC) {
    id
    profileImage
    userName
    point
  }
}`
  const result = await request(MASTER_URL, requestQuery)
  return result
}

export const getAllProgressCourse = async (email) => {
  const requestQuery = gql`query progressEnrolledCourses {
  userEnrolledCourses(where: {userEmail: "`+ email + `"}) {
    id
   completedChapter {
      chapterId
    }
    course {
     chapters {
      id
      title
      content {
        heading
        description {
          markdown
          html
        }
        output {
          markdown
          html
        }
      }
    }
    description {
      markdown
    }
    banner{
      url
    }
      description {
        markdown
        html
      }
      id
      name
      price
      time
      level
    }
  }
}
`
  const result = await request(MASTER_URL, requestQuery)
  return result
}

