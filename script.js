document.addEventListener("DOMContentLoaded", function () {
  const menuToggle = document.getElementById("menu-togglee");
  const navLinks = document.getElementById("nav-links");

  if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", function () {
      navLinks.classList.toggle("active"); // Alterna a classe .active

      if (navLinks.classList.contains("active")) {
        menuToggle.src = "imagem/fechar.png";
      } else {
        menuToggle.src = "imagem/menu.png";
      }
  
    });
  } else {
    console.warn("Elementos não encontrados: #menu-toggle ou #nav-links");
  }
});


const elementos = document.querySelectorAll('.animado');

const observer = new IntersectionObserver((entradas) => {
  entradas.forEach(entrada => {
    if (entrada.isIntersecting) {
      entrada.target.classList.add('visible');
    } else {
      entrada.target.classList.remove('visible');
    }
  });
}, {
  threshold: 0.2
});

elementos.forEach(el => {
  const animacao = el.getAttribute('data-anim');
  el.classList.add(animacao);
  observer.observe(el);
});

const btnDireita = document.getElementById('btn-direita');
const btnEsquerda = document.getElementById('btn-esquerda');
const carrossel = document.getElementById('carrossel');

let posicaoAtual = 0;
let quantidadeVisivel = calcularQuantidadeVisivel();
const tamanhoCard = 240; // Ajuste conforme seu CSS

window.addEventListener('resize', () => {
  quantidadeVisivel = calcularQuantidadeVisivel();
  posicaoAtual = 0;
  carrossel.style.transform = `translateX(0px)`;
});

function calcularQuantidadeVisivel() {
  const largura = window.innerWidth;
  if (largura < 768) {
    return 1;
  } else if (largura < 1024) {
    return 3;
  } else {
    return 4;
  }
}

btnDireita.addEventListener('click', () => {
  const totalCards = carrossel.children.length;
  const maxScroll = (totalCards - quantidadeVisivel) * tamanhoCard;

  if (posicaoAtual < maxScroll) {
    posicaoAtual += tamanhoCard * quantidadeVisivel;
    if (posicaoAtual > maxScroll) posicaoAtual = maxScroll;
  } else {
    posicaoAtual = 0;
  }
  carrossel.style.transform = `translateX(-${posicaoAtual}px)`;
});

btnEsquerda.addEventListener('click', () => {
  if (posicaoAtual > 0) {
    posicaoAtual -= tamanhoCard * quantidadeVisivel;
    if (posicaoAtual < 0) posicaoAtual = 0;
  }
  carrossel.style.transform = `translateX(-${posicaoAtual}px)`;
});

const header = document.getElementById('header');

window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    header.classList.add('shrink');
  } else {
    header.classList.remove('shrink');
  }
});


const estatisticas = document.querySelectorAll('.estatistica-item h3');

const observerContagem = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const elemento = entry.target;
      const final = parseInt(elemento.getAttribute('data-contar'));
      let atual = 0;
      const duracao = 2000; // duração da animação em milissegundos
      const inicio = performance.now();

      function animar(tempoAtual) {
        const tempoPassado = tempoAtual - inicio;
        const progresso = Math.min(tempoPassado / duracao, 1);
        atual = Math.floor(progresso * final);
        elemento.textContent = atual + '%'; // <- Aqui adicionamos o símbolo %

        if (progresso < 1) {
          requestAnimationFrame(animar);
        } else {
          elemento.textContent = final + '%'; // Garantimos que o final também tenha o %
        }
      }

      requestAnimationFrame(animar);
      observerContagem.unobserve(elemento);
    }
  });
}, { threshold: 1 });

estatisticas.forEach(estatistica => {
  observerContagem.observe(estatistica);
});

document.addEventListener('DOMContentLoaded', function () {
  const links = document.querySelectorAll('nav a[href^="#"]'); // ou ajuste para seu seletor real

  links.forEach(link => {
    link.addEventListener('click', function (e) {
      e.preventDefault();
      const targetId = this.getAttribute('href').substring(1);
      const target = document.getElementById(targetId);

      if (target) {
        const elementPosition = target.offsetTop;

        window.scrollTo({
          top: elementPosition,
          behavior: 'smooth'
        });
      }
    });
  });
});


// Depoimentos


const testimonials = [
  {
    nome: "Bárbara Bispo",
    profissao: "Médica Neurologista",
    depoimento: "Rafael transformou a presença digital da minha clínica. O site ficou leve, elegante e atraiu novos clientes já na primeira semana. Excelente investimento!",
    imagem: "imagem/babi.png"
  },
  {
    nome: "Lucas Almeida",
    profissao: "Médico Ortopedista",
    depoimento: "Profissional extremamente comprometido e criativo. Entregou um site funcional, moderno e alinhado com meu público. Recomendo de olhos fechados.",
    imagem: "imagem/lucas.png"
  },
  {
    nome: "Arthur Balduino",
    profissao: "Médico Cirurgião",
    depoimento: "Eu não tinha ideia de como um site poderia me ajudar, mas o Rafael criou uma página incrível que transmite confiança e já trouxe vários novos pacientes.",
    imagem: "imagem/arthur.png"
  },
  {
    nome: "Rodrigo Cavalcanti",
    profissao: "Fotógrafo",
    depoimento: "Desde que o novo site foi ao ar, o número de clientes aumentou significativamente. A navegação ficou intuitiva e os clientes elogiam o visual moderno.",
    imagem: "imagem/rodrigo.png"
  },
  {
    nome: "Bruna Cavalcanti",
    profissao: "Nutricionista",
    depoimento: "O Rafael conseguiu traduzir minha identidade visual em cada detalhe do site. Ficou sofisticado, funcional e tem me ajudado a fechar novos projetos.",
    imagem: "imagem/bruna.png"
  },
  {
    nome: "Jonatas Queiroz",
    profissao: "Médico",
    depoimento: "Além do design impecável, o site que ele desenvolveu trouxe mais credibilidade ao meu consultório. Percebi um aumento claro nas consultas agendadas.",
    imagem: "imagem/jonatas.png"
  },
  {
    nome: "Mariana Braga",
    profissao: "Consultora de Imagem",
    depoimento: "O site ficou exatamente como eu sonhava: elegante, fácil de usar e com minha personalidade. Já recebi muitos elogios de clientes e seguidores.",
    imagem: "imagem/maribraga.png"
  }
];


const track = document.querySelector('.carousel-track');

function renderCards() {
  testimonials.forEach(item => {
    const card = document.createElement('div');
    card.className = 'testimonial-card';
    card.innerHTML = `
        <img src="${item.imagem}" alt="Foto de ${item.nome}" class="testimonial-img" />
        <h3>${item.nome}</h3>
        <small>${item.profissao}</small>
        <p>"${item.depoimento}"</p>
      `;
    track.appendChild(card);
  });

  // Duplicar os cards para looping infinito
  testimonials.forEach(item => {
    const card = document.createElement('div');
    card.className = 'testimonial-card';
    card.innerHTML = `
        <img src="${item.imagem}" alt="Foto de ${item.nome}" class="testimonial-img" />
        <h3>${item.nome}</h3>
        <small>${item.profissao}</small>
        <p>"${item.depoimento}"</p>
      `;
    track.appendChild(card);
  });
}

let position = 0;
function startAutoScroll() {
  setInterval(() => {
    position += 1;
    const totalCards = document.querySelectorAll('.testimonial-card').length;
    const cardWidth = document.querySelector('.testimonial-card').offsetWidth + 20;
    if (position >= totalCards / 2) {
      position = 0;
      track.style.transition = 'none';
      track.style.transform = `translateX(0)`;
      void track.offsetWidth; // força reflow
      track.style.transition = 'transform 0.8s ease-in-out';
    } else {
      track.style.transform = `translateX(-${position * cardWidth}px)`;
    }
  }, 4000);
}

renderCards();
startAutoScroll();