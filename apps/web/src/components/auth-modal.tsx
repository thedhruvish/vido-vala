import { useAuthStore } from "../hooks/use-auth-store";
import { Button } from "@vido-vala/ui/components/button";
import { Link } from "@tanstack/react-router";
import { User } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@vido-vala/ui/components/dialog";

export function AuthModal() {
  const { isAuthModalOpen, closeAuthModal } = useAuthStore();

  return (
    <Dialog open={isAuthModalOpen} onOpenChange={(open) => !open && closeAuthModal()}>
      <DialogContent className="sm:max-w-sm">
        <div className="flex flex-col items-center text-center gap-4 py-4">
          <div className="rounded-full bg-muted p-3">
            <User className="h-6 w-6 text-primary" />
          </div>
          <DialogHeader className="text-center items-center">
            <DialogTitle className="text-xl font-bold">Sign in required</DialogTitle>
            <DialogDescription className="text-sm text-muted-foreground">
              You need to be signed in to perform this action.
            </DialogDescription>
          </DialogHeader>
          <div className="flex w-full flex-col gap-2 mt-2">
            <Link to="/login" onClick={closeAuthModal}>
              <Button className="w-full">Sign in</Button>
            </Link>
            <Link to="/register" onClick={closeAuthModal}>
              <Button variant="outline" className="w-full">
                Create account
              </Button>
            </Link>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
