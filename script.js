let Song = new Audio("Aliança.mp3");
const carrouselSrcArray = ["Img1.jpeg", "Img2.jpeg", "Img3.jpeg", "Img4.jpeg", "Img5.jpeg", "Img6.jpeg", "Img7.jpeg", "Img8.jpeg", "Img9.jpeg", "Img10.jpeg", "Img11.jpeg", "Img12.jpeg"];
let carrouselImg = 0;
let carrouselInterval = setInterval(carrouselUpdate, 2500);
let play = false;

const progressBar = document.getElementById("progressBar");
const progressBarContainer = document.getElementById("progressBarBG");
const buttonImg = document.getElementById("pauseImg");
const carrousel = document.getElementById("carrouselImg");

// **Garantir que o botão inicie com a imagem de Play**
window.onload = function () {
    buttonImg.src = "PlayButton.png"; // Define a imagem correta ao carregar a página
};

function songButton() {
    if (!play) {
        Song.play();
        buttonImg.src = "WPause.png";
        play = true;
    } else {
        Song.pause();
        buttonImg.src = "PlayButton.png";
        play = false;
    }
}

Song.addEventListener("timeupdate", () => {
    const progress = (Song.currentTime / Song.duration) * 100;
    progressBar.style.width = progress + "%";
    if (Song.currentTime === Song.duration) {
        Song.currentTime = 0;
        Song.play(); // Corrigido: Agora a música reinicia corretamente
    }
});

progressBarContainer.addEventListener("click", (event) => {
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
    console.log(carrouselImg); // Corrigido erro de sintaxe

    carrouselImg = (carrouselImg + 1) % carrouselSrcArray.length; // Simplificado
}

function atualizarTempo() {
    const dataReferencia = new Date(2023, 11, 3);
    const agora = new Date();

    let anos = agora.getFullYear() - dataReferencia.getFullYear();
    let meses = agora.getMonth() - dataReferencia.getMonth();
    let dias = agora.getDate() - dataReferencia.getDate();

    if (dias < 0) {
        meses--;
        let ultimoMes = new Date(agora.getFullYear(), agora.getMonth(), 0).getDate();
        dias += ultimoMes;
    }
    if (meses < 0) {
        anos--;
        meses += 12;
    }

    const diferenca = agora - dataReferencia;
    const horas = Math.floor((diferenca % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutos = Math.floor((diferenca % (1000 * 60 * 60)) / (1000 * 60));
    const segundos = Math.floor((diferenca % (1000 * 60)) / 1000);

    document.getElementById("tempo").innerText = `Eu te amo há ${anos} anos, ${meses} meses, ${dias} dias, ${horas} horas, ${minutos} minutos e ${segundos} segundos meu tesourinho ❤️`;
}

function criarElemento() {
    const elementos = ["🤍", "🌼", "🦈"];
    const elemento = document.createElement("span");
    elemento.innerText = elementos[Math.floor(Math.random() * elementos.length)];
    elemento.classList.add("caindo");

    elemento.style.left = Math.random() * window.innerWidth + "px";
    elemento.style.position = "absolute";
    elemento.style.top = "-50px";

    document.body.appendChild(elemento);

    setTimeout(() => {
        elemento.style.transition = "transform 5s linear, opacity 5s";
        elemento.style.transform = `translateY(${window.innerHeight + 50}px)`;
        elemento.style.opacity = "0";
    }, 50);

    setTimeout(() => {
        elemento.remove();
    }, 5500);
}

setInterval(criarElemento, 500);
setInterval(atualizarTempo, 1000);

// **Removida a chamada automática de songButton()**
carrouselUpdate();
