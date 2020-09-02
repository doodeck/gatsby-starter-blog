const path = require(`path`)
const { createFilePath } = require(`gatsby-source-filesystem`)

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions

  const blogPost = path.resolve(`./src/templates/blog-post.js`)
  const result = await graphql(
    `
{
  allFeedGatsbyBlog(sort: {fields: pubDate, order: DESC}) {
    edges {
      node {
        id
        title
      }
    }
  }
}
`
  )

  if (result.errors) {
    throw result.errors
  }

  // Create blog posts pages.
  // const posts = result.data.allMarkdownRemark.edges
  const posts = result.data.allFeedGatsbyBlog.edges

  posts.forEach((post, index) => {
    const previous = index === posts.length - 1 ? null : posts[index + 1].node
    const next = index === 0 ? null : posts[index - 1].node

    createPage({
      path: '/' + post.node.id,
      component: blogPost,
      context: {
        id: post.node.id,
        previous,
        next,
      },
    })
  })
}

