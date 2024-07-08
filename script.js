// Função para mostrar a mensagem de sucesso
function showSuccessMessage() {
    const successMessage = document.getElementById('successMessage');
    if (successMessage) {
        successMessage.classList.remove('hidden');
        successMessage.classList.add('show');

        // Esconder a mensagem após 3 segundos
        setTimeout(() => {
            successMessage.classList.remove('show');
            successMessage.classList.add('hidden');
        }, 3000);
    }
}

// Função para cadastro de produto
document.getElementById('produtoForm')?.addEventListener('submit', function(event) {
    event.preventDefault();
    
    const nome = document.getElementById('nome').value;
    const quantidade = document.getElementById('quantidade').value;
    const preco = document.getElementById('preco').value;
    
    // Criar objeto de produto
    const novoProduto = {
        nome: nome,
        quantidade: quantidade,
        preco: preco
    };
    
    // Adicionar novo produto ao array de produtos no localStorage
    let produtos = JSON.parse(localStorage.getItem('produtos')) || []; // Inicializa como array vazio se não houver nada
    
    produtos.push(novoProduto);
    
    // Atualizar localStorage com os produtos atualizados
    localStorage.setItem('produtos', JSON.stringify(produtos));
    
    // Limpar formulário após cadastro
    document.getElementById('produtoForm').reset();
    
    // Mostrar mensagem de sucesso
    showSuccessMessage();
    
    // Redirecionar para a página de estoque
    window.location.href = 'estoque.html';
});

// Função para listar produtos (estoque.html)
function listarProdutos() {
    const produtos = JSON.parse(localStorage.getItem('produtos')) || []; // Obtém os produtos do localStorage
    
    const listaProdutos = document.getElementById('listaProdutos');
    if (!listaProdutos) return; // Verifica se a lista de produtos existe na página
    
    listaProdutos.innerHTML = ''; // Limpa a lista antes de preencher
    
    if (produtos.length === 0) {
        listaProdutos.textContent = 'Nenhum produto cadastrado.';
        return;
    }

    produtos.forEach(produto => {
        const produtoElement = document.createElement('div');
        produtoElement.textContent = `Nome: ${produto.nome} - Quantidade: ${produto.quantidade} - Preço: R$ ${produto.preco}`;
        listaProdutos.appendChild(produtoElement);
    });
}

// Chama a função para listar produtos ao carregar a página de estoque
document.addEventListener('DOMContentLoaded', function() {
    listarProdutos();
});

// Função para exportar produtos para Excel
function exportToExcel() {
    const produtos = JSON.parse(localStorage.getItem('produtos')) || []; // Obtém os produtos do localStorage
    
    // Verificar se há produtos para exportar
    if (produtos.length === 0) {
        alert('Nenhum produto para exportar');
        return;
    }

    // Transformar dados em formato adequado para exportação
    const produtosData = produtos.map(produto => ({
        Nome: produto.nome,
        Quantidade: produto.quantidade,
        Preço: produto.preco
    }));

    // Criar nova planilha
    const ws = XLSX.utils.json_to_sheet(produtosData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Produtos');

    // Exportar planilha para arquivo
    XLSX.writeFile(wb, 'estoque.xlsx');
}
