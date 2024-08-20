import React from 'react';
import { HealthInsuranceForm } from "./components/form/HealthInsuranceForm.tsx";

export const App: React.FC = () => {
  return (
      <div className="page">
        <div className="card">
          <HealthInsuranceForm />
        </div>
      </div>
  )
}

export default App
