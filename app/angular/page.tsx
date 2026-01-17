export default function AngularClientPage() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="text-center max-w-2xl">
        <h1 className="text-4xl font-bold mb-4">Angular Client</h1>
        <p className="text-lg text-muted-foreground mb-8">
          The Angular client will be integrated here. For now, you can run it separately from the angular-client folder.
        </p>
        <div className="bg-muted p-6 rounded-lg text-left">
          <p className="text-sm text-muted-foreground mb-2">To run the Angular client:</p>
          <pre className="bg-background p-4 rounded text-sm overflow-x-auto">
            {`cd angular-client
npm install
ng serve`}
          </pre>
          <p className="text-xs text-muted-foreground mt-4">The Angular client will run on http://localhost:4200</p>
        </div>
      </div>
    </div>
  )
}
