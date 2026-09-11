/* =========================================
   Carrossel de depoimentos
   ========================================= */

const depoimentos = [
    {
        nome: "João",
        texto: '"Entrega super rápida, recomendo demais!" – João',
        foto: "assets/img/cliente-joao.jpg"
    },
    {
        nome: "Leonardo",
        texto: '"Melhor pizza da região, sempre peço aqui!" – Leonardo a tartaruga',
        foto: "assets/img/cliente-leonardo.jpg"
    },
    {
        nome: "Trevor",
        texto: '"Massa fininha e crocante, top demais!" – Trevor',
        foto: "assets/img/Cliente-Trevor.jpg"
    }
];

let indiceAtual = 0;

const fotoEl = document.getElementById("depoimento-foto");
const textoEl = document.getElementById("depoimento-texto");
const btnAnterior = document.getElementById("btn-anterior");
const btnProximo = document.getElementById("btn-proximo");

function mostrarDepoimento() {
    const depoimento = depoimentos[indiceAtual];
    fotoEl.src = depoimento.foto;
    fotoEl.alt = "Foto do cliente " + depoimento.nome;
    textoEl.innerText = depoimento.texto;
}

btnAnterior.addEventListener("click", function () {
    // se estiver no primeiro (índice 0) e clicar "anterior", volta pro último
    indiceAtual = (indiceAtual - 1 + depoimentos.length) % depoimentos.length;
    mostrarDepoimento();
});

btnProximo.addEventListener("click", function () {
    // se estiver no último e clicar "próximo", volta pro primeiro
    indiceAtual = (indiceAtual + 1) % depoimentos.length;
    mostrarDepoimento();
});

/* =========================================
   Validação do formulário de pedido
   ========================================= */

const form = document.getElementById("form-pedido");
const listaErros = document.getElementById("form-erro");

form.addEventListener("submit", function (event) {
    event.preventDefault(); // sempre impede o envio padrão, decidimos depois se deixa passar

    const erros = [];

    const nome = document.getElementById("nome").value.trim();
    const telefone = document.getElementById("telefone").value.trim();
    const endereco = document.getElementById("endereco").value.trim();
    const sabor = document.getElementById("sabor").value;
    const pagamentoEscolhido = document.querySelector('input[name="pagamento"]:checked');

    if (nome === "") {
        erros.push("Preencha o nome completo.");
    }

    if (telefone === "") {
        erros.push("Preencha o telefone.");
    } else {
        // deixa só os números (remove parênteses, espaço, traço etc.)
        const apenasNumeros = telefone.replace(/\D/g, "");
        if (apenasNumeros.length < 10 || apenasNumeros.length > 11) {
            erros.push("Telefone inválido. Use um número com DDD, ex: (11) 91234-5678.");
        }
    }

    if (endereco === "") {
        erros.push("Preencha o endereço de entrega.");
    }

    if (sabor === "") {
        erros.push("Escolha um sabor.");
    }

    if (!pagamentoEscolhido) {
        erros.push("Selecione uma forma de pagamento.");
    }

    // limpa a lista de erros antes de mostrar a atual
    listaErros.innerHTML = "";

    if (erros.length > 0) {
        erros.forEach(function (mensagem) {
            const item = document.createElement("li");
            item.innerText = mensagem;
            listaErros.appendChild(item);
        });
        return;
    }

    // tudo certo, manda pro final
    window.location.href = form.action;
});
