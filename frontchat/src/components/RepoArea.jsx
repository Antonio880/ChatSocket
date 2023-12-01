import React, { useState } from "react";

const RepoArea = ({ data }) => {
	
    const [ loadingDisplay, setLoadingDisplay ] = useState(false);
    
    return (
		<>
			<div>
                {
                    data.length != 0 ? (
						<div className="flex flex-col flex-wrap items-center mx-auto bg-slate-200 w-56 h-[364px] rounded-lg m-10 box-border">
							<div class="card-body">
								{/* <h5 class="card-title">{data.name}</h5>
								<h6 class="card-subtitle mb-2 text-body-secondary">Stars: {data.stargazers_count}<br />Commits: {commits}</h6>
								<p class="card-text">{data.description}</p>
								<a href={data.html_url} class="card-link">URL do Repo</a>
								<a href={data.clone_url} class="card-link">Clone</a> */}
							</div>
						</div>
                    ): (
                        
                        !loadingDisplay ? (
                            <div className="">
                                <h1 className="flex justify-center">Você tem Conta no GitHub com seu UserName?</h1>
                                <div className="flex justify-center">
                                    <button className="pr-4" onClick={() => {setLoadingDisplay(!loadingDisplay)}}>Sim</button>
                                    <button onClick={() => {}}>Não</button>
                                </div>
                            </div>
                        ):(
                            <div className="flex justify-center">
								<button type="button" class="bg-indigo-500 ..." disabled>
									<svg class="animate-spin h-5 w-5 mr-3 ..." viewBox="0 0 24 24">
										
									</svg>
									Processing...
								</button>
							</div>
                        )
                        
                    )
                }
                
                {/* <img
					className=" rounded-md rounded-b-none bg-top"
					src={image}
					alt=""
				/>

				<div className=" h-20 text-center">
					<h1 className=" text-2xl font-bold mt-4">{nome}</h1>
					<h2 className=" text-purple font-bold leading-none text-center">
						{cargo}
					</h2>
				</div>

				<nav className="flex flex-row gap-6 p-4">
					<a
						href={linkedin}
						target="_blank"
						className="bg-purple hover:bg-darkPurple px-2 py-2 rounded-full"
					>
						<img src="./icons/linkedin.svg" alt="" />
					</a>
					<a
						href={instagram}
						target="_blank"
						className="bg-purple hover:bg-darkPurple px-2 py-2 rounded-full"
					>
						<img src="./icons/instagram.svg" alt="" />
					</a>
				</nav> */}
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
