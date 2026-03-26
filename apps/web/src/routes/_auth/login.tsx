import { GoogleLogin } from "@react-oauth/google";
import { createFileRoute, Link } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginValidator } from "@vido-vala/validators/auth";
import { Button } from "@vido-vala/ui/components/button";
import { Input } from "@vido-vala/ui/components/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@vido-vala/ui/components/card";
import { Field, FieldLabel, FieldError, FieldContent } from "@vido-vala/ui/components/field";
import { z } from "zod";

export const Route = createFileRoute("/_auth/login")({
  component: LoginComponent,
});

type LoginFormValues = z.infer<typeof loginValidator>;

function LoginComponent() {
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginValidator),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (data: LoginFormValues) => {
    console.log(data);
    // Handle login
  };

  const handleGoogleSuccess = (response: any) => {
    console.log("Google login success:", response);
    // Handle Google login
  };

  const handleGoogleError = () => {
    console.log("Google login error");
  };

  return (
    <Card className="rounded-xl shadow-lg border-muted/50">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl">Login</CardTitle>
        <CardDescription>Enter your email and password to login to your account</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-4">
          <div className="flex justify-center">
            <GoogleLogin
              onSuccess={handleGoogleSuccess}
              onError={handleGoogleError}
              useOneTap
              theme="filled_black"
              shape="pill"
              width="100%"
            />
          </div>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-card px-2 text-muted-foreground">Or continue with</span>
            </div>
          </div>

          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <Field>
              <FieldLabel htmlFor="email">Email</FieldLabel>
              <FieldContent>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  className="rounded-lg h-10"
                  {...form.register("email")}
                />
                <FieldError errors={[form.formState.errors.email]} />
              </FieldContent>
            </Field>
            <Field>
              <FieldLabel htmlFor="password">Password</FieldLabel>
              <FieldContent>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  className="rounded-lg h-10"
                  {...form.register("password")}
                />
                <FieldError errors={[form.formState.errors.password]} />
              </FieldContent>
            </Field>
            <Button
              type="submit"
              className="w-full rounded-lg h-10 font-semibold"
              disabled={form.formState.isSubmitting}
            >
              {form.formState.isSubmitting ? "Logging in..." : "Login"}
            </Button>
          </form>
        </div>
        <div className="mt-6 text-center text-sm">
          Don&apos;t have an account?{" "}
          <Link to="/register" className="underline font-medium">
            Register
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
