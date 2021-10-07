import styled from "styled-components"

export const Container = styled.div``
export const ButtonGroup = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding-top: 21px;
  padding-bottom: 20px;
`
export const Buttons = styled.button`
  margin: 0 16px;
  height: 48px;
  width: 202px;
  background-color: gray;
  border-radius: 8px;
  text-decoration: none;
  border: none;
  cursor: pointer;

  span {
    font-family: "Mulish", sans-serif;
    font-style: normal;
    font-weight: 400;
    font-size: 20px;
    line-height: 25px;
    color: #fff;
  }
`
export const Loading = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`

export const Article = styled.div``

export const TextArticle = styled.div`
  flex: 0%;
  display: flex;
  justify-content: center;

  span {
    font-family: "Mulish", sans-serif;
    font-style: normal;
    font-weight: normal;
    font-size: 16px;
    line-height: 20px;
    color: #4c5667;
  }

  @media screen and (max-width: 1100px) {
    display: block;
    padding: 25px;
  }
`

export const Thumbnail = styled.img`
  max-width: 77px;
  height: 77px;
  margin: 12px;
  border-radius: 8px;
  flex: 0%;
`

export const FirstText = styled.h1`
  padding-top: 12px;
  font-family: "Mulish", sans-serif;
  font-style: normal;
  font-weight: 600;
  font-size: 20px;
  line-height: 25px;
  color: #000000;
`

export const LinkDomi = styled.div`
  display: flex;
  font-family: "Mulish", sans-serif;
  font-style: normal;
  font-weight: bold;
  font-size: 16px;
  line-height: 20px;
  padding-top: 9px;
`
