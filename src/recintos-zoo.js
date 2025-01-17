
class RecintosZoo {
    constructor() {
      this.recintos = [
        { numero: 1, bioma: ['savana'], tamanho: 10, animais: [{ especie: 'MACACO', quantidade: 3 }] },
        { numero: 2, bioma: ['floresta'], tamanho: 5, animais: [] },
        { numero: 3, bioma: ['savana', 'rio'], tamanho: 7, animais: [{ especie: 'GAZELA', quantidade: 1 }] },
        { numero: 4, bioma: ['rio'], tamanho: 8, animais: [] },
        { numero: 5, bioma: ['savana'], tamanho: 9, animais: [{ especie: 'LEAO', quantidade: 1 }] }
      ];
  
      this.animais = {
        LEAO: { tamanho: 3, bioma: ['savana'], carnivoro: true },
        LEOPARDO: { tamanho: 2, bioma: ['savana'], carnivoro: true },
        CROCODILO: { tamanho: 3, bioma: ['rio'], carnivoro: true },
        MACACO: { tamanho: 1, bioma: ['savana', 'floresta'], carnivoro: false },
        GAZELA: { tamanho: 2, bioma: ['savana'], carnivoro: false },
        HIPOPOTAMO: { tamanho: 4, bioma: ['savana', 'rio'], carnivoro: false }
      };
    }
  
    analisaRecintos(especie, quantidade) {
      if (!this.animais[especie]) {
        return { erro: "Animal inválido" };
      }
  
      if (quantidade <= 0 || !Number.isInteger(quantidade)) {
        return { erro: "Quantidade inválida" };
      } 
  
      const recintosViaveis = this.recintos
        .filter(recinto => this.verificaRecinto(recinto, especie, quantidade))
        .map(recinto => {
          const espacoOcupado = this.calcularEspacoOcupado(recinto, especie, quantidade);
          const espacoLivre = recinto.tamanho - espacoOcupado;
          return `Recinto ${recinto.numero} (espaço livre: ${espacoLivre} total: ${recinto.tamanho})`;
        })
        .sort((a, b) => parseInt(a.split(' ')[1]) - parseInt(b.split(' ')[1]));
  
      if (recintosViaveis.length === 0) {
        return { erro: "Não há recinto viável" };
      }
  
      return { recintosViaveis };
    }
  
    verificaRecinto(recinto, especie, quantidade) {
      const animal = this.animais[especie];

      const espacoOcupado = this.calcularEspacoOcupado(recinto, especie, quantidade);
  
   
      if (espacoOcupado > recinto.tamanho) return false;
  
    
      if (!animal.bioma.some(b => recinto.bioma.includes(b))) return false;
  
  
      if (animal.carnivoro && recinto.animais.length > 0 && recinto.animais[0].especie !== especie) return false;
      if (recinto.animais.some(a => this.animais[a.especie].carnivoro) && especie !== recinto.animais[0].especie) return false;
  
 
      if (especie === 'HIPOPOTAMO' && recinto.animais.length > 0 && !recinto.bioma.includes('savana') && !recinto.bioma.includes('rio')) return false;
  
   
      if (especie === 'MACACO' && recinto.animais.length === 0 && quantidade === 1) return false;
  
      return true;
    }
  
    calcularEspacoOcupado(recinto, novaEspecie, novaQuantidade) {
      let espacoOcupado = recinto.animais.reduce((acc, animal) => 
        acc + this.animais[animal.especie].tamanho * animal.quantidade, 0);
      
      espacoOcupado += this.animais[novaEspecie].tamanho * novaQuantidade;
  

      if (recinto.animais.length > 0 && recinto.animais[0].especie !== novaEspecie) {
        espacoOcupado += 1;
      }
  
      return espacoOcupado;
    }
  }
  
  export { RecintosZoo as RecintosZoo };