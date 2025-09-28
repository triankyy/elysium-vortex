import { useState } from "react";
import { useForm } from "react-hook-form";

interface KritikSaran {
  kritik: string
  saran: string
}

export default function App() {
  const { register, handleSubmit, formState: { errors }, reset } = useForm<KritikSaran>()
  const [loading, setLoading] = useState<boolean>(false)

  async function onSubmit(formData: KritikSaran): Promise<void> {
    setLoading(true)
    const url = import.meta.env.DEV ? `/api/${import.meta.env.VITE_URL}` : `https://script.google.com/${import.meta.env.VITE_URL}`
    const data = JSON.stringify({
      "kritik": formData.kritik,
      "saran": formData.saran
    });

    const requestOptions: RequestInit = {
      method: "POST",
      headers: {
        "Content-Type": "text/plain;charset=utf-8"
      },
      body: data,
      redirect: "follow"
    };

    try {
      const response = await fetch(url, requestOptions)
      const responseData = await response.json()
      setLoading(false)
      alert(responseData.message)
      reset()
    } catch (error: unknown) {
      console.log(error)
      setLoading(false)
      alert("Terjadi kesalahan")
      reset()
    }

  }

  return (
    <div className="w-full h-screen bg-[url(/background.png)] bg-center bg-cover flex items-center justify-center">
      <div className="max-w-2xl m-auto p-5 w-full">
        <div className="card bg-base-100 shadow-sm">
          <div className="bg-gradient-to-r from-[#e7c6ff] to-[#bbd0ff] w-full rounded-lg flex flex-col pb-5 items-center">
            <img src="/LOGO_KELAS.png" className="w-40 h-40" alt="Vite logo" />
            <h1 className="bg-gradient-to-r from-[#6d689f] to-[#5d5eaa] bg-clip-text text-transparent md:text-3xl text-xl poppins-extrabold-italic text-center">
              Mading Elysium Vortex
            </h1>
          </div>

          <form onSubmit={handleSubmit(onSubmit)}>

            <div className="p-5">
              <fieldset className="fieldset mt-5">
                <legend className="fieldset-legend">Kritik</legend>
                <textarea
                  className="textarea h-24 w-full"
                  placeholder="Ketik disini"
                  {...register("kritik", { required: true })}
                ></textarea>
                {errors.kritik?.type === "required" && (
                  <div className="label text-red-500">Kolom kritik wajib diisi</div>
                )}
              </fieldset>
              <fieldset className="fieldset mt-5">
                <legend className="fieldset-legend">Saran</legend>
                <textarea
                  className="textarea h-24 w-full"
                  placeholder="Ketik disini"
                  {...register("saran", { required: true })}
                ></textarea>
                {errors.saran?.type === "required" && (
                  <div className="label text-red-500">Kolom saran wajib diisi</div>
                )}
              </fieldset>

              <button className="btn bg-gradient-to-r from-violet-500 to-blue-500 mt-5 w-full text-white disabled:from-gray-500 disabled:to-zinc-600" disabled={loading}>
                {loading ? (
                  <div className="flex flex-row gap-2">
                    Mohon tunggu
                    <span className="loading loading-dots loading-xs"></span>
                  </div>
                ) : "Kirim"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
