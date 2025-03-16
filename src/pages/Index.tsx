
import React from 'react';
import KawaiiEyesCustomizer from '@/components/KawaiiEyesCustomizer';
import '../components/shapes.css';
import { CircleDashed, Download, Github } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-accent/20">
      {/* Header */}
      <header className="w-full px-6 py-8 md:py-12 flex flex-col items-center">
        <div className="animate-float mb-4">
          <div className="px-4 py-1 bg-primary/10 rounded-full text-primary-foreground text-sm font-medium">
            Kawaii Cursor Eyes
          </div>
        </div>
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold text-center tracking-tight mb-4 animate-fade-in">
          Adorable Eyes That Follow Your Cursor
        </h1>
        <p className="text-lg md:text-xl text-center text-muted-foreground max-w-2xl animate-fade-in">
          Create cute, customizable eyes that track your cursor movement. Perfect for adding a touch of charm to any website.
        </p>
        
        <div className="flex flex-wrap gap-4 mt-8 justify-center">
          <Button variant="default" size="lg" className="animate-scale-in">
            <Github className="mr-2 h-4 w-4" />
            View on GitHub
          </Button>
          <Button variant="outline" size="lg" className="animate-scale-in">
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
      <section className="bg-muted/50 py-16 mt-16">
        <div className="container px-4">
          <h2 className="text-3xl font-semibold text-center mb-12">Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="glass-card p-6 animate-fade-in">
              <div className="h-12 w-12 rounded-lg bg-primary/20 text-primary-foreground flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="10" r="3"/><path d="M7 16.3c0-1 2.5-3.3 5-3.3s5 2.3 5 3.3"/></svg>
              </div>
              <h3 className="text-xl font-medium mb-2">Customizable</h3>
              <p className="text-muted-foreground">Adjust colors, shapes, sizes, and more to match your website's aesthetic.</p>
            </div>
            <div className="glass-card p-6 animate-fade-in" style={{ animationDelay: '0.1s' }}>
              <div className="h-12 w-12 rounded-lg bg-secondary/20 text-secondary-foreground flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5.2 6A7 7 0 0 1 12 3c3.5 0 7 2.6 7 6.5 0 4.4-4 6.5-7 6.5-1.6 0-3.5-.7-5-1.5"/><path d="M5 10v4.3a.7.7 0 0 0 .7.7h4.6"/></svg>
              </div>
              <h3 className="text-xl font-medium mb-2">Interactive</h3>
              <p className="text-muted-foreground">Eyes that smoothly follow your cursor for a delightful user experience.</p>
            </div>
            <div className="glass-card p-6 animate-fade-in" style={{ animationDelay: '0.2s' }}>
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
      <section className="container px-4 py-16">
        <h2 className="text-3xl font-semibold text-center mb-12">How To Use</h2>
        <div className="max-w-3xl mx-auto glass-card p-8 animate-fade-in">
          <ol className="space-y-6">
            <li className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/20 text-primary-foreground flex items-center justify-center font-medium">1</div>
              <div>
                <h3 className="font-medium text-lg mb-1">Customize Your Kawaii Eyes</h3>
                <p className="text-muted-foreground">Adjust all settings to your liking using the customizer controls.</p>
              </div>
            </li>
            <li className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/20 text-primary-foreground flex items-center justify-center font-medium">2</div>
              <div>
                <h3 className="font-medium text-lg mb-1">Download The Component</h3>
                <p className="text-muted-foreground">Click the "Download Component" button to get your custom JavaScript file.</p>
              </div>
            </li>
            <li className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/20 text-primary-foreground flex items-center justify-center font-medium">3</div>
              <div>
                <h3 className="font-medium text-lg mb-1">Add To Your Project</h3>
                <p className="text-muted-foreground">Include the downloaded file in your React project and import the component.</p>
              </div>
            </li>
            <li className="flex gap-4">
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
