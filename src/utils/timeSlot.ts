/**
 * 2-Hour Time Window Cohorting Helper
 * Automatically groups users registering within the same 2-hour window into a shared class.
 */

export function getAutoTimeSlotCode(date: Date = new Date()): string {
  const yyyy = date.getUTCFullYear();
  const mm = String(date.getUTCMonth() + 1).padStart(2, '0');
  const dd = String(date.getUTCDate()).padStart(2, '0');
  const slot = Math.floor(date.getUTCHours() / 2);
  return `${yyyy}${mm}${dd}_SLOT${slot}`;
}

export function formatTimeSlotInfo(code: string): {
  isSlot: boolean;
  labelFa: string;
  labelEn: string;
  timeRange: string;
  dateStr: string;
} {
  const match = (code || '').match(/^(\d{4})(\d{2})(\d{2})_SLOT(\d+)$/i);
  if (!match) {
    return {
      isSlot: false,
      labelFa: code,
      labelEn: code,
      timeRange: '',
      dateStr: ''
    };
  }

  const [, yyyy, mm, dd, slotStr] = match;
  const slotNum = parseInt(slotStr, 10);
  const startHour = String(slotNum * 2).padStart(2, '0') + ':00';
  const endHour = String((slotNum * 2 + 2) % 24).padStart(2, '0') + ':00';
  const timeRange = `${startHour} الی ${endHour}`;
  const dateStr = `${yyyy}/${mm}/${dd}`;

  return {
    isSlot: true,
    timeRange,
    dateStr,
    labelFa: `نوبت ۲ ساعته (${timeRange}) · ${dateStr}`,
    labelEn: `2-Hour Window (${startHour}–${endHour}) · ${dateStr}`
  };
}
