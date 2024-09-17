import React, { useState, useEffect } from "react"; 
import Slider from "./Slider";

const RepoArea = ({ data, loadingDisplay, setLoadingDisplay, setViewRepos }) => {
	
	useEffect(() => {
		console.log(data);
	}, [])

    return (
		<>
			<div className={`w-full h-auto flex overflow-y-auto items-center justify-center mt-6 bg-gray-100 rounded-md shadow-md`}>
                {
                    data.length != 0 ? (
						<div className="flex h-full pt-4 mb-8 flex-wrap items-center justify-center">
							{
								data && data.map((repo) => (
									<Slider repo={repo} />
								))
							}
						</div>
                    ): (
                        
                        !loadingDisplay ? (
                            <div>
                                <h1 className="flex justify-center">Você tem Conta no GitHub com seu UserName?</h1>
                                <div className="flex justify-center">
                                    <button className="pr-4" onClick={() => {setLoadingDisplay(!loadingDisplay)}}>Sim</button>
                                    <button onClick={() => {setViewRepos(false)}}>Não</button>
                                </div>
                            </div>
                        ):(
                            <div className="flex justify-center">
								<button type="button" class="bg-indigo-100 font-bold flex w-40 h-10 items-center justify-center rounded-md" disabled>
									<div className="h-6 w-6 border-4 mx-2 border-l-gray-200 border-r-gray-200 border-b-gray-200 border-t-indigo-600 animate-spin ease-linear rounded-full" />
									Processing...
								</button>
							</div>
                        )
                    )
                }
                
			</div>
		</>
	);
};

export default RepoArea;

// import axios from "axios";
// import { useEffect, useState } from "react";

// export default function UserData({ data }){

//     const [ commits, setCommits ] = useState(0);

//     useEffect(() => {
//         axios.get(`https://api.github.com/repos/${data.owner.login}/${data.name}/commits`)
//          .then((response) => setCommits(response.data.length))
//          .catch((error) => console.error(error));
//     }, [])

//     return(
//         <div class="card shadow" style={{width: "18rem", marginRight: "30px", marginBottom: "20px"}}>
//             <div class="card-body">
//                 <h5 class="card-title">{data.name}</h5>
//                 <h6 class="card-subtitle mb-2 text-body-secondary">Stars: {data.stargazers_count}<br />Commits: {commits}</h6>
//                 <p class="card-text">{data.description}</p>
//                 <a href={data.html_url} class="card-link">URL do Repo</a>
//                 <a href={data.clone_url} class="card-link">Clone</a>
//             </div>
//         </div>
//     );
// };
