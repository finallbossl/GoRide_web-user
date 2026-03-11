import HeroSection from '@/components/home/HeroSection'
import BookingForm from '@/components/home/BookingForm'
import PromotionsSection from '@/components/home/PromotionsSection'
import FeaturedBikesSection from '@/components/home/FeaturedBikesSection'
import StepsSection from '@/components/home/StepsSection'
import BlogSection from '@/components/home/BlogSection'

export default function Home() {
  return (
    <>
      <HeroSection />
      <BookingForm />
      <PromotionsSection />
      <FeaturedBikesSection />
      <StepsSection />
      <BlogSection />
    </>
  )
}
