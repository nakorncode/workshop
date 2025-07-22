export const theme = $state<{ value: 'light' | 'dark' }>({ value: 'light' });

export function toggleTheme() {
  theme.value = theme.value === 'light' ? 'dark' : 'light';
}
