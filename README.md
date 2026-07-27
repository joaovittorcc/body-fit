# BODY FIT

Site institucional do clube esportivo BODY FIT (Vianópolis · GO). HTML estático + Tailwind CSS.

## Rodar localmente

```bash
npm install
npm run dev
```

Sobe o compilador do Tailwind em modo watch e o servidor com live reload. Editou HTML ou CSS, o navegador atualiza sozinho.

Para gerar o CSS de produção uma vez só:

```bash
npm run build
```

## Estrutura

```
index.html          Home — hero, modalidades, contato
modalidades.html    Treinos — 5 modalidades em abas (?m=cross|musculacao|artes|fitdance|yoga)
unidades.html       Quadras de areia e pro shop
planos.html         Planos e loja de suplementos
404.html            Página de erro
assets/css/src.css  Fonte do CSS — edite este arquivo
assets/css/app.css  Gerado pelo build. Não edite à mão
assets/js/site.js   Menu mobile, abas de modalidade, ano do rodapé
tailwind.config.js  Design tokens (cores, tipografia, espaçamento)
```

## Design system

Baseado no `DESIGN.md` gerado no Stitch ("Elite Athleticism").

**Cores** — cada azul tem um papel fixo:

| Token | Hex | Uso |
| --- | --- | --- |
| `secondary-container` | `#0065f6` | Ação: botões, CTAs, estados ativos |
| `secondary` | `#b2c5ff` | Destaque: texto realçado, ícones, bordas |
| `primary-container` | `#0040c1` | Estrutura: blocos e superfícies de marca |

**Tipografia**

- `Anton` — títulos e display
- `Hanken Grotesk` — corpo de texto
- `IBM Plex Mono` — todos os números do site (horários, preços, specs)

Os números usam as classes `.spec-label`, `.spec-value` e `.spec-value-xl`, sempre com dígitos de largura fixa. É o elemento que dá identidade ao site — mantenha esse padrão ao adicionar conteúdo novo.

## Dados do negócio

Confirmados no perfil do Google (Academia Body Fit Club):

| Campo | Valor |
| --- | --- |
| Endereço | R. José Issy, 655 — Centro, Vianópolis - GO |
| CEP | 75265-000 |
| Telefone | (62) 99900-2616 |
| Coordenadas | -16.7485878, -48.51649 |
| Nota no Google | 4,7 |
| Reserva de quadras | AgendeiQuadras — Arena Body Fit |

Estão aplicados nos links `wa.me`, `tel:`, no endereço da home e no JSON-LD do `index.html`.

### ⚠️ Ainda por confirmar

| O que | Situação | Onde |
| --- | --- | --- |
| WhatsApp | Assumido que `(62) 99900-2616` é o mesmo número do WhatsApp | Links `wa.me` em todos os arquivos |
| Horário de funcionamento | O Google só expõe "abre seg. às 05:00". O resto é estimativa | Rodapé de todas as páginas + `index.html` |
| Horários das aulas | Estimados | Objeto `MODALIDADES` em `assets/js/site.js` |
| Quadras, refletores, avaliação física | `02`, `1200 W`, `Inclusa` | `unidades.html` |
| Preços | `R$ 130` / `R$ 150` e os suplementos | `planos.html` |

## 🚧 Modo demonstração

O site está marcado como demo em três camadas. **Tudo isso precisa sair na versão final:**

| O que | Onde |
| --- | --- |
| Faixa clara no topo | `.demo-banner` — nas 5 páginas, logo antes da `<nav>` |
| Notas em blocos de dado não confirmado | `.demo-nota` — horários, preços dos planos, catálogo da loja, imagem da quadra |
| Bloqueio de indexação | `<meta name="robots" content="noindex, nofollow">` no `<head>` das 5 páginas |
| Estilos dos avisos | `.demo-banner` e `.demo-nota` em `assets/css/src.css` |

Para achar tudo de uma vez:

```bash
grep -rn "demo-banner\|demo-nota\|noindex" *.html assets/css/src.css
```

> O `noindex` é proposital: enquanto os preços e horários forem exemplos, é melhor que o Google não os indexe e passe a mostrar informação errada sobre o negócio. Remova só quando os dados forem reais.

### Ao publicar

1. Preencher `url` e `image` no JSON-LD do `index.html` com o domínio final e descomentar `openingHoursSpecification`.
2. Validar em https://search.google.com/test/rich-results
3. **Cadastrar o site no perfil do Google Business** — hoje o campo está vazio ("Adicionar website"). É o ganho de SEO mais barato disponível.

## Imagens

As páginas usam `.webp` (metade do peso do JPG). Os originais `.jpg`/`.png` continuam na pasta porque as tags Open Graph apontam para eles — nem todo previewer de rede social lida bem com WebP.

Ao trocar por fotos reais, coloque o original em `assets/img/` e rode:

```bash
python -c "from PIL import Image; import pathlib; [Image.open(p).convert('RGB').save(p.with_suffix('.webp'),'WEBP',quality=82,method=6) for p in pathlib.Path('assets/img').glob('*.jpg')]"
```

## Pendências conhecidas

- **Imagens em 512 px.** Todas vieram do Stitch nesse tamanho e ficam suaves em telas grandes, principalmente nos heroes. Substituir por fotos reais da academia em pelo menos 1600 px de largura.
- **Instagram.** Não há link no site — falta o @ do perfil. É o canal principal para academia em cidade pequena.
- **Analytics.** Nada instalado. Sem isso não dá para saber quantas visitas viram clique no WhatsApp.
- **Loja sem checkout.** Os botões "Comprar" abrem o WhatsApp com o produto preenchido. Para venda online de verdade é preciso integrar um gateway (Mercado Pago, Stripe).
- **Sem depoimentos.** O "4,7 no Google" é uma afirmação sem rosto. Três depoimentos reais com nome valeriam mais.
- **`robots.txt` e `sitemap.xml`** estão com `SEU-DOMINIO.com.br` — trocar pelo domínio final.
