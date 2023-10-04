/**
 * Função para salvar os dados do cadastro utilizando o LocalStorage
 */
function salvarCadastro() {
    //obtendo os dados do formulário
    let nome = document.getElementById("nome").value
    let sexo = document.querySelector('input[name="sexo"]:checked').value
    let raca = document.getElementById("raca").value
    let nascimento = document.getElementById("nascimento").value
    let telefone = document.getElementById("telefone").value
    let atualizacoes = document.getElementById("sim").checked ? "Sim" : "Não"

    //criando um objeto com os dados do cadastro
    let cadastro = {nome: nome, sexo:sexo, raca:raca, nascimento:nascimento, telefone:telefone, atualizacoes:atualizacoes}
    //criando o array de cadastros
    let cadastros = 
                JSON.parse(localStorage.getItem('cadastros')) || []
    //adicionando o cadastro ao array de cadastros.
    //Método push adiciona no fim do array
    cadastros.push(cadastro)
    //salva a lista atualizada no localstorage
    localStorage.setItem('cadastros', JSON.stringify(cadastros))
    //atualizamos a tabela
    listarCadastros()
}

function listarCadastros() {
    //obtendo os dados
    let cadastros = JSON.parse(localStorage.getItem('cadastros')) || []
    //obtendo onde iremos inserir a tabela
    let tabela = document.getElementById('listagem')
    tabela.innerHTML = '' //limpamos a tabela
    //criamos uma tabela com HTML
    let table = document.createElement('table')
    table.className = 'table table-bordered'
    table.innerHTML = `<thead class='table'>
                         <tr class='table'>
                           <th class='table'>Nome</th>
                           <th class='table'>Sexo</th>
                           <th class='table'>Raça</th>
                           <th class='table'>Nascimento</th>
                           <th class='table'>Telefone</th>
                           <th class='table'>Atualizações</th>
                           <th class='table'>Opções</th>
                         </tr>
                      </thead>
                      <tbody>
                      </tbody>   
                      `
    
                      //preenchendo a tabela com os dados dos cadastros
    let tbody = table.querySelector('tbody')
    for (let i=0; i<cadastros.length; i++){
        let cadastro = cadastros[i]
        let row = tbody.insertRow(i)
        row.innerHTML = `
                        <td>${cadastro.nome}</td>
                        <td>${cadastro.sexo}</td>
                        <td>${cadastro.raca}</td>
                        <td>${formatarDataParaExibicao(cadastro.nascimento)}</td>
                        <td>${formatarTelefone(cadastro.telefone)}</td>
                        <td>${cadastro.atualizacoes}</td>
                        <td><button class='btn btn-danger' 
                        onclick="apagarCadastro('${cadastro.nome}')">Apagar</button></td>
    `
    }

    tabela.appendChild(table)
}

//chamar a função logo que carregar a página
listarCadastros()

function apagarCadastro(nome) {
    let cadastros = JSON.parse(localStorage.getItem('cadastros')) || []

    //filtramos a lista de cadastros para remover com o nome
    cadastros = cadastros.filter(function(cadastro) {
        return cadastro.nome !== nome
    })
    //atualizamos o localStorage com a nova lista de cadastros
    localStorage.setItem('cadastros', JSON.stringify(cadastros))
    //atualizamos a UI
    listarCadastros()
}
// formata data para modelo DD/MM/AAAA
function formatarDataParaExibicao(data) {
    const dataObj = new Date(data);
    const dia = String(dataObj.getDate()).padStart(2, '0');
    const mes = String(dataObj.getMonth() + 1).padStart(2, '0');
    const ano = dataObj.getFullYear();
    
    return `${dia}/${mes}/${ano}`;
}
//Adiciona parênteses e traços no formato do telefone
function formatarTelefone(telefone){
    //Remove todos os caracteres não numéricos
    telefone = telefone.replace(/\D/g,'') //substitui Não Dígito por nada ''

    telefone = telefone.replace(/(\d{2})(\d{5})(\d{4})/, '($1)$2-$3') //definindo modelo (xx) xxxxx-xxxx

    return telefone
}

//exemplo de uso:
const telefone = document.getElementById('telefone')
telefone.addEventListener('input', function(){
    this.value = formatarTelefone(this.value)
})

//Atualizando o ano
const ano = document.getElementById('ano')
const anoAtual = new Date().getFullYear()

ano.textContent = anoAtual 
