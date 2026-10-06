import dynamic from 'next/dynamic';
import React from 'react'
const Experience = dynamic(() => import('../_components/Experience'));

const BeforeAfterSlider = dynamic(() => import('../_components/BeforeAfterSlider'));
const ReviewsSection = dynamic(() => import('../_components/reviews-section'));

function ReviewsTab() {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
    
        <BeforeAfterSlider />
        <Experience />
        <ReviewsSection />
    </div>
  )
}

export default ReviewsTab