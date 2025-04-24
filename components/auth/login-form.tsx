'use client';
import { IInputs } from '@/lib/types';
import { SubmitHandler, useForm } from 'react-hook-form';
import Spinner from '@/components/ui/loading/spinner';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
const LoginForm = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useForm<IInputs>({ defaultValues: { username: '', password: '' } });

  const onSubmit: SubmitHandler<IInputs> = async (data) => {
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        router.push('/admin/dashboard');
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
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label htmlFor="username">Username</label>
        <input
          type="text"
          id="username"
          placeholder="Username"
          {...register('username', { required: true })}
        />
        {errors.username && <span>{errors.username.message}</span>}
      </div>
      <div>
        <label htmlFor="password">Passwort</label>
        <input
          type="password"
          id="password"
          placeholder="Passwort"
          {...register('password', { required: true })}
        />
        {errors.password && <span>{errors.password.message}</span>}
      </div>
      <button
        className="flex h-[3rem] w-[9rem] items-center justify-center rounded-md bg-blue-400 font-bold"
        type="submit"
        disabled={isSubmitting}>
        {isSubmitting ? <Spinner /> : 'Login'}
      </button>
    </form>
  );
};

export default LoginForm;
