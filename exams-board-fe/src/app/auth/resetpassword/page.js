import ResetPasswordForm from "@/components/Forms/ResetPasswordForm";

function ResetPasswordPage() {
  return (
    <div className="w-full h-full bg-[#eeeeee] flex items-center justify-center">
      <div className="w-full h-full md:w-2/3 lg:w-[35%] md:h-fit p-[3rem] lg:p-[4rem] bg-white rounded-md flex flex-col gap-10 items-center justify-center drop-shadow-xl">
        <h1 className="w-full text-[#226FFE] font-bold text-4xl text-center">
          Reset Password
        </h1>

        <ResetPasswordForm />
      </div>
    </div>
  );
}

export default ResetPasswordPage;
