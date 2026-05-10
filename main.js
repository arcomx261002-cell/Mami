onload = () =>{
    document.body.classList.remove("container");

    // Crear luciérnagas
    const fireflyCount = 50;
    for (let i = 0; i < fireflyCount; i++) {
        let firefly = document.createElement('div');
        firefly.classList.add('firefly');
        
        let x = Math.random() * 100; 
        let y = Math.random() * 60 + 40; // 40vh to 100vh
        
        let duration = Math.random() * 10 + 10; // 10s to 20s
        let delay = Math.random() * 10;
        let blinkDuration = Math.random() * 3 + 2; // 2s to 5s
        let blinkDelay = Math.random() * 5;

        firefly.style.left = `${x}vw`;
        firefly.style.top = `${y}vh`;
        firefly.style.animation = `firefly-float ${duration}s ${delay}s infinite ease-in-out, firefly-blink ${blinkDuration}s ${blinkDelay}s infinite ease-in-out`;
        
        document.body.appendChild(firefly);
    }
};