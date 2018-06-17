import Notify from 'notifyjs';
export const isSupportNotify = !Notify.needsPermission || Notify.isSupported();
export const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)