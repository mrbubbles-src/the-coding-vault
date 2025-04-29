'use client';
import { IInputs } from '@/lib/types';
import { SubmitHandler, useForm } from 'react-hook-form';
import Spinner from '@/components/ui/loading/spinner';
import { useEffect } from 'react';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/shadcn/form';
import { Button } from '@/components/ui/shadcn/button';
import { Input } from '@/components/ui/shadcn/input';
const LoginForm = () => {
  const form = useForm<IInputs>({
    defaultValues: { username: '', password: '' },
  });
  const {
    control,
    handleSubmit,
    reset,
    formState: { isSubmitting, isSubmitSuccessful },
  } = form;

  const onSubmit: SubmitHandler<IInputs> = async (data) => {
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (res.redirected) {
        window.location.href = res.url;
      } else {
        const error = await res.json();
        console.error('Login fehlgeschlagen:', error.msg);
      }
    } catch (error) {
      console.error('Fehler beim Login:', error);
    }
  };
  useEffect(() => {
    reset({
      username: '',
      password: '',
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSubmitSuccessful]);
  //   const onSubmit: SubmitHandler<IInputs> = async (data) => {
  //     await new Promise((resolve) => setTimeout(resolve, 5000));
  //     console.log(data);
  //   };

  return (
    <Form {...form}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex w-full flex-col gap-4 md:max-w-sm">
        <FormField
          control={control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-lg">Username</FormLabel>
              <FormControl>
                <Input placeholder="Username" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-lg">Passwort</FormLabel>
              <FormControl>
                <Input type="password" placeholder="Passwort" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          disabled={isSubmitting}
          className="flex h-[3rem] w-[9rem] items-center justify-center place-self-start font-bold">
          {isSubmitting ? <Spinner /> : 'Login'}
        </Button>
      </form>
    </Form>
  );
};

export default LoginForm;
