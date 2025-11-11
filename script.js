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
            id: 1,
            owner: 'http-figueiredo',
            content: 'Meu primeiro tweet'
        }
    ],
    criaPost(dados, htmlOnly = false) { // htmlOnly necessario, se não o post com id: 1, aparece duplicado (pois cria na memória e no html)
        if (!htmlOnly){
            miniRedeSocial.posts.push({
                id: miniRedeSocial.posts.length + 1,
                owner: dados.owner,
                content: dados.content, 
            });
        }
        //Cria Post no HTML
        const $listaDePosts = document.querySelector('.listaDePosts');
        $listaDePosts.insertAdjacentHTML('afterbegin', `<li>${dados.content}</li>`);
    }
};

// Código de front end: Web ->
    const $meuForm = document.querySelector('form');
    console.log($meuForm);

//CRUD: CREATE
$meuForm.addEventListener('submit', function criaPostController(info) { //Detecta o primeiro evento 'submit' e aciona a função. 
    info.preventDefault(); //Previne que a página recarregue quando enviar o formulário
    console.log("Post criado");
    const $campoCriaPost = document.querySelector('input[name="campoCriaPost"]'); //'input[name=""]' para detectar um input específico dentro do formulário
    
    miniRedeSocial.criaPost({ owner: "http-figueiredo", content: $campoCriaPost.value });

    $campoCriaPost.value = '';
});

//CRUD: READ
miniRedeSocial.posts.forEach(({ owner, content }) => {
    miniRedeSocial.criaPost({ owner: owner, content: content }, true); // esse true serve para identificar que será criado na memória
})