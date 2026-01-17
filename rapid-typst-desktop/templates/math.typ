// Mathematics Notes Template

#set page(margin: 2cm)
#set text(size: 11pt)
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
