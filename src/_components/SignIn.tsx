import { signIn } from '@/auth';

export function SignIn() {
  return (
    <form
      action={async (formData) => {
        'use server';
        await signIn('credentials', formData);
      }}
    >
      <div className="flex flex-col">
        <div className="flex flex-auto justify-end">
          <label>
            Email
            <input name="email" type="email" />
          </label>
        </div>

        <div className="flex flex-autojustify-end">
          <label>
            Password
            <input name="password" type="password" />
          </label>
        </div>

        <button className="border">Sign In</button>
      </div>
    </form>
  );
}
