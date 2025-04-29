import { useEffect, useState } from "react";
import Button from "../common/Button";

interface Props {
  onCompleted: (address: string) => void;
}

const SCRIPT_URL =
  "//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js";

function FindAddress({ onCompleted }: Props) {
  const [isScriptLoaded, setIsScriptLoaded] = useState(false);

  useEffect(() => {
    const existingScript = document.querySelector(
      `script[src="${SCRIPT_URL}"]`
    );
    if (!existingScript) {
      const script = document.createElement("script");
      script.src = SCRIPT_URL;
      script.async = true;
      script.onload = () => setIsScriptLoaded(true); // 스크립트 로드 후 상태 설정
      document.head.appendChild(script);
      return () => {
        document.head.removeChild(script);
      };
    } else {
      setIsScriptLoaded(true); // 이미 있다면 바로 로딩 상태로
    }
  }, []);

  const handleOpen = () => {
    if (!isScriptLoaded || !window.daum?.Postcode) {
      alert("주소찾기 서비스를 로딩 중입니다. 잠시 후 다시 시도해주세요.");
      return;
    }

    new window.daum.Postcode({
      oncomplete: (data: any) => {
        const fullAddress = data.address;
        onCompleted(fullAddress);
      },
    }).open();
  };

  return (
    <Button type="button" size="medium" scheme="normal" onClick={handleOpen}>
      주소 찾기
    </Button>
  );
}

export default FindAddress;
