import { createGlobalStyle } from "styled-components"
import iconfontWoff2 from "./iconfont.woff2"
import iconfontWoff from "./iconfont.woff"
import iconfontTtf from "./iconfont.ttf"

export const IconStyle = createGlobalStyle`
  @font-face {
    font-family: "iconfont"; /* Project id 2568602 */
    src: url('${iconfontWoff2}?t=1622956216875') format('woff2'),
        url('${iconfontWoff}?t=1622956216875') format('woff'),
        url('${iconfontTtf}?t=1622956216875') format('truetype');
  }

  .iconfont {
    font-family: "iconfont" !important;
    font-size: 16px;
    font-style: normal;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  /* .icon-Aa:before {
    content: "\\e636";
  }

  .icon-fangdajing:before {
    content: "\\e662";
  }

  .icon-line-quillpenyumaobi:before {
    content: "\\e6eb";
  } */
`
