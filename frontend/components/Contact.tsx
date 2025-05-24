export default function Contact() {
  return (
    <section id="contact" className="py-24 bg-[#14151a]">
      <div className="container mx-auto px-6 max-w-lg">
        <h2 className="text-3xl font-semibold mb-6">Contact</h2>
        <form className="space-y-4">
          <input type="text"    placeholder="Name"
            className="w-full bg-bg border border-fg/30 rounded-md px-4 py-2" />
          <input type="email"   placeholder="Email"
            className="w-full bg-bg border border-fg/30 rounded-md px-4 py-2" />
          <textarea placeholder="Message"
            className="w-full bg-bg border border-fg/30 rounded-md px-4 py-2 h-32" />
          <button type="submit"
            className="w-full bg-accent hover:bg-indigo-500 px-4 py-3 rounded-md">
            Send Message
          </button>
        </form>
      </div>
    </section>
  )
}
