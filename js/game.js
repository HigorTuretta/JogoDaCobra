window.onload = function (e) {

    const stage = document.getElementById('stage');
    let pontos = document.getElementById('pontos');
    let recorde = document.getElementById('recordeAtual');
    pontos.value = 0;
    recorde.value = localStorage.getItem('Recorde');
    const ctx = stage.getContext('2d');
    document.addEventListener("keydown", keyPush);

    var intervalo = setInterval(game, 1000 / 15);
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
    
    let gamePaused = false;
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

        ctx.fillStyle = 'red';
        ctx.fillRect(ax * tp, ay * tp, tp, tp);

        ctx.fillStyle = '#cfd141';
        for (let i = 0; i < trail.length; i++) {
            ctx.fillRect(trail[i].x * tp, trail[i].y * tp, tp, tp);
            if (trail[i].x == px && trail[i].y == py) {
                vx = vy = 0;
                tail = 5;
                if(recorde.value <= pontos.value){
                    recorde.value = pontos.value;
                    localStorage.setItem('Recorde',recorde.value);
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
                    pauseGame();
                
                break;
            default:
                break;
        }
    }
    e.preventDefault();

    function pauseGame() {
        if (!gamePaused) {
           clearInterval(intervalo);
           
          gamePaused = true;
        } else if (gamePaused) {
          intervalo = setInterval(game, 1000 / 15);
          gamePaused = false;
        }
      }
}