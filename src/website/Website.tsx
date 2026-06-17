import { Header } from './Header';
import { Hero } from './Hero';
import { Venues } from './Venues';
import { Events } from './Events';
import { Gallery } from './Gallery';
import { Rewards } from './Rewards';
import { Contact } from './Contact';
import { Footer } from './Footer';

interface WebsiteProps {
  onOpenApp: () => void;
}

export function Website({ onOpenApp }: WebsiteProps) {
  return (
    <div className="min-h-screen" style={{ background: '#0a0a0c' }}>
      <Header onOpenApp={onOpenApp} />
      <Hero />
      <Venues />
      <Events />
      <Gallery />
      <Rewards onOpenApp={onOpenApp} />
      <Contact />
      <Footer />
    </div>
  );
}
