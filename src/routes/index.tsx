import { createFileRoute } from '@tanstack/react-router';
import ScreenOne from '../pages/ScreenOne';

export const Route = createFileRoute('/')({
  component: RouteComponent,
});

function RouteComponent() {
  return <ScreenOne />;
}
