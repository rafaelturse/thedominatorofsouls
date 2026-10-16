const EVENT_NAME = "book-audio:pause";

export function pauseAllAudio(except?: HTMLAudioElement | null) {
  window.dispatchEvent(new CustomEvent(EVENT_NAME, { detail: { except: except ?? null } }));
}

export function onPauseAll(handler: (except: HTMLAudioElement | null) => void) {
  function listener(e: Event) {
    const detail = (e as CustomEvent<{ except: HTMLAudioElement | null }>).detail;
    handler(detail?.except ?? null);
  }

  window.addEventListener(EVENT_NAME, listener);
  return () => window.removeEventListener(EVENT_NAME, listener);
}