const form = document.getElementById("novoItem");
const lista = document.getElementById("lista");
// const itens = [];
// consultando se tem algo no meu localstorage, se nao tiver ele mostra um array vazio mesmo
// const itens = localStorage.getItem("itens") || [];

// Para transformar nossas string salva precisamos passar a funcao JSON.parse, para converter novamente em um objeto javascritp
const itens = JSON.parse(localStorage.getItem("itens")) || [];

// console.log(itens);

itens.forEach((elemento) => {
     // console.log(elemento);
     // console.log(elemento.nome, elemento.quantidade);
     criaElemento(elemento);
});

// Pego meu formulario o evento passado vai ser o submit, Usando uma funcão anonima com arrow function
form.addEventListener("submit", (evento) => {
     // Mas para evitar que seja recarregado a pagina, eu preciso pegar o funcionamento padrao dele usando o .preventDefault(), no evento que acontecer quando ativar minha função
     evento.preventDefault();

     const nome = evento.target.elements['nome'];
     const quantidade = evento.target.elements['quantidade'];

     // Busca no nosso array de elemento, e compara se o nome do input existe
     const existe = itens.find(elemento => elemento.nome === nome.value);
     // console.log(existe);

     // Vamos transformar esse elemento item atual em um objeto, que vai ter nome e a quantidade. ao inves de enviar duas informações vamos usar apenas uma
     const itemAtual = {
          "nome": nome.value,
          "quantidade": quantidade.value,
     }
     // Se o item cadastrado existe adidiona no mesmo item do array;
     if (existe) {
          itemAtual.id = existe.id;
          // console.log(existe.id);

          atualizaElemento(itemAtual);

          // Só para sobrescrever o item atual no local storage na hora de ler novamente
          // itens[existe.id] = itemAtual;
          itens[itens.findIndex(elemento => elemento.id === existe.id)] = itemAtual;
          // Se não existir ele cria o elemento do zero, e o ID dele vai ser de acorod com o tamanho do nosso array, se tiver um item só vai ter o id 1 e assim por diante
     } else {
          // itemAtual.id = itens.length;
          itemAtual.id = itens[itens.length -1 ] ? (itens[itens.length - 1]).id + 1 : 0;
          criaElemento(itemAtual);
          // usando a função push, para inserir o item dentro do array, com a nossa variavel itens em forma de array criada, vamos adicionar dentro dela nossos objetos cadastrados como itemAtual
          itens.push(itemAtual);

     }



     // e passamos o itens para o local storagem para sempre mostrar os dados do array e não ficar sobresceevendo
     localStorage.setItem("itens", JSON.stringify(itens));


     nome.value = "";
     quantidade.value = "";
})

// Ao criar minha função eu preciso passar os paramentros que irei usar nela, que irei receber nele ou seja no caso, nome e quantidade
function criaElemento(item) {
     // <li class="item"><strong>7</strong>Camisas</li>
     const novoItem = document.createElement('li');
     novoItem.classList.add("item");

     const numeroItem = document.createElement('strong');
     numeroItem.innerHTML = item.quantidade;
     numeroItem.dataset.id = item.id;

     // novoItem.innerHTML = numeroItem + nome;
     // Coloca um elementro dentro do outro, fazendo assim com que o strong foss para dentro do meu novo item que é o li 
     novoItem.appendChild(numeroItem);
     // Ai juntamos o que colocamos dentro, e passamos o parametro nome passado também
     novoItem.innerHTML += item.nome;

     novoItem.appendChild(botaoDeleta(item.id));

     lista.appendChild(novoItem);


}

function atualizaElemento(item) {
     // console.log( document.querySelector(' [data-id="'+item.id+'"] ') )
     document.querySelector(' [data-id="' + item.id + '"] ').innerHTML = item.quantidade
}

function botaoDeleta(id) {
     const elementoBotao = document.createElement("button");
     elementoBotao.innerText = "X";
     elementoBotao.addEventListener("click", function () {
          // console.log(this);
          deletaElemento(this.parentNode, id);
     })

     return elementoBotao

}

function deletaElemento(tag, id) {
     tag.remove();

     console.log(id);
     
     // Remover um item do array
     // itens.splice("o que queremos remover", 1)
     // itens.splice("o que queremos remover", 1)
     itens.splice(itens.findIndex(elemento => elemento.id === id), 1)
     console.log(itens);

     // Escrever no localStorage
     localStorage.setItem("itens", JSON.stringify(itens));
}