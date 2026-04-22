import type { ReactNode } from 'react'

export type NavLink = {
  label: string
  href: string
}

export type MarqueeItem = {
  id: string
  content: ReactNode
}

export type MarqueeDirection = 'left' | 'right'

export type PortfolioItem = {
  id: string
  title: string
  imageUrl: string
  alt: string
}

export type InstructorSocialLink = {
  label: string
  href: string
  icon?: ReactNode
}
