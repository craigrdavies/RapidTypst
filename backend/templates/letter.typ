// Formal Letter Template

#set page(margin: (x: 2.5cm, y: 2cm))
#set text(size: 11pt)
#set par(justify: true)

#align(right)[
  Your Name\
  Your Address\
  City, State ZIP\
  your.email#"@"example.com\
  +1 (555) 123-4567
]

#v(1em)

#datetime.today().display("[month repr:long] [day], [year]")

#v(1em)

Recipient Name\
Title/Position\
Company/Organization\
Address Line 1\
City, State ZIP

#v(1em)

Dear Mr./Ms. Last Name,

#v(0.5em)

*Re: Subject of the Letter*

#v(0.5em)

I am writing to state the purpose of your letter. This letter is regarding brief context.

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

Your Name\
Your Title (if applicable)

#v(1em)

#text(size: 9pt, fill: gray)[
  Enclosures: List any documents enclosed\
  CC: Names of anyone receiving copies
]
