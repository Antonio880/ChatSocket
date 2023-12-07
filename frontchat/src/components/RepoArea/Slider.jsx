import { useState, useEffect } from "react";
import axios from "axios";

export default function Slider({ repo }){
	
	const [ commits, setCommits ] = useState(0);

    useEffect(() => {
        axios.get(`https://api.github.com/repos/${repo.owner.login}/${repo.name}/commits`)
         .then((response) => {
			setCommits(response.data.length);
		})
         .catch((error) => console.error(error));
    }, []);

	return (
		<>
			<div class="card shadow h-44 overflow-y-auto" style={{width: "300px", marginRight: "15px", marginBottom: "20px"}}>
				<div class="card-body">
					<div className="flex w-full">
						<h5 class="card-title">{repo.name}</h5>
						<div className="w-6 ml-40 justify-end items-center">
							<img className="cursor-pointer" onClick={() => {}} src="message_send_email_icon_191636.png" alt="Message Icon" />
						</div>
					</div>
					<h6 class="card-subtitle mb-2 text-body-secondary">Stars: {repo.stargazers_count}<br /> Commits: {commits}</h6>
					<p class="card-text text-sm">{repo.description}</p>
					<a href={repo.html_url} target="_blank" class="card-link">URL do Repo</a>
					<a href={repo.clone_url} target="_blank" class="card-link">Clone</a>
				</div>
			</div>
		</>
	);
};
