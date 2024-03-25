import { request, gql } from "graphql-request"


const MASTER_URL = 'https://api-ap-south-1.hygraph.com/v2/clu5rdkj40bl207w61zuc8arh/master'

export const getCourseList = async () => {
    const query = gql`query CourseList {
  courses(where: {level: Basic}) {
    id
    name
    price
    tags
    time
    author
    chapters {
      id
    }
    banner{
      url
    }
  }
}`

    const result = await request(MASTER_URL, query)
    return result
}