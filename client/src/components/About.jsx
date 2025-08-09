export default function About() {
  return (
    <>
      <div className="w-full px-6 py-10 md:px-20 lg:px-48 bg-gray-100 text-gray-900 space-y-10 shadow-md">
        <section>
          <h1 className="text-4xl font-bold mb-6">Why CourseText?</h1>
          <p className="text-lg leading-relaxed mb-4">
            Buying and selling used textbooks can be a hassle. CourseText
            simplifies the process by connecting UBC students directly with
            eachother.
          </p>
          <p className="text-lg leading-relaxed">
            Our platform is designed to be user-friendly and efficient, making
            it easy for students to find the textbooks they need at affordable
            prices. By facilitating direct transactions between students, we
            help reduce costs and promote a sense of community on campus.
          </p>
          <p className="text-lg leading-relaxed mt-4">
            Whether you're looking to buy or sell textbooks, CourseText is here
            to make the process as smooth and straightforward as possible. Join
            us in creating a more connected and cost-effective way to manage
            your textbooks!
          </p>
        </section>

        <section>
          <h2 className="text-3xl font-semibold mb-4">How it Works</h2>
          <ul className="list-disc list-inside space-y-3 text-lg leading-relaxed">
            <li>
              <strong>Post Listings:</strong> Students can easily post listings
              for textbooks they want to sell, including details like title,
              description, price, and course code.
            </li>
            <li>
              <strong>Search and Filter:</strong> Other students can search for
              textbooks by title, course code, or description, making it easy to
              find what they need.
            </li>
            <li>
              <strong>Direct Transactions:</strong> Once a buyer finds a
              textbook they want, they can contact the seller directly through
              the platform to arrange payment and pickup.
            </li>
            <li>
              <strong>Community Focused:</strong> CourseText fosters a sense of
              community by connecting students with each other, allowing them to
              support one another in their academic journeys.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-3xl font-semibold mb-4">Get Started</h2>
          <p className="text-lg leading-relaxed">
            Ready to simplify your textbook buying and selling experience?{" "}
            <a href="/listings" className="text-blue-600 hover:underline">
              Browse Listings
            </a>{" "}
            or{" "}
            <a href="/sign-up" className="text-blue-600 hover:underline">
              Sign up
            </a>{" "}
            to create your own listings today.
          </p>
        </section>
      </div>

      <footer className="text-center p-6 text-sm text-gray-500">
        &copy; {new Date().getFullYear()} CourseText — Built by a UBC student
      </footer>
    </>
  );
}
