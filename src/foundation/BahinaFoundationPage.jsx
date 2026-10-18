import React, { useState, useEffect } from "react"
import { FoundationNavbar } from "./components/FoundationNavbar"
import { FoundationHero } from "./components/FoundationHero"
import { AboutFoundation } from "./components/AboutFoundation"
import { ActiveCauses } from "./components/ActiveCauses"
import { CoreFocusAreas } from "./components/CoreFocusAreas"
import { ImpactNumbers } from "./components/ImpactNumbers"
import { StoriesOfChange } from "./components/StoriesOfChange"
import { CatalyzeChange } from "./components/CatalyzeChange"
import { CommunityVoices } from "./components/CommunityVoices"
import { NewsletterCta } from "./components/NewsletterCta"
import { FoundationFooter } from "./components/FoundationFooter"
import { DonationModal } from "./components/DonationModal"

export function BahinaFoundationPage({ onBackToMain }) {
  const [isDonateOpen, setIsDonateOpen] = useState(false)
  const [selectedCause, setSelectedCause] = useState(null)

  useEffect(() => {
    // Scroll to top on page load
    window.scrollTo({ top: 0, behavior: "instant" })
    
    // Set document title
    const prevTitle = document.title
    document.title = "BAHINA Foundation — Together, We Can Grow a Greener Tomorrow"
    return () => {
      document.title = prevTitle
    }
  }, [])

  const handleOpenDonate = () => {
    setSelectedCause(null)
    setIsDonateOpen(true)
  }

  const handleSelectCauseDonate = (cause) => {
    setSelectedCause(cause)
    setIsDonateOpen(true)
  }

  return (
    <div className="relative min-h-screen bg-[#FAF8F5] text-[#1A221E] font-sans selection:bg-[#3E9B63]/30 selection:text-[#0E2819] overflow-x-hidden">
      {/* 1. Top Sticky/Floating Navbar */}
      <FoundationNavbar
        onOpenDonate={handleOpenDonate}
        onBackToMain={onBackToMain}
      />

      {/* 2. Hero Section (Deep Forest Green with Script Highlight & Carousel) */}
      <FoundationHero onOpenDonate={handleOpenDonate} />

      {/* 3. About Section (Collage, Mission, Quote, 3 Stats) */}
      <AboutFoundation />

      {/* 4. Active Causes & Community Pledges (8 Campaign Cards + Filters) */}
      <ActiveCauses onSelectCauseDonate={handleSelectCauseDonate} />

      {/* 5. Core Focus Areas (4 Frosted Bento Pillars) */}
      <CoreFocusAreas />

      {/* 6. Impact Numbers (4 Big Stat Cards) */}
      <ImpactNumbers />

      {/* 7. Stories of Human Change (Featured Story + Secondary Dispatches) */}
      <StoriesOfChange />

      {/* 8. How We Catalyze Change (4-Step Grassroots Framework) */}
      <CatalyzeChange />

      {/* 9. Testimonials (Voices From Our Community) */}
      <CommunityVoices />

      {/* 10. Newsletter Subscription CTA */}
      <NewsletterCta />

      {/* 11. Foundation Footer */}
      <FoundationFooter
        onBackToMain={onBackToMain}
        onOpenDonate={handleOpenDonate}
      />

      {/* 12. Interactive Donation Modal */}
      <DonationModal
        isOpen={isDonateOpen}
        onClose={() => setIsDonateOpen(false)}
        initialCause={selectedCause?.title}
      />
    </div>
  )
}

export default BahinaFoundationPage
