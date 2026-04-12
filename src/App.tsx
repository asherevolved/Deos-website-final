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
import InstagramFeed from './components/InstagramFeed';
import Footer from './components/Footer';

function App() {
  useLenis();

  return (
    <>
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
        <ImageCollage />
        <Footer />
      </main>
    </>
  );
}

export default App;
