import Link from "next/link";
export default function Home() {
  return (
    <div className="flex flex-col min-h-[100dvh]">
      <header className="px-4 lg:px-6 h-14 flex items-center">
        <Link className="flex items-center justify-center" href="#">
          {/* <GiftIcon className="h-6 w-6" /> */}
          <span className="sr-only">GIF Social</span>
        </Link>
      </header>
      <main className="flex-1">

        {/* Hero   */}
        <section className="w-full pt-12 md:pt-24 lg:pt-32 border-t">
          <div className="px-4 md:px-6 space-y-10 xl:space-y-16 max-w-[1300px] mx-auto">
            <div className="px-4 sm:px-6 md:px-10 md:grid md:grid-cols-2 md:gap-16">
              <div>
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl xl:text-[3.4rem] 2xl:text-[3.75rem] lg:leading-tighter">
                  Discover and Share the Best GIFs
                </h1>
                <p className="max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                  Easily search, share, and discover the most entertaining GIFs
                  with our intuitive social platform.
                </p>
                <div className="space-x-4 mt-6">
                  <Link
                    className="inline-flex h-9 items-center justify-center rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300"
                    href="/auth/login"
                  >
                    Get Started
                  </Link>
                </div>
              </div>
              <div className="flex justify-end items-start">
                <iframe
                  alt="Hero GIF 2"
                  className="object-cover h-[255px] w-[225px]"
                  src="/duck.gif"
                  style={{ transform: "translateY(-35%)" }}
                ></iframe>
              </div>
            </div>
          </div>
        </section>

        {/* Key features */}
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container space-y-12 px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  Discover, Share, and Enjoy GIFs
                </h2>
                <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                  Easy to search, share, and discover the most entertaining
                  GIFs. Explore trending content, create your own GIFs, and
                  connect with friends.
                </p>
              </div>
            </div>
            <div className="flex justify-center">
            <div className="inline-block rounded-lg bg-gray-100 px-3 py-1 text-sm dark:bg-gray-800">
                  Key Features
              </div>
            </div>
            <div className="mx-auto grid items-start gap-8 sm:max-w-4xl sm:grid-cols-2 md:gap-12 lg:max-w-5xl lg:grid-cols-3">
              <div className="grid gap-1">
                <h3 className="text-lg font-bold">Easy GIF Search</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Quickly find the perfect GIF for any occasion with our
                  intuitive search functionality.
                </p>
              </div>
              <div className="grid gap-1">
                <h3 className="text-lg font-bold">Seamless Sharing</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Share your favorite GIFs with friends, family, and the world
                  with just a few taps.
                </p>
              </div>
              <div className="grid gap-1">
                <h3 className="text-lg font-bold">Discover Trending GIFs</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Stay up-to-date with the latest viral GIFs and join the
                  conversation.
                </p>
              </div>
              <div className="grid gap-1">
                <h3 className="text-lg font-bold">Create Your Own GIFs</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Unleash your creativity and make your own unique GIFs to share
                  with the community.
                </p>
              </div>
              <div className="grid gap-1">
                <h3 className="text-lg font-bold">Connect with Friends</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Follow your friends, comment on their posts, and engage with
                  the GIF-loving community.
                </p>
              </div>
              <div className="grid gap-1">
                <h3 className="text-lg font-bold">
                  Personalized Recommendations
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Our app learns your preferences and suggests GIFs you are sure
                  to love.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonial */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800">
          <div className="container grid items-center justify-center gap-4 px-4 text-center md:px-6 lg:gap-10">
            <div className="space-y-3">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                What Our Users Say
              </h2>
              <p className="mx-auto max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                Hear from the people who love using our GIF sharing app.
              </p>
            </div>
            <div className="divide-y rounded-lg border">
              <div className="grid w-full grid-cols-3 items-stretch justify-center divide-x md:grid-cols-3">
                <div className="mx-auto flex w-full items-center justify-center p-4 sm:p-8">
                  <div className="flex flex-col items-center justify-center space-y-2">
                    <div className="rounded-full w-16 h-16 bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-4xl">
                      😂
                    </div>
                    <div className="text-sm font-medium">
                    &quot;This app is a game-changer for GIF lovers!&quot;
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      - Jane Doe, Acme Inc.
                    </div>
                  </div>
                </div>
                <div className="mx-auto flex w-full items-center justify-center p-4 sm:p-8">
                  <div className="flex flex-col items-center justify-center space-y-2">
                    <div className="rounded-full w-16 h-16 bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-4xl">
                      🤩
                    </div>
                    <div className="text-sm font-medium">
                    &quot;I can&apos;t imagine life without this app!&quot;
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      - John Smith, Acme Corp.
                    </div>
                  </div>
                </div>
                <div className="mx-auto flex w-full items-center justify-center p-4 sm:p-8">
                  <div className="flex flex-col items-center justify-center space-y-2">
                    <div className="rounded-full w-16 h-16 bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-4xl">
                      🥳
                    </div>
                    <div className="text-sm font-medium">
                    &quot;This app makes sharing GIFs a breeze!&quot;
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      - Sarah Lee, Acme LLC
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex justify-center space-x-4">
              <Link
                className="inline-flex h-10 items-center justify-center rounded-md bg-gray-900 px-8 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300"
                href="/auth/login"
              >
                Use
              </Link>
             
            </div>
          </div>
        </section>

        {/* Download */}
        <section className="w-full py-12 md:py-24 lg:py-32 border-t">
          <div className="container grid items-center justify-center gap-4 px-4 text-center md:px-6 lg:gap-10">
            <div className="space-y-3">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Download the App
              </h2>
              <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                Get the GIF sharing app and start discovering, creating, and
                sharing your favorite GIFs today.
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row justify-center">
              <Link
                className="inline-flex h-10 items-center justify-center rounded-md bg-gray-900 px-8 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300"
                href="#"
              >
                Download for iOS
              </Link>
              <Link
                className="inline-flex h-10 items-center justify-center rounded-md border border-gray-200 bg-white px-8 text-sm font-medium shadow-sm transition-colors hover:bg-gray-100 hover:text-gray-900 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:border-gray-800 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus-visible:ring-gray-300"
                href="#"
              >
                Download for Android
              </Link>
            </div>
          </div>
        </section>

      </main>


      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-gray-500 dark:text-gray-400">
          © 2024 GIF Social. All rights reserved.
        </p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Terms of Service
          </Link>
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Privacy
          </Link>
        </nav>
      </footer>
    </div>
  );
}
