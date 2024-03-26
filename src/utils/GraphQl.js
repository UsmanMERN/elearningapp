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
        }
        output {
          markdown
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