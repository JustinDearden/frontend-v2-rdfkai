import { createFileRoute } from '@tanstack/react-router';
import ScreenTwo from '../pages/ScreenTwo';

export const Route = createFileRoute('/edit')({
  component: RouteComponent,
});

function RouteComponent() {
  return <ScreenTwo />;
}
