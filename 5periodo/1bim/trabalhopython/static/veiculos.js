const modalcadastro = new bootstrap.Modal(document.getElementById('modalcadastro')); 

var idveiculoatual;

function alterar(id) {
  fetch("http://127.0.0.1:5000/veiculos/" + id)
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
  Swal.fire({
    title: 'Tem certeza?',
    text: "Essa ação não pode ser desfeita!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#c8102e',
    cancelButtonColor: '#000',
    confirmButtonText: 'Sim, excluir!'
  }).then((result) => {
    if (result.isConfirmed) {
      fetch("http://127.0.0.1:5000/veiculos/" + id, {  
        method: "DELETE",
      })
      .then(() => {
        listar();
        Swal.fire('Excluído!', 'O veículo foi removido.', 'success');
      })
      .catch(err => console.error("Erro ao excluir veículo:", err));
    }
  });
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
    url = "http://127.0.0.1:5000/veiculos/" + idveiculoatual;
    metodo = "PUT";
  } else {
    url = "http://127.0.0.1:5000/veiculos";
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

  fetch("http://127.0.0.1:5000/veiculos")
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
    const precoFormatado = Number(dados[i].preco).toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    });

    lista.innerHTML += "<tr>"
      + "<td>" + dados[i].id + "</td>"
      + "<td>" + dados[i].modelo + "</td>"
      + "<td>" + dados[i].marca + "</td>"
      + "<td>" + dados[i].ano + "</td>"
      + "<td>" + dados[i].cor + "</td>"
      + "<td>" + precoFormatado + "</td>"
      + "<td>" 
      + "<button type='button' class='btn btn-editar btn-sm' onclick='alterar(" + dados[i].id + ")' title='Editar'><i class='bi bi-pencil-fill'></i></button> "
      + "<button type='button' class='btn btn-excluir btn-sm' onclick='excluir(" + dados[i].id + ")' title='Excluir'><i class='bi bi-trash-fill'></i></button>"
      + "</td>"
      + "</tr>";
  }
}
