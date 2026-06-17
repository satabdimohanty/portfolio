"use client";

export function AdidasQuote() {
  return (
    <div id="banner" className="mt-20 bg-gradient-to-r from-brand-accent-light to-brand-accent-dark py-12 md:mt-32">
      <div className="mx-auto max-w-5xl px-6 lg:px-0">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-[1fr_2fr]">
          <div className="text-xl text-white">
            <div className="font-sans font-semibold">
              impossible is <span className="font-serif italic">nothing</span> —
            </div>
            <div className="flex items-center gap-2 font-serif font-normal italic mt-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                <title>Adidas</title>
                <path d="M11.936 17.952c0-.644.517-1.16 1.162-1.16.644 0 1.16.516 1.16 1.16a1.157 1.157 0 01-1.16 1.161 1.157 1.157 0 01-1.162-1.16m4.724 0c0-.645.517-1.162 1.161-1.162s1.161.517 1.161 1.161-.517 1.161-1.16 1.161a1.157 1.157 0 01-1.162-1.16m-10.95 0c0-.645.517-1.162 1.161-1.162s1.16.517 1.16 1.161-.516 1.161-1.16 1.161a1.157 1.157 0 01-1.161-1.16m-4.724 0c0-.645.517-1.162 1.161-1.162s1.161.517 1.161 1.161a1.157 1.157 0 01-1.161 1.161 1.157 1.157 0 01-1.16-1.16m9.55-2.052h-1.01v4.063h1.01v-4.063zM3.3 19.964h1.01v-4.063H3.3v.326a2.087 2.087 0 00-1.2-.374c-1.162 0-2.1.938-2.1 2.1 0 1.168.938 2.099 2.1 2.099.445 0 .858-.135 1.2-.374v.286zm15.674 0h1.01v-4.063h-1.01v.326a2.087 2.087 0 00-1.2-.374c-1.162 0-2.1.938-2.1 2.1a2.092 2.092 0 002.1 2.099c.445 0 .858-.135 1.2-.374v.286zm1.384-1.32c.032.82.732 1.4 1.9 1.4.955 0 1.742-.414 1.742-1.328 0-.636-.358-1.01-1.185-1.17l-.644-.126c-.414-.08-.7-.16-.7-.406 0-.27.278-.39.628-.39.51 0 .716.255.732.557h1.018c-.056-.795-.692-1.328-1.718-1.328-1.057 0-1.686.58-1.686 1.336 0 .922.748 1.073 1.392 1.193l.533.095c.382.072.549.183.549.406 0 .199-.191.397-.645.397-.66 0-.874-.342-.882-.636h-1.034zM8.024 14.517v1.71a2.087 2.087 0 00-1.2-.374c-1.162 0-2.1.938-2.1 2.1 0 1.168.938 2.099 2.1 2.099.444 0 .858-.135 1.2-.374v.286h1.01v-5.447h-1.01zm6.226 0v1.71a2.087 2.087 0 00-1.2-.374c-1.161 0-2.1.938-2.1 2.1a2.092 2.092 0 002.1 2.099c.445 0 .858-.135 1.2-.374v.286h1.01v-5.447h-1.01zm-11.626-1.2l.684 1.2h4.716l-1.869-3.229-3.53 2.028zm7.913 2.21v-1.01h3.713l-3.96-6.855L6.751 9.69l2.776 4.827v1.01h1.01zm5.217-1.01h4.723L14.37 3.948l-3.531 2.036 4.915 8.533z" />
              </svg>
              Advertisement Campaign
            </div>
          </div>
          <div className="flex flex-col gap-1 text-white opacity-75">
            <div className="text-base md:text-lg leading-relaxed">
              Impossible is just a big word thrown around by small men who find it easier to live in the world they've been given than to explore the power they have to change it. Impossible is not a fact. It's an opinion. Impossible is not a declaration. It's a dare. Impossible is potential. Impossible is temporary. Impossible is nothing.
            </div>
            <div className="text-sm italic mt-2">
              — John C. Maxwell |{" "}
              <a
                className="border-b border-dashed border-white/60 hover:border-white"
                target="_blank"
                rel="noreferrer noopener"
                href="https://www.google.co.in/books/edition/The_Difference_Maker/zig4-x2oB1sC?hl=en&gbpv=0"
                title="The Difference Maker Making Your Attitude Your Greatest Asset"
              >
                The Difference Maker - 2006
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function SteveJobsQuote() {
  return (
    <div id="highlights" className="mt-20 bg-white py-12 md:mt-32">
      <div className="mx-auto max-w-5xl px-6 lg:px-0">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-[1fr_2fr]">
          <div className="text-xl text-black">
            <div className="font-sans font-semibold">
              Stay <span className="font-serif italic">Hungry</span> Stay <span className="italic font-serif">Foolish</span> —
            </div>
            <div className="flex items-center gap-2 font-serif font-normal italic mt-2 text-zinc-800">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                <title>Apple</title>
                <path d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701" />
              </svg>
              <span className="font-semibold">Steve Jobs</span>, Ex CEO of Apple Inc.
            </div>
          </div>
          <div className="flex flex-col gap-8 text-zinc-700 leading-relaxed text-base md:text-lg">
            <div>
              Here's to the crazy ones. The misfits. The rebels. The troublemakers. The round pegs in the square holes. The ones who see things differently. They're not fond of rules. And they have no respect for the status quo. You can quote them, disagree with them, glorify or vilify them. About the only thing you can't do is ignore them. Because they change things. They push the human race forward. And while some may see them as the crazy people who are crazy enough to think they can change the world, are the ones who do.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
