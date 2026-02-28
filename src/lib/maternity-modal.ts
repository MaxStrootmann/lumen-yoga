export const MATERNITY_MODAL_EVENT = "open-maternity-modal";

export function openMaternityModal() {
  window.dispatchEvent(new Event(MATERNITY_MODAL_EVENT));
}
