const modalcadastro = new bootstrap.Modal(document.getElementById('modalcadastro'));  

function alterar(idusuario) {
 
}

function excluir(idusuario) {
  fetch('http://127.0.0.1:3333/usuario/' + idusuario, {  
    method: 'DELETE',
  })
  .then(() => {
    listar();
  })
  .catch(err => {
    console.error("Erro ao excluir usuário:", err);
  });
}

function salvar() {
  let vnome = document.getElementById('nome').value;
  let vtelefone = document.getElementById('telefone').value;
  let vemail = document.getElementById('email').value;

  let usuario = {  
    nome: vnome,
    telefone: vtelefone,
    email: vemail
  };

  fetch('http://127.0.0.1:3333/usuario', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(usuario)
  })
  .then(() => {
    listar();
    modalcadastro.hide();
  })
  .catch(err => {
    console.error("Erro ao salvar usuário:", err);
  });
}

function novo() {
  document.getElementById('nome').value = '';
  document.getElementById('telefone').value = '';
  document.getElementById('email').value = '';
  modalcadastro.show();
}

function listar() {
  const listar = document.getElementById('lista');
  listar.innerHTML = '<tr><td colspan="4">Carregando...</td></tr>';  // Corrigido o colspan para 4

  fetch('http://127.0.0.1:3333/usuario')
    .then(resp => resp.json())
    .then(dados => mostrar(dados))
    .catch(err => {
      console.error("Erro ao listar usuários:", err);
      listar.innerHTML = '<tr><td colspan="4">Erro ao carregar dados.</td></tr>';  // Corrigido
    });
}


function mostrar(dados){
    const lista = document.getElementById('lista');
    lista.innerHTML = "";
    for (let i in dados) {
        lista.innerHTML += "<tr>"
                + "<td>" + dados[i].idusuario + "</td>"
                + "<td>" + dados[i].nome + "</td>"
                + "<td>" + dados[i].telefone + "</td>"
                + "<td>" + dados[i].email + "</td>"
                + "<td>" 
                + "<button type='button' class='btn btn-primary btn-sm' data-bs-dismiss='modal' onclick='alterar("+dados[i].idusuario+")'>Alterar</button>"
                + " "
                + "<button type='button' class='btn btn-secondary btn-sm' data-bs-dismiss='modal' onclick='excluir("+dados[i].idusuario+")'>Excluir</button>"
                + "</td>"
                + "</tr>";
    }
}

