'use client'
import { InfiniteMovingCards } from "./ui/infinite-moving-cards";

const tripPlannerTestimonials = [
  {
    quote:
      'Using this trip planner was a game-changer for me. It took the stress out of planning and allowed me to focus on enjoying my travels.',
    name: 'Emily Johnson',
    title: 'Frequent Traveler',
  },
  {
    quote:
      "I've never been good at planning trips, but this platform made it so easy. The recommendations were spot-on, and I had the best vacation ever!",
    name: 'Adam Smith',
    title: 'Adventure Enthusiast',
  },
  {
    quote:
      "I was skeptical at first, but after using this trip planner, I'm a believer. It helped me discover hidden gems I never would have found on my own.",
    name: 'Jessica Wong',
    title: 'Solo Traveler',
  },
  {
    quote:
      'Planning a family vacation can be chaotic, but this tool made it a breeze. It catered to everyone’s interests and made sure we had a memorable trip.',
    name: 'David Miller',
    title: 'Family Traveler',
  },
  {
    quote:
      'I travel for work frequently, and this trip planner has become my go-to tool. It saves me time and ensures I make the most of my business trips.',
    name: 'Sarah Evans',
    title: 'Business Traveler',
  },
];

function MusicSchoolTestimonials() {
  return (
    <div className="h-[40rem] w-full dark:bg-black dark:bg-dot-white/[0.2] relative flex flex-col items-center justify-center overflow-hidden">
        <h2 className="text-3xl font-bold text-center mb-8 z-10">Discover the Symphony of Success: Stories from Our Users</h2>
        <div className="flex justify-center w-full overflow-hidden px-4 sm:px-6 lg:px-8">
            <div className="w-full max-w-6xl">
            <InfiniteMovingCards
                items={tripPlannerTestimonials}
                direction="right"
                speed="slow"
      />
            </div>
        </div>
    </div>
  )
}

export default MusicSchoolTestimonials