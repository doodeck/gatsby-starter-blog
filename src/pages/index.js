import React from "react"
import { Link, graphql } from "gatsby"

import Bio from "../components/bio"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { rhythm } from "../utils/typography"

const BlogIndex = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata.title
  const posts = data.allFeedGatsbyBlog.edges

  return (
    <Layout location={location} title={siteTitle}>
      <SEO title="All posts" />
      <Bio />
      {posts.map(({ node }) => {
        const title = node.title || node.id
        return (
          <article key={node.id}>
            <header>
              <h3
                style={{
                  marginBottom: rhythm(1 / 4),
                }}
              >
                <Link style={{ boxShadow: `none` }} to={node.id}>
                  {title}
                </Link>
              </h3>
              <small>{node.pubDate}</small>
            </header>
            <section>
              <p
                dangerouslySetInnerHTML={{
                  __html: node.contentSnippet || node.content,
                }}
              />
            </section>
          </article>
        )
      })}
    </Layout>
  )
}

export default BlogIndex

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allFeedGatsbyBlog(sort: {fields: pubDate, order: DESC}) {
      edges {
        node {
          contentSnippet
          id
          pubDate
          title
          internal {
            contentDigest
          }
        }
      }
    }
  }
`
