import { FC,useEffect,useState } from "react";
import { IAutoComplete,IGitHubRepository } from "../types";
import { useDebounce } from "../hooks/useDebounce";
import { SuggestionsList } from "./suggestions-list";



export const AutoComplete: FC<IAutoComplete> = ({
	caching,
	debounceTime,
	fetchSuggestions,
	loader,
	onBlur,
	onChange,
	onFocus,
	onSuggestionSelected,
	placeholder,
	staticSuggestions,
}) => {
	const [inputQuery,setInputQuery] = useState("");
	const debounceQuery = useDebounce(inputQuery,debounceTime);
	const [suggestionsList,setSuggestionsList] = useState<IGitHubRepository | null>(null);
	const [loading,setLoading] = useState(false);
	const [error,setError] = useState<null | string>(null);
	const [isResultSelected,setIsResultSelected] = useState(false);

	const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const query = event.target.value;
		setIsResultSelected(false);
		setInputQuery(query);
		onChange(event);
	}

	const getSuggestions = async (query: string) => {
		setLoading(true);
		setError(null);
		let filteredSuggestions: IGitHubRepository | null = null;

		try {
			if (caching && localStorage.getItem(query)) {
				filteredSuggestions = JSON.parse(localStorage.getItem(query.toLowerCase()) || '[]');
			} else {
				if (staticSuggestions || false) {//currently we are using static suggestions
					// filteredSuggestions = staticSuggestions.filter((suggestion: string) => suggestion.toLowerCase().includes(query.toLowerCase()));
				} else if (fetchSuggestions) {
					const filteredResult = await fetchSuggestions(query);
					filteredSuggestions = filteredResult;
				}

				localStorage.setItem(query.toLowerCase(),JSON.stringify(filteredSuggestions));
			}
			setSuggestionsList(filteredSuggestions);
		} catch (error) {
			setError("Failed to fetch suggestions. Please try again later.");
			setSuggestionsList(null);
		} finally {
			setLoading(false);
		}
	}
	const handleSuggestionSelection = (suggestion: string) => {
		setIsResultSelected(true);
		setInputQuery(suggestion);
		onSuggestionSelected(suggestion);
		setSuggestionsList(null);
	};

	useEffect(() => {
		if (debounceQuery.length > 1 && !isResultSelected) {
			getSuggestions(debounceQuery);
		} else {
			setSuggestionsList(null);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	},[debounceQuery])

	return (<>

		<div>
			<input
				placeholder={placeholder}
				onChange={handleInputChange}
				value={inputQuery}
				onBlur={onBlur}
				onFocus={onFocus}
				type="text"
				className="p-2 w-[30rem] border-2 border-gray-300 rounded-md text-gray-800 md:text-2xl text-xl tracking-wider"
			/>

			{(suggestionsList || loading || error) && (
				<>
					<ul className="text-white relative w-[30rem] max-h-[25rem] overflow-auto text-xl bg-gray-900 space-y-4 top-2 rounded-md shadow-lg p-2">
						{error && <p>{error}</p>}
						{loading && <span className="w-full flex items-center justify-center">
							{loader}
						</span>
						}

						{(suggestionsList && suggestionsList.items && suggestionsList.items.length == 0 && (!loading || !error)) ?
							<span>Result not Found</span> :
							<SuggestionsList
								suggestions={suggestionsList!}
								highlight={inputQuery}
								onSuggestionClick={handleSuggestionSelection}
								dataKey={""}
							/>}
					</ul>
				</>
			)}
		</div>




	</>);
};
