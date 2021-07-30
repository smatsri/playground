import { useState } from "react"

const useOnlineXO = () => {
  const [x] = useState(0);
  return {
    x
  }
}

export default useOnlineXO;