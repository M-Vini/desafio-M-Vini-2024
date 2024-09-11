class RecintosZoo {
  constructor() {
    //definindo as características dos recintos
    this.recintos = [
      {
        recinto: 1,
        bioma: "savana",
        tamanhoTotal: 10,
        animaisExistentes: [{ especie: "MACACO", quantidade: 3 }],
      },
      { recinto: 2, bioma: "floresta", tamanhoTotal: 5, animaisExistentes: [] },
      {
        recinto: 3,
        bioma: "savana e rio",
        tamanhoTotal: 7,
        animaisExistentes: [{ especie: "GAZELA", quantidade: 1 }],
      },
      { recinto: 4, bioma: "rio", tamanhoTotal: 8, animaisExistentes: []},
      {
        recinto: 5,
        bioma: "savana",
        tamanhoTotal: 9,
        animaisExistentes: [{ especie: "LEAO", quantidade: 1 }],
      },
    ];

    //definindo quais são os animais
    this.animais = {
      LEAO: { tamanhoAnimal: 3, biomas: ["savana"], carnivoro: true },
      LEOPARDO: { tamanhoAnimal: 2, biomas: ["savana"], carnivoro: true },
      CROCODILO: { tamanhoAnimal: 3, biomas: ["rio"], carnivoro: true },
      MACACO: {
        tamanhoAnimal: 1,
        biomas: ["savana", "floresta"],
        carnivoro: false,
      },
      GAZELA: { tamanhoAnimal: 2, biomas: ["savana"], carnivoro: false },
      HIPOPOTAMO: {
        tamanhoAnimal: 4,
        biomas: ["savana", "rio"],
        carnivoro: false,
      },
    };
  }

  analisaRecintos(animal, quantidade) {
    animal = animal.toUpperCase();

    //validar se o animal existe
    if (!this.animais[animal]) {
      return { erro: "Animal inválido" };
    }

    //validar se a quantidade é válida
    if (quantidade <= 0 || !Number.isInteger(quantidade)) {
      return { erro: "Quantidade inválida" };
    }

    //criando variável para acessar os itens de animais
    const animalInfo = this.animais[animal];
    let recintosViaveis = [];

    //verificar viabilidade do recinto
    this.recintos.forEach((recinto) => {
      let espacoOcupado = recinto.animaisExistentes.reduce((total, a) => {
        return total + this.animais[a.especie].tamanhoAnimal * a.quantidade;
      }, 0);

      let espacoLivre = recinto.tamanhoTotal - espacoOcupado;
      
      //verificar se o bioma é adequado
      if (!animalInfo.biomas.includes(recinto.bioma)) {
        return;
      }

      //vericar se carnívoros estãos sozinhos
      if (
        animalInfo.carnivoro &&
        recinto.animaisExistentes.length > 0 &&
        animal !== this.recintos.especie
      ) {
        return;
      }

      //regras do hipopótamo
      if (
        animal === "HIPOPOTAMO" &&
        recinto.bioma !== "savana e rio" &&
        recinto.animaisExistentes.length > 0
      ) {
        return;
      }

      //regras de conforto para macacos
      if (
        animal === "MACACO" &&
        recinto.animaisExistentes.length === 0 &&
        quantidade < 2
      ) {
        return;
      }

      //verifica se há espaço suficiente
      let espacoNecessario = animalInfo.tamanhoAnimal * quantidade;

      if (
        recinto.animaisExistentes.length > 0 &&
        animalInfo.animal !== this.recintos.especie
      ) {
        espacoNecessario += 1;
      }

      if(espacoNecessario <= espacoLivre){
        recintosViaveis.push({
            recinto: recinto.recinto,
            espacoLivre: espacoLivre - espacoNecessario,
            espacoTotal: recinto.tamanhoTotal
        });
      }
    });

    if(recintosViaveis == 0){
        return {erro: "Não há recinto viável"}
    }

    //ordenar os recintos pelo número
    recintosViaveis.sort((a,b) => a.recinto - b.recinto);

    //formatar a saída
    return{
        recintosViaveis: recintosViaveis.map(r => `Recinto ${r.recinto} (espaço livre: ${r.espacoLivre} total: ${r.espacoTotal})`)
    };
  }
}

module.exports = { RecintosZoo };
