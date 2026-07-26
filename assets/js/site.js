/* BODY FIT — comportamento compartilhado do site. */
(function () {
  "use strict";

  var FOCUSABLE =
    'a[href], button:not([disabled]), input:not([disabled]), [tabindex]:not([tabindex="-1"])';

  /* ---------------------------------------------------------------------
     Menu mobile
     --------------------------------------------------------------------- */
  function initDrawer() {
    var toggle = document.querySelector("[data-drawer-toggle]");
    var drawer = document.getElementById("menu-mobile");
    if (!toggle || !drawer) return;

    var overlay = drawer.querySelector("[data-drawer-overlay]");
    var panel = drawer.querySelector("[data-drawer-panel]");
    var closeBtn = drawer.querySelector("[data-drawer-close]");
    var lastFocused = null;

    function isOpen() {
      return !drawer.hidden;
    }

    function open() {
      lastFocused = document.activeElement;
      drawer.hidden = false;
      document.body.style.overflow = "hidden";
      toggle.setAttribute("aria-expanded", "true");
      var first = panel.querySelector(FOCUSABLE);
      if (first) first.focus();
    }

    function close() {
      drawer.hidden = true;
      document.body.style.overflow = "";
      toggle.setAttribute("aria-expanded", "false");

      // Devolve o foco para quem abriu; o botão é o destino padrão
      var alvo =
        lastFocused && lastFocused !== document.body && document.contains(lastFocused)
          ? lastFocused
          : toggle;
      alvo.focus();
    }

    toggle.addEventListener("click", function () {
      isOpen() ? close() : open();
    });
    if (closeBtn) closeBtn.addEventListener("click", close);
    if (overlay) overlay.addEventListener("click", close);

    // Navegar fecha o menu
    panel.addEventListener("click", function (e) {
      if (e.target.closest("a")) close();
    });

    document.addEventListener("keydown", function (e) {
      if (!isOpen()) return;

      if (e.key === "Escape") {
        e.preventDefault();
        close();
        return;
      }

      // Prende o foco dentro do painel enquanto ele está aberto
      if (e.key === "Tab") {
        var items = Array.prototype.filter.call(
          panel.querySelectorAll(FOCUSABLE),
          function (el) {
            return el.offsetParent !== null;
          }
        );
        if (!items.length) return;
        var first = items[0];
        var last = items[items.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    });

    // Sair do breakpoint mobile com o menu aberto não pode travar o scroll
    var desktop = window.matchMedia("(min-width: 768px)");
    var onChange = function (e) {
      if (e.matches && isOpen()) close();
    };
    desktop.addEventListener
      ? desktop.addEventListener("change", onChange)
      : desktop.addListener(onChange);
  }

  /* ---------------------------------------------------------------------
     Modalidades: tablist acessível, com a seleção refletida na URL
     --------------------------------------------------------------------- */
  var MODALIDADES = {
    cross: {
      titulo: "CROSS TRAINING",
      tag: "Alta intensidade",
      imagem: "assets/img/cross-hero.webp",
      resumo:
        "Levantamento olímpico, ginástica e condicionamento metabólico na mesma sessão. Cada treino do dia é montado para você sair melhor do que entrou — não apenas mais cansado.",
      detalhe:
        "As turmas são pequenas e o professor corrige movimento a movimento. Você aprende a técnica antes de aumentar a carga, então dá para começar do zero sem se machucar.",
      beneficios: [
        "Condicionamento extremo",
        "Força funcional",
        "Queima calórica acelerada",
        "Turma que puxa junto"
      ],
      horarios: [
        ["06:00", "Seg a Sex"],
        ["12:00", "Seg a Sex"],
        ["18:30", "Seg a Sex"],
        ["10:00", "Sábado"]
      ]
    },
    musculacao: {
      titulo: "MUSCULAÇÃO",
      tag: "Zona de força",
      imagem: "assets/img/mod-musculacao.webp",
      resumo:
        "A maior área de peso livre de Vianópolis. Racks, halteres até 50 kg e máquinas para todos os grupos musculares — com espaço de sobra para treinar no seu ritmo.",
      detalhe:
        "Professor na sala o tempo todo, ficha montada para o seu objetivo e revisão a cada seis semanas. Do primeiro treino ao seu recorde pessoal.",
      beneficios: [
        "Ficha individual revisada",
        "Professor na sala em todos os horários",
        "Peso livre sem fila",
        "Avaliação física a cada 6 semanas"
      ],
      horarios: [
        ["05:30", "Seg a Sex"],
        ["09:00", "Seg a Sex"],
        ["17:00", "Seg a Sex"],
        ["08:00", "Sábado"]
      ]
    },
    artes: {
      titulo: "ARTES MARCIAIS",
      tag: "Disciplina e combate",
      imagem: "assets/img/mod-artes.webp",
      resumo:
        "Muay Thai, Jiu-Jitsu e Boxe em tatame profissional. Técnica de verdade, condicionamento pesado e defesa pessoal aplicável.",
      detalhe:
        "Instrutores graduados e turmas separadas por nível, então ninguém começa treinando com faixa preta no primeiro dia. Equipamento de proteção disponível para experimentar.",
      beneficios: [
        "Turmas separadas por nível",
        "Instrutores graduados",
        "Tatame e ringue profissionais",
        "Defesa pessoal aplicada"
      ],
      horarios: [
        ["07:00", "Seg, Qua e Sex"],
        ["19:00", "Seg a Qui"],
        ["20:30", "Ter e Qui"],
        ["09:00", "Sábado"]
      ]
    },
    fitdance: {
      titulo: "FIT DANCE",
      tag: "Ritmo e cardio",
      imagem: "assets/img/mod-fitdance.webp",
      resumo:
        "Cardio que não parece treino. Coreografias no ritmo do que está tocando, em sala ampla com espelho e som que dá conta do recado.",
      detalhe:
        "Não precisa saber dançar. As sequências são ensinadas do zero em toda aula e a intensidade sobe conforme a turma pega o passo.",
      beneficios: [
        "Não exige experiência",
        "Alto gasto calórico",
        "Coordenação e ritmo",
        "Aula nova toda semana"
      ],
      horarios: [
        ["06:30", "Ter e Qui"],
        ["18:00", "Seg, Qua e Sex"],
        ["19:30", "Ter e Qui"],
        ["09:00", "Sábado"]
      ]
    },
    yoga: {
      titulo: "YOGA",
      tag: "Equilíbrio e foco",
      imagem: "assets/img/mod-fitdance.webp",
      resumo:
        "Um respiro no meio da rotina. Prática que junta força, mobilidade e atenção à respiração — o contrapeso de quem treina pesado o resto da semana.",
      detalhe:
        "Sala silenciosa, tapetes e apoios inclusos. As posturas têm variação para todos os níveis, então dá para praticar mesmo sem flexibilidade nenhuma.",
      beneficios: [
        "Mobilidade e postura",
        "Redução de estresse",
        "Recuperação entre treinos",
        "Tapetes e apoios inclusos"
      ],
      horarios: [
        ["07:00", "Ter e Qui"],
        ["12:00", "Qua"],
        ["19:00", "Ter e Qui"],
        ["10:00", "Sábado"]
      ]
    }
  };

  function initModalidades() {
    var tablist = document.querySelector('[role="tablist"][data-modalidades]');
    if (!tablist) return;

    var tabs = Array.prototype.slice.call(tablist.querySelectorAll('[role="tab"]'));
    var panel = document.getElementById("painel-modalidade");
    if (!tabs.length || !panel) return;

    var el = {
      titulo: document.getElementById("mod-titulo"),
      tag: document.getElementById("mod-tag"),
      imagem: document.getElementById("mod-imagem"),
      resumo: document.getElementById("mod-resumo"),
      detalhe: document.getElementById("mod-detalhe"),
      beneficios: document.getElementById("mod-beneficios"),
      horarios: document.getElementById("mod-horarios")
    };

    function render(chave) {
      var d = MODALIDADES[chave];
      if (!d) return;

      el.titulo.textContent = d.titulo;
      el.tag.textContent = d.tag;
      el.imagem.src = d.imagem;
      el.imagem.alt = "Treino de " + d.titulo.toLowerCase() + " na BODY FIT";
      el.resumo.textContent = d.resumo;
      el.detalhe.textContent = d.detalhe;

      el.beneficios.replaceChildren();
      d.beneficios.forEach(function (texto) {
        var li = document.createElement("li");
        li.className = "flex items-start gap-sm";
        li.innerHTML =
          '<span class="material-symbols-outlined shrink-0 text-[20px] text-secondary" aria-hidden="true" style="font-variation-settings:\'FILL\' 1">check_circle</span>';
        li.append(texto);
        el.beneficios.appendChild(li);
      });

      el.horarios.replaceChildren();
      d.horarios.forEach(function (par) {
        var cell = document.createElement("div");
        cell.className = "border border-hairline bg-surface-container-high px-sm py-md text-center";
        var hora = document.createElement("span");
        hora.className = "spec-value text-secondary";
        hora.textContent = par[0];
        var dia = document.createElement("span");
        dia.className = "spec-label mt-xs";
        dia.textContent = par[1];
        cell.append(hora, dia);
        el.horarios.appendChild(cell);
      });
    }

    function select(tab, opts) {
      opts = opts || {};
      tabs.forEach(function (t) {
        var on = t === tab;
        t.setAttribute("aria-selected", on ? "true" : "false");
        t.tabIndex = on ? 0 : -1;
        t.classList.toggle("border-secondary", on);
        t.classList.toggle("bg-slate", on);
        t.classList.toggle("text-secondary", on);
        t.classList.toggle("border-transparent", !on);
        t.classList.toggle("text-on-surface-variant", !on);
      });

      panel.setAttribute("aria-labelledby", tab.id);
      render(tab.dataset.mod);
      if (opts.focus) tab.focus();

      // A modalidade escolhida vira link compartilhável
      if (opts.push !== false) {
        var url = new URL(window.location.href);
        url.searchParams.set("m", tab.dataset.mod);
        history.replaceState(null, "", url);
      }
    }

    tablist.addEventListener("click", function (e) {
      var tab = e.target.closest('[role="tab"]');
      if (tab) select(tab);
    });

    tablist.addEventListener("keydown", function (e) {
      var i = tabs.indexOf(document.activeElement);
      if (i < 0) return;
      var next = null;
      if (e.key === "ArrowDown" || e.key === "ArrowRight") next = tabs[(i + 1) % tabs.length];
      else if (e.key === "ArrowUp" || e.key === "ArrowLeft")
        next = tabs[(i - 1 + tabs.length) % tabs.length];
      else if (e.key === "Home") next = tabs[0];
      else if (e.key === "End") next = tabs[tabs.length - 1];
      if (next) {
        e.preventDefault();
        select(next, { focus: true });
      }
    });

    var inicial = new URLSearchParams(window.location.search).get("m");
    var alvo = tabs.filter(function (t) {
      return t.dataset.mod === inicial;
    })[0];
    select(alvo || tabs[0], { push: !!alvo });
  }

  /* ---------------------------------------------------------------------
     Ano do rodapé
     --------------------------------------------------------------------- */
  function initAno() {
    document.querySelectorAll("[data-ano]").forEach(function (el) {
      el.textContent = new Date().getFullYear();
    });
  }

  function init() {
    initDrawer();
    initModalidades();
    initAno();
  }

  document.readyState === "loading"
    ? document.addEventListener("DOMContentLoaded", init)
    : init();
})();
