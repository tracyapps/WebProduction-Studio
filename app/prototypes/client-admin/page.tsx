import type { Metadata } from 'next';
import { ClientAdminPrototype } from '@/prototypes/client-admin/ClientAdminPrototype';

export const metadata: Metadata = {
  title: 'Client admin prototype — WPS',
  description:
    'An interactive WebProduction Studio prototype exploring calmer client website management.',
  robots: { index: false, follow: false },
};

export default function ClientAdminPrototypePage() {
  return <ClientAdminPrototype />;
}
