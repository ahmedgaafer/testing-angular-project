import { Component, input, viewChild, computed, effect, ElementRef, signal } from '@angular/core';

@Component({
  selector: 'app-ui-field-helper-text',
  standalone: true,
  imports: [],
  templateUrl: './ui-field-helper-text.component.html',
  styleUrl: './ui-field-helper-text.component.scss'
})
export class UiFieldHelperTextComponent {
  // Signal inputs
  height = input<string>('20px');
  text = input<string>('');
  isError = input<boolean>(false);

  // ViewChild signal for overflow detection
  textElement = viewChild<ElementRef<HTMLElement>>('textElement');
  exclamationElement = viewChild<ElementRef<HTMLElement>>('exclamationElement');

  // Signal to track overflow state
  private hasOverflow = signal<boolean>(false);

  // Computed signal for overflow state
  showExclamation = computed(() => {
    const textValue = this.text();
    return textValue.length > 0 && this.hasOverflow();
  });

  // Computed signal for display text (truncated to 1 line)
  displayText = computed(() => this.text());

  // Method to position tooltip on hover
  onExclamationHover(event: MouseEvent) {
    const element = this.exclamationElement()?.nativeElement;
    if (!element) return;

    const tooltip = element.querySelector('.tooltip') as HTMLElement;
    if (!tooltip) return;

    const rect = element.getBoundingClientRect();
    tooltip.style.left = rect.left + rect.width / 2 + 'px';
    tooltip.style.top = rect.top - 8 + 'px';
    tooltip.style.transform = 'translate(-50%, -100%)';
  }

  constructor() {
    // Effect to apply CSS custom property for height
    effect(() => {
      const heightValue = this.height();
      const element = this.textElement()?.nativeElement?.parentElement;
      if (element) {
        element.style.setProperty('--helper-height', heightValue);
      }
    });

    // Effect to detect overflow when text or height changes
    effect(() => {
      const element = this.textElement()?.nativeElement;
      const textValue = this.text();
      
      if (element && textValue) {
        // Use multiple strategies to ensure accurate overflow detection
        const checkOverflow = () => {
          // Check if text overflows by comparing scrollWidth to clientWidth
          // Since we're using white-space: nowrap, we check horizontal overflow
          const hasOverflow = element.scrollWidth > element.clientWidth + 1; // +1 for rounding errors
          this.hasOverflow.set(hasOverflow);
        };
        
        // Check immediately
        checkOverflow();
        
        // Also check after a short delay to account for rendering
        setTimeout(checkOverflow, 0);
        requestAnimationFrame(checkOverflow);
      } else {
        this.hasOverflow.set(false);
      }
    });
  }
}

