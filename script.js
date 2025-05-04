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

const videoFundo = document.querySelector('.video-fundo');

window.addEventListener('scroll', () => {
  const scrollY = window.scrollY;
  videoFundo.style.transform = `translateY(${scrollY * 0.3}px)`; 
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

document.addEventListener('DOMContentLoaded', function() {
  const links = document.querySelectorAll('nav a[href^="#"]'); // ou ajuste para seu seletor real

  links.forEach(link => {
    link.addEventListener('click', function(e) {
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
      nome: "Mariana Costa",
      profissao: "Empresária - Clínica Estética",
      depoimento: "Rafael transformou a presença digital da minha clínica. O site ficou moderno, rápido e passou exatamente a imagem que eu queria. Recebo elogios toda semana!"
    },
    {
      nome: "Lucas Almeida",
      profissao: "CEO - StartUPX",
      depoimento: "Profissional extremamente comprometido e criativo. Entregou o site da nossa startup antes do prazo e com um design que impressionou investidores."
    },
    {
      nome: "Fernanda Torres",
      profissao: "Psicóloga",
      depoimento: "Eu não tinha ideia de como um site poderia me ajudar a atrair pacientes. O Rafael criou um site que realmente conecta com o meu público. Recomendo!"
    },
    {
      nome: "Eduardo Silva",
      profissao: "Dono da Loja TecnoPrime",
      depoimento: "Desde que o novo site foi ao ar, o número de pedidos aumentou consideravelmente. Sem dúvida, foi um ótimo investimento!"
    }
  ];

  const track = document.querySelector('.carousel-track');

  function renderCards() {
    testimonials.forEach(item => {
      const card = document.createElement('div');
      card.className = 'testimonial-card';
      card.innerHTML = `
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