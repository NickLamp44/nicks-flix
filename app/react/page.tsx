export default function ReactClientPage() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="text-center max-w-2xl">
        <h1 className="text-4xl font-bold mb-4">React Client</h1>
        <p className="text-lg text-muted-foreground mb-8">
          The React client will be integrated here. For now, you can run it separately from the react-client folder.
        </p>
        <div className="bg-muted p-6 rounded-lg text-left">
          <p className="text-sm text-muted-foreground mb-2">To run the React client:</p>
          <pre className="bg-background p-4 rounded text-sm overflow-x-auto">
            {`cd react-client
npm install
npm start`}
          </pre>
          <p className="text-xs text-muted-foreground mt-4">The React client will run on http://localhost:1234</p>
        </div>
      </div>
    </div>
  )
}
