const { createApp } = Vue;

createApp({
    data() {
        return {
            display: '',
            numeroAtual: null,
            numeroAnterior: null
        }
    },

    methods: {
        lidarBotao(botao) {
            switch (botao) {
                case "*":
                case "-":
                case "+":
                case "/":
                    this.lidarOperador(botao);
                    break;
                case ".":
                    this.lidarDecimal();
                    break;
                case "=":
                    this.lidarIgual();
                    break;
                case "AC":
                    this.lidarClear();
                    break;
                default:
                    this.lidarNumero(botao);
            }
        },

        lidarOperador(botao) {
            if (this.display !== '' && this.display !== 'A divisão por zero não é definida') {
                let ultimoCaractere = this.display.slice(-1);
                if (ultimoCaractere !== ' ') {
                    this.numeroAnterior = this.numeroAtual;
                    this.numeroAtual = null;
                    this.display += ' ' + botao + ' ';
                }
            }
        },

        lidarDecimal() {
            if (this.numeroAtual !== null && !this.numeroAtual.includes('.')) {
                this.numeroAtual += '.';
                if (this.numeroAnterior !== null) {
                    this.display += '.';
                } else {
                    this.display = this.numeroAtual;
                }
            }
        },

        lidarIgual() {
            if (this.numeroAnterior !== null) {
                let resultado = this.calcularExpressao(this.display);
                if (resultado === Infinity || isNaN(resultado)) {
                    this.display = 'A divisão por zero não é definida';
                } else {
                    this.display = resultado;
                }
                this.clearVariaveisExcetoDisplay();
            }
        },

        calcularExpressao(expressao) {
            const operatorMap = {
                '+': (a, b) => a + b,
                '-': (a, b) => a - b,
                '*': (a, b) => a * b,
                '/': (a, b) => a / b
            };

            const tokens = expressao.split(' ');
            let result = parseFloat(tokens[0]);

            for (let i = 1; i < tokens.length; i += 2) {
                const operator = tokens[i];
                const operand = parseFloat(tokens[i + 1]);

                if (operatorMap[operator] && !isNaN(operand)) {
                    result = operatorMap[operator](result, operand);
                } else {
                    throw new Error('Invalid expression');
                }
            }

            return result;
        },

        lidarClear() {
            this.display = '';
            this.clearVariaveisExcetoDisplay();
        },

        clearVariaveisExcetoDisplay() {
            this.numeroAtual = null;
            this.numeroAnterior = null;
        },

        lidarNumero(botao) {
            if (this.numeroAtual !== null) {
                this.numeroAtual += botao;
            } else {
                this.numeroAtual = botao;
            }
            if (this.numeroAnterior !== null) {
                this.display += botao;
            } else {
                this.display = this.numeroAtual;
            }
        }
    }
}).mount("#app");
