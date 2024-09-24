function createFlower() {
    const flowerContainer = document.querySelector(".flower-container");

    // Número máximo de flores na tela
    const maxFlowersOnScreen = 15;

    // Verifique se já existem 10 flores na tela
    if (document.querySelectorAll(".flower").length >= maxFlowersOnScreen) {
        return; // não criar mais nesse karai
    }

    // Número máximo de flores para criar simultaneamente (entre 1 e 5)
    const maxFlowers = Math.ceil(Math.random() * 5 + 1);
    const flowerSize = 100; // tamanho dessa mzr

    // Matrizes para armazenar as posições das flores existentes
    const existingPositions = [];

    for (let j = 0; j < maxFlowers; j++) {
        let positionValid = false;
        let randomX, randomY;

        // gerar posições aleatórias e verificar se elas não se sobrepõem às existentes
        while (!positionValid) {
            randomX = Math.random() * (window.innerWidth - flowerSize);
            randomY = Math.random() * (window.innerHeight - flowerSize);

            positionValid = true;

            // Verifique se a nova posição está suficientemente longe das posições existentes
            for (const position of existingPositions) {
                const distance = Math.sqrt(Math.pow(position.x - randomX, 2) + Math.pow(position.y - randomY, 2));
                if (distance < 0) { // Rango de 300 píxeles recomendado para pc, en celular con 0
                    positionValid = false;
                    break;
                }
            }
        }

        // Adicione a nova posição à lista de posições existentes
        existingPositions.push({ x: randomX, y: randomY });

        const flower = document.createElement("div");
        flower.classList.add("flower");
        flower.style.animation = "fadeInFlower 1s ease-in-out both"; // Adicione animação de entrada à flor

        for (let i = 1; i <= 10; i++) {
            const petal = document.createElement("div");
            petal.classList.add("petal", `p${i}`);
            flower.appendChild(petal);

            // Tempo de desaparecimento aleatório entre 2 e 5 segundos
            const disappearanceTime = Math.random() * 3000 + 2000;

            petal.style.animation = `fadeOutPetal 0.5s ease-in-out both ${i * 0.1}s, fadeOutFlower 0.5s ease-in-out both ${disappearanceTime}s`;
        }

        flower.style.position = "fixed";
        flower.style.left = `${randomX}px`;
        flower.style.top = `${randomY}px`;

        flowerContainer.appendChild(flower);

        const disappearanceTime = Math.random() * 3000 + 2000;

        setTimeout(() => {
            flowerContainer.removeChild(flower);

            existingPositions.splice(existingPositions.findIndex(pos => pos.x === randomX && pos.y === randomY), 1);
        }, disappearanceTime);
    }
}

// Cambia el intervalo de tiempo para controlar la aparición de las flores cada 3 segundos
setInterval(createFlower, 1000); // Nuevas flores cada 3 segundos