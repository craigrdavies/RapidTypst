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
  Github,
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
              href="https://github.com/typst/typst"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1"
            >
              <Github className="h-4 w-4" />
              Typst on GitHub
            </a>
          </div>
        </footer>
      </main>
    </div>
  );
}
