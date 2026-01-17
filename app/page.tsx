export default function HomePage() {
  return (
    <div className="min-h-screen bg-background text-foreground font-mono">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="max-w-4xl mx-auto px-6 py-6 text-center">
          <h1 className="text-2xl md:text-3xl font-bold text-foreground tracking-tight">
            Nick's Flix - Movie Database API
          </h1>
          <p className="text-sm text-muted-foreground mt-2">
            Full-Stack Movie Application with React & Angular
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-6 py-10 space-y-8">
        {/* About */}
        <section className="bg-card border border-border p-6">
          <h2 className="text-lg font-bold mb-4 pb-2 border-b border-border text-primary">
            ## About This Project
          </h2>
          <p className="leading-relaxed text-muted-foreground mb-4">
            Nick's Flix is a comprehensive full-stack movie database application
            showcasing modern web development practices. This project
            demonstrates the same movie browsing application built with two
            different frontend frameworks:{" "}
            <span className="text-foreground font-semibold">React</span> and{" "}
            <span className="text-foreground font-semibold">Angular</span>, both
            consuming the same RESTful API backend.
          </p>
          <p className="leading-relaxed text-muted-foreground">
            The backend API is built with{" "}
            <span className="text-foreground font-semibold">Express.js</span>{" "}
            and <span className="text-foreground font-semibold">MongoDB</span>,
            featuring JWT authentication, user management, and complete CRUD
            operations.
          </p>
        </section>

        {/* Features */}
        <section className="bg-card border border-border p-6">
          <h2 className="text-lg font-bold mb-4 pb-2 border-b border-border text-primary">
            ## Features
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="font-bold mb-3 text-foreground">
                {"<"} Backend API {"/>"}
              </h3>
              <ul className="space-y-2 text-muted-foreground text-sm">
                <li>• RESTful API with Express.js</li>
                <li>• MongoDB database with Mongoose ODM</li>
                <li>• JWT authentication & authorization</li>
                <li>• User registration and login</li>
                <li>• Movie data management</li>
                <li>• User watchlist functionality</li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-3 text-foreground">
                {"<"} Frontend Features {"/>"}
              </h3>
              <ul className="space-y-2 text-muted-foreground text-sm">
                <li>• Browse movie collection</li>
                <li>• View detailed movie information</li>
                <li>• User authentication</li>
                <li>• Personal watchlist management</li>
                <li>• User profile management</li>
                <li>• Responsive design</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Tech Stack */}
        <section className="bg-card border border-border p-6">
          <h2 className="text-lg font-bold mb-4 pb-2 border-b border-border text-primary">
            ## Technology Stack
          </h2>
          <div className="grid sm:grid-cols-3 gap-6">
            <div>
              <h3 className="font-bold mb-3 text-primary">Backend</h3>
              <ul className="space-y-1 text-muted-foreground text-sm">
                <li>- Node.js & Express.js</li>
                <li>- MongoDB & Mongoose</li>
                <li>- Passport.js (JWT)</li>
                <li>- bcrypt</li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-3 text-primary">React Client</h3>
              <ul className="space-y-1 text-muted-foreground text-sm">
                <li>- React 18.3</li>
                <li>- Redux Toolkit</li>
                <li>- React Router 6</li>
                <li>- Bootstrap 5</li>
                <li>- Parcel bundler</li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-3 text-primary">Angular Client</h3>
              <ul className="space-y-1 text-muted-foreground text-sm">
                <li>- Angular 17</li>
                <li>- TypeScript</li>
                <li>- Angular Material</li>
                <li>- RxJS</li>
              </ul>
            </div>
          </div>
        </section>

        {/* API Docs */}
        <section className="bg-card border border-border p-6 text-center">
          <h2 className="text-lg font-bold mb-4 pb-2 border-b border-border text-primary">
            ## API Documentation
          </h2>
          <p className="text-muted-foreground mb-6">
            The backend API provides comprehensive endpoints for authentication,
            user management, and movie data access.
          </p>
          <a
            href="/api-docs"
            className="inline-block px-6 py-3 bg-primary text-primary-foreground font-bold border border-primary hover:opacity-90 transition-opacity"
          >
            {">"} View Full API Documentation
          </a>
        </section>

        {/* Client Selection */}
        <section className="bg-card border border-border p-6">
          <h2 className="text-lg font-bold mb-4 pb-2 border-b border-border text-primary">
            ## Choose Your Client
          </h2>
          <p className="text-muted-foreground mb-6 text-center">
            Select which frontend implementation you'd like to explore.
          </p>

          <div className="grid md:grid-cols-2 gap-6">
            {/* React */}
            <div className="border border-border p-6 bg-secondary/50">
              <h3 className="text-lg font-bold mb-3 text-foreground">
                React Client
              </h3>
              <p className="text-muted-foreground text-sm mb-4">
                Modern React application with functional components, hooks, and
                Redux Toolkit for state management.
              </p>
              <div className="text-xs text-muted-foreground mb-4 space-y-1">
                <p>
                  <span className="text-foreground">Port:</span> 1234
                </p>
                <p>
                  <span className="text-foreground">Framework:</span> React 18.3
                </p>
                <p>
                  <span className="text-foreground">Build Tool:</span> Parcel
                </p>
              </div>
              <a
                href="http://localhost:1234"
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full text-center px-4 py-3 bg-[#61dafb] text-[#20232a] font-bold hover:opacity-90 transition-opacity"
              >
                {">"} Launch React App
              </a>
            </div>

            {/* Angular */}
            <div className="border border-border p-6 bg-secondary/50">
              <h3 className="text-lg font-bold mb-3 text-foreground">
                Angular Client
              </h3>
              <p className="text-muted-foreground text-sm mb-4">
                Enterprise-grade Angular application with TypeScript, reactive
                forms, and Material Design.
              </p>
              <div className="text-xs text-muted-foreground mb-4 space-y-1">
                <p>
                  <span className="text-foreground">Port:</span> 4200
                </p>
                <p>
                  <span className="text-foreground">Framework:</span> Angular 17
                </p>
                <p>
                  <span className="text-foreground">Build Tool:</span> Angular
                  CLI
                </p>
              </div>
              <a
                href="http://localhost:4200"
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full text-center px-4 py-3 bg-[#dd0031] text-white font-bold hover:opacity-90 transition-opacity"
              >
                {">"} Launch Angular App
              </a>
            </div>
          </div>
        </section>

        {/* Getting Started */}
        <section className="bg-secondary border border-border p-6">
          <h2 className="text-lg font-bold mb-4 pb-2 border-b border-border text-primary">
            ## Getting Started
          </h2>
          <div className="space-y-6">
            <div>
              <h3 className="font-bold mb-2 text-foreground">
                1. Start the Backend API
              </h3>
              <pre className="bg-background text-primary p-4 overflow-x-auto text-sm border border-border">
                {`$ cd backend
$ npm install
$ npm run dev`}
              </pre>
              <p className="text-xs text-muted-foreground mt-2">
                → API runs on http://localhost:8080
              </p>
            </div>

            <div>
              <h3 className="font-bold mb-2 text-foreground">
                2. Start the React Client
              </h3>
              <pre className="bg-background text-primary p-4 overflow-x-auto text-sm border border-border">
                {`$ cd react-client
$ npm install
$ npm start`}
              </pre>
              <p className="text-xs text-muted-foreground mt-2">
                → React app runs on http://localhost:1234
              </p>
            </div>

            <div>
              <h3 className="font-bold mb-2 text-foreground">
                3. Start the Angular Client
              </h3>
              <pre className="bg-background text-primary p-4 overflow-x-auto text-sm border border-border">
                {`$ cd angular-client
$ npm install
$ ng serve`}
              </pre>
              <p className="text-xs text-muted-foreground mt-2">
                → Angular app runs on http://localhost:4200
              </p>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-border bg-card mt-12">
        <div className="max-w-4xl mx-auto px-6 py-6 text-center text-sm text-muted-foreground">
          <p>
            Nick's Flix Movie Database — Built with Express, MongoDB, React &
            Angular
          </p>
          <p className="mt-2">
            Backend API:{" "}
            <code className="bg-secondary px-2 py-1 text-primary">
              http://localhost:8080
            </code>
          </p>
        </div>
      </footer>
    </div>
  );
}
