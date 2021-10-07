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
  FinalButton,
  DivButton,
} from "./Style"
import { useEffect, useState } from "react"

import { Col, Divider, Row, Spin, Tooltip } from "antd"
import { format, formatDistance } from "date-fns"
import { ptBR } from "date-fns/locale"
import fromUnixTime from "date-fns/fromUnixTime"
import { LinkOutlined } from "@ant-design/icons/lib/icons"

function Body() {
  const [page, setPage] = useState("Hot")
  const [article, setArticle] = useState([])
  const [loading, setLoading] = useState(true)
  const [dist, setDist] = useState(null)

  useEffect(() => {
    fetch("https://www.reddit.com/r/reactjs.json").then((res) => {
      if (res.status !== 200) {
        console.log("ERROR")
        return
      }
      res.json().then((data) => {
        if (data != null) {
          setArticle(data.data.children)
          setDist(data.data.dist)
          console.log(data)
          setLoading(false)
          console.log(dist)
        }
      })
    })
  }, [])

  function changePageHot() {
    setPage("Hot")
    fetch("https://www.reddit.com/r/reactjs/hot.json").then((res) => {
      if (res.status !== 200) {
        console.log("ERROR")
        return
      }
      res.json().then((data) => {
        if (data != null) {
          setDist(data.data.dist)
          setArticle(data.data.children)
        }
      })
    })
  }

  function changePageNews() {
    setPage("News")
    fetch("https://www.reddit.com/r/reactjs/new.json").then((res) => {
      if (res.status !== 200) {
        console.log("ERROR")
        return
      }
      res.json().then((data) => {
        if (data != null) {
          setDist(data.data.dist)
          setArticle(data.data.children)
        }
      })
    })
  }

  function changePageRising() {
    setPage("Rising")
    fetch("https://www.reddit.com/r/reactjs/rising.json").then((res) => {
      if (res.status !== 200) {
        console.log("ERROR")
        return
      }
      res.json().then((data) => {
        if (data != null) {
          setDist(data.data.dist)
          setArticle(data.data.children)
        }
      })
    })
  }

  function loadMoreArticles() {
    if (page === "Hot") {
      changePageHot()
      fetch(
        `https://www.reddit.com/r/reactjs/hot.json?limit=${dist + 20}`
      ).then((res) => {
        if (res.status !== 200) {
          console.log("ERROR")
          return
        }
        res.json().then((data) => {
          if (data != null) {
            setDist(data.data.dist)
            console.log(dist)
            setArticle(data.data.children)
          }
        })
      })
    }
    if (page === "News") {
      console.log("Novo")
      fetch(
        `https://www.reddit.com/r/reactjs/new.json?limit=${dist + 20}`
      ).then((res) => {
        if (res.status !== 200) {
          console.log("ERROR")
          return
        }
        res.json().then((data) => {
          if (data != null) {
            setDist(data.data.dist)
            console.log(dist)
            setArticle(data.data.children)
          }
        })
      })
    }
    if (page === "Rising") {
      console.log("destaque")
      fetch(`https://www.reddit.com/r/reactjs/rising.json?limit=${50}`).then(
        (res) => {
          if (res.status !== 200) {
            console.log("ERROR")
            return
          }
          res.json().then((data) => {
            if (data != null) {
              setDist(data.data.dist)
              console.log(dist)
              setArticle(data.data.children)
            }
          })
        }
      )
    }
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
        <>
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
                          <FirstText>
                            {article.data.title}{" "}
                            <a href={article.data.url} target="_blank">
                              <LinkOutlined twoToneColor="#52c41a" />
                            </a>
                          </FirstText>
                          <Tooltip
                            title={format(
                              new Date(fromUnixTime(article.data.created)),
                              "'Dia' dd 'de' MMMM 'de' yyyy', às ' HH:mm'h'",
                              { locale: ptBR }
                            )}
                          >
                            <span>
                              Enviado há{" "}
                              {formatDistance(
                                new Date(fromUnixTime(article.data.created)),
                                new Date(),
                                {
                                  locale: ptBR,
                                }
                              )}{" "}
                              por{" "}
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
          <DivButton>
            {page === "Rising" ? (
              <FinalButton
                disabled
                style={{ backgroundColor: "gray", cursor: "unset" }}
              >
                <span>+ Ver mais</span>
              </FinalButton>
            ) : (
              <FinalButton
                onClick={() => {
                  loadMoreArticles()
                }}
              >
                <span>+ Ver mais</span>
              </FinalButton>
            )}
          </DivButton>
        </>
      )}
    </Container>
  )
}

export default Body
