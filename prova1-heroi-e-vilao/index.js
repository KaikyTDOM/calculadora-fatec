const { createApp } = Vue;

createApp({
    data() {
        return {
            heroi: {vida: 100},
            vilao: {vida: 100}
        }
    },
    methods: {
        atacar(isHeroi) {
            if(isHeroi) {
                this.vilao.vida -= 10;
                this.acaoVilao();
            } else {
                this.heroi.vida -= 20;
            }
        },
        defender(isHeroi) {
            if(isHeroi) {
                this.heroi.vida += 5;
                if (this.heroi.vida > 100) {
                    this.heroi.vida = 100;
                }
                this.acaoVilao();
            }
        },
        pocao(isHeroi) {
            if(isHeroi) {
                this.heroi.vida += 20;
                if (this.heroi.vida > 100) {
                    this.heroi.vida = 100;
                }
                this.acaoVilao();
            }
        },
        correr(isHeroi) {
            if(isHeroi) {
                this.heroi.vida -= 5;
            }
        },
        acaoVilao() {
            const acoes = ['atacar', 'defender', 'usarPocao', 'correr'];
            const acaoAleatoria = acoes[Math.floor(Math.random() * acoes.length)];
            this[acaoAleatoria](false);
        }
    }
}).mount("#app");