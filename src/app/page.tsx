import HeroSection from '@/components/home/HeroSection'
import BookingForm from '@/components/home/BookingForm'
import PromotionsSection from '@/components/home/PromotionsSection'
import FeaturedBikesSection from '@/components/home/FeaturedBikesSection'
import LocationsSection from '@/components/home/LocationsSection'
import AdvantagesSection from '@/components/home/AdvantagesSection'
import InsuranceBanner from '@/components/home/InsuranceBanner'
import ServiceSection from '@/components/home/ServiceSection'
import StepsSection from '@/components/home/StepsSection'
import AppSection from '@/components/home/AppSection'
import BlogSection from '@/components/home/BlogSection'

export default function Home() {
  return (
    <>
      <HeroSection />
      <BookingForm />
      <PromotionsSection />
      <FeaturedBikesSection />
      <LocationsSection />
      <AdvantagesSection />
      <InsuranceBanner />
      <ServiceSection />
      <StepsSection />
      <AppSection />
      <BlogSection />
    </>
  )
}
