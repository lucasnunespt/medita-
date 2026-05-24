# NeuroMedit Visual & UX Consistency Audit

## 1. Resumo geral

O NeuroMedit tem uma identidade visual forte quando o sistema de temas por horario, os fundos atmosfericos e os componentes transluidos trabalham juntos. A base mais consistente aparece nas paginas principais que usam `theme-sync.css`, enquanto `index.html`, `feedback.html`, `contributors.html` e `case-study.html` introduzem experiencias mais especificas e cinematograficas.

A maior fragilidade atual nao esta em um unico componente, mas na fragmentacao do sistema visual: ha tokens e fundos definidos em varios CSS locais, logica de tema duplicada ou incompleta, botoes/cards com escalas diferentes e algumas diferencas de idioma/navegacao. Isso pode fazer certas paginas parecerem de fases diferentes do produto, mesmo quando os elementos individuais estao bem desenhados.

A auditoria combinou leitura estatica dos arquivos HTML/CSS/JS e verificacao renderizada local das principais paginas. A inspeccao visual foi feita em ambiente desktop, com o tema automatico resultando em `theme-afternoon` no momento do teste.

## 2. Inconsistencias criticas

1. Contrato incompleto entre temas CSS e JS
   - Arquivos afetados: `theme-sync.css`, `theme-sync.js`
   - O CSS define temas como `dawn`, `day`, `sleep` e `warm-night`, mas o JS automatico retorna apenas `morning`, `afternoon`, `sunset`, `evening`, `night` e `late-night`.
   - Impacto: alguns estados visuais previstos pelo design system nunca entram automaticamente, o que enfraquece a promessa de fundos atmosfericos por horario.
   - Prioridade: Alta

2. Navegacao com idioma inconsistente
   - Arquivos afetados: `header-nav.js`, `case-study.html`, paginas com header compartilhado
   - O link de estudo de caso e injetado como texto fixo em portugues, `Estudo de caso`, enquanto `case-study.html` usa `Case study` estatico. Esse item nao usa `data-i18n`.
   - Impacto: a navegacao pode misturar idiomas na mesma interface, prejudicando a percepcao profissional.
   - Prioridade: Alta

3. Fundos globais e locais competindo entre si
   - Arquivos afetados: `theme-sync.css`, `neuro.css`, `home.css`, `library.css`, `why.css`, `about.css`, `contributors.css`, `session.css`, `complete.css`, `case-study.css`
   - Variaveis e backgrounds sao definidos em varios arquivos. Algumas paginas ainda carregam fundos hardcoded claros, como `#f4f4f1` e `#f8f8f5`, antes do `theme-sync.css`.
   - Impacto: o tema automatico funciona em muitas telas porque a ordem de carregamento compensa, mas a arquitetura fica fragil e facil de quebrar em ajustes futuros.
   - Prioridade: Alta

4. Overflow horizontal na pagina de estados
   - Arquivos afetados: `states.html`, `neuro.css`, `i18n.css`, `header.css`
   - Foi detectado `scrollWidth` maior que `clientWidth` em desktop. O elemento associado foi `.language-options`, posicionado alem da largura visivel.
   - Impacto: em Android ou telas estreitas, isso pode gerar deslocamento lateral indesejado.
   - Prioridade: Alta

5. Seletores globais amplos demais em temas
   - Arquivo afetado: `theme-sync.css`
   - Seletores como `body.theme-* :is(h1, h2, h3, .site-logo, .header-nav-link.active, ...)` podem sobrescrever cores especificas de paginas ou secoes.
   - Impacto: paginas mais editoriais, como o estudo de caso, podem perder contraste ou exigir regras mais fortes para se proteger.
   - Prioridade: Alta

6. Caracteres corrompidos em textos visiveis
   - Arquivos afetados: varios HTML, incluindo `calm.html`, `focus.html`, `sleep.html`, `states.html`, `about.html`, `home.html` e rodapes relacionados
   - Ha ocorrencias de `�` em metadados, separadores e copyright.
   - Impacto: transmite falta de acabamento e pode afetar SEO, acessibilidade e confianca visual.
   - Prioridade: Media

## 3. Inconsistencias por pagina

### index.html

- Problema encontrado: pagina visualmente separada do restante, com CSS e JS inline extensos, atmosfera de video propria e sem header compartilhado.
- Arquivo afetado: `index.html`
- Possivel causa: a experiencia inicial parece ter sido criada como uma entrada imersiva independente, fora do design system comum.
- Impacto visual/UX: pode funcionar como landing/portal, mas tambem cria uma ruptura forte quando comparada com paginas internas mais claras e estruturadas.
- Prioridade: Media

### home.html

- Problema encontrado: a pagina e coerente com o tema automatico, mas cards de continuidade, botoes e cards de estado usam escalas e superficies que variam em relacao a outras paginas.
- Arquivos afetados: `home.html`, `home.css`, `theme-sync.css`, `header-nav.js`
- Possivel causa: combinacao de estilos locais com sobrescritas globais de tema.
- Impacto visual/UX: a home permanece forte, mas parte da hierarquia de componentes nao se repete com a mesma clareza em paginas internas.
- Prioridade: Media

### states.html

- Problema encontrado: overflow horizontal causado pelo menu de idioma; a pagina tambem depende de `neuro.css`, que ainda possui background local hardcoded para `body.states-body`.
- Arquivos afetados: `states.html`, `neuro.css`, `i18n.css`, `header.css`
- Possivel causa: dropdown de idioma posicionado sem contencao suficiente e sistema antigo de background preservado no CSS base.
- Impacto visual/UX: risco real de scroll lateral no mobile/Android e sensacao de pagina mais antiga que home/library.
- Prioridade: Alta

### library.html

- Problema encontrado: fundo local claro hardcoded em `library.css`, alem de diferencas de densidade entre hero, filtros e cards.
- Arquivos afetados: `library.html`, `library.css`, `theme-sync.css`
- Possivel causa: CSS local anterior ao sistema consolidado de temas.
- Impacto visual/UX: a pagina renderiza bem com `theme-sync.css`, mas a manutencao e fragil; pequenos ajustes de ordem podem devolver um fundo cinza/bege generico.
- Prioridade: Media

### why.html

- Problema encontrado: pagina extensa com muitos grupos de cards parecidos; botoes e superficies seguem definicoes locais que nao sao exatamente iguais as de outras paginas.
- Arquivos afetados: `why.html`, `why.css`, `theme-sync.css`
- Possivel causa: necessidade editorial maior, resolvida com variacoes locais de layout.
- Impacto visual/UX: a leitura pode ficar densa e algumas secoes perdem hierarquia, apesar da direcao visual geral estar alinhada.
- Prioridade: Media

### about.html

- Problema encontrado: background local hardcoded e acabamento mais simples que paginas recentes como contributors e case study.
- Arquivos afetados: `about.html`, `about.css`, `theme-sync.css`
- Possivel causa: pagina criada em uma fase visual anterior do projeto.
- Impacto visual/UX: parece correta, mas menos atmosferica e menos premium que outras areas do NeuroMedit.
- Prioridade: Media

### contributors.html

- Problema encontrado: pagina mais rica visualmente, com gradientes, `color-mix` e superficies mais expressivas que outras paginas internas.
- Arquivos afetados: `contributors.html`, `contributors.css`, `theme-sync.css`
- Possivel causa: tratamento mais recente e especifico para uma pagina de comunidade/contribuicao.
- Impacto visual/UX: aumenta a sensacao premium, mas pode destacar demais a pagina em relacao a about/library/why.
- Prioridade: Media

### feedback.html

- Problema encontrado: usa atmosfera propria via `complete.css`, incluindo video de fundo e modos especificos; o video se estende alem da viewport, embora esteja visualmente contido.
- Arquivos afetados: `feedback.html`, `complete.css`
- Possivel causa: reaproveitamento da pagina de conclusao com uma camada imersiva adicional.
- Impacto visual/UX: pode parecer uma experiencia paralela ao fluxo principal; o enquadramento do video e ponto de risco responsivo.
- Prioridade: Media

### complete.html

- Problema encontrado: tipografia do titulo e card central sao bem mais compactos que as paginas de sessao e heroes principais.
- Arquivos afetados: `complete.html`, `complete.css`
- Possivel causa: componente de finalizacao tratado como modal/painel, nao como pagina editorial.
- Impacto visual/UX: a tela cumpre funcao, mas a transicao das sessoes para a conclusao pode perder impacto emocional.
- Prioridade: Media

### calm.html

- Problema encontrado: pagina de sessao com H1/H2 muito grandes em relacao a paginas internas; chips e botoes seguem escala propria.
- Arquivos afetados: `calm.html`, `session.css`, `session-flow.js`, `theme-sync.css`
- Possivel causa: layout de sessao foi desenhado como experiencia focada, separado da escala editorial das demais paginas.
- Impacto visual/UX: boa imersao, mas risco de hierarquia exagerada em telas menores.
- Prioridade: Media

### focus.html

- Problema encontrado: mesma estrutura das sessoes, com escala tipografica grande e controles que nao se conectam totalmente aos botoes globais.
- Arquivos afetados: `focus.html`, `session.css`, `session-flow.js`, `theme-sync.css`
- Possivel causa: padrao de sessao compartilhado entre praticas.
- Impacto visual/UX: consistente dentro das sessoes, porem parcialmente diferente do restante do site.
- Prioridade: Media

### sleep.html

- Problema encontrado: a pagina de sono pode receber tema diurno automatico, o que cria tensao entre conteudo de descanso e atmosfera clara.
- Arquivos afetados: `sleep.html`, `session.css`, `theme-sync.css`, `theme-sync.js`
- Possivel causa: tema automatico global nao considera a intencao semantica da pagina.
- Impacto visual/UX: em horario diurno, a experiencia de sono pode parecer menos envolvente.
- Prioridade: Media

### body.html

- Problema encontrado: segue o mesmo padrao das sessoes, com tipografia e espacamento mais dramaticos que paginas internas.
- Arquivos afetados: `body.html`, `session.css`, `session-flow.js`, `theme-sync.css`
- Possivel causa: sistema visual de sessao separado do sistema editorial.
- Impacto visual/UX: boa consistencia entre praticas, mas ainda com diferenca perceptivel em relacao ao site institucional.
- Prioridade: Media

### case-study.html

- Problema encontrado: sistema visual proprio, mais editorial e cinematografico, com H1 muito maior que as demais paginas; navegacao estatica em ingles e sem `data-i18n`.
- Arquivos afetados: `case-study.html`, `case-study.css`, `theme-sync.css`, `header.css`
- Possivel causa: refinamento especifico para uma pagina de portfolio/case, com escopo visual independente.
- Impacto visual/UX: a pagina esta mais premium, mas pode parecer uma camada separada do produto se os tokens especificos nao forem mantidos estritamente escopados.
- Prioridade: Media

## 4. Inconsistencias globais

### Cores

- Existem multiplas fontes de verdade para fundos: `theme-sync.css` define o sistema principal, mas CSS locais ainda declaram backgrounds proprios.
- Tons claros hardcoded em alguns arquivos podem reintroduzir a aparencia cinza/bege generica caso a cascata mude.
- `index.html`, `feedback.html` e `case-study.html` possuem atmosferas proprias mais cinematicas; isso e positivo quando intencional, mas precisa de limites claros.
- A aplicacao de cores via seletores globais de tema pode afetar secoes especiais que precisam de contraste proprio.

### Tipografia

- A escala de H1 varia muito entre paginas: conclusao/feedback sao compactas, why/states ficam em escala media, home/library/sessoes sao grandes, e case study chega a escala editorial maxima.
- As paginas de sessao usam H2 muito maiores que outras paginas, o que pode pesar no mobile.
- Pesos e line-heights sao em geral elegantes, mas a hierarquia nao parece governada por uma unica escala compartilhada.

### Espacamento

- Alturas e paddings de hero variam bastante entre paginas.
- Algumas paginas parecem mais respiradas e premium, enquanto outras parecem mais antigas e planas.
- A diferenca de densidade entre about/library/why e contributors/case study e perceptivel.

### Componentes

- Ha varias definicoes locais para `.button`, `.primary-button` e `.secondary-button`.
- Cards usam raios diferentes sem uma escala evidente: aparecem valores como 14px, 20px, 22px, 24px e 28px.
- Cards clicaveis e cards estaticos nem sempre comunicam affordance com a mesma clareza entre paginas.
- Estados de foco existem em alguns pontos, mas tambem ha `outline: none` em controles de idioma, exigindo cuidado de acessibilidade.

### Responsividade

- `states.html` apresentou overflow horizontal associado ao menu de idioma.
- `feedback.html` possui video de fundo com bounding box maior que a viewport, ainda que contido visualmente.
- O menu de idioma e os headers sao os principais pontos de risco em Android por causa de posicionamento, largura e dropdowns.
- Textos muito grandes em sessoes e case study precisam de validacao em breakpoints menores.

### Temas automaticos

- O CSS possui mais temas do que o JS automatico usa.
- `day`, `dawn`, `sleep` e `warm-night` existem como linguagem visual no CSS, mas nao fazem parte do ciclo automatico atual.
- O tema `afternoon` aparece como estado diurno principal, enquanto `day` fica sem uso automatico.
- Paginas com intencao semantica forte, como `sleep.html`, nao ajustam atmosfera pela finalidade da pratica, apenas pelo horario.

## 5. Recomendacoes sem alterar codigo

1. Definir `theme-sync.css` como fonte principal de fundos globais e documentar quais arquivos podem ter atmosferas especificas.
2. Manter variaveis de pagina especial estritamente escopadas, especialmente em `case-study.css`, usando prefixos como `--case-*`.
3. Alinhar `theme-sync.js` aos temas realmente existentes no CSS, ou remover/renomear temas nao usados para evitar expectativa falsa.
4. Corrigir a navegacao do case study com suporte de i18n antes de expandir a pagina para outros idiomas.
5. Criar uma escala compartilhada para cards e botoes, preservando variacoes funcionais, mas reduzindo diferencas acidentais.
6. Validar o menu de idioma em mobile/Android e garantir que dropdowns nunca aumentem a largura do documento.
7. Corrigir caracteres corrompidos em metadados, rodapes e textos visiveis.
8. Revisar seletores globais de tema para que a cor de texto nao sobrescreva secoes especiais sem necessidade.
9. Fazer QA visual por horario: morning, afternoon/day, sunset/evening, night e late-night.
10. Decidir explicitamente se `index.html`, `feedback.html` e `case-study.html` sao experiencias especiais; se forem, conectar essas paginas ao mesmo vocabulário visual do produto.

## 6. Ordem ideal de correcao

1. Corrigir o contrato entre `theme-sync.css` e `theme-sync.js`.
2. Resolver a inconsistencia de idioma no header, principalmente o link de estudo de caso.
3. Corrigir overflow horizontal do menu de idioma em `states.html` e validar em Android.
4. Consolidar a responsabilidade dos backgrounds globais sem mexer nos cards e botoes que ja funcionam.
5. Revisar seletores globais de tema para reduzir sobrescritas indesejadas.
6. Definir uma escala de tipografia para heroes, paginas internas, sessoes e telas finais.
7. Definir uma escala de superficies: cards estaticos, cards clicaveis, paineis glass e modais.
8. Corrigir caracteres corrompidos e inconsistencias de texto visivel.
9. Reavaliar visualmente `about.html`, `library.html` e `why.html` para aproximar o acabamento de `contributors.html` e `case-study.html`.
10. Fazer uma rodada final de QA responsivo em desktop, tablet e mobile para todos os temas automaticos.
