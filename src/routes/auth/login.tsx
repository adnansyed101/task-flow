import { createFileRoute, Link, useNavigate } from '@tanstack/react-router'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { SiteHeader } from '@/components/site-chrome'
import { Controller, useForm } from 'react-hook-form'
import { loginSchema, type LoginType } from '#/lib/schema/registration'
import { zodResolver } from '@hookform/resolvers/zod'
import { loginConstant } from '#/lib/constants'
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from '#/components/ui/field'
import { authClient } from '#/lib/auth-client'
import { toast } from 'sonner'

export const Route = createFileRoute('/auth/login')({
  head: () => ({
    meta: [
      { title: 'Log in — Micron' },
      { name: 'description', content: 'Sign in to your Micron account.' },
    ],
  }),
  component: LoginPage,
})

function LoginPage() {
  const navigate = useNavigate()
  const form = useForm<LoginType>({
    resolver: zodResolver(loginSchema),
    defaultValues: loginConstant,
  })

  async function onSubmit(formData: LoginType) {
    await authClient.signIn.email(
      {
        email: formData.email, // user email address
        password: formData.password, // user password
        callbackURL: '/dashboard',
        rememberMe: false,
      },
      {
        onSuccess: () => {
          //redirect to the dashboard or sign in page
          navigate({ to: '/dashboard' })
        },
        onError: (ctx) => {
          // display the error message
          toast.error(ctx.error.message)
        },
      },
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-2">
        <div className="hidden flex-col justify-between rounded-3xl bg-primary p-10 text-primary-foreground lg:flex">
          <div>
            <div className="text-xs uppercase tracking-widest text-primary-foreground/60">
              Micron
            </div>
            <h1 className="mt-3 font-display text-5xl leading-tight">
              Welcome back to the workroom.
            </h1>
          </div>
          <div className="space-y-4 text-sm text-primary-foreground/70">
            <div className="rounded-xl border border-primary-foreground/15 bg-white/5 p-4">
              <div className="text-xs uppercase tracking-widest text-primary-foreground/50">
                Demo accounts
              </div>
              <div className="mt-2 grid gap-1 font-mono text-xs">
                <div>admin@microtask.io · Admin@123</div>
                <div>buyer@microtask.io · Buyer@123</div>
                <div>worker@microtask.io · Worker@123</div>
              </div>
            </div>
          </div>
        </div>

        <div className="mx-auto w-full max-w-md">
          <h2 className="font-display text-3xl">Log in</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            No account?{' '}
            <Link to="/auth/register" className="underline underline-offset-4">
              Create one
            </Link>
            .
          </p>

          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="mt-8 space-y-4"
          >
            <FieldGroup>
              <Controller
                name="email"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field>
                    <FieldLabel htmlFor="email">Enter Email</FieldLabel>
                    <Input
                      id="email"
                      type="email"
                      required
                      {...field}
                      aria-invalid={fieldState.invalid}
                      placeholder="john.doe@example.com"
                      autoComplete="off"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
              <Controller
                name="password"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field>
                    <FieldLabel htmlFor="password">Enter password</FieldLabel>
                    <Input
                      id="password"
                      required
                      {...field}
                      aria-invalid={fieldState.invalid}
                      placeholder="At least 6 chars, one uppercase + one number"
                      autoComplete="off"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            </FieldGroup>

            <Button
              type="submit"
              className="w-full rounded-full"
              size="lg"
              disabled={form.formState.isLoading}
            >
              Log in
            </Button>
          </form>

          <div className="my-6 flex items-center gap-3 text-xs text-muted-foreground">
            <div className="h-px flex-1 bg-border" />
            or
            <div className="h-px flex-1 bg-border" />
          </div>

          <Button
            onClick={() => console.log('google')}
            variant="outline"
            className="w-full rounded-full"
            size="lg"
            type="button"
          >
            <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.99.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.1c-.22-.66-.35-1.36-.35-2.1s.13-1.44.35-2.1V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.83z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.83C6.71 7.31 9.14 5.38 12 5.38z"
              />
            </svg>
            Continue with Google
          </Button>
        </div>
      </div>
    </div>
  )
}
