import { Injectable } from '@nestjs/common';
import { admin } from '../../../firebase/init-admin.cjs';

@Injectable()
export class NotificationService {
  async sendPushNotification({
    token,
    title,
    body,
  }: {
    token: string;
    title: string;
    body: string;
  }) {
    const message = {
      notification: { title, body },
      token,
    };

    try {
      const response = await admin.messaging().send(message);
      console.log('Successfully sent message:', response);
    } catch (error) {
      console.error('Error sending message:', error);
    }
  }
}
