// Script para resolver problema do overlay escuro no dropdown de cidades
document.addEventListener('DOMContentLoaded', function() {
  const citySelect = document.getElementById('checkout-city');
  
  if (citySelect) {
    // Substitui o select personalizdo por um nativo quando no mobile
    if (window.innerWidth <= 768) {
      // Remover quaisquer event listeners que possam interferir
      const clone = citySelect.cloneNode(true);
      citySelect.parentNode.replaceChild(clone, citySelect);
      
      // Garantir que o select use o comportamento nativo
      clone.setAttribute('data-native', 'true');
      
      // Remover qualquer overlay que possa estar causando o problema
      document.querySelectorAll('.select-overlay, .dropdown-overlay, [class*="select-backdrop"]').forEach(elem => {
        if (elem) {
          elem.parentNode.removeChild(elem);
        }
      });
      
      // Remover evento de clique personalizado e usar o comportamente nativo
      clone.addEventListener('click', function(e) {
        // Permitir o comportamento padrão do navegador
        e.stopPropagation();
        return true;
      });
      
      // Monitorar para remover overlays que podem ser adicionados dinamicamente
      const observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
          if (mutation.addedNodes) {
            mutation.addedNodes.forEach(function(node) {
              if (node.nodeType === 1 && (
                  node.classList.contains('select-overlay') || 
                  node.classList.contains('dropdown-overlay') ||
                  (node.className && node.className.includes('select-backdrop'))
                )) {
                node.parentNode.removeChild(node);
              }
            });
          }
        });
      });
      
      // Observar o corpo do documento para quaisquer alterações
      observer.observe(document.body, { childList: true, subtree: true });
    }
  }
  
  // Função para limpar quaisquer popups ou overlays com atraso
  setTimeout(function() {
    // Remover qualquer elemento fixo que possa estar causando o overlay escuro
    document.querySelectorAll('body > div[style*="position: fixed"], .modal-backdrop, .dropdown-backdrop').forEach(function(elem) {
      if (elem && elem.style.zIndex > 0 && elem.style.backgroundColor && elem.style.backgroundColor.includes('rgba')) {
        elem.style.display = 'none';
        elem.style.visibility = 'hidden';
        elem.style.opacity = '0';
      }
    });
  }, 500);
});
