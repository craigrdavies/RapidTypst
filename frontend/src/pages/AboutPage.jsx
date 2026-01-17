import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import {
  ArrowLeft,
  FileText,
  Download,
  Search,
  LayoutTemplate,
  Zap,
  ExternalLink,
  BookOpen,
  Code,
} from 'lucide-react';

export default function AboutPage() {
  const features = [
    {
      icon: FileText,
      title: 'Typst Editor',
      description: 'Full-featured code editor with syntax highlighting for Typst markup language.',
    },
    {
      icon: Zap,
      title: 'Live Preview',
      description: 'See your document rendered in real-time as you type.',
    },
    {
      icon: Download,
      title: 'Multiple Export Formats',
      description: 'Export your documents as PDF, HTML, or DOCX files.',
    },
    {
      icon: LayoutTemplate,
      title: 'Template Gallery',
      description: 'Start quickly with pre-built templates for resumes, academic papers, letters, and more.',
    },
    {
      icon: Search,
      title: 'Find & Replace',
      description: 'Powerful search and replace functionality to edit your documents efficiently.',
    },
    {
      icon: BookOpen,
      title: 'Document Management',
      description: 'Save, load, and organize your documents with ease.',
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-background/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link to="/">
            <Button variant="ghost" size="sm" className="gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Editor
            </Button>
          </Link>
          <h1 className="text-lg font-bold tracking-tight">About</h1>
          <div className="w-24" /> {/* Spacer for centering */}
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-5xl mx-auto px-6 py-12">
        {/* Hero Section */}
        <section className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-accent/10 text-accent rounded-full text-sm font-medium mb-6">
            <Zap className="h-4 w-4" />
            Fast & Powerful
          </div>
          <h1 className="text-4xl sm:text-5xl font-black tracking-tight mb-4">
            Rapid Typst
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            A modern, web-based editor for the Typst markup language. Create beautiful documents 
            with live preview and export to multiple formats.
          </p>
        </section>

        {/* What is Typst */}
        <section className="mb-16">
          <div className="bg-secondary/30 border border-border rounded-sm p-8">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-accent/10 rounded-sm">
                <Code className="h-6 w-6 text-accent" />
              </div>
              <div>
                <h2 className="text-xl font-bold mb-2">What is Typst?</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Typst is a new markup-based typesetting system designed to be as powerful as LaTeX 
                  while being much easier to learn and use. It combines the simplicity of Markdown 
                  with the power of a full typesetting system.
                </p>
                <a 
                  href="https://typst.app/docs" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-accent hover:underline font-medium"
                >
                  Learn more about Typst →
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Features Grid */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-8 text-center">Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <div 
                  key={index}
                  className="border border-border rounded-sm p-6 hover:border-accent/50 transition-colors"
                >
                  <div className="p-2 bg-secondary rounded-sm w-fit mb-4">
                    <IconComponent className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <h3 className="font-semibold mb-2">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </section>

        {/* Keyboard Shortcuts */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-8 text-center">Keyboard Shortcuts</h2>
          <div className="bg-secondary/30 border border-border rounded-sm overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left px-6 py-3 text-sm font-semibold">Action</th>
                  <th className="text-left px-6 py-3 text-sm font-semibold">Shortcut</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                <tr>
                  <td className="px-6 py-3 text-sm">Save Document</td>
                  <td className="px-6 py-3">
                    <kbd className="px-2 py-1 bg-background border border-border rounded text-xs font-mono">Ctrl</kbd>
                    {' + '}
                    <kbd className="px-2 py-1 bg-background border border-border rounded text-xs font-mono">S</kbd>
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-3 text-sm">Find</td>
                  <td className="px-6 py-3">
                    <kbd className="px-2 py-1 bg-background border border-border rounded text-xs font-mono">Ctrl</kbd>
                    {' + '}
                    <kbd className="px-2 py-1 bg-background border border-border rounded text-xs font-mono">F</kbd>
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-3 text-sm">Find & Replace</td>
                  <td className="px-6 py-3">
                    <kbd className="px-2 py-1 bg-background border border-border rounded text-xs font-mono">Ctrl</kbd>
                    {' + '}
                    <kbd className="px-2 py-1 bg-background border border-border rounded text-xs font-mono">H</kbd>
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-3 text-sm">Undo</td>
                  <td className="px-6 py-3">
                    <kbd className="px-2 py-1 bg-background border border-border rounded text-xs font-mono">Ctrl</kbd>
                    {' + '}
                    <kbd className="px-2 py-1 bg-background border border-border rounded text-xs font-mono">Z</kbd>
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-3 text-sm">Redo</td>
                  <td className="px-6 py-3">
                    <kbd className="px-2 py-1 bg-background border border-border rounded text-xs font-mono">Ctrl</kbd>
                    {' + '}
                    <kbd className="px-2 py-1 bg-background border border-border rounded text-xs font-mono">Y</kbd>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Tech Stack */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-8 text-center">Built With</h2>
          <div className="flex flex-wrap justify-center gap-3">
            {['React', 'FastAPI', 'Typst', 'MongoDB', 'Tailwind CSS', 'CodeMirror'].map((tech) => (
              <span 
                key={tech}
                className="px-4 py-2 bg-secondary border border-border rounded-sm text-sm font-medium"
              >
                {tech}
              </span>
            ))}
          </div>
        </section>

        {/* Open Source / GitHub */}
        <section className="mb-16">
          <div className="bg-secondary/30 border border-border rounded-sm p-8 text-center">
            <ExternalLink className="h-12 w-12 mx-auto mb-4 text-foreground" />
            <h2 className="text-2xl font-bold mb-2">Open Source</h2>
            <p className="text-muted-foreground mb-6 max-w-md mx-auto">
              Rapid Typst is free and open source. Star the repo to show your support and stay updated with new features!
            </p>
            <div className="flex justify-center gap-3">
              <a
                href="https://github.com/craigrdavies/RapidTypst"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-foreground text-background font-medium rounded-sm hover:bg-foreground/90 transition-colors"
              >
                <ExternalLink className="h-5 w-5" />
                Star on GitHub
              </a>
              <a
                href="https://github.com/craigrdavies/RapidTypst/issues"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 border border-border font-medium rounded-sm hover:bg-secondary transition-colors"
              >
                Report Issue
              </a>
            </div>
          </div>
        </section>

        {/* Support */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-8 text-center">Support Development</h2>
          <p className="text-muted-foreground text-center mb-6 max-w-md mx-auto">
            If Rapid Typst helps you create documents faster, consider buying me a coffee!
          </p>
          <div className="flex justify-center">
            <a
              href="https://buymeacoffee.com/craigdavies"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#FFDD00] hover:bg-[#FFDD00]/90 text-black font-medium rounded-full transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.216 6.415l-.132-.666c-.119-.598-.388-1.163-1.001-1.379-.197-.069-.42-.098-.57-.241-.152-.143-.196-.366-.231-.572-.065-.378-.125-.756-.192-1.133-.057-.325-.102-.69-.25-.987-.195-.4-.597-.634-.996-.788a5.723 5.723 0 00-.626-.194c-1-.263-2.05-.36-3.077-.416a25.834 25.834 0 00-3.7.062c-.915.083-1.88.184-2.75.5-.318.116-.646.256-.888.501-.297.302-.393.77-.177 1.146.154.267.415.456.692.58.36.162.737.284 1.123.366 1.075.238 2.189.331 3.287.37 1.218.05 2.437.01 3.65-.118.299-.033.598-.073.896-.119.352-.054.578-.513.474-.834-.124-.383-.457-.531-.834-.473-.466.074-.96.108-1.382.146-1.177.08-2.358.082-3.536.006a22.228 22.228 0 01-1.157-.107c-.086-.01-.18-.025-.258-.036-.243-.036-.484-.08-.724-.13-.111-.027-.111-.185 0-.212h.005c.277-.06.557-.108.838-.147h.002c.131-.009.263-.032.394-.048a25.076 25.076 0 013.426-.12c.674.019 1.347.067 2.017.144l.228.031c.267.04.533.088.798.145.392.085.895.113 1.07.542.055.137.08.288.111.431l.319 1.484a.237.237 0 01-.199.284h-.003c-.037.006-.075.01-.112.015a36.704 36.704 0 01-4.743.295 37.059 37.059 0 01-4.699-.304c-.14-.017-.293-.042-.417-.06-.326-.048-.649-.108-.973-.161-.393-.065-.768-.032-1.123.161-.29.16-.527.404-.675.701-.154.316-.199.66-.267 1-.069.34-.176.707-.135 1.056.087.753.613 1.365 1.37 1.502a39.69 39.69 0 0011.343.376.483.483 0 01.535.53l-.071.697-1.018 9.907c-.041.41-.047.832-.125 1.237-.122.637-.553 1.028-1.182 1.171-.577.131-1.165.2-1.756.205-.656.004-1.31-.025-1.966-.022-.699.004-1.556-.06-2.095-.58-.475-.458-.54-1.174-.605-1.793l-.731-7.013-.322-3.094c-.037-.351-.286-.695-.678-.678-.336.015-.718.3-.678.679l.228 2.185.949 9.112c.147 1.344 1.174 2.068 2.446 2.272.742.12 1.503.144 2.257.156.966.016 1.942.053 2.892-.122 1.408-.258 2.465-1.198 2.616-2.657.34-3.332.683-6.663 1.024-9.995l.215-2.087a.484.484 0 01.39-.426c.402-.078.787-.212 1.074-.518.455-.488.546-1.124.385-1.766zm-1.478.772c-.145.137-.363.201-.578.233-2.416.359-4.866.54-7.308.46-1.748-.06-3.477-.254-5.207-.498-.17-.024-.353-.055-.47-.18-.22-.236-.111-.71-.054-.995.052-.26.152-.609.463-.646.484-.057 1.046.148 1.526.22.577.088 1.156.159 1.737.212 2.48.226 5.002.19 7.472-.14.45-.06.899-.13 1.345-.21.399-.072.84-.206 1.08.206.166.281.188.657.162.974a.544.544 0 01-.169.364z"/>
              </svg>
              Buy me a coffee
            </a>
          </div>
        </section>

        {/* Footer */}
        <footer className="text-center border-t border-border pt-8">
          <p className="text-sm text-muted-foreground mb-4">
            Rapid Typst — Create documents at the speed of thought
          </p>
          
          <div className="flex justify-center gap-4">
            <a
              href="https://typst.app/docs"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Typst Documentation
            </a>
            <span className="text-muted-foreground">•</span>
            <a
              href="https://github.com/craigrdavies/RapidTypst"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1"
            >
              <ExternalLink className="h-4 w-4" />
              GitHub
            </a>
            <span className="text-muted-foreground">•</span>
            <a
              href="https://buymeacoffee.com/craigdavies"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Support
            </a>
          </div>
        </footer>
      </main>
    </div>
  );
}
