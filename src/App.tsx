import { useLenis } from './hooks/useLenis';

import ScrollProgress from './components/ScrollProgress';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import HorizontalMarquee from './components/HorizontalMarquee';
import WhatWeDo from './components/WhatWeDo';
import StickyFeatures from './components/StickyFeatures';
import Projects from './components/Projects';
import ContentSticks from './components/ContentSticks';
import ImageCollage from './components/ImageCollage';
import Team from './components/Team';
import Location from './components/Location';
import InstagramFeed from './components/InstagramFeed';
import Footer from './components/Footer';
import LoadingScreen from './components/LoadingScreen';

function App() {
  useLenis();

  return (
    <>
      <LoadingScreen />
      <ScrollProgress />
      <Navbar />
      <main className="overflow-clip w-full">
        <Hero />
        <HorizontalMarquee />
        <WhatWeDo />
        <StickyFeatures />
        <Projects />
        <ContentSticks />
        <InstagramFeed />
        <Team />
        <Location />
        <ImageCollage />
        <Footer />
      </main>
    </>
  );
}

export default App;
