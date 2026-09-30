// Texts of the reply-keyboard buttons (bottom menu).
// @Hears() must match these exactly, so they live in one place.
export const BTN = {
  NADES: '💣 Гранати',
  HELP: 'ℹ️ Допомога',
} as const;

export const TEXT = {
  START: (name: string) => `Привіт, ${name}! 👋\n\nОбери розділ у меню нижче.`,
  HELP: 'Натисни «💣 Гранати», обери карту і тип гранати — бот покаже відео.',
  ERROR: '⚠️ Щось пішло не так, спробуй ще раз.',
} as const;
