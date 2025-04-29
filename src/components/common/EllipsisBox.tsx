import { useState } from "react";
import styled from "styled-components";
import Button from "./Button";
import { FaAngleDown } from "react-icons/fa";

interface Props {
  children: React.ReactNode;
  linelimit: number;
}

function EllipsisBox({ children, linelimit }: Props) {
  const [expanded, setExpanded] = useState(false);

  return (
    <EllipsisBoxStyle linelimit={linelimit} $expanded={expanded}>
      <h1>{children}</h1>
      <div className="toggle">
        <Button
          size="small"
          scheme="normal"
          onClick={() => setExpanded(!expanded)}
        >
          {expanded ? "접기" : "펼치기"} <FaAngleDown />
        </Button>
      </div>
    </EllipsisBoxStyle>
  );
}

interface EllipsisBoxStyleProps {
  linelimit: number;
  $expanded: boolean;
}

const EllipsisBoxStyle = styled.div<EllipsisBoxStyleProps>`
  p {
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: ${({ linelimit, $expanded }) =>
      $expanded ? "none" : linelimit};
    =webkit-box-orient: vertical;
    overflow: hidden;
    paddig: 20px 0 0 0;
    margin: 0;
  }

  .toggle {
    display: flex;
    justify-content: end;
    svg {
      transform: ${({ linelimit, $expanded }) =>
        $expanded ? "rotate(180deg)" : "rotate(0)"};
    }
  }
`;

export default EllipsisBox;
