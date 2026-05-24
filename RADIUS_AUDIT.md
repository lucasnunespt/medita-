# NeuroMedit Border Radius Audit

## 1. Resumo geral

O projeto tem uma identidade de radius reconhecivel: botoes e pills muito arredondados com `999px`, cards grandes com `28px`, paineis medios com `22px` e itens menores entre `16px` e `20px`. Essa escala aparece em varias paginas e parece fazer parte da linguagem calma, organica e suave do NeuroMedit.

A inconsistencia principal nao e a existencia de muitos valores, mas a falta de uma fonte unica para eles. Tokens como `--radius-lg`, `--radius-md` e `--radius-sm` sao repetidos em varios arquivos, enquanto alguns componentes usam valores diretos proximos, como `20px`, `24px`, `26px`, `32px`, `1.35rem` e `1.5rem`. Isso cria pequenas diferencas visuais que podem parecer acidentais.

## 2. Todos os valores encontrados

| Valor | Uso principal encontrado | Arquivos |
| --- | --- | --- |
| `0` | Remocao de radius em etapas da experiencia imersiva mobile/compacta | `neuro.css` |
| `0.4rem` | Focus visible do logo | `header.css` |
| `14px` | Chip pequeno de sessao | `session.css` |
| `16px` / `var(--radius-sm)` | Cards/elementos menores, simbolos e listas compactas | `about.css`, `case-study.css`, `home.css`, `library.css`, `why.css`, `contributors.css` |
| `18px` | Dropdown de idioma, cards pequenos, listas e placeholders compactos | `i18n.css`, `library.css`, `why.css`, `contributors.css`, `case-study.css` |
| `20px` | Cards estaticos/editoriais e caixas de apoio | `about.css`, `home.css`, `library.css`, `why.css`, `contributors.css`, `case-study.css` |
| `1.35rem` | Header shell em breakpoint responsivo | `header.css` |
| `22px` / `var(--radius-md)` | Paineis medios, cta boxes, feedback cards, elementos do case study | `about.css`, `case-study.css`, `contributors.css`, `complete.css`, `home.css`, `library.css`, `session.css`, `why.css` |
| `1.5rem` | Painel mobile do header em breakpoint responsivo | `header.css` |
| `24px` | Cards visuais, icones grandes, ajustes de feedback e reset points | `complete.css`, `contributors.css`, `neuro.css` |
| `26px` | Ajuste responsivo de `.experience-step` | `neuro.css` |
| `28px` / `var(--radius-lg)` | Cards principais e containers grandes | `about.css`, `case-study.css`, `complete.css`, `contributors.css`, `home.css`, `library.css`, `neuro.css`, `session.css`, `why.css` |
| `clamp(24px, 2.4vw, 28px)` | Card de perfil do founder | `contributors.css` |
| `clamp(22px, 3vw, 30px)` | Painel final do case study | `case-study.css` |
| `32px` / `2rem` | Painel mobile do header e experience step maior | `header.css`, `neuro.css` |
| `40%` | Forma atmosferica organica | `neuro.css` |
| `50%` | Orbs circulares e glows | `index.html`, `neuro.css`, `session.css` |
| `999px` | Botoes, pills, dropdown buttons, header shell/nav, chips e controles flutuantes | quase todos os CSS principais e `index.html` |
| `inherit` | Pseudo-elementos que herdam a forma circular do componente pai | `index.html`, `session.css` |

## 3. Onde os radius sao usados

### Cards

- `28px` / `var(--radius-lg)`
  - `home.css`: `.why-card`
  - `library.css`: `.session-card`
  - `neuro.css`: `.state-card`
  - `session.css`: `.session-card`
  - `complete.css`: `.complete-card`
  - `case-study.css`: `.case-hero-card`
  - `contributors.css`: `.contributor-empty-card`
  - Parece intencional: e o radius mais forte para cards principais.

- `22px` / `var(--radius-md)`
  - `why.css`: `.why-cta-box`
  - `complete.css`: feedback/minimal `.complete-card`
  - `case-study.css`: `.case-results-inner`, `.case-opportunity-box`, mobile `.case-hero-card`
  - `contributors.css`: `.founder-photo-wrap`, mobile `.principles-list li`
  - Parece intencional como escala media, mas alguns usos competem com `20px`.

- `20px`
  - `about.css`: `.principle-card`, `.design-card`
  - `why.css`: `.why-science-note`, `.why-step-card`
  - `home.css`: `.progress-module`
  - `library.css`: `.quick-card`
  - `contributors.css`: `.contributors-cta-box`, mobile `.empty-card-icon`, mobile `.founder-photo-wrap`
  - `case-study.css`: `.case-opportunity-box`, mobile `.case-thank-you-panel`
  - Parece parcialmente intencional para cards editoriais menores, mas tambem parece substituto manual de `--radius-md`.

- `24px`
  - `complete.css`: feedback atmosphere card/container overrides
  - `contributors.css`: `.empty-card-icon`, mobile `.contributor-empty-card`, mobile `.founder-profile-card`
  - `neuro.css`: `.neuromedit-experience .reset-point`
  - Parece acidental quando usado em cards, porque fica entre `22px` e `28px` sem token claro.

- `18px`
  - `library.css`: `.upcoming-card`
  - `why.css`: `.why-resistance-list li`
  - `contributors.css`: `.founder-symbol`, `.principles-list li`
  - `case-study.css`: mobile `.case-diagram-placeholder`, `.case-learning-list`, `.case-results-inner`
  - Parece uma escala compacta intencional, mas nao esta tokenizada.

- `16px` / `var(--radius-sm)`
  - `home.css`: `.continue-card`
  - `why.css`: mobile `.why-resistance-list li`
  - `contributors.css`: mobile `.founder-symbol`
  - Parece apropriado para componentes pequenos, mas o uso direto e o token convivem.

### Botoes

- `999px`
  - `home.css`, `why.css`, `case-study.css`, `complete.css`, `contributors.css`, `session.css`: `.button`
  - `neuro.css`: `.landing-button`, `.checkin-button`, `.secondary-action`
  - `index.html`: `.start-btn`, `.exit-btn`, `.final-btn`, `.choice`
  - Parece totalmente intencional. O formato pill e uma parte forte da identidade do NeuroMedit.

- `999px` em controles secundarios
  - `session.css`: `.session-secondary-link`, `.session-exit`, `.session-pause`
  - `complete.css`: `.feedback-option`
  - Tambem parece intencional: reforca controles leves, tacteis e calmos.

### Inputs

- Nao foram encontrados inputs de formulario com `border-radius` proprio nos arquivos inspecionados.
- O caso mais proximo e a selecao de feedback:
  - `complete.css`: `.feedback-option` usa `999px`.
- Impacto: nao ha uma escala de radius clara para inputs futuros. Se o projeto adicionar campos de texto, existe risco de cada pagina escolher um valor diferente.

### Modais

- Nao ha um sistema de modal evidente com `border-radius` dedicado.
- Elementos que funcionam como paineis/modais:
  - `complete.css`: `.complete-card` com `28px`, `22px` ou `24px` dependendo do modo.
  - `case-study.css`: `.case-thank-you-panel` com `clamp(22px, 3vw, 30px)`.
  - `header.css`: `.header-mobile-panel` com `2rem` e `1.5rem`.
- O header mobile parece intencionalmente mais arredondado. Ja o `complete.css` alternar entre `28px`, `24px` e `22px` parece mais acidental.

### Containers

- `999px`
  - `header.css`: `.header-shell`, `.header-nav-desktop`, `.header-nav-link`, `.nav-indicator`
  - `i18n.css` e `neuro.css`: `.language-pill`, `.language-trigger`, `.language-options button`
  - Parece intencional: o header e a troca de idioma vivem no universo pill.

- `2rem`, `1.5rem`, `1.35rem`
  - `header.css`: painel e shell mobile/responsivo.
  - Parece intencional no header, mas usa unidade diferente da escala em pixels do restante do projeto.

- `32px`, `26px`, `0`
  - `neuro.css`: `.neuromedit-experience .experience-step` e variantes responsivas.
  - Parece especifico da experiencia guiada. O `32px` e o `26px` podem ser intencionais como ajuste responsivo, mas ficam fora da escala tokenizada.

### Hero sections

- Nao foram encontrados `border-radius` aplicados diretamente a hero sections principais.
- A sensacao de arredondamento nas heroes vem dos cards, botoes, pills e paineis internos:
  - `.case-hero-card`: `28px`, depois `22px` no mobile.
  - `.founder-profile-card`: `clamp(24px, 2.4vw, 28px)`.
  - `.button`: `999px`.
- Isso parece adequado: as secoes permanecem abertas e atmosfericas, enquanto os elementos internos carregam a suavidade.

### Dropdowns

- `i18n.css`
  - `.language-pill`: `999px`
  - `.language-trigger`: `999px`
  - `.language-options`: `18px`
  - `.language-options button`: `999px`
- `neuro.css`
  - definicoes semelhantes para idioma legado.
- `index.html`
  - versao inline do seletor de idioma com `999px`.
- Agrupamento parece intencional: trigger e opcoes como pills, container do dropdown como painel pequeno de `18px`. O risco e duplicacao entre `i18n.css`, `neuro.css` e `index.html`.

### Elementos circulares e atmosfericos

- `50%`
  - `index.html`: `.breath-orb`, `.breath-glow`
  - `neuro.css`: `.breath-orb`, `.breath-core`, `.meditation-orb`
  - `session.css`: `.practice-orb`
  - Intencional: circulos/orbs sao linguagem visual central da meditacao.

- `40%`
  - `neuro.css`: `.sea-depth`
  - Intencional: forma organica, menos perfeita que um circulo.

- `inherit`
  - `index.html`: `.breath-orb::after`
  - `session.css`: `.practice-orb::before`, `.session-progress`
  - Intencional: pseudo-elementos seguem a forma circular do pai.

## 4. Possiveis agrupamentos

### Escala proposta que ja existe implicitamente

- Circular / pill: `999px`, `50%`, `inherit`
- Pequeno: `14px`, `16px`, `18px`
- Medio: `20px`, `22px`
- Grande: `24px`, `28px`
- Extra grande / painel especial: `30px`, `32px`, `2rem`
- Sem radius: `0`
- Organico: `40%`

### Escala de design system mais evidente

- `--radius-sm: 16px`
- `--radius-md: 22px`
- `--radius-lg: 28px`
- `999px` para pills/botoes
- `50%` para orbs/circulos

Essa e a escala mais coerente com a identidade atual. Os valores `20px`, `18px` e `24px` podem continuar existindo, mas hoje eles parecem mais operacionais do que sistemicos.

## 5. Valores que parecem intencionais

- `999px`
  - Muito recorrente em botoes, pills, header, idioma e controles.
  - Fortalece a identidade suave e respiravel.

- `28px` / `var(--radius-lg)`
  - Usado em cards principais.
  - Parece ser o radius base para superficies grandes.

- `22px` / `var(--radius-md)`
  - Usado em paineis medios e containers secundarios.
  - Parece ser a segunda escala principal.

- `16px` / `var(--radius-sm)`
  - Usado para elementos compactos.
  - Faz sentido como menor token oficial.

- `50%`
  - Usado em orbs e elementos circulares.
  - Claramente alinhado a respiracao/meditacao.

- `40%`
  - Usado em forma atmosferica organica.
  - Parece intencional como elemento visual, nao componente UI.

- `0`
  - Usado para remover card visual em etapas especificas.
  - Parece intencional no contexto imersivo/mobile.

## 6. Valores que parecem acidentais ou pouco sistemicos

- `20px`
  - Muito usado em cards editoriais, mas nao existe como token.
  - Pode ser intencional na pratica, mas compete com `--radius-md: 22px`.

- `18px`
  - Usado para dropdown, listas e cards compactos.
  - Faz sentido visualmente, mas aparece como valor solto.

- `24px`
  - Usado em cards/containers intermediarios.
  - Fica entre `22px` e `28px`, sem papel claro.

- `26px`
  - Aparece apenas como ajuste responsivo de `.experience-step`.
  - Parece ajuste manual entre `24px` e `28px`.

- `32px` / `2rem`
  - Usado no header mobile e em experience steps.
  - Pode ser intencional para paineis grandes, mas nao conversa diretamente com os tokens globais.

- `1.35rem`, `1.5rem`, `2rem`, `0.4rem`
  - O header usa `rem` enquanto o restante usa principalmente `px`.
  - Nao e necessariamente errado, mas aumenta a sensacao de sistema paralelo.

- `clamp(24px, 2.4vw, 28px)` e `clamp(22px, 3vw, 30px)`
  - Responsivos e visualmente sofisticados.
  - Parecem intencionais em paginas especiais, mas devem ficar escopados a componentes editoriais/cinematicos.

## 7. Leitura por arquivo

### `about.css`

- Tokens: `--radius-lg: 28px`, `--radius-md: 22px`, `--radius-sm: 16px`.
- Usos reais: `.principle-card` e `.design-card` usam `20px`.
- Observacao: define uma escala de tokens, mas os cards principais da pagina usam valor direto fora dela.

### `home.css`

- Tokens: `28px`, `22px`, `16px`.
- Usos: `.button` com `999px`, `.progress-module` com `20px`, `.continue-card` com `16px`, `.why-card` com `28px` e override mobile `22px`.
- Observacao: bom uso de escala responsiva para cards, mas `20px` aparece fora dos tokens.

### `library.css`

- Tokens: `28px`, `22px`, `16px`.
- Usos: `.filter-pill` com `999px`, `.upcoming-card` com `18px`, `.session-card` com `28px`, `.quick-card` com `20px`.
- Observacao: diferencia cards por hierarquia, mas `18px` e `20px` nao estao tokenizados.

### `why.css`

- Tokens: `28px`, `22px`, `16px`.
- Usos: botoes `999px`, notes/step cards `20px`, listas `18px` e `16px` no mobile, CTA `22px`, step number `999px`.
- Observacao: escala funcional clara, mas com muitos valores proximos.

### `contributors.css`

- Tokens: `28px`, `22px`.
- Usos: perfil com `clamp(24px, 2.4vw, 28px)`, foto `22px`, simbolo `18px`, cards `28px`, icones `24px`, ajustes mobile `24px`, `20px`, `16px`.
- Observacao: pagina usa radius de modo mais editorial e responsivo. Parece intencional, mas e a pagina com maior variedade de valores.

### `case-study.css`

- Tokens: `28px`, `22px`, `16px`.
- Usos: botoes/pills `999px`, hero card `28px` e `22px` no mobile, paineis `22px`, thank-you panel `clamp(22px, 3vw, 30px)`, boxes `20px` e compactos `18px`.
- Observacao: a variedade parece alinhada ao carater editorial/cinematografico, desde que fique escopada ao case.

### `complete.css`

- Token: `--radius-lg: 28px`.
- Usos: `.complete-card` `28px`, feedback atmosphere `24px`, minimal `22px`, feedback options `999px`.
- Observacao: alternancia entre `28px`, `24px` e `22px` por modo pode ser intencional, mas sem tokens fica dificil perceber a regra.

### `session.css`

- Token: `--radius-lg: 28px`.
- Usos: `.session-card` `28px`, `.audio-unavailable` `var(--radius-md)` sem token local visivel, chip `14px`, botoes/links `999px`, orb `50%`.
- Observacao: ha possivel dependencia de `--radius-md` definida por outro CSS ou herdada. Isso merece atencao porque o arquivo declara `--radius-lg`, mas usa `--radius-md`.

### `neuro.css`

- Token: `--radius-lg: 28px`.
- Usos: state card `28px` e mobile `22px`, header/idioma legado `999px`, experiencia imersiva `32px`, `26px`, `24px`, `0`, orbs `50%`, forma organica `40%`.
- Observacao: mistura sistema de paginas, idioma legado e experiencia imersiva. E o arquivo com maior risco de radius estruturais ficarem acoplados.

### `header.css`

- Usos: header/nav com `999px`, focus logo `0.4rem`, mobile panel `2rem` e `1.5rem`, mobile link `1rem`, shell responsivo `1.35rem`.
- Observacao: header tem linguagem propria e consistente internamente, mas usa `rem` enquanto o resto do produto usa `px`.

### `i18n.css`

- Usos: language pill/trigger/buttons com `999px`, dropdown panel com `18px`.
- Observacao: modelo claro e coerente. A duplicacao com `neuro.css` e `index.html` e o maior risco.

### `index.html`

- Usos inline: botoes, idioma e escolhas com `999px`; breath orb/glow com `50%`; pseudo-elemento com `inherit`.
- Observacao: coerente dentro da experiencia de entrada, mas vive fora dos CSS compartilhados.

## 8. Conclusao

O radius do NeuroMedit tem uma base forte e reconhecivel: pills extremamente arredondadas, cards grandes suaves e orbs circulares. A direcao visual combina com o produto.

Os pontos que mais parecem acidentais sao os valores intermediarios sem token (`18px`, `20px`, `24px`, `26px`) e a repeticao local de tokens em varios arquivos. A recomendacao futura seria consolidar uma escala oficial sem achatar a personalidade do projeto: manter `999px`, `50%`, `16px`, `22px` e `28px` como nucleo, e decidir explicitamente quando `18px`, `20px`, `24px` e clamps editoriais sao excecoes permitidas.
