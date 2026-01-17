// Professional Resume Template

#set page(margin: (x: 1.5cm, y: 1.5cm))
#set text(size: 10pt)

#align(center)[
  #text(size: 24pt, weight: "bold")[Your Name]
  
  #text(size: 10pt, fill: gray)[
    your.email#"@"example.com | +1 (555) 123-4567 | City, Country
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

*Open Source Contribution* - #link("https://github.com/project")[GitHub]
- Contributed 50+ commits to popular data visualization library
- Fixed critical performance bug affecting 10k+ users
