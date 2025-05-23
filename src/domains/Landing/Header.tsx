"use client"

import { useEffect, useRef, useState } from "react"

import { StaggerAnimation } from "@/components/animations"
import { Icon } from "@/components/shared"
// import Link from "next/link"

export const Header = () => {
  const [scrollY, setScrollY] = useState(0)
  const [windowWidth, setWindowWidth] = useState(0)
  const [isDesctop, setIsDesctop] = useState(false)
  const requestRef = useRef<number | null>(null)
  const ticking = useRef(false)

  useEffect(() => {
    const updateScroll = () => {
      setScrollY(window.scrollY)
      ticking.current = false // 다시 다음 프레임에 업데이트하도록 풀어줍니다.
    }

    const handleScroll = () => {
      // 매 프레임마다 한 번씩만 실행하도록 제한
      if (!ticking.current) {
        requestRef.current = requestAnimationFrame(updateScroll)
        ticking.current = true
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => {
      window.removeEventListener("scroll", handleScroll)
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current)
      }
    }
  }, [])

  useEffect(() => {
    const handleResize = () => {
      setScrollY(window.scrollY)
      setWindowWidth(window.innerWidth)
    }

    if (typeof window !== "undefined") {
      handleResize()
      window.addEventListener("resize", handleResize)
      return () => {
        window.removeEventListener("resize", handleResize)
      }
    }
  }, [])

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setIsDesctop(true)
      } else {
        setIsDesctop(false)
      }
    }
    if (typeof window !== "undefined") {
      window.addEventListener("resize", handleResize)
      handleResize()
      return () => {
        window.removeEventListener("resize", handleResize)
      }
    }
  }, [])

  const scrollProgress = Math.min(scrollY / 400, 1)

  const isDesktop = windowWidth > 768

  const initialWidth = windowWidth * (isDesktop ? 0.7 : 0.9)
  const initilaTop = isDesktop ? 500 : 300
  const initialLeft = (windowWidth * (isDesktop ? 0.3 : 0.1)) / 2
  const initialGap = isDesktop ? 3 : 1.125

  const targerWidth = isDesctop ? 222 : 111
  const targetTop = 20
  const targetLeft = 20
  const targetGap = 0

  const bigLogoWidth = Math.floor(
    initialWidth - scrollProgress * (initialWidth - targerWidth)
  )
  const bigLogoTop = Math.floor(
    initilaTop - scrollProgress * (initilaTop - targetTop)
  )
  const bigLogoLeft = Math.floor(
    initialLeft - scrollProgress * (initialLeft - targetLeft)
  )
  const bigLogoGap = initialGap - scrollProgress * (initialGap - targetGap)

  return (
    <header className="z-[100] h-[450px] w-full bg-[#f2f2f2] md:h-[900px]">
      <div
        className="fixed z-[100] flex flex-col"
        style={{
          top: bigLogoTop,
          left: bigLogoLeft,
          gap: `${bigLogoGap}rem`,
        }}>
        <StaggerAnimation>
          <h1
            className="z-[100] flex origin-left items-center gap-4 md:text-[30px]"
            style={{
              opacity: 1 - scrollProgress * 2,
              transform: `scale(${1 - scrollProgress})`,
              height: 24 - scrollProgress * 24,
            }}>
            <span className="font-light">함께 더 멀리 달려요</span>
            <Icon icon="Line" alt="" width={40} />
            <span className="font-light">가이드런 프로젝트</span>
          </h1>
          <Icon
            icon="TextLogo"
            alt="TextLogo"
            width={bigLogoWidth}
            className="z-[100]"
            style={{ width: `${bigLogoWidth}px` }}
          />
        </StaggerAnimation>
      </div>
      {/* <Link
        href="/blog"
        className="fixed top-4 right-7 z-40 text-base md:top-3 md:text-2xl">
        Blog
      </Link> */}
    </header>
  )
}
