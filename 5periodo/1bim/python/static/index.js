function entrar() {
    let usuario = document.getElementById("usuario").value;
    let senha = document.getElementById("senha").value;

    fetch("http://127.0.0.1:5000/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            email: email,
            senha: senha
        })
        .then(resp => {
            if (!resp.ok) {
                alert ("Erro ao fazer login: " + resp.statusText);
                return null;
            } else {
                throw Response.json();
            }
        })
        .then(dados => {
            if (dados != null){
                sessionStorage.setItem("token", dados.token);
                window.location.href = "usuario.html";
            }
        })
});
}