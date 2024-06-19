/* eslint-disable @typescript-eslint/no-unused-vars */
import { FC } from "react"
import { IGitHubRepository } from "../types";
import { ExternalLink } from 'lucide-react'
export interface ISuggestionList {
	suggestions: IGitHubRepository,
	highlight: string,
	dataKey: string,
	onSuggestionClick: (suggestion: string) => void,

}
export const SuggestionsList: FC<ISuggestionList> = ({
	highlight,
	onSuggestionClick,
	suggestions = null,
}) => {

	const getHighlightedText = (text: string,highlight: string) => {
		if (!highlight.trim()) {
			return <span>{text}</span>;
		}

		const regex = new RegExp(`(${highlight})`,"gi");
		const parts = text.split(regex);

		return (
			<span>
				{parts.filter(part => part).map((part,i) =>
					regex.test(part) ? <mark key={i}>{part}</mark> : <span key={i}>{part}</span>
				)}
			</span>
		);
	};
	return (
		<>
			{suggestions && suggestions?.items && suggestions.items.map((suggestion,index: number) => (
				<li key={index} onClick={() => onSuggestionClick(suggestion.name)}
					className="hover:bg-gray-700 cursor-pointer hover:text-white p-4 rounded-xl "
				>
					<div className="flex flex-row justify-between items-center">
						<span>
							{getHighlightedText(suggestion.name,highlight)}
						</span>
						<a href={suggestion.html_url} target="_blank" rel="noreferrer" className="flex flex-row gap-2">
							<span className="text-gray-400">
								<ExternalLink className="text-white hover:text-yellow-100" />
							</span>
						</a>

					</div>
				</li>
			))}
		</>
	)
}
