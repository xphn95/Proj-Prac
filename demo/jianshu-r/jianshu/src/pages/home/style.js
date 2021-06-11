import styled from "styled-components"

export const HomeWrapper = styled.div`
  width: 960px;
  margin: 0 auto;
  /* height: 300px; */
  overflow: hidden;
  /* background-color: #eaeaea; */
`

export const HomeLeft = styled.div`
  margin-left: 15px;
  padding-top: 30px;
  width: 625px;
  float: left;
  .banner-image {
    width: 625px;
    height: 270px;
  }
`

export const HomeRight = styled.div`
  width: 280px;
  padding-top: 30px;
  float: right;
`

//! topic

export const TopicWrapper = styled.div`
  padding: 20px 0 10px;
  overflow: hidden;
  margin-left: -18px;
  border-bottom: 1px solid #dcdcdc;
`

export const TopicItem = styled.div`
  float: left;
  background-color: #f7f7f7;
  height: 32px;
  line-height: 32px;
  font-size: 14px;
  color: #000;
  border: 1px solid #dcdcdc;
  border-radius: 4px;
  padding-right: 10px;
  margin-left: 18px;
  margin-bottom: 18px;
  .topic-item-img {
    display: block;
    float: left;
    margin-right: 10px;
    height: 32px;
  }
`

//! list

export const ListItem = styled.div`
  position: relative;
  padding: 15px 2px 20px 0;
  width: 623px;
  height: 124px;
  border-bottom: 1px solid #f0f0f0;
  margin-bottom: 15px;
  color: #333;
  font-size: 17px;
  line-height: 20px;
  .list-item-img {
    display: block;
    position: absolute;
    top: 50%;
    margin-top: -60px;
    /* bottom: 0; */
    right: 0;
    width: 150px;
    height: 100px;
    border-radius: 4px;
    /* margin: auto; */
  }
  .list-item-img:hover {
    cursor: pointer;
  }
`

export const ListInfo = styled.div`
  width: 458px;
  h3 {
    font-weight: 700;
    font-size: 18px;
    line-height: 27px;
    margin-top: -7px;
    margin-bottom: 4px;
    &:hover {
      text-decoration: underline;
      cursor: pointer;
    }
  }
  p {
    font-size: 13px;
    color: #999;
    margin-bottom: 8px;
  }
  .item-meta {
    height: 20px;
    color: #b4b4b4;
    font-size: 12px;
    a {
      text-decoration: none;
      color: #b4b4b4;
      transform: all 0.1s ease-in;
    }
    a:hover {
      color: #787878;
    }
    span:first-child {
      color: #ea6f5a;
    }
    & > * {
      position: relative;
      /* margin-left: 15px; */
      margin-right: 10px;
      font-size: 12px;
      line-height: 12px;
      vertical-align: baseline;
      .iconfont {
        position: absolute;
        top: 0;
        bottom: 0;
        margin: auto;
        width: 12px;
        height: 12px;
      }
    }
  }
`

//! recommend

export const RecommendItemWrapper = styled.div`
  padding-bottom: 4px;
`

export const RecommendItem = styled.a`
  display: block;
  margin-bottom: 6px;
  height: 50px;
  img {
    height: 50px;
  }
`

export const APPQRCode = styled.div`
  position: relative;
  width: 234px;
  height: 60px;
  padding: 10px 22px;
  margin-bottom: 30px;
  border: 1px solid #f0f0f0;
  border-radius: 6px;
  cursor: pointer;
  .QRCodeHover {
    position: absolute;
    bottom: 113%;
    left: 50%;
    transform: translate(-50%, 0);
    opacity: 0;
    transition: all 0.2s ease-in;
    box-sizing: border-box;
    width: 184px;
    height: 184px;
    padding: 16px;
    border: 1px solid #a0a0a0;
    border-radius: 8px;
    box-shadow: -1px 1px 8px 1px rgba(0, 0, 0, 0.5);
    background-color: #fff;
    img {
      width: 100%;
      height: 100%;
    }
    i {
      position: absolute;
      display: block;
      top: 96%;
      left: 50%;
      transform: translate(-50%, 0) rotate(-45deg);
      width: 15px;
      height: 15px;
      border-left: 1px solid #aaa;
      border-bottom: 1px solid #aaa;
      background-color: #fff;
    }
  }
  &:hover .QRCodeHover {
    opacity: 1;
  }
  a {
    display: block;
    width: 100%;
    height: 100%;
    & > * {
      vertical-align: middle;
    }
    img {
      display: inline-block;
      width: 60px;
      opacity: 0.85;
    }
    .info {
      display: inline-block;
      margin-left: 7px;
      .title {
        font-size: 15px;
        color: #333;
        i.iconfont {
          font-size: 12px;
        }
      }
      .desc {
        margin-top: 4px;
        font-size: 13px;
        color: #999;
      }
    }
  }
`

//! writer

export const WriterHeader = styled.div`
  overflow: hidden;
  color: #969696;
  font-size: 14px;
  .left {
    float: left;
  }
  .right {
    float: right;
    cursor: pointer;
    i.iconfont {
      display: inline-block;
      margin-right: 2px;
      transform: rotate(60deg);
      transition: all 0.5s ease-in;
    }
  }
`

export const WriterList = styled.ul`
  list-style: none;
  li {
    display: block;
    margin-top: 15px;
    overflow: hidden;
    a {
      text-decoration: none;
    }
    a.pic {
      margin-right: 10px;
      float: left;
      img {
        display: block;
        width: 48px;
        height: 48px;
        border-radius: 50%;
      }
    }
    a.follow {
      display: block;
      float: right;
      color: #42c02e;
      font-size: 13px;
      line-height: 24px;
      i.iconfont {
        display: inline-block;
        font-size: 12px;
        font-weight: 500;
        margin-right: 2px;
        vertical-align: bottom;
      }
    }
    a.writerName {
      display: block;
      width: 220px;
      height: 20px;
      padding-top: 5px;
      color: #333;
      font-size: 14px;
    }
    p {
      width: 100%;
      margin-top: 2px;
      margin-bottom: 10px;
      font-size: 12px;
      color: #969696;
    }
  }
`

export const ShowAll = styled.a`
  display: block;
  padding: 7px 7px 7px 12px;
  margin-top: 20px;
  height: 19px;
  line-height: 19px;
  text-align: center;
  font-size: 13px;
  border: 1px solid #dcdcdc;
  color: #787878;
  background-color: #f7f7f7;
  cursor: pointer;
  i.iconfont {
    display: inline-block;
    font-size: 12px;
    width: 12px;
    height: 13px;
    margin-left: 3px;
  }
`
