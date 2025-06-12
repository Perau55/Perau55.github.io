let Song = new Audio("Aliança.mp3");
const carrouselSrcArray = ["Img1.jpeg", "Img2.jpeg", "Img3.jpeg", "Img4.jpeg", "Img5.jpeg", "Img6.jpeg", "Img7.jpeg", "Img8.jpeg", "Img9.jpeg", "Img10.jpeg", "Img11.jpeg", "Img12.jpeg"];
let carrouselImg = 0;
let carrouselInterval = setInterval(carrouselUpdate, 2500);
let play = false;

const progressBar = document.getElementById("progressBar");
const progressBarContainer = document.getElementById("progressBarBG");
const buttonImg = document.getElementById("pauseImg");
const carrousel = document.getElementById("carrouselImg")

function songButton() {
    if (play == false) {
        buttonImg.src = "WPause.png";
        Song.play();
        play = true;
    } else if (play == true) {
         Song.pause();
        buttonImg.src = "PlayButton.png";
        play = false;
    }
}

Song.addEventListener("timeupdate", () => {
    const progress = (Song.currentTime / Song.duration) * 100;
    progressBar.style.width = progress + "%";
    if (Song.currentTime == Song.duration) {
        Song.currentTime = 0;
        playAudio();
    }
});

progressBarBG.addEventListener("click", (event) => {
    const rect = progressBarContainer.getBoundingClientRect();
    const clickDifference = event.clientX - rect.left;
    const newTime = (clickDifference / rect.width) * Song.duration;
    Song.currentTime = newTime;
});

carrousel.addEventListener("mouseenter", () => {
    clearInterval(carrouselInterval);
});

carrousel.addEventListener("mouseleave", () => {
    carrouselInterval = setInterval(carrouselUpdate, 2500);
});

function carrouselUpdate() {
    carrousel.src = carrouselSrcArray[carrouselImg];
    console.log = carrouselImg;

    if (carrouselImg + 1 < carrouselSrcArray.length) {
        carrouselImg += 1;
    } else {
        carrouselImg = 0;
    }
}

function atualizarTempo() {
    // Data de referência (3 de dezembro de 2023 às 00:00)
    const dataReferencia = new Date(2023, 11, 3); // Mês em JavaScript começa do 0 (0 = Janeiro, 11 = Dezembro)

    // Data e hora atual
    const agora = new Date();

    // Calcular anos, meses e dias diretamente
    let anos = agora.getFullYear() - dataReferencia.getFullYear();
    let meses = agora.getMonth() - dataReferencia.getMonth();
    let dias = agora.getDate() - dataReferencia.getDate();

    // Ajustar meses e anos quando necessário
    if (dias < 0) {
        meses--;
        let ultimoMes = new Date(agora.getFullYear(), agora.getMonth(), 0).getDate(); // Último dia do mês anterior
        dias += ultimoMes;
    }
    if (meses < 0) {
        anos--;
        meses += 12;
    }

    // Calcular horas, minutos e segundos
    const diferenca = agora - dataReferencia;
    const horas = Math.floor((diferenca % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutos = Math.floor((diferenca % (1000 * 60 * 60)) / (1000 * 60));
    const segundos = Math.floor((diferenca % (1000 * 60)) / 1000);

    // Atualizar o texto no HTML
    document.getElementById("tempo").innerText = `Eu te amo há ${anos} anos, ${meses} meses, ${dias} dias, ${horas} horas, ${minutos} minutos e ${segundos} segundos meu tesourinho ❤️`;
}

function criarElemento() {
    const elementos = ["🤍", "🌼", "🦈"]; // Emojis de coração e rosa
    const elemento = document.createElement("span");
    elemento.innerText = elementos[Math.floor(Math.random() * elementos.length)]; // Escolhe aleatoriamente
    elemento.classList.add("caindo");

    // Definir posição inicial aleatória no topo
    elemento.style.left = Math.random() * window.innerWidth + "px";
    elemento.style.position = "absolute"; // Garante que os elementos fiquem posicionados corretamente
    elemento.style.top = "-50px"; // Começa um pouco acima da tela

    document.body.appendChild(elemento);

    // Aplicar animação manualmente para garantir que funcione
    setTimeout(() => {
        elemento.style.transition = "transform 5s linear, opacity 5s";
        elemento.style.transform = `translateY(${window.innerHeight + 50}px)`; // Move até além da tela
        elemento.style.opacity = "0"; // Faz desaparecer suavemente
    }, 50);

    // Remover após a animação
    setTimeout(() => {
        elemento.remove();
    }, 5500);
}

// Criar elementos continuamente
setInterval(criarElemento, 500);


// Atualizar a cada segundo
setInterval(atualizarTempo, 1000);

//let play = false //Trocar para false para tocar ao inicio da página
carrouselUpdate();
