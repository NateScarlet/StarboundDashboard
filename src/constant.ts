import Notify from 'notifyjs';
export const isSupportNotify = !Notify.needsPermission || Notify.isSupported();
