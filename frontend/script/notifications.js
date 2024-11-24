// This file manages the creation, display, and positioning of notifications for the application.

let notificationsQueue = [];

// Displays an error notification with the given message.
export function showErrorNotification(message) {
    const notification = createNotificationElement(message, 'error-notification');
    notificationsQueue.push(notification);
    displayNotification(notification);
}

// Displays a standard notification with the given message.
export function showNotification(message) {
    const notification = createNotificationElement(message, 'notification');
    notificationsQueue.push(notification);
    displayNotification(notification);
}

// Creates a notification DOM element with the specified message and CSS class.
function createNotificationElement(message, className) {
    const notification = document.createElement('div');
    notification.className = `${className} hide`;
    notification.innerText = message;
    document.body.appendChild(notification);
    return notification;
}

// Displays the notification and updates its position in the queue.
function displayNotification(notification) {
    requestAnimationFrame(() => {
        notification.classList.remove('hide');
        notification.classList.add('show');
        updateNotificationsPosition();
    });

    setTimeout(() => hideNotification(notification), 3000);
}

// Hides the notification after the display duration ends.
function hideNotification(notification) {
    notification.classList.remove('show');
    notification.classList.add('hide');

    notification.addEventListener('transitionend', () => {
        notification.remove();
        notificationsQueue = notificationsQueue.filter(n => n !== notification);
        updateNotificationsPosition();
    }, { once: true });
}

// Updates the position of all notifications in the queue to ensure proper stacking.
function updateNotificationsPosition() {
    notificationsQueue.forEach((notif, index) => {
        notif.style.top = `${10 + 60 * index}px`;
    });
}
