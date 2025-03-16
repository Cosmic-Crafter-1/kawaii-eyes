import React, { useRef, useEffect } from 'react';
import KawaiiEyesCustomizer from '@/components/KawaiiEyesCustomizer';
import '../components/shapes.css';
import { CircleDashed, Download, Github } from 'lucide-react';
import { Button } from '@/components/ui/button';
import gsap from 'gsap';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollToPlugin, ScrollTrigger);

const Index = () => {
  const howToUseRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLElement>(null);
  const featuresRef = useRef<HTMLElement>(null);
  const featureCardsRef = useRef<HTMLDivElement>(null);
  const instructionsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Header animations
    const headerTl = gsap.timeline({ defaults: { ease: "power3.out" }});
    headerTl
      .from(".header-badge", { 
        y: -50, 
        opacity: 0, 
        duration: 1 
      })
      .from(".header-title", { 
        y: 30, 
        opacity: 0, 
        duration: 1 
      }, "-=0.5")
      .from(".header-description", { 
        y: 30, 
        opacity: 0, 
        duration: 1 
      }, "-=0.7")
      .from(".header-buttons button", { 
        scale: 0.5, 
        opacity: 0, 
        duration: 0.5,
        stagger: 0.2 
      }, "-=0.5");

    // Features section animations
    if (featureCardsRef.current) {
      gsap.from(".feature-card", {
        scrollTrigger: {
          trigger: featureCardsRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse"
        },
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: "power2.out"
      });
    }

    // Instructions section animations
    if (instructionsRef.current) {
      gsap.from(".instruction-step", {
        scrollTrigger: {
          trigger: instructionsRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse"
        },
        x: -50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: "back.out(1.2)"
      });
    }
  }, []);

  const scrollToInstructions = () => {
    gsap.to(window, {
      duration: 1,
      scrollTo: { y: howToUseRef.current, offsetY: 50 },
      ease: "power3.inOut"
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-accent/20">
      {/* Header */}
      <header ref={headerRef} className="w-full px-6 py-8 md:py-12 flex flex-col items-center">
        <div className="header-badge">
          <div className="px-4 py-1 bg-primary/10 rounded-full text-primary-foreground text-sm font-medium">
            Kawaii Cursor Eyes
          </div>
        </div>
        <h1 className="header-title text-4xl md:text-5xl lg:text-6xl font-semibold text-center tracking-tight mb-4">
          Adorable Eyes That Follow Your Cursor
        </h1>
        <p className="header-description text-lg md:text-xl text-center text-muted-foreground max-w-2xl">
          Create cute, customizable eyes that track your cursor movement. Perfect for adding a touch of charm to any website.
        </p>
        
        <div className="header-buttons flex flex-wrap gap-4 mt-8 justify-center">
          <Button 
            variant="default" 
            size="lg" 
            onClick={() => window.open('https://github.com/Cosmic-Crafter-1/kawaii-eyes', '_blank')}
          >
            <Github className="mr-2 h-4 w-4" />
            View on GitHub
          </Button>
          <Button 
            variant="outline" 
            size="lg" 
            onClick={scrollToInstructions}
          >
            <CircleDashed className="mr-2 h-4 w-4" />
            Learn More
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="container px-4 py-12">
        <KawaiiEyesCustomizer />
      </main>

      {/* Features Section */}
      <section ref={featuresRef} className="bg-muted/50 py-16 mt-16">
        <div className="container px-4">
          <h2 className="text-3xl font-semibold text-center mb-12">Features</h2>
          <div ref={featureCardsRef} className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="feature-card glass-card p-6">
              <div className="h-12 w-12 rounded-lg bg-primary/20 text-primary-foreground flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="10" r="3"/><path d="M7 16.3c0-1 2.5-3.3 5-3.3s5 2.3 5 3.3"/></svg>
              </div>
              <h3 className="text-xl font-medium mb-2">Customizable</h3>
              <p className="text-muted-foreground">Adjust colors, shapes, sizes, and more to match your website's aesthetic.</p>
            </div>
            <div className="feature-card glass-card p-6">
              <div className="h-12 w-12 rounded-lg bg-secondary/20 text-secondary-foreground flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5.2 6A7 7 0 0 1 12 3c3.5 0 7 2.6 7 6.5 0 4.4-4 6.5-7 6.5-1.6 0-3.5-.7-5-1.5"/><path d="M5 10v4.3a.7.7 0 0 0 .7.7h4.6"/></svg>
              </div>
              <h3 className="text-xl font-medium mb-2">Interactive</h3>
              <p className="text-muted-foreground">Eyes that smoothly follow your cursor for a delightful user experience.</p>
            </div>
            <div className="feature-card glass-card p-6">
              <div className="h-12 w-12 rounded-lg bg-accent/20 text-accent-foreground flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 7v6h-6"/><path d="M3 17a9 9 0 0 1 9-9 9 9 0 0 1 6 2.3l3 2.7"/></svg>
              </div>
              <h3 className="text-xl font-medium mb-2">Easy to Use</h3>
              <p className="text-muted-foreground">One-click download of customized code for seamless integration.</p>
            </div>
          </div>
        </div>
      </section>

      {/* How to Use Section */}
      <section ref={howToUseRef} className="container px-4 py-16">
        <h2 className="text-3xl font-semibold text-center mb-12">How To Use</h2>
        <div ref={instructionsRef} className="max-w-3xl mx-auto glass-card p-8">
          <ol className="space-y-6">
            <li className="instruction-step flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/20 text-primary-foreground flex items-center justify-center font-medium">1</div>
              <div>
                <h3 className="font-medium text-lg mb-1">Customize Your Kawaii Eyes</h3>
                <p className="text-muted-foreground">Adjust all settings to your liking using the customizer controls.</p>
              </div>
            </li>
            <li className="instruction-step flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/20 text-primary-foreground flex items-center justify-center font-medium">2</div>
              <div>
                <h3 className="font-medium text-lg mb-1">Download The Component</h3>
                <p className="text-muted-foreground">Click the "Download Component" button to get your custom JavaScript file.</p>
              </div>
            </li>
            <li className="instruction-step flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/20 text-primary-foreground flex items-center justify-center font-medium">3</div>
              <div>
                <h3 className="font-medium text-lg mb-1">Add To Your Project</h3>
                <p className="text-muted-foreground">Include the downloaded file in your React project and import the component.</p>
              </div>
            </li>
            <li className="instruction-step flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/20 text-primary-foreground flex items-center justify-center font-medium">4</div>
              <div>
                <h3 className="font-medium text-lg mb-1">Enjoy!</h3>
                <p className="text-muted-foreground">Your website now has adorable eyes that follow your visitors' cursors.</p>
              </div>
            </li>
          </ol>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-muted/30 py-12 mt-16">
        <div className="container px-4 text-center">
          <p className="text-muted-foreground">
            Created with ♡ for a cuter web experience
          </p>
          <p className="text-sm text-muted-foreground mt-2">
            © {new Date().getFullYear()} Kawaii Cursor Eyes • All rights reserved
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
