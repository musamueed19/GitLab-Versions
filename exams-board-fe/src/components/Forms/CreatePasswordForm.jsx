import InputFields from "../common/InputFields";

export default function CreatePasswordForm() {
  return (
    <form className="flex flex-col gap-5 w-full px-6">
      <InputFields
        label="Password"
        name="password"
        input="password"
        placeholder="Enter new password"
      />
      <InputFields
        label="Confirm Password"
        name="confirmPassword"
        input="password"
        placeholder="Confirm new password"
      />
      <button
        type="submit"
        className="bg-[#226FFE] text-white font-bold rounded-sm py-1 mt-6"
      >
        Create Password
      </button>
    </form>
  );
}
