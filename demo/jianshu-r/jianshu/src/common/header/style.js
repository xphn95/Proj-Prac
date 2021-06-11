import styled from "styled-components"
import logoPath from "../../static/logo.png"

export const HeaderWrapper = styled.div`
  position: relative;
  height: 56px;
  border-bottom: 1px solid #f0f0f0;
`
export const Logo = styled.a`
  position: absolute;
  top: 0;
  left: 0;
  width: 100px;
  height: 56px;
  /* 这样是不会显示图片的, 路径会被当作简单的字符串 */
  background: url(${logoPath});
  background-size: contain;
`

export const Nav = styled.div`
  position: relative;
  width: 945px;
  height: 100%;
  box-sizing: border-box;
  /* border: 1px solid #f00; */
  margin: 0 auto;
  padding: 0 80px 0 0;
  .focused {
    width: 250px;
    .iconfont.searchIcon {
      background-color: #777;
      color: #fff;
    }
  }
  .slide-enter {
    width: 160px;
    transition: all 0.2s ease-out;
  }
  .slide-enter-active {
    width: 250px;
  }
  .slide-exit {
    width: 250px;
    transition: all 0.2s ease-out;
  }
  .slide-exit-active {
    width: 160px;
  }
`

export const NavItem = styled.div`
  line-height: 56px;
  padding: 0 15px;
  font-size: 17px;
  color: #333;
  &.left {
    float: left;
  }
  &.right {
    float: right;
    color: #969696;
  }
  &.active {
    color: #ea6f5a;
  }
`

export const SearchWrapper = styled.div`
  position: relative;
  float: left;
  height: 100%;
  width: 160px;
  i.iconfont.searchIcon {
    position: absolute;
    top: 0;
    bottom: 0;
    right: -20px;
    margin: auto;
    width: 38px;
    height: 38px;
    line-height: 38px;
    border-radius: 30px;
    text-align: center;
  }
`

export const NavSearch = styled.input`
  position: absolute;
  top: 0;
  bottom: 0;
  margin: auto 20px;
  padding: 0 40px 0 20px;
  box-sizing: border-box;
  width: 100%;
  height: 38px;
  border: none;
  outline: none;
  border-radius: 19px;
  background: #eee;
  font-size: 14px;
  color: #666;
  &::placeholder {
    color: #999;
  }
`

export const SearchInfo = styled.div`
  position: absolute;
  left: 0;
  top: 56px;
  width: 240px;
  /* height: 300px; */
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.2);
  padding: 0 20px;
  margin-left: 20px;
  background-color: #fff;
`

export const SearchInfoTitle = styled.div`
  margin-top: 20px;
  margin-bottom: 15px;
  line-height: 20px;
  font-size: 14px;
  color: #969696;
`

export const SearchInfoChange = styled.span`
  float: right;
  font-size: 13px;
  cursor: pointer;
  /* 避免频繁点击选中文字 */
  user-select: none;
  .changeTag {
    display: block;
    float: left;
    font-size: 12px;
    margin-right: 2px;
    transition: all 0.2s ease-in;
    /* transform: rotate(0deg); */
    transform-origin: center center;
  }
`

export const SearchInfoItem = styled.a`
  display: block;
  float: left;
  line-height: 20px;
  padding: 0 5px;
  font-size: 12px;
  border: 1px solid #ddd;
  color: #787878;
  border-radius: 3px;
  margin-right: 10px;
  margin-bottom: 15px;
`

export const Addition = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  width: 260px;
  height: 100%;
`

export const Button = styled.a`
  float: right;
  /* width: 80px; */
  height: 39px;
  margin: 9px 20px 0;
  padding: 0 20px;
  box-sizing: border-box;
  line-height: 38px;
  border: none;
  border-radius: 20px;
  text-align: center;
  font-size: 14px;
  /* background: pink; */
  &:first-child {
    background-color: #ea6f5a;
    color: #fff;
    &:hover {
      background-color: #ec6149;
    }
  }
  &:last-child {
    border: 1px solid #ea6f5a;
    color: #ea6f5a;
  }
  &:hover {
    background-color: rgba(236, 97, 73, 0.05);
  }
`
