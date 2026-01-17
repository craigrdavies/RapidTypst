// Made with 💖 for Typst lovers 
// Business Report Template

#set page(margin: 2cm)
#set text(size: 11pt)
#set heading(numbering: "1.1")
#set par(justify: true)

#align(center)[
  #rect(fill: rgb("#395a7f"), width: 100%, inset: 2em)[
    #text(fill: white, size: 26pt, weight: "bold")[
      Quarterly Business Report
    ]
    
    #v(0.5em)
    
    #text(fill: rgb("#cccccc"), weight: "semibold", size: 14pt)[
      Q4 2024 Performance Analysis
    ]
  ]
]

#v(1em)

#grid(
  columns: (1fr, 1fr),
  gutter: 2em,
  [
    *Prepared by:* Analytics Team\
    *Date:* January 15, 2025
  ],
  [
    *Department:* Business Intelligence\
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
    [Total Revenue], [\$2.1M], [\$2.6M], [+23%],
    [Gross Margin], [42%], [45%], [+3pp],
    [Operating Income], [\$420K], [\$585K], [+39%],
  ),
  caption: [Quarterly Financial Summary]
)

== Cost Analysis

Operating expenses were managed effectively:

- Personnel costs: \$1.2M (46% of revenue)
- Marketing spend: \$320K (12% of revenue)
- Technology infrastructure: \$180K (7% of revenue)

= Customer Metrics

== Acquisition & Retention

#grid(
  columns: (1fr, 1fr, 1fr),
  gutter: 1em,
  [
    #rect(fill: rgb("#f5f5f5"), inset: 1em)[
      #align(center)[
        #text(size: 24pt, weight: "bold")[1,247]
        
        New Customers
      ]
    ]
  ],
  [
    #rect(fill: rgb("#f5f5f5"), inset: 1em)[
      #align(center)[
        #text(size: 24pt, weight: "bold")[94%]
        
        Retention Rate
      ]
    ]
  ],
  [
    #rect(fill: rgb("#f5f5f5"), inset: 1em)[
      #align(center)[
        #text(size: 24pt, weight: "bold")[\$2,340]
        
        Avg. Customer Value
      ]
    ]
  ],
)

= Recommendations

Based on our analysis, we recommend:

+ *Expand digital marketing* - Allocate additional \$50K to high-performing channels
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
