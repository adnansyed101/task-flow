import { createFileRoute, Link, useNavigate } from '@tanstack/react-router'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { SiteHeader } from '@/components/site-chrome'
import { zodResolver } from '@hookform/resolvers/zod'
import { Controller, useForm } from 'react-hook-form'
import {
  registrationSchema,
  type RegistrationType,
} from '#/lib/schema/registration'
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from '#/components/ui/field'
import { registrationConstant } from '#/lib/constants'
import { authClient } from '#/lib/auth-client'
import { Spinner } from '#/components/ui/spinner'
import { toast } from 'sonner'

export const Route = createFileRoute('/register')({
  head: () => ({
    meta: [
      { title: 'Create account — Micron' },
      { name: 'description', content: 'Join Micron as a worker or a buyer.' },
    ],
  }),
  component: RegisterPage,
})

function RegisterPage() {
  const form = useForm<RegistrationType>({
    resolver: zodResolver(registrationSchema),
    defaultValues: registrationConstant,
  })

  const navigate = useNavigate()

  async function onSubmit(formData: RegistrationType) {
    await authClient.signUp.email(
      {
        email: formData.email, // user email address
        password: formData.password, // user password -> min 8 characters by default
        name: formData.fullName, // user display name
        image: formData.image, // User image URL (optional)
        callbackURL: '/dashboard', // A URL to redirect to after the user verifies their email (optional)
      },
      {
        onSuccess: () => {
          //redirect to the dashboard or sign in page
          toast.success('User Create Successfully!')
          form.reset()
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
              Join Micron
            </div>
            <h1 className="mt-3 font-display text-5xl leading-tight">
              Two minutes to your first task.
            </h1>
          </div>
          <ul className="space-y-3 text-sm text-primary-foreground/70">
            <li>
              · Workers get <b className="text-primary-foreground">10 coins</b>{' '}
              on signup
            </li>
            <li>
              · Buyers get <b className="text-primary-foreground">50 coins</b>{' '}
              to post their first task
            </li>
            <li>· Withdraw from 200 coins ($10)</li>
            <li>· No fees to create an account</li>
          </ul>
        </div>

        <div className="mx-auto w-full max-w-md">
          <h2 className="font-display text-3xl">Create your account</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Already a member?{' '}
            <Link to="/login" className="underline underline-offset-4">
              Log in
            </Link>
            .
          </p>

          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="mt-8 space-y-4"
          >
            <FieldGroup>
              <Controller
                name="fullName"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field>
                    <FieldLabel htmlFor="fullName">Full Name</FieldLabel>
                    <Input
                      id="fullName"
                      {...field}
                      required
                      aria-invalid={fieldState.invalid}
                      placeholder="John Doe"
                      autoComplete="off"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
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
                name="image"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field>
                    <FieldLabel htmlFor="image">Enter Image</FieldLabel>
                    <Input
                      id="image"

                      required
                      {...field}
                      aria-invalid={fieldState.invalid}
                      placeholder="https://example.com/image.jpg"
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
              <Controller
                name="role"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field>
                    <FieldLabel htmlFor="role">Select Role</FieldLabel>
                    <Select
                      name={field.name}
                      value={field.value}
                      onValueChange={field.onChange}
                    >
                      <SelectTrigger
                        className="mt-1.5 w-full"
                        id="role"
                        aria-invalid={fieldState.invalid}
                      >
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="worker">
                          Worker — Complete Tasks
                        </SelectItem>
                        <SelectItem value="buyer">
                          Buyer — Post Tasks
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            </FieldGroup>

            <Button
              type="submit"
              size="lg"
              className="w-full rounded-full"
              disabled={form.formState.isSubmitting}
            >
              {form.formState.isSubmitting && <Spinner />}
              {form.formState.isSubmitting
                ? 'Creating account...'
                : 'Create account'}
            </Button>
          </form>
        </div>
      </div>
    </div>
  )
}
