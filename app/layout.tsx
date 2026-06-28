import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Suggest an App Idea',
  description: 'Share useful app ideas and real-life problems to solve.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
