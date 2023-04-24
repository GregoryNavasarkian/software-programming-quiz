import React from 'react';

export default function ExampleRadio() {

  const items = [
    { id: 'small', name: 'Small' },
    { id: 'medium', name: 'Medium' },
    { id: 'large', name: 'Large' },
  ]
  
  return (
    <form>
      <fieldset>
        <legend className="sr-only">Plan</legend>
        <div className="space-y-5">
          {items.map((item) => (
            <div key={item.id} className="relative flex items-start">
              <div className="flex h-6 items-center">
                <input
                  id={item.id}
                  aria-describedby={`${item.id}-description`}
                  name="plan"
                  type="radio"
                  className="h-4 w-4 border-gray-300 text-slate-600 focus:ring-slate-600"
                />
              </div>
              <div className="ml-3 text-sm leading-6">
                <label htmlFor={item.id} className="font-medium text-slate-900">
                  {item.name}
                </label>
              </div>
            </div>
          ))}
        </div>
      </fieldset>
    </form>
  )
}