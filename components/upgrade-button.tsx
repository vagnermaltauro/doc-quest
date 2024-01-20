import { Button } from './ui/button';
import { Icons } from './icons';

export function UpgradeButton() {
  return (
    <Button className="w-full">
      Upgrade now <Icons.arrowRight className="h-5 w-5 ml-1.5" />
    </Button>
  );
}
