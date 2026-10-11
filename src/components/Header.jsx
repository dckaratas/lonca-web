export default function Header({ usingApi }) {
  return (
    <header className="px-4 pt-12 pb-8 text-center">
      <p className="baslik text-sm text-gold">Maceracılar Loncası</p>
      <h1 className="mt-3 font-serif text-5xl text-gold-pale sm:text-6xl">Görev Panosu</h1>
      <div className="mx-auto mt-4 flex max-w-xs items-center gap-3 text-gold-dark">
        <span className="h-px flex-1 bg-gradient-to-r from-transparent to-bronze-light" />
        <span aria-hidden>⚜</span>
        <span className="h-px flex-1 bg-gradient-to-l from-transparent to-bronze-light" />
      </div>
      <p className="mt-3 text-sm italic text-ash">
        Veri kaynağı: {usingApi ? 'Lonca API' : 'Tarayıcı (LocalStorage)'}
      </p>
    </header>
  )
}
