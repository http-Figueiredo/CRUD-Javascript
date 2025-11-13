// Principio básico de trabalhar com WEB
// 1 - Criar Variáveis
// 2 - Sincronizar Conteúdo das variáveis com o HTML
// 3 - Atualiza as variáveis

// Banco de Dados -->

const miniRedeSocial = {
    usuarios: [
        {
            username: 'http-figueiredo',
        }
    ],
    posts: [
        {
            id: Date.now(),
            owner: 'http-figueiredo',
            content: 'Meu primeiro tweet'
        }
    ], 
    lePosts() {
        miniRedeSocial.posts.forEach(({ id, owner, content }) => {
            miniRedeSocial.criaPost({ id, owner: owner, content: content }, true); // esse true serve para identificar que será criado na memória
        })
    },
    criaPost(dados, htmlOnly = false) { // htmlOnly necessario, se não o post com id: 1, aparece duplicado (pois cria na memória e no html)
        const idInterno = dados.id || Date.now(); // se já existir id, puxa dos dados, se não, cria um novo
        
        if (!htmlOnly){
            //Cria o post na memória
            miniRedeSocial.posts.push({
                id: idInterno,
                owner: dados.owner,
                content: dados.content, 
            });
        }

        //Cria Post no HTML
        const $listaDePosts = document.querySelector('.listaDePosts');
        $listaDePosts.insertAdjacentHTML('afterbegin',`
            <li data-id="${idInterno}">
                ${dados.content}
                <button class="btn-deletar">Deletar</button>
            </li>
        `);
    },
    apagaPost(id) {
        const listaDePostsAtualizada = miniRedeSocial.posts.filter((postAtual) => {
            return postAtual.id !== Number(id);
        })
        miniRedeSocial.posts = listaDePostsAtualizada;
        console.log(listaDePostsAtualizada);
    }
};

// Código de front end: Web ->
    const $meuForm = document.querySelector('form');
    console.log($meuForm);

//CRUD: [CREATE]
$meuForm.addEventListener('submit', function criaPostController(info) { //Detecta o primeiro evento 'submit' e aciona a função. 
    info.preventDefault(); //Previne que a página recarregue quando enviar o formulário
    console.log("Post criado");
    const $campoCriaPost = document.querySelector('input[name="campoCriaPost"]'); //'input[name=""]' para detectar um input específico dentro do formulário
    
    miniRedeSocial.criaPost({ owner: "http-figueiredo", content: $campoCriaPost.value });

    $campoCriaPost.value = '';
});

//CRUD: [READ]
miniRedeSocial.lePosts();

//CRUD: [DELETE]
document.querySelector('.listaDePosts').addEventListener('click', function (infosDoEvento) {
    const elementoAtual = infosDoEvento.target; // Detecta em que o usuario clicou
    const cliqueBtnDeletar = elementoAtual.classList.contains("btn-deletar") // Detecta clique em botoes apenas com a classe "btn-deletar"
    if (cliqueBtnDeletar) {
        const id = elementoAtual.parentNode.getAttribute('data-id') // Deleta o parente do botão ( <li></li> )
        
        // Manipula ServerSide/banco de dados
        miniRedeSocial.apagaPost(id); // Deleta do banco de dados
        // Manipula o View/output
        elementoAtual.parentNode.remove();
    
    }})