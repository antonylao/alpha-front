// Source - https://stackoverflow.com/a/78109953
// Posted by Federico Baldini, modified by community. See post 'Timeline' for change history
// Retrieved 2026-02-17, License - CC BY-SA 4.0

import { useLayoutEffect } from "react";

export function Layout({ image, children }) {
  useLayoutEffect(() => {
    document.body.style.backgroundImage = `url(${image})`;
  }, []);

  return <>{children}</>
}

