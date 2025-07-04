document.addEventListener('DOMContentLoaded', function() {
  // Verifica se está em viewport mobile (abaixo de 768px)
  function isMobileViewport() {
    return window.innerWidth < 768;
  }

  // Reset padding adjustments since the fixed language selector has been removed
  function resetBodyPadding() {
    // Remover qualquer ajuste de padding
    document.body.style.paddingTop = '';
    const header = document.querySelector('header.header');
    if (header) {
      header.style.marginTop = '';
    }
  }
  
  // Adiciona chevrons aos selects para indicar que são dropdowns
  function styleSelectElements() {
    const labels = document.querySelectorAll('.selector-label');
    labels.forEach(label => {
      if (!label.querySelector('.select-arrow')) {
        const arrow = document.createElement('span');
        arrow.classList.add('select-arrow');
        arrow.innerHTML = '▼';
        arrow.style.fontSize = '10px';
        arrow.style.marginLeft = '4px';
        label.appendChild(arrow);
      }
    });
  }
  
  // Inicializa os ajustes
  styleSelectElements();
  resetBodyPadding();
  
  // Suporte para o Shopify Theme Editor
  if (typeof Shopify !== 'undefined' && Shopify.designMode) {
    document.addEventListener('shopify:section:load', function() {
      styleSelectElements();
    });
  }
});
