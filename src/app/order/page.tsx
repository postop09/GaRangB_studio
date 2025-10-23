import { AppLayout } from '@/widgets/app-layout/ui';
import OrderSection from './ui/OrderSection';
import { OrderProvider } from './context';

export default function OrderPage() {
  return (
    <AppLayout>
      <OrderProvider>
        <OrderSection />
      </OrderProvider>
    </AppLayout>
  );
}
