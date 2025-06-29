
import * as React from "react"

const MOBILE_BREAKPOINT = 768
const TABLET_BREAKPOINT = 1024

export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState<boolean | undefined>(undefined)

  React.useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
    }
    
    // Initial check
    checkMobile()
    
    // Add event listener for resize
    window.addEventListener("resize", checkMobile)
    
    // Cleanup
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  return !!isMobile
}

export function useIsTablet() {
  const [isTablet, setIsTablet] = React.useState<boolean | undefined>(undefined)

  React.useEffect(() => {
    const checkTablet = () => {
      setIsTablet(window.innerWidth >= MOBILE_BREAKPOINT && window.innerWidth < TABLET_BREAKPOINT)
    }
    
    // Initial check
    checkTablet()
    
    // Add event listener for resize
    window.addEventListener("resize", checkTablet)
    
    // Cleanup
    return () => window.removeEventListener("resize", checkTablet)
  }, [])

  return !!isTablet
}

export function useIsPortrait() {
  const [isPortrait, setIsPortrait] = React.useState<boolean>(false)

  React.useEffect(() => {
    const checkOrientation = () => {
      setIsPortrait(window.innerHeight > window.innerWidth)
    }
    
    // Initial check
    checkOrientation()
    
    // Add event listener for resize
    window.addEventListener("resize", checkOrientation)
    
    // Cleanup
    return () => window.removeEventListener("resize", checkOrientation)
  }, [])

  return isPortrait
}

export function useIsIOSDevice() {
  const [isIOS, setIsIOS] = React.useState(false)

  React.useEffect(() => {
    // Check for iOS devices
    const checkIOS = () => {
      const userAgent = window.navigator.userAgent.toLowerCase()
      return /iphone|ipad|ipod|macintosh/.test(userAgent) && 'ontouchend' in document
    }
    
    setIsIOS(checkIOS())
  }, [])

  return isIOS
}
