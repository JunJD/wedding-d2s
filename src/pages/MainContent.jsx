import Hero from '@/pages/Hero'
import LoveStory from '@/pages/LoveStory'
import Events from '@/pages/Events'
import Location from '@/pages/Location';
import Gallery from '@/pages/Gallery';
import Wishes from '@/pages/Wishes';

// Main Invitation Content
export default function MainContent() {
    return (
        <>
            <Hero />
            <LoveStory />
            <Events />
            <Location />
            <Gallery />
            <Wishes />
        </>
    )
}