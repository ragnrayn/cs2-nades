import { Markup } from 'telegraf';
import { BTN } from './bot.constants';

// Main menu: big buttons under the input field, always visible
export const mainKeyboard = () =>
  Markup.keyboard([[BTN.NADES]])
    .resize()
    .persistent();
