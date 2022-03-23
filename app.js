new Vue ({
    el:"#app",
    data:{
        running: false,
        playerLife: 100,
        monsterLife: 100,
        logs:[]
    },
    computed: {
        hasResult(){
            return this.playerLife == 0 || this.monsterLife == 0  //alt+124
        },
    },
    methods: {
        startGame() {//retornar os dados pro valor original
            this.running = true
            this.playerLife = 100
            this.monsterLife = 100
            this.logs=[]
            
        },
        attack(especial){
            this.hurt('monsterLife', 5, 10, especial, 'Jogador', 'Monstro', 'player')
            if(this.monsterLife > 0){
                this.hurt('playerLife', 7, 12, false, 'Monstro', 'Jogador', 'monster')
            }
            
        },
        hurt(prop, min, max, especial, source, target, cls){ //  source = fonte do ataque, target origem do ataque
            const plus = especial ? 5 : 0
            const hurt = this.getRandom(min + plus, max + plus)
            this[prop] = Math.max(this[prop] - hurt, 0)
            this.registerLogs(`${source} atingiu ${target} com ${hurt}.`, cls)
        },
        healAndHurt(){
            this.heal(10,15)
            this.hurt('playerLife', 7, 12, false, 'Monstro', 'Jogador', 'monster')
        },
        heal (min, max){
            const heal = this.getRandom(min,max)
            this.playerLife = Math.min(this.playerLife + heal, 100)
            this.registerLogs(`Jogador ganhou força ${heal}.`, 'player')

        },
        getRandom(min, max) {
            const value = Math.random() * (max - min) + min //gera um valor aleatório que será multiplicado pelo 
                                                        //valor maior menos o menor e somado com o valor menor novamente
            return Math.round(value)
        },
        registerLogs(text, cls){
            this.logs.unshift( {text, cls} ) //ccolocando um elemento na primeira posição de uma array
        }
        
    },
    whatch: {
        hasResult(value) {
            if (value) this.running = false
        }
    }

})