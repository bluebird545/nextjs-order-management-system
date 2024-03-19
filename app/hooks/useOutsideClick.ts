import { MutableRefObject, useEffect, useRef } from "react";

export type Ref = HTMLButtonElement

export default function useClickOutside(ref: MutableRefObject<Ref | null>, onClickOutside: () => void, listen: boolean) {
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as HTMLButtonElement)) onClickOutside()
    }

    // add event listener for outside clicks IF open
    if (listen) {
      document.addEventListener("mousedown", handleClickOutside)
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [ref, listen, onClickOutside])
}