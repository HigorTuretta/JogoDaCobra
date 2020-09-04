window.onload = function (e) {

    const stage = document.getElementById('stage');
    const pause = document.getElementById('pause');
    let pontos = document.getElementById('pontos');
    let recorde = document.getElementById('recordeAtual');
    pontos.value = 0;
    recorde.value = 0;
    const ctx = stage.getContext('2d');
    const pausar = pause.getContext('2d');
    document.addEventListener("keydown", keyPush);

    setInterval(game, 1000 / 15);

    const vel = 1;
    //velocidade e local inicial
    // velocidade x e velocidade y

    /*Sumário
        vx e vy => VELOCIDADE X E Y
        px e py => PONTO X E Y (Começo do game e ponto atual da cobra)
        tp e qp => TAMANHO E QUANTIDADE DE PEÇAS QUADRADAS DO CAMPO (20 de 10px cada pra cada lado)
        ax e ay => POSIÇÃO DA MAÇA X E Y
        trail   => ELEMENTOS NO RASTRO DA COBRA
        tail    => TAMANHO DA CAUDA
    */
    var vx = vy = 0;
    var px = 10;
    var py = 15;

    var tp = 20;
    var qp = 30;
    var ax = ay = 15;

    var trail = [];
    var tail = 5;

    function game() {
        //atualiza a posição da cabeça da cobra
        //recebendo a posição atual + a velocidade
        px += vx;
        py += vy;

        //controle para quando a cobra atingir o limite do campo
        //ela retornar para o lado oposto do campo.
        if (px < 0) {
            px = qp - 1;
        }
        if (px > qp - 1) {
            px = 0;
        }
        if (py < 0) {
            py = qp - 1;
        }
        if (py > qp - 1) {
            py = 0;
        }



        //pinta toda a area do stage (campo do jogo)
        var img = new Image();
        img.src = 'images/grass.png';
        var patternGrass = ctx.createPattern(img, 'repeat');
        ctx.fillStyle = patternGrass;
        ctx.fillRect(0, 0, stage.width, stage.height);

        pausar.font = "30px Arial";
        // Create gradient
        var gradient = pausar.createLinearGradient(0, 0, pause.width, 0);
        gradient.addColorStop("0", " yellow");
        gradient.addColorStop("0.5", "green");
        gradient.addColorStop("1.0", "yellow");
        // Fill with gradient
        pausar.fillStyle = gradient;
        pausar.fillText("Jogo Pausado!", 200, 100);
        pausar.fillText("Pressione Espaço para continuar.", 80, 150);




        ctx.fillStyle = 'red';
        ctx.fillRect(ax * tp, ay * tp, tp, tp);

        ctx.fillStyle = '#cfd141';
        for (let i = 0; i < trail.length; i++) {
            ctx.fillRect(trail[i].x * tp, trail[i].y * tp, tp - 1, tp - 1);
            if (trail[i].x == px && trail[i].y == py) {
                vx = vy = 0;
                tail = 5;
                if (pontos.value > recorde.value) {
                    recorde.value = pontos.value;
                }
                pontos.value = 0;

            }
        }
        trail.push({ x: px, y: py })
        while (trail.length > tail) {
            trail.shift();
        }
        if (ax == px && ay == py) {
            tail++;
            pontos.value++;
            ax = Math.floor(Math.random() * qp);
            ay = Math.floor(Math.random() * qp);
        }
    }


    function keyPush(event) {
        switch (event.keyCode) {
            case 37://LEFT
                if (vx == vel) {
                    break
                } else {
                    vx = -vel;
                    vy = 0;
                    break;
                }
            case 38://up
                if (vy == vel) {
                    break
                } else {
                    vx = 0;
                    vy = -vel;
                    break;
                }
            case 39://right
                if (vx == -vel) {
                    break
                } else {
                    vx = vel;
                    vy = 0;
                    break;
                }
            case 40://down
                if (vy == -vel) {
                    break
                } else {
                    vx = 0;
                    vy = vel;
                    break;
                }
            case 80:
                document.getElementById("stage").style.display = "none";
                document.getElementById("pause").style.display = "initial";
                break;
            case 32:
                document.getElementById("pause").style.display = "none";
                document.getElementById("stage").style.display = "initial";
                break;
            default:
                break;
        }
    }
    e.preventDefault();
}