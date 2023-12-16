import React from "react"
import { LoginDialog } from "../components/partials/LoginDialog"
 
export function Home() {
  return <>
    <div className="flex flex-col align-start">
      <h1 className="text-4xl font-bold mb-4">microservichess</h1>
      <p className="text-gray-600 mb-6">
        Description of your app goes here...
      </p>
      <div className="space-y-4">
        <LoginDialog />
        <button className="btn" onClick={() => console.log('Sign Up clicked')}>
          Sign Up
        </button>
        <button className="btn" onClick={() => console.log('Continue as Guest clicked')}>
          Continue as Guest
        </button>
      </div>
    </div>
  </>
}
