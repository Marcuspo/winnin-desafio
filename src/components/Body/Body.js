import {
  Container,
  ButtonGroup,
  Buttons,
  Article,
  TextArticle,
  Thumbnail,
  FirstText,
  LinkDomi,
  Loading,
} from "./Style"
import { useEffect, useState } from "react"

import { fromUnixTime } from "date-fns"

import { Col, Divider, Row, Spin, Tooltip } from "antd"

function Body() {
  const [page, setPage] = useState("Hot")
  const [article, setArticle] = useState([])
  const [loading, setLoading] = useState(true)
  const [date, setDate] = useState(null)

  useEffect(() => {
    fetch("https://www.reddit.com/r/reactjs.json").then((res) => {
      if (res.status !== 200) {
        console.log("ERROR")
        return
      }
      res.json().then((data) => {
        if (data != null) {
          setArticle(data.data.children)
          console.log(data)
          setLoading(false)
        }
      })
    })
  }, [])

  useEffect(() => {}, [])

  function changePageHot(e) {
    setPage("Hot")
  }
  function changePageNews() {
    setPage("News")
  }
  function changePageRising() {
    setPage("Rising")
  }

  return (
    <Container>
      <ButtonGroup>
        {page === "Hot" ? (
          <Buttons
            onClick={changePageHot}
            style={{ backgroundColor: "#6324C6" }}
          >
            <span>Hot</span>
          </Buttons>
        ) : (
          <Buttons onClick={changePageHot}>
            <span>Hot</span>
          </Buttons>
        )}

        {page === "News" ? (
          <Buttons
            onClick={changePageNews}
            style={{ backgroundColor: "#6324C6" }}
          >
            <span>News</span>
          </Buttons>
        ) : (
          <Buttons onClick={changePageNews}>
            <span>News</span>
          </Buttons>
        )}

        {page === "Rising" ? (
          <Buttons
            onClick={changePageRising}
            style={{ backgroundColor: "#6324C6" }}
          >
            <span>Rising</span>
          </Buttons>
        ) : (
          <Buttons onClick={changePageRising}>
            <span>Rising</span>
          </Buttons>
        )}
      </ButtonGroup>

      {loading ? (
        <Loading>
          <Spin tip="Loading..." />
        </Loading>
      ) : (
        <Article>
          {article != null
            ? article.map((article, index) => (
                <>
                  <Divider style={{ marginTop: 13, marginBottom: 13 }} />
                  <Row>
                    <TextArticle key={index}>
                      <Col span={2}>
                        {article.data.thumbnail === "self" ||
                        article.data.thumbnail === "default" ? (
                          <Thumbnail src="/error.png" />
                        ) : (
                          <Thumbnail src={article.data.thumbnail} />
                        )}
                      </Col>
                      <Col span={22}>
                        <FirstText>{article.data.title}</FirstText>
                        <Tooltip title={article.data.created}>
                          <span>
                            Enviado há **horas** por{" "}
                            <span style={{ color: "#6324C6" }}>
                              {article.data.author}
                            </span>
                          </span>
                        </Tooltip>
                        <LinkDomi>{article.data.domain}</LinkDomi>
                      </Col>
                    </TextArticle>
                  </Row>
                </>
              ))
            : ""}
        </Article>
      )}
    </Container>
  )
}

export default Body
