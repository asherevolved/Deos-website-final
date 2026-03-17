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
import Footer from './components/Footer';

function App() {
  useLenis();

  return (
    <>
      <ScrollProgress />
      <Navbar />
      <Hero />
      <HorizontalMarquee />
      <WhatWeDo />
      <StickyFeatures />
      <Projects />
      <ContentSticks />
      <Team />
      <ImageCollage />
      <Footer />
    </>
  );
}

export default App;
