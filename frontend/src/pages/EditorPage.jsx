import React, { useState, useEffect, useCallback, useRef } from 'react';
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from '@/components/ui/resizable';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { toast } from 'sonner';
import {
  FileText,
  Save,
  FolderOpen,
  Download,
  Undo,
  Redo,
  Search,
  Replace,
  Plus,
  Trash2,
  ChevronDown,
  X,
  FileCode,
  Eye,
  Menu,
  FileType,
  File,
  LayoutTemplate,
  GraduationCap,
  Briefcase,
  Mail,
  FileBarChart,
  BookOpen,
  Code,
  Calculator,
} from 'lucide-react';
import CodeMirror from '@uiw/react-codemirror';
import { githubLight } from '@uiw/codemirror-theme-github';
import { StreamLanguage } from '@codemirror/language';
import { searchKeymap, search, openSearchPanel, closeSearchPanel } from '@codemirror/search';
import { history, historyKeymap, undo, redo } from '@codemirror/commands';
import { keymap } from '@codemirror/view';
import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

// Simple Typst-like syntax highlighting
const typstLanguage = StreamLanguage.define({
  token(stream) {
    // Comments
    if (stream.match(/\/\/.*/)) {
      return 'comment';
    }
    if (stream.match(/\/\*/)) {
      while (!stream.match(/\*\//)) {
        if (stream.next() == null) break;
      }
      return 'comment';
    }
    // Headings
    if (stream.sol() && stream.match(/=+\s/)) {
      return 'heading';
    }
    // Bold
    if (stream.match(/\*[^*]+\*/)) {
      return 'strong';
    }
    // Italic
    if (stream.match(/_[^_]+_/)) {
      return 'emphasis';
    }
    // Code
    if (stream.match(/`[^`]+`/)) {
      return 'string';
    }
    // Functions
    if (stream.match(/#[a-zA-Z_][a-zA-Z0-9_]*/)) {
      return 'keyword';
    }
    // Variables
    if (stream.match(/\$[^$]+\$/)) {
      return 'variable';
    }
    // Brackets
    if (stream.match(/[\[\](){}]/)) {
      return 'bracket';
    }
    stream.next();
    return null;
  },
});

// Template definitions
const templates = [
  {
    id: 'blank',
    name: 'Blank Document',
    description: 'Start with a clean slate',
    icon: FileText,
    category: 'Basic',
    content: `// Start writing your Typst document here

= Untitled Document

Your content goes here...
`,
  },
  {
    id: 'basic',
    name: 'Basic Document',
    description: 'Simple document with headings, lists, and text formatting',
    icon: BookOpen,
    category: 'Basic',
    content: `// Basic Typst Document Template

= Document Title

== Introduction

This is a paragraph demonstrating *bold text*, _italic text_, and \`inline code\`.

You can also create links: #link("https://typst.app")[Typst Website]

== Lists

=== Unordered List
- First item
- Second item
  - Nested item
  - Another nested item
- Third item

=== Ordered List
+ First step
+ Second step
+ Third step

== Blockquotes

#quote(block: true)[
  This is a blockquote. It can contain multiple paragraphs and is useful for highlighting important information or citations.
]

== Code Blocks

\`\`\`python
def hello_world():
    print("Hello, Typst!")
\`\`\`

== Conclusion

#lorem(30)
`,
  },
  {
    id: 'resume',
    name: 'Resume / CV',
    description: 'Professional resume template with sections for experience and skills',
    icon: Briefcase,
    category: 'Professional',
    content: `// Professional Resume Template

#set page(margin: (x: 1.5cm, y: 1.5cm))
#set text(font: "New Computer Modern", size: 10pt)

#align(center)[
  #text(size: 24pt, weight: "bold")[Your Name]
  
  #text(size: 10pt, fill: gray)[
    your.email\@example.com | +1 (555) 123-4567 | City, Country
  ]
  
  #link("https://linkedin.com/in/yourprofile")[LinkedIn] |
  #link("https://github.com/yourusername")[GitHub] |
  #link("https://yourwebsite.com")[Portfolio]
]

#line(length: 100%, stroke: 0.5pt + gray)

== Professional Summary

Results-driven software engineer with 5+ years of experience in full-stack development. Passionate about building scalable applications and mentoring junior developers.

== Experience

#grid(
  columns: (1fr, auto),
  [*Senior Software Engineer*], [Jan 2022 - Present],
  [_Tech Company Inc._], [],
)
- Led development of microservices architecture serving 1M+ users
- Reduced deployment time by 60% through CI/CD improvements
- Mentored team of 4 junior developers

#v(0.5em)

#grid(
  columns: (1fr, auto),
  [*Software Engineer*], [Jun 2019 - Dec 2021],
  [_Startup Co._], [],
)
- Built React-based dashboard used by 500+ enterprise clients
- Implemented real-time data synchronization features
- Collaborated with design team on UX improvements

== Education

#grid(
  columns: (1fr, auto),
  [*Bachelor of Science in Computer Science*], [2015 - 2019],
  [_University Name_], [],
)
- GPA: 3.8/4.0
- Relevant coursework: Algorithms, Database Systems, Machine Learning

== Skills

*Languages:* Python, JavaScript, TypeScript, Go, SQL

*Frameworks:* React, Node.js, FastAPI, Django

*Tools:* Docker, Kubernetes, AWS, Git, PostgreSQL

== Projects

*Open Source Contribution* | #link("https://github.com/project")[GitHub]
- Contributed 50+ commits to popular data visualization library
- Fixed critical performance bug affecting 10k+ users
`,
  },
  {
    id: 'academic',
    name: 'Academic Paper',
    description: 'Research paper format with abstract, citations, and bibliography',
    icon: GraduationCap,
    category: 'Academic',
    content: `// Academic Paper Template

#set page(margin: 2.5cm)
#set text(font: "New Computer Modern", size: 11pt)
#set par(justify: true, leading: 0.65em)
#set heading(numbering: "1.1")

#align(center)[
  #text(size: 18pt, weight: "bold")[
    Your Paper Title: A Comprehensive Study
  ]
  
  #v(1em)
  
  #text(size: 12pt)[
    Author Name#super[1], Co-Author Name#super[2]
  ]
  
  #text(size: 10pt, fill: gray)[
    #super[1]Department of Computer Science, University Name\\
    #super[2]Research Institute, Organization Name
  ]
  
  #v(1em)
  
  #text(size: 10pt, style: "italic")[
    Published: January 2025
  ]
]

#v(2em)

#align(center)[
  #rect(width: 85%, stroke: none)[
    *Abstract*
    
    #text(size: 10pt)[
      This paper presents a comprehensive study on [your topic]. We investigate [key aspects] and demonstrate [main findings]. Our results show that [key conclusion]. The implications of this research extend to [broader impact].
    ]
    
    #v(0.5em)
    
    *Keywords:* keyword1, keyword2, keyword3, keyword4
  ]
]

#v(2em)

= Introduction

The field of [your field] has seen significant advances in recent years. This paper addresses [problem statement] by proposing [your approach]. Our main contributions are:

+ Contribution one
+ Contribution two  
+ Contribution three

The remainder of this paper is organized as follows: Section 2 reviews related work, Section 3 describes our methodology, Section 4 presents results, and Section 5 concludes.

= Related Work

Previous research in this area includes the work of Smith et al. @smith2023, who demonstrated [finding]. Additionally, Jones @jones2022 proposed [approach].

= Methodology

== Problem Formulation

Let $x in RR^n$ be the input vector and $f: RR^n -> RR$ be the objective function. We seek to minimize:

$ min_(x in RR^n) f(x) = sum_(i=1)^n (x_i - mu)^2 $

== Proposed Approach

Our algorithm proceeds as follows:

#figure(
  table(
    columns: 2,
    [*Step*], [*Description*],
    [1], [Initialize parameters],
    [2], [Compute gradients],
    [3], [Update weights],
    [4], [Check convergence],
  ),
  caption: [Algorithm steps]
)

= Results

Our experiments demonstrate significant improvements over baseline methods.

#figure(
  table(
    columns: 4,
    [*Method*], [*Accuracy*], [*Precision*], [*Recall*],
    [Baseline], [78.5%], [76.2%], [80.1%],
    [Ours], [*92.3%*], [*91.5%*], [*93.1%*],
  ),
  caption: [Comparison of methods]
)

= Conclusion

This paper presented [summary of contributions]. Future work includes [future directions].

#pagebreak()

#bibliography("references.bib", style: "ieee")
`,
  },
  {
    id: 'letter',
    name: 'Formal Letter',
    description: 'Business or formal letter template',
    icon: Mail,
    category: 'Professional',
    content: `// Formal Letter Template

#set page(margin: (x: 2.5cm, y: 2cm))
#set text(font: "New Computer Modern", size: 11pt)
#set par(justify: true)

#align(right)[
  Your Name\\
  Your Address\\
  City, State ZIP\\
  your.email\@example.com\\
  +1 (555) 123-4567
]

#v(1em)

#datetime.today().display("[month repr:long] [day], [year]")

#v(1em)

Recipient Name\\
Title/Position\\
Company/Organization\\
Address Line 1\\
City, State ZIP

#v(1em)

Dear Mr./Ms. [Last Name],

#v(0.5em)

*Re: Subject of the Letter*

#v(0.5em)

I am writing to [state the purpose of your letter]. This letter is regarding [brief context].

In the first paragraph, introduce yourself if necessary and clearly state the main purpose of your letter. Be direct and professional.

The second paragraph should provide more details about your request, situation, or the information you need to convey. Include relevant facts, dates, and specifics that support your purpose.

In subsequent paragraphs, you can:
- Provide additional context or background
- List specific requests or action items
- Reference any enclosed documents
- Address potential questions or concerns

In your closing paragraph, summarize your main point, state what action you expect or hope for, and express appreciation for the recipient's time and attention.

Thank you for your consideration. I look forward to your response. Please feel free to contact me at the phone number or email address above if you have any questions.

#v(2em)

Sincerely,

#v(3em)

Your Name\\
Your Title (if applicable)

#v(1em)

#text(size: 9pt, fill: gray)[
  Enclosures: [List any documents enclosed]\\
  CC: [Names of anyone receiving copies]
]
`,
  },
  {
    id: 'report',
    name: 'Business Report',
    description: 'Professional report with executive summary and data sections',
    icon: FileBarChart,
    category: 'Professional',
    content: `// Business Report Template

#set page(margin: 2cm)
#set text(font: "New Computer Modern", size: 11pt)
#set heading(numbering: "1.1")
#set par(justify: true)

#align(center)[
  #rect(fill: rgb("#1a1a2e"), width: 100%, inset: 2em)[
    #text(fill: white, size: 24pt, weight: "bold")[
      Quarterly Business Report
    ]
    
    #v(0.5em)
    
    #text(fill: rgb("#cccccc"), size: 12pt)[
      Q4 2024 Performance Analysis
    ]
  ]
]

#v(1em)

#grid(
  columns: (1fr, 1fr),
  gutter: 2em,
  [
    *Prepared by:* Analytics Team\\
    *Date:* January 15, 2025
  ],
  [
    *Department:* Business Intelligence\\
    *Version:* 1.0
  ]
)

#line(length: 100%, stroke: 0.5pt + gray)

#v(1em)

= Executive Summary

This report provides a comprehensive analysis of Q4 2024 performance. Key highlights include:

- Revenue increased by *23%* year-over-year
- Customer acquisition cost decreased by *15%*
- Net promoter score improved to *72* (up from 65)

#rect(fill: rgb("#e8f4e8"), width: 100%, inset: 1em)[
  *Key Recommendation:* Increase investment in digital marketing channels based on demonstrated ROI improvements.
]

= Financial Performance

== Revenue Analysis

#figure(
  table(
    columns: 4,
    fill: (x, y) => if y == 0 { rgb("#f0f0f0") },
    [*Metric*], [*Q3 2024*], [*Q4 2024*], [*Change*],
    [Total Revenue], [$2.1M], [$2.6M], [+23%],
    [Gross Margin], [42%], [45%], [+3pp],
    [Operating Income], [$420K], [$585K], [+39%],
  ),
  caption: [Quarterly Financial Summary]
)

== Cost Analysis

Operating expenses were managed effectively:

- Personnel costs: $1.2M (46% of revenue)
- Marketing spend: $320K (12% of revenue)
- Technology infrastructure: $180K (7% of revenue)

= Customer Metrics

== Acquisition & Retention

#grid(
  columns: (1fr, 1fr, 1fr),
  gutter: 1em,
  rect(fill: rgb("#f5f5f5"), inset: 1em)[
    #align(center)[
      #text(size: 24pt, weight: "bold")[1,247]
      
      New Customers
    ]
  ],
  rect(fill: rgb("#f5f5f5"), inset: 1em)[
    #align(center)[
      #text(size: 24pt, weight: "bold")[94%]
      
      Retention Rate
    ]
  ],
  rect(fill: rgb("#f5f5f5"), inset: 1em)[
    #align(center)[
      #text(size: 24pt, weight: "bold")[$2,340]
      
      Avg. Customer Value
    ]
  ],
)

= Recommendations

Based on our analysis, we recommend:

+ *Expand digital marketing* - Allocate additional $50K to high-performing channels
+ *Invest in customer success* - Hire 2 additional CSMs to maintain retention
+ *Optimize pricing* - Test premium tier pricing increase of 10%

= Appendix

== Methodology

Data was collected from:
- Internal CRM system
- Financial reporting tools
- Customer survey responses (n=523)

== Glossary

- *NPS:* Net Promoter Score
- *CAC:* Customer Acquisition Cost
- *LTV:* Lifetime Value
`,
  },
  {
    id: 'math',
    name: 'Math Notes',
    description: 'Mathematics document with equations and proofs',
    icon: Calculator,
    category: 'Academic',
    content: `// Mathematics Notes Template

#set page(margin: 2cm)
#set text(font: "New Computer Modern", size: 11pt)
#set heading(numbering: "1.1")
#set math.equation(numbering: "(1)")

= Calculus Notes: Integration Techniques

== Fundamental Theorem of Calculus

#rect(fill: rgb("#f0f8ff"), width: 100%, inset: 1em)[
  *Theorem (FTC Part 1):* If $f$ is continuous on $[a, b]$, then the function
  $ F(x) = integral_a^x f(t) dif t $
  is continuous on $[a, b]$, differentiable on $(a, b)$, and $F'(x) = f(x)$.
]

#v(1em)

#rect(fill: rgb("#f0f8ff"), width: 100%, inset: 1em)[
  *Theorem (FTC Part 2):* If $f$ is continuous on $[a, b]$ and $F$ is any antiderivative of $f$, then
  $ integral_a^b f(x) dif x = F(b) - F(a) $
]

== Integration by Parts

The integration by parts formula is derived from the product rule:

$ integral u dif v = u v - integral v dif u $

*Example:* Evaluate $integral x e^x dif x$

Let $u = x$ and $dif v = e^x dif x$. Then:
- $dif u = dif x$
- $v = e^x$

Applying the formula:
$ integral x e^x dif x = x e^x - integral e^x dif x = x e^x - e^x + C = e^x (x - 1) + C $

== Trigonometric Substitutions

For integrals involving $sqrt(a^2 - x^2)$, $sqrt(a^2 + x^2)$, or $sqrt(x^2 - a^2)$:

#figure(
  table(
    columns: 3,
    fill: (x, y) => if y == 0 { rgb("#f0f0f0") },
    [*Expression*], [*Substitution*], [*Identity Used*],
    [$sqrt(a^2 - x^2)$], [$x = a sin theta$], [$1 - sin^2 theta = cos^2 theta$],
    [$sqrt(a^2 + x^2)$], [$x = a tan theta$], [$1 + tan^2 theta = sec^2 theta$],
    [$sqrt(x^2 - a^2)$], [$x = a sec theta$], [$sec^2 theta - 1 = tan^2 theta$],
  ),
  caption: [Trigonometric Substitution Guide]
)

== Partial Fractions

For rational functions where $deg(P) < deg(Q)$:

$ (P(x))/(Q(x)) = A_1/(x - r_1) + A_2/(x - r_2) + ... $

*Example:* Decompose $display((2x + 1)/((x-1)(x+2)))$

$ (2x + 1)/((x-1)(x+2)) = A/(x-1) + B/(x+2) $

Solving: $A = 1$, $B = 1$

Therefore:
$ integral (2x + 1)/((x-1)(x+2)) dif x = integral 1/(x-1) dif x + integral 1/(x+2) dif x = ln|x-1| + ln|x+2| + C $

== Practice Problems

+ Evaluate $integral x^2 ln(x) dif x$
+ Find $integral 1/(x^2 + 4) dif x$
+ Compute $integral sin^3(x) cos^2(x) dif x$
+ Solve $integral (3x + 2)/(x^2 + x - 2) dif x$

== Important Identities

#grid(
  columns: 2,
  gutter: 2em,
  [
    *Pythagorean:*
    - $sin^2 theta + cos^2 theta = 1$
    - $tan^2 theta + 1 = sec^2 theta$
    - $1 + cot^2 theta = csc^2 theta$
  ],
  [
    *Double Angle:*
    - $sin 2theta = 2 sin theta cos theta$
    - $cos 2theta = cos^2 theta - sin^2 theta$
    - $tan 2theta = (2 tan theta)/(1 - tan^2 theta)$
  ]
)
`,
  },
  {
    id: 'code-docs',
    name: 'Code Documentation',
    description: 'Technical documentation for code projects',
    icon: Code,
    category: 'Technical',
    content: `// Code Documentation Template

#set page(margin: 2cm)
#set text(font: "New Computer Modern", size: 11pt)
#set heading(numbering: "1.1")
#set raw(theme: "assets/catppuccin-latte.tmTheme")

#align(center)[
  #text(size: 28pt, weight: "bold")[Project Name]
  
  #v(0.5em)
  
  #text(size: 12pt, fill: gray)[
    Technical Documentation v1.0
  ]
]

#v(1em)

#outline(title: "Contents", indent: 1em)

#pagebreak()

= Introduction

== Overview

This document provides technical documentation for *Project Name*, a [brief description of what the project does].

== Quick Start

\`\`\`bash
# Clone the repository
git clone https://github.com/username/project.git

# Install dependencies
npm install

# Run the application
npm start
\`\`\`

== Requirements

- Node.js >= 18.0
- npm >= 9.0
- MongoDB >= 6.0

= Architecture

== System Overview

The application follows a microservices architecture:

#figure(
  table(
    columns: 3,
    fill: (x, y) => if y == 0 { rgb("#f0f0f0") },
    [*Service*], [*Port*], [*Description*],
    [API Gateway], [8080], [Request routing and auth],
    [User Service], [8081], [User management],
    [Data Service], [8082], [Data processing],
  ),
  caption: [Service Architecture]
)

== Data Flow

+ Client sends request to API Gateway
+ Gateway authenticates and routes request
+ Service processes request
+ Response returned to client

= API Reference

== Authentication

All API endpoints require authentication via Bearer token.

#rect(fill: rgb("#fff3cd"), width: 100%, inset: 1em)[
  *Note:* Tokens expire after 24 hours. Use the refresh endpoint to obtain new tokens.
]

=== POST /api/auth/login

Authenticates a user and returns access token.

*Request:*
\`\`\`json
{
  "email": "user@example.com",
  "password": "secretpassword"
}
\`\`\`

*Response:*
\`\`\`json
{
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "expiresIn": 86400
}
\`\`\`

== Users

=== GET /api/users

Returns list of all users.

*Headers:*
- \`Authorization: Bearer <token>\`

*Response:*
\`\`\`json
{
  "users": [
    {
      "id": "123",
      "email": "user@example.com",
      "name": "John Doe"
    }
  ],
  "total": 1
}
\`\`\`

= Configuration

== Environment Variables

#figure(
  table(
    columns: 3,
    fill: (x, y) => if y == 0 { rgb("#f0f0f0") },
    [*Variable*], [*Required*], [*Description*],
    [\`DATABASE_URL\`], [Yes], [MongoDB connection string],
    [\`JWT_SECRET\`], [Yes], [Secret for JWT signing],
    [\`PORT\`], [No], [Server port (default: 8080)],
    [\`LOG_LEVEL\`], [No], [Logging level (default: info)],
  ),
  caption: [Environment Variables]
)

= Troubleshooting

== Common Issues

=== Connection Refused

*Problem:* Cannot connect to database

*Solution:*
+ Verify MongoDB is running
+ Check \`DATABASE_URL\` is correct
+ Ensure network connectivity

=== Authentication Failed

*Problem:* 401 Unauthorized response

*Solution:*
+ Verify token is not expired
+ Check Authorization header format
+ Regenerate token if needed

= Changelog

== v1.0.0 (2025-01-15)

- Initial release
- User authentication
- CRUD operations
- API documentation
`,
  },
];

const defaultTypstContent = templates[1].content; // Use Basic Document as default

export default function EditorPage() {
  const [content, setContent] = useState(defaultTypstContent);
  const [preview, setPreview] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [documents, setDocuments] = useState([]);
  const [currentDoc, setCurrentDoc] = useState(null);
  const [showSidebar, setShowSidebar] = useState(true);
  const [showFindReplace, setShowFindReplace] = useState(false);
  const [findText, setFindText] = useState('');
  const [replaceText, setReplaceText] = useState('');
  const [newDocTitle, setNewDocTitle] = useState('');
  const [showNewDocDialog, setShowNewDocDialog] = useState(false);
  const [showSaveDialog, setShowSaveDialog] = useState(false);
  const [showTemplateGallery, setShowTemplateGallery] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [historyStack, setHistoryStack] = useState([defaultTypstContent]);
  const [historyIndex, setHistoryIndex] = useState(0);
  const editorRef = useRef(null);
  const debounceRef = useRef(null);

  // Load documents on mount
  useEffect(() => {
    loadDocuments();
  }, []);

  // Compile preview on content change with debounce
  useEffect(() => {
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }
    debounceRef.current = setTimeout(() => {
      compilePreview();
    }, 500);

    return () => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }
    };
  }, [content]);

  const loadDocuments = async () => {
    try {
      const response = await axios.get(`${API}/documents`);
      setDocuments(response.data);
    } catch (error) {
      console.error('Failed to load documents:', error);
    }
  };

  const compilePreview = async () => {
    try {
      setIsLoading(true);
      const response = await axios.post(`${API}/compile`, { content });
      setPreview(response.data.html || '');
    } catch (error) {
      console.error('Compile error:', error);
      setPreview(`<div style="color: #DC2626; padding: 20px;">Failed to compile: ${error.message}</div>`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleContentChange = useCallback((value) => {
    setContent(value);
  }, []);

  const handleUndo = () => {
    if (editorRef.current?.view) {
      undo(editorRef.current.view);
    }
  };

  const handleRedo = () => {
    if (editorRef.current?.view) {
      redo(editorRef.current.view);
    }
  };

  const handleFind = () => {
    if (editorRef.current?.view) {
      openSearchPanel(editorRef.current.view);
    }
  };

  const handleFindReplace = () => {
    setShowFindReplace(!showFindReplace);
  };

  const handleReplace = () => {
    if (findText && replaceText) {
      const newContent = content.replace(new RegExp(findText, 'g'), replaceText);
      setContent(newContent);
      toast.success(`Replaced all occurrences of "${findText}"`);
    }
  };

  const handleReplaceOne = () => {
    if (findText && replaceText) {
      const newContent = content.replace(findText, replaceText);
      if (newContent !== content) {
        setContent(newContent);
        toast.success('Replaced one occurrence');
      } else {
        toast.info('No match found');
      }
    }
  };

  const handleNewDocument = () => {
    setShowNewDocDialog(true);
    setNewDocTitle('');
  };

  const createNewDocument = async () => {
    if (!newDocTitle.trim()) {
      toast.error('Please enter a title');
      return;
    }
    try {
      const response = await axios.post(`${API}/documents`, {
        title: newDocTitle,
        content: defaultTypstContent,
      });
      setDocuments([...documents, response.data]);
      setCurrentDoc(response.data);
      setContent(response.data.content);
      setShowNewDocDialog(false);
      toast.success('Document created');
    } catch (error) {
      toast.error('Failed to create document');
    }
  };

  const handleSaveDocument = async () => {
    if (currentDoc) {
      try {
        await axios.put(`${API}/documents/${currentDoc.id}`, {
          content,
        });
        toast.success('Document saved');
        loadDocuments();
      } catch (error) {
        toast.error('Failed to save document');
      }
    } else {
      setShowSaveDialog(true);
      setNewDocTitle('');
    }
  };

  const saveAsNewDocument = async () => {
    if (!newDocTitle.trim()) {
      toast.error('Please enter a title');
      return;
    }
    try {
      const response = await axios.post(`${API}/documents`, {
        title: newDocTitle,
        content,
      });
      setDocuments([...documents, response.data]);
      setCurrentDoc(response.data);
      setShowSaveDialog(false);
      toast.success('Document saved');
    } catch (error) {
      toast.error('Failed to save document');
    }
  };

  const handleOpenDocument = (doc) => {
    setCurrentDoc(doc);
    setContent(doc.content);
    toast.success(`Opened "${doc.title}"`);
  };

  const handleDeleteDocument = async (doc, e) => {
    e.stopPropagation();
    try {
      await axios.delete(`${API}/documents/${doc.id}`);
      setDocuments(documents.filter((d) => d.id !== doc.id));
      if (currentDoc?.id === doc.id) {
        setCurrentDoc(null);
        setContent(defaultTypstContent);
      }
      toast.success('Document deleted');
    } catch (error) {
      toast.error('Failed to delete document');
    }
  };

  const handleExport = async (format) => {
    try {
      setIsLoading(true);
      const response = await axios.post(
        `${API}/export/${format}`,
        { content, format },
        { responseType: 'blob' }
      );

      const blob = new Blob([response.data]);
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `document.${format}`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
      toast.success(`Exported as ${format.toUpperCase()}`);
    } catch (error) {
      toast.error(`Export failed: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelectTemplate = (template) => {
    setContent(template.content);
    setCurrentDoc(null);
    setShowTemplateGallery(false);
    toast.success(`Loaded "${template.name}" template`);
  };

  const templateCategories = ['All', ...new Set(templates.map((t) => t.category))];

  const filteredTemplates =
    selectedCategory === 'All'
      ? templates
      : templates.filter((t) => t.category === selectedCategory);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 's') {
        e.preventDefault();
        handleSaveDocument();
      }
      if ((e.ctrlKey || e.metaKey) && e.key === 'f') {
        e.preventDefault();
        handleFind();
      }
      if ((e.ctrlKey || e.metaKey) && e.key === 'h') {
        e.preventDefault();
        handleFindReplace();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [content, currentDoc]);

  return (
    <div className="editor-container h-screen flex flex-col" data-testid="editor-page">
      {/* Toolbar */}
      <div className="toolbar" data-testid="toolbar">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setShowSidebar(!showSidebar)}
          data-testid="toggle-sidebar-btn"
          className="h-8 w-8"
        >
          <Menu className="h-4 w-4" />
        </Button>

        <div className="toolbar-divider" />

        <div className="toolbar-group">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" data-testid="file-menu-btn" className="h-8 gap-1">
                <File className="h-4 w-4" />
                File
                <ChevronDown className="h-3 w-3" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
              <DropdownMenuItem onClick={handleNewDocument} data-testid="new-doc-menu-item">
                <Plus className="h-4 w-4 mr-2" />
                New Document
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setShowTemplateGallery(true)} data-testid="templates-menu-item">
                <LayoutTemplate className="h-4 w-4 mr-2" />
                Templates Gallery
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleSaveDocument} data-testid="save-doc-menu-item">
                <Save className="h-4 w-4 mr-2" />
                Save
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => handleExport('pdf')} data-testid="export-pdf-menu-item">
                <FileType className="h-4 w-4 mr-2" />
                Export as PDF
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleExport('html')} data-testid="export-html-menu-item">
                <FileCode className="h-4 w-4 mr-2" />
                Export as HTML
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleExport('docx')} data-testid="export-docx-menu-item">
                <FileText className="h-4 w-4 mr-2" />
                Export as DOCX
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" data-testid="edit-menu-btn" className="h-8 gap-1">
                Edit
                <ChevronDown className="h-3 w-3" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
              <DropdownMenuItem onClick={handleUndo} data-testid="undo-menu-item">
                <Undo className="h-4 w-4 mr-2" />
                Undo
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleRedo} data-testid="redo-menu-item">
                <Redo className="h-4 w-4 mr-2" />
                Redo
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleFind} data-testid="find-menu-item">
                <Search className="h-4 w-4 mr-2" />
                Find
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleFindReplace} data-testid="replace-menu-item">
                <Replace className="h-4 w-4 mr-2" />
                Find & Replace
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="toolbar-divider" />

        <div className="toolbar-group">
          <Button
            variant="ghost"
            size="icon"
            onClick={handleUndo}
            title="Undo (Ctrl+Z)"
            data-testid="undo-btn"
            className="h-8 w-8"
          >
            <Undo className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={handleRedo}
            title="Redo (Ctrl+Y)"
            data-testid="redo-btn"
            className="h-8 w-8"
          >
            <Redo className="h-4 w-4" />
          </Button>
        </div>

        <div className="toolbar-divider" />

        <div className="toolbar-group">
          <Button
            variant="ghost"
            size="icon"
            onClick={handleFind}
            title="Find (Ctrl+F)"
            data-testid="find-btn"
            className="h-8 w-8"
          >
            <Search className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={handleFindReplace}
            title="Find & Replace (Ctrl+H)"
            data-testid="find-replace-btn"
            className="h-8 w-8"
          >
            <Replace className="h-4 w-4" />
          </Button>
        </div>

        <div className="flex-1" />

        <div className="toolbar-group">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleSaveDocument}
            data-testid="save-btn"
            className="h-8 gap-1"
          >
            <Save className="h-4 w-4" />
            Save
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="default" size="sm" data-testid="export-btn" className="h-8 gap-1">
                <Download className="h-4 w-4" />
                Export
                <ChevronDown className="h-3 w-3" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => handleExport('pdf')} data-testid="export-pdf-btn">
                PDF
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleExport('html')} data-testid="export-html-btn">
                HTML
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleExport('docx')} data-testid="export-docx-btn">
                DOCX
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Find/Replace Panel */}
      {showFindReplace && (
        <div className="find-replace-panel animate-fade-in" data-testid="find-replace-panel">
          <div className="flex items-center gap-2">
            <Input
              placeholder="Find..."
              value={findText}
              onChange={(e) => setFindText(e.target.value)}
              className="flex-1 h-8"
              data-testid="find-input"
            />
            <Input
              placeholder="Replace with..."
              value={replaceText}
              onChange={(e) => setReplaceText(e.target.value)}
              className="flex-1 h-8"
              data-testid="replace-input"
            />
            <Button
              variant="outline"
              size="sm"
              onClick={handleReplaceOne}
              data-testid="replace-one-btn"
              className="h-8"
            >
              Replace
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={handleReplace}
              data-testid="replace-all-btn"
              className="h-8"
            >
              Replace All
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setShowFindReplace(false)}
              data-testid="close-find-replace-btn"
              className="h-8 w-8"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar */}
        {showSidebar && (
          <div className="file-sidebar animate-fade-in" data-testid="file-sidebar">
            <div className="p-3 border-b border-border flex items-center justify-between">
              <span className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
                Documents
              </span>
              <Button
                variant="ghost"
                size="icon"
                onClick={handleNewDocument}
                data-testid="new-doc-btn"
                className="h-7 w-7"
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            <ScrollArea className="flex-1">
              {documents.length === 0 ? (
                <div className="p-4 text-center text-muted-foreground text-sm">
                  No documents yet
                </div>
              ) : (
                documents.map((doc) => (
                  <div
                    key={doc.id}
                    className={`file-item ${currentDoc?.id === doc.id ? 'active' : ''}`}
                    onClick={() => handleOpenDocument(doc)}
                    data-testid={`doc-item-${doc.id}`}
                  >
                    <FileText className="h-4 w-4 text-muted-foreground" />
                    <span className="flex-1 truncate text-sm">{doc.title}</span>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={(e) => handleDeleteDocument(doc, e)}
                      className="h-6 w-6 opacity-0 group-hover:opacity-100"
                      data-testid={`delete-doc-${doc.id}`}
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                ))
              )}
            </ScrollArea>
          </div>
        )}

        {/* Editor and Preview */}
        <ResizablePanelGroup direction="horizontal" className="flex-1">
          <ResizablePanel defaultSize={50} minSize={30}>
            <div className="h-full flex flex-col">
              <div className="h-8 bg-secondary/50 border-b border-border flex items-center px-3 gap-2">
                <FileCode className="h-4 w-4 text-muted-foreground" />
                <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Editor
                </span>
                {currentDoc && (
                  <span className="text-xs text-muted-foreground ml-2">— {currentDoc.title}</span>
                )}
              </div>
              <div className="flex-1 overflow-hidden" data-testid="code-editor">
                <CodeMirror
                  ref={editorRef}
                  value={content}
                  height="100%"
                  theme={githubLight}
                  extensions={[
                    typstLanguage,
                    history(),
                    search(),
                    keymap.of([...historyKeymap, ...searchKeymap]),
                  ]}
                  onChange={handleContentChange}
                  basicSetup={{
                    lineNumbers: true,
                    highlightActiveLineGutter: true,
                    highlightActiveLine: true,
                    foldGutter: true,
                    dropCursor: true,
                    allowMultipleSelections: true,
                    indentOnInput: true,
                    bracketMatching: true,
                    closeBrackets: true,
                    autocompletion: false,
                    rectangularSelection: true,
                    crosshairCursor: false,
                    highlightSelectionMatches: true,
                  }}
                />
              </div>
            </div>
          </ResizablePanel>

          <ResizableHandle withHandle />

          <ResizablePanel defaultSize={50} minSize={30}>
            <div className="h-full flex flex-col">
              <div className="h-8 bg-secondary/50 border-b border-border flex items-center px-3 gap-2">
                <Eye className="h-4 w-4 text-muted-foreground" />
                <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Preview
                </span>
                {isLoading && (
                  <span className="text-xs text-accent ml-2">Compiling...</span>
                )}
              </div>
              <ScrollArea className="flex-1 preview-container" data-testid="preview-panel">
                <div
                  className="preview-content p-4"
                  dangerouslySetInnerHTML={{ __html: preview }}
                />
              </ScrollArea>
            </div>
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>

      {/* Status Bar */}
      <div className="status-bar" data-testid="status-bar">
        <span>Typst Editor</span>
        <span className="mx-2">|</span>
        <span>{content.split('\n').length} lines</span>
        <span className="mx-2">|</span>
        <span>{content.length} characters</span>
        {currentDoc && (
          <>
            <span className="mx-2">|</span>
            <span>{currentDoc.title}</span>
          </>
        )}
      </div>

      {/* New Document Dialog */}
      <Dialog open={showNewDocDialog} onOpenChange={setShowNewDocDialog}>
        <DialogContent data-testid="new-doc-dialog">
          <DialogHeader>
            <DialogTitle>New Document</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <Input
              placeholder="Document title"
              value={newDocTitle}
              onChange={(e) => setNewDocTitle(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && createNewDocument()}
              data-testid="new-doc-title-input"
            />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowNewDocDialog(false)}>
              Cancel
            </Button>
            <Button onClick={createNewDocument} data-testid="create-doc-btn">
              Create
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Save Document Dialog */}
      <Dialog open={showSaveDialog} onOpenChange={setShowSaveDialog}>
        <DialogContent data-testid="save-doc-dialog">
          <DialogHeader>
            <DialogTitle>Save Document</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <Input
              placeholder="Document title"
              value={newDocTitle}
              onChange={(e) => setNewDocTitle(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && saveAsNewDocument()}
              data-testid="save-doc-title-input"
            />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowSaveDialog(false)}>
              Cancel
            </Button>
            <Button onClick={saveAsNewDocument} data-testid="save-new-doc-btn">
              Save
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Template Gallery Dialog */}
      <Dialog open={showTemplateGallery} onOpenChange={setShowTemplateGallery}>
        <DialogContent className="max-w-4xl max-h-[85vh] flex flex-col" data-testid="template-gallery-dialog">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <LayoutTemplate className="h-5 w-5" />
              Template Gallery
            </DialogTitle>
          </DialogHeader>

          {/* Category Tabs */}
          <div className="flex gap-2 border-b border-border pb-3">
            {templateCategories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setSelectedCategory(category)}
                data-testid={`template-category-${category.toLowerCase()}`}
                className="h-8"
              >
                {category}
              </Button>
            ))}
          </div>

          {/* Template Grid */}
          <ScrollArea className="flex-1 pr-4" data-testid="template-grid">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 py-4">
              {filteredTemplates.map((template) => {
                const IconComponent = template.icon;
                return (
                  <div
                    key={template.id}
                    onClick={() => handleSelectTemplate(template)}
                    className="group cursor-pointer border border-border rounded-sm p-4 hover:border-accent hover:bg-accent/5 transition-all duration-200"
                    data-testid={`template-${template.id}`}
                  >
                    <div className="flex items-start gap-3">
                      <div className="p-2 bg-secondary rounded-sm group-hover:bg-accent/10 transition-colors">
                        <IconComponent className="h-5 w-5 text-muted-foreground group-hover:text-accent" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-medium text-sm group-hover:text-accent transition-colors">
                          {template.name}
                        </h3>
                        <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                          {template.description}
                        </p>
                        <span className="inline-block mt-2 text-xs px-2 py-0.5 bg-secondary rounded-sm text-muted-foreground">
                          {template.category}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </ScrollArea>

          <DialogFooter className="border-t border-border pt-4">
            <p className="text-xs text-muted-foreground flex-1">
              Click a template to load it into the editor
            </p>
            <Button variant="outline" onClick={() => setShowTemplateGallery(false)}>
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
