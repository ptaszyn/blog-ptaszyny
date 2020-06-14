/**
 * Bio component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import { useStaticQuery, graphql } from "gatsby"

import { rhythm } from "../utils/typography"

const Bio = () => {
  const data = useStaticQuery(graphql`
    query BioQuery {
      site {
        siteMetadata {
          author {
            name
          }
          social {
            linkedin
            github
          }
        }
      }
    }
  `)

  const { author, social } = data.site.siteMetadata
  return (
    <div
      style={{
        display: `flex`,
        marginBottom: rhythm(2.5),
      }}
    >
      <p>
        Blog stara się tworzć <strong>{author.name}</strong> który to kręci się
        na trzepaku w stolycy. W deszczowe dni szukaj go na{` `}
        <a href={`https://www.linkedin.com/${social.linkedin}`}>
          LinkedIn
        </a> i <a href={`https://github.com/${social.github}`}>GitHub</a>.
      </p>
    </div>
  )
}

export default Bio
