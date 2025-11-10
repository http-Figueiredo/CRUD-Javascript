// Principio básico de trabalhar com WEB
// 1 - Criar Variáveis
// 2 - Sincronizar Conteúdo das variáveis com o HTML
// 3 - Atualiza as variáveis

// Código de front end: Web ->
const $meuForm = document.querySelector('form');
console.log($meuForm);

//CRUD: CREATE
$meuForm.addEventListener('submit', function criaPostController(info) { //Detecta o primeiro evento 'submit' e aciona a função. 
    info.preventDefault(); //Previne que a página recarregue quando enviar o formulário
    console.log("Post criado");
    const $campoCriaPost = document.querySelector('input[name="campoCriaPost"]'); //'input[name=""]' para detectar um input específico 
    const $listaDePosts = document.querySelector('.listaDePosts');
    
    $listaDePosts.insertAdjacentHTML('beforeend', `<li>${$campoCriaPost.value}</li>`);
    $campoCriaPost.value = '';
});