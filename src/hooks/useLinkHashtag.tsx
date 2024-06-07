import { useEffect, useState } from "react";

function useLinkHashtag() {
  const [linkHashtag, setLinkHashtag] = useState<string>();
  useEffect(() => {
    if (typeof window !== "undefined") {
      const url = window.location.href;
      const urlWithFragment = url.split("#")[0] + "#" + linkHashtag;
      window.history.replaceState({}, "", urlWithFragment);
    }
  }, [linkHashtag]);
  return {
    linkHashtag,
    setLinkHashtag,
  };
}

export default useLinkHashtag;
