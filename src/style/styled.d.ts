import "styled-components";
import { light } from "./theme"; // theme 파일 경로에 맞게 조절해줘

type Theme = typeof light;

declare module "styled-components" {
  export interface DefaultTheme extends Theme {}
}
