import GLib from '@girs/glib-2.0';

const timeoutIds: number[] = [];

/**
 * Add single-shot timeout
 * @param intervalMS
 * @param callback
 */
export function timeoutAdd(intervalMS: number, callback: () => void): number {
  const sourceId = GLib.timeout_add(GLib.PRIORITY_DEFAULT, intervalMS, () => {
    callback();
    return GLib.SOURCE_REMOVE;
  });
  timeoutIds.push(sourceId);
  return sourceId;
}

export function removeAllTimeouts() {
  timeoutIds.forEach((sourceId) => {
    GLib.Source.remove(sourceId);
  });
  timeoutIds.splice(0);
}
