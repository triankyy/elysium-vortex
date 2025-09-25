export default function App() {
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

          <div className="p-5">
            <fieldset className="fieldset mt-5">
              <legend className="fieldset-legend">Kritik</legend>
              <textarea
                className="textarea h-24 w-full"
                placeholder="Ketik disini"
                required={true}
              ></textarea>
              <div className="label">Wajib diisi</div>
            </fieldset>
            <fieldset className="fieldset mt-5">
              <legend className="fieldset-legend">Saran</legend>
              <textarea
                className="textarea h-24 w-full"
                placeholder="Ketik disini"
                required={true}
              ></textarea>
              <div className="label">Wajib diisi</div>
            </fieldset>

            <button className="btn bg-gradient-to-r from-violet-500 to-blue-500 mt-5 w-full text-white">
              Kirim
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
