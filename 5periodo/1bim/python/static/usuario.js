const modalcadastro = new bootstrap.Modal(document.getElementById('modalcadastro')); 

var idusuarioatual;

function alterar(idusuario) {
  fetch("http://127.0.0.1:5000/usuario/" + idusuario)
    .then(resp => resp.json())
    .then(dados => {
      idusuarioatual = idusuario; 
      document.getElementById('nome').value = dados.nome;
      document.getElementById('telefone').value = dados.telefone;
      document.getElementById('email').value = dados.email;
      modalcadastro.show();
    })
    .catch(err => console.error("Erro ao buscar usuário:", err));
}

function excluir(idusuario) {
  fetch("http://127.0.0.1:5000/usuario/" + idusuario, {  
    method: "DELETE",
  })
  .then(() => listar())
  .catch(err => console.error("Erro ao excluir usuário:", err));
}

function salvar() {
  let vnome = document.getElementById("nome").value;
  let vtelefone = document.getElementById("telefone").value;
  let vemail = document.getElementById("email").value;

  let usuario = {  
    nome: vnome,
    telefone: vtelefone,
    email: vemail
  };

  let url, metodo;
  if (idusuarioatual > 0) {
    url = "http://127.0.0.1:5000/usuario/" + idusuarioatual;
    metodo = "PUT";
  } else {
    url = "http://127.0.0.1:5000/usuario";
    metodo = "POST";
  }

  fetch(url, {
    method: metodo,
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(usuario)
  })
  .then(() => {
    listar();
    modalcadastro.hide();
  })
  .catch(err => console.error("Erro ao salvar usuário:", err));
}

function novo() {
  idusuarioatual = 0; 
  document.getElementById("nome").value = "";
  document.getElementById("telefone").value = "";
  document.getElementById("email").value = "";
  modalcadastro.show();
}

function listar() {
  const listar = document.getElementById("lista");
  listar.innerHTML = "<tr><td colspan='5'>Carregando...</td></tr>";  

  fetch("http://127.0.0.1:5000/usuarios")
    .then(resp => resp.json())
    .then(dados => mostrar(dados))
    .catch(err => {
      console.error("Erro ao listar usuários:", err);
      listar.innerHTML = "<tr><td colspan='5'>Erro ao carregar dados.</td></tr>";  
    });
}

function mostrar(dados) {
  const lista = document.getElementById("lista");
  lista.innerHTML = "";
  for (let i in dados) {
    lista.innerHTML += "<tr>"
      + "<td>" + dados[i].idusuario + "</td>"
      + "<td>" + dados[i].nome + "</td>"
      + "<td>" + dados[i].telefone + "</td>"
      + "<td>" + dados[i].email + "</td>"
      + "<td>" 
      + "<button type='button' class='btn btn-primary btn-sm' onclick='alterar(" + dados[i].idusuario + ")'>Alterar</button> "
      + "<button type='button' class='btn btn-secondary btn-sm' onclick='excluir(" + dados[i].idusuario + ")'>Excluir</button>"
      + "</td>"
      + "</tr>";
  }
}