import { App, DirectiveBinding } from 'vue';

export default {
  install(app: App) {
    app.directive('tooltip', {
      mounted(el: HTMLElement, binding: DirectiveBinding) {
        const tooltip = document.createElement('div');
        tooltip.textContent = String(binding.value);
        tooltip.className = `
          absolute z-50 bg-gray-800 text-white text-xs rounded-lg px-2 py-1
          opacity-0 transition-opacity duration-200 pointer-events-none
          whitespace-nowrap
        `;
        document.body.appendChild(tooltip);

        const showTooltip = () => {
          const rect = el.getBoundingClientRect();
          const tooltipRect = tooltip.getBoundingClientRect();
          const padding = 8; // space between tooltip and element
          const screenWidth = window.innerWidth;

          // Default top position
          let top = rect.top - tooltipRect.height - padding;
          // Default horizontal center
          let left = rect.left + (rect.width - tooltipRect.width) / 2;

          // If not enough space on top, place at bottom
          if (top < 0) {
            top = rect.bottom + padding;
          }

          // Prevent overflow left
          if (left < padding) {
            left = padding;
          }

          // Prevent overflow right
          if (left + tooltipRect.width > screenWidth - padding) {
            left = screenWidth - tooltipRect.width - padding;
          }

          // Apply final position
          tooltip.style.left = left + 'px';
          tooltip.style.top = top + 'px';
          tooltip.style.opacity = '1';
        };

        const hideTooltip = () => {
          tooltip.style.opacity = '0';
        };

        el.addEventListener('mouseenter', showTooltip);
        el.addEventListener('mouseleave', hideTooltip);
      },
      unmounted(el: any) {
        if (el._tooltip) {
          document.body.removeChild(el._tooltip);
        }
      }
    });
  }
}
