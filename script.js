// Principio básico de trabalhar com WEB
// 1 - Criar Variáveis
// 2 - Sincronizar Conteúdo das variáveis com o HTML
// 3 - Atualiza as variáveis

// Função para salvar os posts no localStorage (para fins de teste)
function salvarPosts() {
    localStorage.setItem('bancoDePosts', JSON.stringify(miniRedeSocial.posts));
}

const miniRedeSocial = {
    usuarios: [
        { username: 'http-figueiredo' }
    ],
    posts: [], // será preenchido pelo localStorage

    criaPost(dados, htmlOnly = false) {
        const idInterno = dados.id || Date.now(); // Se ja existir post criado, pega o id dele.. Senão cria um novo.

        if (!htmlOnly) {      
            // evita criar posts vazios
            if (!dados.content || !dados.content.trim()) return;
            
            miniRedeSocial.posts.push({
                id: idInterno,
                owner: dados.owner,
                content: dados.content,
            });
            salvarPosts();
        }

        // Cria Post no HTML
        const $listaDePosts = document.querySelector('.listaDePosts');
        $listaDePosts.insertAdjacentHTML('afterbegin', `
            <li data-id="${idInterno}">
                <span contenteditable>${dados.content}</span>
                <button class="btn-deletar">Deletar</button>
            </li>
        `);
    },

    lePosts() {
        const postsDoLocalStorage = JSON.parse(localStorage.getItem('bancoDePosts')) || [];
        miniRedeSocial.posts = postsDoLocalStorage;

        // RENDERIZA os posts lidos do localStorage (somente HTML, sem duplicar na memória)
        postsDoLocalStorage.forEach(post => {
            miniRedeSocial.criaPost(post, true);
        });
    },

    AtualizaPost(id, novoConteudo) {
        const postAtualizado = miniRedeSocial.posts.find(post => 
            post.id === Number(id)
        );
        if (postAtualizado) {
            postAtualizado.content = novoConteudo;
            salvarPosts();
        }
    },

    apagaPost(id) {
        const listaDePostsAtualizada = miniRedeSocial.posts.filter(postAtual => 
            postAtual.id !== Number(id)
        );
        miniRedeSocial.posts = listaDePostsAtualizada;
        salvarPosts();
    }
};

// FRONT-END
const $meuForm = document.querySelector('form');

// CREATE
$meuForm.addEventListener('submit', function criaPostController(info) {
    info.preventDefault();
    const $campoCriaPost = document.querySelector('input[name="campoCriaPost"]');
    const conteudo = $campoCriaPost.value.trim();
    if (!conteudo) {
        alert('Não é possível criar posts vazios!');
        return; // evita posts vazios
    }
    miniRedeSocial.criaPost({ owner: "http-figueiredo", content: conteudo });

    $campoCriaPost.value = '';
});

// READ -> carrega e renderiza
miniRedeSocial.lePosts();

// UPDATE
document.querySelector('.listaDePosts').addEventListener('input', function (infosDoEvento) {
    const elementoAtual = infosDoEvento.target;
    // só atualiza se for o span contenteditable
    if (elementoAtual.tagName.toLowerCase() !== 'span') return;

    const id = elementoAtual.parentNode.getAttribute('data-id');
    const conteudo = elementoAtual.innerText;
    miniRedeSocial.AtualizaPost(id, conteudo);
});

// DELETE
document.querySelector('.listaDePosts').addEventListener('click', function (infosDoEvento) {
    const elementoAtual = infosDoEvento.target;
    const cliqueBtnDeletar = elementoAtual.classList.contains("btn-deletar");
    if (cliqueBtnDeletar) {
        const id = elementoAtual.parentNode.getAttribute('data-id');
        miniRedeSocial.apagaPost(id); // remove do 'banco'
        elementoAtual.parentNode.remove(); // remove da view
    }
});
console.log(miniRedeSocial.posts); // para verificar o conteúdo do 'banco de dados'