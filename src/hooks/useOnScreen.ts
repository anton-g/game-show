import { MutableRefObject, useEffect, useState } from 'react'

export function useOnScreen(
  ref: MutableRefObject<HTMLElement>,
  { rootMargin = '0px', threshold = 0 }
) {
  // State and setter for storing whether element is visible
  const [isIntersecting, setIntersecting] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // Update our state when observer callback fires
        setIntersecting(entry.isIntersecting)
      },
      {
        threshold,
        rootMargin,
      }
    )
    const el = ref.current
    if (el) {
      observer.observe(el)
    }
    return () => {
      observer.unobserve(el)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return isIntersecting
}
