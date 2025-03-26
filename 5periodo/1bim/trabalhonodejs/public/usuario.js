const modalcadastro = new bootstrap.Modal(document.getElementById('modalcadastro')); 

var idveiculoatual;

function alterar(id) {
  fetch("http://127.0.0.1:3333/veiculos/" + id)
    .then(resp => resp.json())
    .then(dados => {
      idveiculoatual = id; 
      document.getElementById('modelo').value = dados.modelo;
      document.getElementById('marca').value = dados.marca;
      document.getElementById('ano').value = dados.ano;
      document.getElementById('cor').value = dados.cor;
      document.getElementById('preco').value = dados.preco;
      modalcadastro.show();
    })
    .catch(err => console.error("Erro ao buscar veículo:", err));
}

function excluir(id) {
  fetch("http://127.0.0.1:3333/veiculos/" + id, {  
    method: "DELETE",
  })
  .then(() => listar())
  .catch(err => console.error("Erro ao excluir veículo:", err));
}

function salvar() {
  let vmodelo = document.getElementById("modelo").value;
  let vmarca = document.getElementById("marca").value;
  let vano = document.getElementById("ano").value;
  let vcor = document.getElementById("cor").value;
  let vpreco = document.getElementById("preco").value;

  let veiculo = {  
    modelo: vmodelo,
    marca: vmarca,
    ano: vano,
    cor: vcor,
    preco: vpreco
  };

  let url, metodo;
  if (idveiculoatual > 0) {
    url = "http://127.0.0.1:3333/veiculo/" + idveiculoatual;
    metodo = "PUT";
  } else {
    url = "http://127.0.0.1:3333/veiculo";
    metodo = "POST";
  }

  fetch(url, {
    method: metodo,
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(veiculo)
  })
  .then(() => {
    listar();
    modalcadastro.hide();
  })
  .catch(err => console.error("Erro ao salvar veículo:", err));
}

function novo() {
  idveiculoatual = 0; 
  document.getElementById("modelo").value = "";
  document.getElementById("marca").value = "";
  document.getElementById("ano").value = "";
  document.getElementById("cor").value = "";
  document.getElementById("preco").value = "";
  modalcadastro.show();
}

function listar() {
  const listar = document.getElementById("lista");
  listar.innerHTML = "<tr><td colspan='5'>Carregando...</td></tr>";  

  fetch("http://127.0.0.1:3333/veiculos")
    .then(resp => resp.json())
    .then(dados => mostrar(dados))
    .catch(err => {
      console.error("Erro ao listar veiculos:", err);
      listar.innerHTML = "<tr><td colspan='5'>Erro ao carregar dados.</td></tr>";  
    });
}

function mostrar(dados) {
  const lista = document.getElementById("lista");
  lista.innerHTML = "";
  for (let i in dados) {
    lista.innerHTML += "<tr>"
      + "<td>" + dados[i].id + "</td>"
      + "<td>" + dados[i].modelo + "</td>"
      + "<td>" + dados[i].marca + "</td>"
      + "<td>" + dados[i].ano + "</td>"
      + "<td>" + dados[i].cor + "</td>"
      + "<td>" + dados[i].preco + "</td>"
      + "<td>" 
      + "<button type='button' class='btn btn-primary btn-sm' onclick='alterar(" + dados[i].idu + ")'>Alterar</button> "
      + "<button type='button' class='btn btn-secondary btn-sm' onclick='excluir(" + dados[i].id + ")'>Excluir</button>"
      + "</td>"
      + "</tr>";
  }
}