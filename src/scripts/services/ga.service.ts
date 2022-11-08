export class GaService {
  static getGaValue(): string | null {
    for (const c of document.cookie.split(';')) {
      const d = c.trim();
      if (d.startsWith('_ga=')) {
        return d.split('=', 2)[1];
      }
    }
    return null;
  }
}
