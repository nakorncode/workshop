import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'

export const Route = createFileRoute('/12-two-way-binding')({
  component: RouteComponent,
})

function RouteComponent() {
  const [name, setName] = useState<string>('')
  const [height, setHeight] = useState<number>(0)
  const [employed, setEmployed] = useState<boolean>(false)
  const [birthDate, setBirthDate] = useState<Date>()
  const [gender, setGender] = useState<'Male' | 'Female' | 'Other'>()
  const [country, setCountry] = useState<'Thailand' | 'Malaysia' | 'Singapore' | 'Indonesia'>()

  function setDataSomsak() {
    setName('Somsak Boontong')
    setHeight(178)
    setEmployed(true)
    setBirthDate(new Date('1996-02-16'))
    setGender('Male')
    setCountry('Thailand')
  }

  function setDataJasmine() {
    setName('Jasmine Lim')
    setHeight(165)
    setEmployed(false)
    setBirthDate(new Date('2000-11-02'))
    setGender('Female')
    setCountry('Singapore')
  }

  return (
    <>
      <ul className="list-disc pl-5 mb-2">
        <li>Name: {name}</li>
        <li>Height: {(height * 0.0328084).toFixed(2)} feet</li>
        <li>Employed: {employed ? 'Yes' : 'No'}</li>
        <li>Birth Date: {birthDate ? birthDate.toLocaleDateString('en-US', { dateStyle: 'full' }) : 'Unknown'}</li>
        <li>Gender: {gender || 'Unknown'}</li>
        <li>Country: {country || 'Unknown'}</li>
      </ul>

      <div className="space-y-1">
        <div>
          <label>
            <span>Full name:</span>
            <input type="text" onChange={(e) => setName(e.target.value)} value={name} className="ml-1 border border-gray-300 px-2 py-1 rounded" />
          </label>
        </div>
        <div>
          <label>
            <span>Height (cm):</span>
            <input type="number" onChange={(e) => setHeight(Number(e.target.value))} value={height} className="ml-1 border border-gray-300 px-2 py-1 rounded" />
          </label>
        </div>
        <div>
          <label>
            <span>Employed:</span>
            <input type="checkbox" onChange={(e) => setEmployed(e.target.checked)} checked={employed} className="ml-1"/>
          </label>
        </div>
        <div>
          <label>
            <span>Birth Date:</span>
            <input type="date" onChange={(e) => setBirthDate(new Date(e.target.value))} value={birthDate?.toISOString().split('T')[0] || ''} className="ml-1 border border-gray-300 px-2 py-1 rounded" />
          </label>
        </div>
        <div>
          <span>Gender:</span>
          <div className="space-x-3">
            <label>
              <input type="radio" name="gender"onChange={() => setGender('Male')} checked={gender === 'Male'} className="mr-1" />
              <span>Male</span>
            </label>
            <label>
              <input type="radio" name="gender" onChange={() => setGender('Female')} checked={gender === 'Female'} className="mr-1" />
              <span>Female</span>
            </label>
            <label>
              <input type="radio" name="gender" onChange={() => setGender('Other')} checked={gender === 'Other'} className="mr-1" />
              <span>Other</span>
            </label>
          </div>
        </div>
        <div>
          <span>Country:</span>
          <select value={country} onChange={(e) => setCountry(e.target.value as 'Thailand' | 'Malaysia' | 'Singapore' | 'Indonesia')} className="ml-1 border border-gray-300 px-2 py-1 rounded">
            <option value="">Select a country</option>
            <option value="Thailand">Thailand</option>
            <option value="Malaysia">Malaysia</option>
            <option value="Singapore">Singapore</option>
            <option value="Indonesia">Indonesia</option>
          </select>
        </div>
        <button type="button" onClick={setDataSomsak} className="bg-blue-600 hover:bg-blue-700 text-white py-1 px-3 rounded cursor-pointer">Set data as Somsak Boontong</button>
        <button type="button" onClick={setDataJasmine} className="bg-blue-600 hover:bg-blue-700 text-white py-1 px-3 rounded cursor-pointer">Set data as Jasmine Lim</button>
      </div>
    </>
  )
}
