import { LoaderCircle } from 'lucide-react'
import './App.css'
import { AutoComplete } from './components/auto-complete'
import { SUGGESTION_LIST_SIZE } from './constants'
import { IGitHubRepository } from './types'

function App() {

  const fetchSuggestions = async (query: string): Promise<IGitHubRepository> => {
    const response = await fetch(`https://api.github.com/search/repositories?q=${query}&per_page=${SUGGESTION_LIST_SIZE}`)
    const data = await response.json()
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return data;
  }

  return (
    <>
      <div className="flex justify-start flex-col gap-12 p-20">
        <h1 className='text-3xl md:text-5xl'>Autocomplete - Input Component </h1>

        <AutoComplete
          fetchSuggestions={fetchSuggestions}
          onSuggestionSelected={(selectedOption: string) => console.log(selectedOption)}
          placeholder="Search for a repository"
          dataKey="repository-names"
          loader={<LoaderCircle className="animate-spin text-green-500" size={40} />}
          caching={true}
          debounceTime={500}
          onChange={(e) => console.log("on change",e.target.value)}
          onBlur={(e) => console.log(e.target.value)}
          onFocus={(e) => console.log(e.target.value)}
        />
      </div>
    </>
  )
}

export default App
