let avalNomes = [
    ["Carlos Alberto", "Neymar Jr", "Josseana da Silva"],
    ["João Henrique", "Adamilton Jr", "Luciana da Silva"],
    ["Matheus Brito", "Luiz Jr", "Clariane da Silva"]
]

let avalTextos = [
    [
        "Atendimento excepcional! A equipe foi muito cuidadosa e atenciosa com meu pet.",
        "Não poderia estar mais feliz com o serviço desta clínica. Profissionais qualificados e atenciosos.",
        "Excelente clínica! Desde o primeiro contato, fui atendido com profissionalismo e gentileza."
    ],
    [
        "Atendimento de primeira, cuidam muito bem dos animais e sempre explicam tudo com clareza.",
        "A clínica é muito bem equipada, e os profissionais são incríveis, mas o tempo de espera poderia ser menor.",
        "Profissionais capacitados e atenciosos, meu gato recebeu o melhor cuidado. Recomendo muito!"
    ],
    [
        "A equipe é super dedicada e o ambiente é acolhedor, perfeito para quem se importa com o bem-estar do pet.",
        "Atendimento excelente e muito atencioso! Meu pet recebeu todo o cuidado necessário e ficou ótimo.",
        "Fiquei satisfeita com o atendimento, mas achei os preços um pouco altos para alguns serviços."
    ]
]

function avalProximo() {
    let n = Number(document.getElementById("numeroAval").textContent)
    if (n == 3) return
    document.getElementById("numeroAval").textContent = `${n + 1}`
    updateAval()
}

function avalAnterior() {
    let n = Number(document.getElementById("numeroAval").textContent)
    if (n == 1) return
    document.getElementById("numeroAval").textContent = `${n - 1}`
    updateAval()
}

function updateAval() {
    let btn1 = document.getElementById("btnAnteriorAval")
    btn1.style.opacity = 1
    btn1.style.cursor = "pointer"

    let btn2 = document.getElementById("btnProximoAval")
    btn2.style.opacity = 1
    btn2.style.cursor = "pointer"

    let btn3 = document.getElementById("btnAnteriorAvalDesktop")
    btn3.style.opacity = 1
    btn3.style.cursor = "pointer"

    let btn4 = document.getElementById("btnProximoAvalDesktop")
    btn4.style.opacity = 1
    btn4.style.cursor = "pointer"

    let n = Number(document.getElementById("numeroAval").textContent)

    if (n == 1) {
        let btn1 = document.getElementById("btnAnteriorAval")
        btn1.style.opacity = 0
        btn1.style.cursor = "default"

        let btn2 = document.getElementById("btnAnteriorAvalDesktop")
        btn2.style.opacity = 0
        btn2.style.cursor = "default"
    }
    if (n == 3) {
        let btn1 = document.getElementById("btnProximoAval")
        btn1.style.opacity = 0
        btn1.style.cursor = "default"

        let btn2 = document.getElementById("btnProximoAvalDesktop")
        btn2.style.opacity = 0
        btn2.style.cursor = "default"
    }

    let nomes = avalNomes[n - 1]
    let textos = avalTextos[n - 1]

    document.getElementById("nomeAvaliador1").textContent = nomes[0]
    document.getElementById("nomeAvaliador2").textContent = nomes[1]
    document.getElementById("nomeAvaliador3").textContent = nomes[2]

    document.getElementById("txtAvaliacao1").textContent = textos[0]
    document.getElementById("txtAvaliacao2").textContent = textos[1]
    document.getElementById("txtAvaliacao3").textContent = textos[2]
}

updateAval()
document.getElementById("btnAnteriorAval").addEventListener("click", avalAnterior)
document.getElementById("btnProximoAval").addEventListener("click", avalProximo)
document.getElementById("btnAnteriorAvalDesktop").addEventListener("click", avalAnterior)
document.getElementById("btnProximoAvalDesktop").addEventListener("click", avalProximo)

// Adiciona um listener para garantir que o DOM esteja carregado
// Isso evita erros caso os elementos ainda não existam
document.addEventListener("DOMContentLoaded", function () {

    // Seleciona os elementos do novo carrossel
    // Usamos '|| {}' como um "guarda" para evitar erros em mobile, 
    // onde os elementos não existem (pois estão com display: none)
    const btnAnterior = document.getElementById("btnAnteriorCampanha") || {};
    const btnProximo = document.getElementById("btnProximoCampanha") || {};
    const slides = document.querySelectorAll(".slide-campanha");
    const dots = document.querySelectorAll(".dot-campanha");

    // Se não encontrar os slides (ex: modo mobile), não faz nada
    if (slides.length === 0) {
        return;
    }

    let slideAtual = 1;
    const totalSlides = slides.length;

    // Função principal para atualizar a visualização do slide
    function updateCampanha(novoSlide) {
        slideAtual = novoSlide;

        // Atualiza a classe 'active' nos slides
        slides.forEach((slide, index) => {
            if (index === (slideAtual - 1)) {
                slide.classList.add("active");
            } else {
                slide.classList.remove("active");
            }
        });

        // Atualiza a classe 'active' nas bolinhas (dots)
        dots.forEach((dot, index) => {
            if (index === (slideAtual - 1)) {
                dot.classList.add("active");
            } else {
                dot.classList.remove("active");
            }
        });

        // Controla a opacidade/visibilidade das setas
        // (fica levemente transparente no primeiro/último slide)
        btnAnterior.style.opacity = (slideAtual === 1) ? "0.3" : "1";
        btnAnterior.style.cursor = (slideAtual === 1) ? "default" : "pointer";

        btnProximo.style.opacity = (slideAtual === totalSlides) ? "0.3" : "1";
        btnProximo.style.cursor = (slideAtual === totalSlides) ? "default" : "pointer";
    }

    // --- Funções dos botões ---
    function proximoSlide() {
        if (slideAtual < totalSlides) {
            updateCampanha(slideAtual + 1);
        }
    }

    function anteriorSlide() {
        if (slideAtual > 1) {
            updateCampanha(slideAtual - 1);
        }
    }

    // --- Adiciona os Event Listeners ---

    // Setas
    if (btnProximo.addEventListener) {
        btnProximo.addEventListener("click", proximoSlide);
    }
    if (btnAnterior.addEventListener) {
        btnAnterior.addEventListener("click", anteriorSlide);
    }

    // Bolinhas (Dots)
    dots.forEach(dot => {
        dot.addEventListener("click", () => {
            // Pega o número do slide do atributo 'data-slide'
            const slideAlvo = Number(dot.dataset.slide);
            updateCampanha(slideAlvo);
        });
    });

    // Inicia o carrossel no primeiro slide
    updateCampanha(1);
});